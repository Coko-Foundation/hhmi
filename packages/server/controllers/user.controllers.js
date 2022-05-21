const { useTransaction } = require('@coko/server')

const { roles } = require('../constants')
const { Team, User } = require('../models')

const submitQuestionnaire = async (userId, profileData) => {
  const data = {
    ...profileData,
    profileSubmitted: true,
  }

  return updateProfile(userId, data)
}

const updateProfile = async (userId, profileData) => {
  const { isReviewer: shouldBeReviewer, ...userData } = profileData

  if (typeof shouldBeReviewer !== 'boolean') {
    throw new Error('isReviewer value needs to be a boolean and defined')
  }

  return useTransaction(async trx => {
    const isAlreadyReviewer = await User.hasGlobalRole(userId, 'reviewer', {
      trx,
    })

    if (!isAlreadyReviewer && shouldBeReviewer) {
      await Team.addMemberToGlobalTeam(userId, roles.REVIEWER, { trx })
    }

    if (isAlreadyReviewer && !shouldBeReviewer) {
      await Team.removeMemberFromGlobalTeam(userId, roles.REVIEWER, { trx })
    }

    const updatedUser = await User.patchAndFetchById(userId, userData, { trx })
    return updatedUser
  })
}

module.exports = { submitQuestionnaire, updateProfile }
