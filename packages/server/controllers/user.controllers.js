const { logger, useTransaction } = require('@coko/server')

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

module.exports = {
  submitQuestionnaire,
  updateUserProfile,
  filterUsers,
  getDisplayName,
}
