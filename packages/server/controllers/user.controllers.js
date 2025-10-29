const {
  logger,
  useTransaction,
  uuid,
  createJWT,
  ChatChannel,
  ChatMessage,
} = require('@coko/server')

const axios = require('axios').default
const crypto = require('node:crypto')
const qs = require('node:querystring')
const path = require('path')
const { writeFile } = require('fs').promises
const config = require('config')

const { roles } = require('../constants')
const { getProfileOptions } = require('./courseMetadata.controller')

const {
  Team,
  TeamMember,
  User,
  Identity,
  Question,
  QuestionVersion,
  Review,
  ComplexItemSet,
} = require('../models')

const REVIEWER_TEAM = config.teams.nonGlobal.find(t => t.role === 'reviewer')

const submitQuestionnaire = async (userId, profileData) => {
  const data = {
    ...profileData,
    profileSubmitted: true,
  }

  return updateUserProfile(userId, data)
}

const updateUserProfile = async (userId, profileData) => {
  try {
    const {
      reviewerInterest: shouldBeReviewer,
      email,
      ...userData
    } = profileData

    return useTransaction(async trx => {
      const isAlreadyReviewer = await User.hasGlobalRole(
        userId,
        roles.REVIEWER,
        {
          trx,
        },
      )

      if (!isAlreadyReviewer && shouldBeReviewer) {
        await Team.addMemberToGlobalTeam(userId, roles.REVIEWER, { trx })
      }

      if (isAlreadyReviewer && !shouldBeReviewer) {
        await Team.removeMemberFromGlobalTeam(userId, roles.REVIEWER, { trx })
      }

      const defaultIdentity = await Identity.findOne(
        {
          userId,
          isDefault: true,
        },
        { trx },
      )

      await defaultIdentity.patch({ email }, { trx })

      const updatedUser = await User.patchAndFetchById(userId, userData, {
        trx,
      })

      return updatedUser
    })
  } catch (e) {
    logger.error(e)
    throw new Error(e)
  }
}

const getDisplayName = async user => User.getDisplayName(user)

const filterUsers = async (params, options = {}) => {
  try {
    const { trx, ...restOptions } = options

    return useTransaction(
      async tr => {
        logger.info(`filter users by query params`)
        return User.filter(params, {
          trx: tr,
          ...restOptions,
        })
      },
      { trx, passedTrxOnly: true },
    )
  } catch (e) {
    logger.error(`error filterUsers: ${e.message}`)
    throw new Error(e)
  }
}

const bioInteractiveLogin = async (authCode, options = {}) => {
  try {
    const {
      BIOINTERACTIVE_OAUTH_CLIENT_ID,
      BIOINTERACTIVE_OAUTH_CLIENT_SECRET,
      BIOINTERACTIVE_OAUTH_REDIRECT_URI,
      BIOINTERACTIVE_OAUTH_TOKEN_URI,
      BIOINTERACTIVE_OAUTH_API_USER_URI,
      BIOINTERACTIVE_OAUTH_AUTH_SERVER_URI,
    } = process.env

    const { trx } = options
    const state = uuid()

    return useTransaction(
      async tr => {
        let tokenResponse

        try {
          const payload = {
            grant_type: 'authorization_code',
            code: authCode,
            callback_url: BIOINTERACTIVE_OAUTH_REDIRECT_URI,
            auth_url: BIOINTERACTIVE_OAUTH_AUTH_SERVER_URI,
            access_token_url: BIOINTERACTIVE_OAUTH_TOKEN_URI,
            client_id: BIOINTERACTIVE_OAUTH_CLIENT_ID,
            client_secret: BIOINTERACTIVE_OAUTH_CLIENT_SECRET,
            redirect_uri: BIOINTERACTIVE_OAUTH_REDIRECT_URI,
            scope: 'openid',
            state,
          }

          tokenResponse = await axios.request({
            url: BIOINTERACTIVE_OAUTH_TOKEN_URI,
            method: 'post',
            data: qs.stringify(payload),
          })
        } catch (e) {
          throw new Error(e)
        }

        const { access_token: accessToken, error: tokenError } =
          tokenResponse.data

        if (tokenError) {
          logger.error(
            `error bioInteractiveLogin: get access token: ${tokenError}`,
          )
          throw new Error(tokenError)
        }

        // get user
        const { data: userInfo, error: userInfoError } = await axios.get(
          BIOINTERACTIVE_OAUTH_API_USER_URI,
          { headers: { Authorization: `Bearer ${accessToken}` } },
        )

        if (userInfoError) {
          logger.error(
            `error bioInteractiveLogin: get access token: ${userInfoError}`,
          )
          throw new Error(userInfoError)
        }

        let user

        // do we already have a user that is social?
        // no, set the user
        const { email } = userInfo

        // const identity = await Identity.query().findOne(builder =>
        //   builder
        //     .whereJsonSupersetOf('profile_data', {
        //       sub, // biointeractive user id
        //     })
        //     .where({
        //       isSocial: true,
        //       provider: 'biointeractive',
        //     }),
        // )

        const identity = await Identity.findOne({
          email: email.toLowerCase(),
          isSocial: true,
          provider: 'biointeractive',
        })

        if (!identity) {
          const givenNames = userInfo.given_name.map(g => g.value).join(' ')
          const surname = userInfo.family_name.map(g => g.value).join(' ')
          const password = uuid()
          const agreedTc = false

          logger.info('bioInteractiveLogin: creating user')

          user = await User.insert(
            {
              agreedTc,
              givenNames: givenNames || 'given_name',
              password,
              surname: surname || 'family_name',
              isActive: true,
            },
            { trx: tr },
          )

          const verificationToken = crypto.randomBytes(64).toString('hex')
          const verificationTokenTimestamp = new Date()

          logger.info(
            'bioInteractiveLogin: creating user local identity with fetched email',
            user,
          )

          await Identity.insert(
            {
              userId: user.id,
              email,
              isSocial: true,
              verificationToken,
              verificationTokenTimestamp,
              isVerified: true,
              isDefault: true,
              oauthAccessToken: accessToken,
              provider: 'biointeractive',
              profileData: userInfo,
            },
            { trx: tr },
          )

          return {
            user,
            token: createJWT(user),
          }
        }

        // get the user, and update the token
        await identity.patch({ oauthAccessToken: accessToken }, { trx: tr })
        user = await User.findById(identity.userId)

        // if (!user.username) {
        //   await User.patchAndFetchById(user.id, {
        //     username: 'incomplete profile',
        //   })
        // }

        return {
          user,
          token: createJWT(user),
        }
      },
      { trx },
    )
  } catch (e) {
    logger.error(`error bioInteractiveLogin: ${e.message}`)
    throw new Error(e)
  }
}

const deleteUsersRelatedItems = async (ids, options = {}) => {
  try {
    return useTransaction(
      async trx => {
        // fetch user items
        const questionsByUser = await Promise.all(
          ids.map(async id => {
            const questions = await Question.findByRole(id, 'author')
            return {
              userId: id,
              questions: questions.result,
            }
          }),
        )

        // for all published items set `deletedAuthorName` field to the author's display name
        await Promise.all(
          questionsByUser.map(async user => {
            const userData = await User.findById(user.userId)
            const authorDisplayName = await User.getDisplayName(userData)

            await Promise.all(
              user.questions.map(async question => {
                // const publishedQuestions = []
                let isPublished = false
                const versions = await Question.getVersions(question.id)
                const versionsIds = versions.result.map(version => version.id)

                versions.result.every(version => {
                  if (version.published) {
                    isPublished = true
                    return false
                  }

                  return true
                })

                if (isPublished) {
                  await Question.updateAndFetchById(question.id, {
                    deletedAuthorName: authorDisplayName,
                  })
                } else {
                  // delete all reviews related to question versions
                  await Review.query(trx)
                    .delete()
                    .whereIn('question_version_id', versionsIds)

                  // delete all versions
                  await QuestionVersion.query(trx).delete().where({
                    questionId: question.id,
                  })

                  // get all chat threads for questions
                  // const chatThreads = await ChatChannel.find({
                  //   relatedObjectId: question.id,
                  // })

                  // const chatThreadsIds = chatThreads.result.map(
                  //   chatThread => chatThread.id,
                  // )

                  // // delete all chat messages in those threads
                  // await ChatMessage.query(trx)
                  //   .delete()
                  //   .whereIn('chatThreadId', chatThreadsIds)

                  // delete the chat threads
                  await ChatChannel.query(trx).delete().where({
                    relatedObjectId: question.id,
                  })

                  // delete question
                  await Question.deleteById(question.id)
                }
              }),
            )
          }),
        )

        await Promise.all(
          ids.map(async id => {
            const userData = await User.findById(id)
            const authorDisplayName = await User.getDisplayName(userData)
            const userTeams = await User.getTeams(id)

            const authoredSetsIds = userTeams
              .filter(
                team =>
                  team.role === 'author' &&
                  team.objectType === 'complexItemSet',
              )
              .map(team => team.objectId)

            const authoredSets = await ComplexItemSet.query(trx)
              .update({ deletedAuthor: `${authorDisplayName} (deleted)` })
              .whereIn('id', authoredSetsIds)

            return authoredSets
          }),
        )

        // additionally, delete all chat messages from these users in other chats
        await ChatMessage.query(trx).delete().whereIn('userId', ids)

        // delete any reviews from these users
        await Review.query(trx).delete().whereIn('reviewerId', ids)

        return true
      },
      { trx: options.trx, passedTrxOnly: true },
    )
  } catch (e) {
    logger.error(`error deleteUsersRelatedItems: ${e.message}`)
    throw new Error(e)
  }
}

const getUserTeams = async user => {
  try {
    const { id } = user
    return User.getTeams(id)
  } catch (e) {
    logger.error(`error getUserTeams: ${e.message}`)
    throw new Error(e)
  }
}

const downloadUsersCSV = async userIds => {
  const { courses, topics } = getProfileOptions()

  const expertiseOptions = [...courses, ...topics].filter(
    (expertise, index, self) => {
      return index === self.findIndex(v => v.value === expertise.value)
    },
  )

  const users = await Promise.all(
    userIds.map(async userId => {
      const user = await User.findById(userId)
      const displayName = await getDisplayName(user)

      const defaultIdentity = await Identity.findOne({
        userId,
        isDefault: true,
      })

      const teams = await getUserTeams(user)
      const globalTeams = teams.filter(t => t.global)
      const globalRoles = `"${globalTeams.map(t => t.displayName).join(', ')}"`

      const expertiseSelection = globalRoles.includes('Reviewer')
        ? user.topicsReviewing
        : user.coursesTeaching

      const expertise = `"${expertiseSelection
        .map(course => expertiseOptions.find(c => c.value === course)?.label)
        .join(', ')}"`

      let reviewerRecord = 'N/A'

      if (globalRoles.includes('Reviewer')) {
        reviewerRecord = await reviewerStats(user)
      }

      return {
        displayName,
        email: defaultIdentity?.email,
        roles: globalRoles,
        expertise,
        reviewerRecord,
      }
    }),
  )

  const dataCSV = users.reduce(
    (accu, user, index) => {
      // eslint-disable-next-line no-param-reassign
      accu += `${index + 1}, ${user.displayName}, ${user.email}, ${
        user.roles
      }, ${user.expertise}, ${user.reviewerRecord}\n`
      return accu
    },
    ` , Name, Email, Roles, Expertise, Reviewer record\n`, // column names for csv
  )

  const tempFolderPath = path.join(__dirname, '..', 'tmp')
  const fileName = 'usersData.csv'

  const downloadPath = path.join(tempFolderPath, fileName)

  try {
    await writeFile(downloadPath, dataCSV, 'utf8')
    return fileName
  } catch (error) {
    throw new Error(error)
  }
}

const reviewerStats = async user => {
  return useTransaction(async tr => {
    const reviewTeams = await Team.query(tr).where({
      role: REVIEWER_TEAM.role,
      global: false,
    })

    const userTeams = await TeamMember.query(tr)
      .whereIn(
        'teamId',
        reviewTeams.map(({ id }) => id),
      )
      .where('userId', user.id)

    const hasBeenInvited = userTeams
      .map(({ status }) => status)
      .some(t =>
        ['invited', 'acceptedInvitation', 'rejectedInvitation'].includes(t),
      )

    const submittedReviews = await Review.query(tr).where('reviewerId', user.id)

    const hasSubmitted = submittedReviews.some(
      ({ status }) => status.submitted === true,
    )

    if (hasSubmitted) return 'Submitted'
    if (hasBeenInvited) return 'Invited, not submitted'
    return 'Not invited'
  })
}

const deactivateUsers = async (ids, options = {}) => {
  const USER_CONTROLLER = `[USER CONTROLLER] -`

  try {
    const { trx } = options
    return useTransaction(
      async tr => {
        logger.info(
          `${USER_CONTROLLER} deactivateUsers: deactivating users with id ${ids}`,
        )
        return User.deactivateUsers(ids, { trx: tr })
      },
      { trx, passedTrxOnly: true },
    )
  } catch (e) {
    logger.error(`${USER_CONTROLLER} deactivateUsers: ${e.message}`)
    throw new Error(e)
  }
}

const deleteUsers = async (ids, options = {}) => {
  return User.deleteByIds(ids)
}

const getUser = async (id, options = {}) => {
  const USER_CONTROLLER = `[USER CONTROLLER] -`

  try {
    const { trx, ...restOptions } = options
    return useTransaction(
      async tr => {
        logger.info(`${USER_CONTROLLER} getUser: fetching user with id ${id}`)
        return User.findById(id, { trx: tr, ...restOptions })
      },
      { trx, passedTrxOnly: true },
    )
  } catch (e) {
    logger.error(`${USER_CONTROLLER} getUser: ${e.message}`)
    throw new Error(e)
  }
}

module.exports = {
  submitQuestionnaire,
  updateUserProfile,
  filterUsers,
  getDisplayName,
  bioInteractiveLogin,
  deleteUsersRelatedItems,
  getUserTeams,
  downloadUsersCSV,
  reviewerStats,
  deleteUsers,
  deactivateUsers,
  getUser,
}
