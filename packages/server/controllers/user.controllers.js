const { logger, useTransaction, uuid, createJWT } = require('@coko/server')
const axios = require('axios').default
const crypto = require('node:crypto')
const qs = require('node:querystring')

const { roles } = require('../constants')

const { Team, User, Identity } = require('../models')

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
          console.error('TOKEN ERROR:', e.response.data)
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
        const givenNames = userInfo.given_name.map(g => g.value).join(' ')
        const surname = userInfo.family_name.map(g => g.value).join(' ')

        const identity = await Identity.findOne({
          email,
          isSocial: true,
        })

        if (!identity) {
          const password = uuid()
          const agreedTc = false

          logger.info('bioInteractiveLogin: creating user')

          user = await User.insert(
            {
              agreedTc,
              givenNames,
              password,
              surname,
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

module.exports = {
  submitQuestionnaire,
  updateUserProfile,
  filterUsers,
  getDisplayName,
  bioInteractiveLogin,
}
