const { logger } = require('@coko/server')

const {
  updateUserProfile,
  submitQuestionnaire,
  filterUsers,
  getDisplayName,
  bioInteractiveLogin,
} = require('../../controllers/user.controllers')

const updateUserProfileResolver = async (_, { input }, ctx) => {
  return updateUserProfile(ctx.user, input)
}

const submitQuestionnaireResolver = async (_, { input }, ctx) => {
  return submitQuestionnaire(ctx.user, input)
}

const filterUsersResolver = async (_, { params, options }, _ctx) => {
  try {
    return filterUsers(params, options)
  } catch (e) {
    logger.error(`search resolver error: ${e.message}`)
    throw new Error(e)
  }
}

const displayNameResolver = async user => {
  return getDisplayName(user)
}

const bioInteractiveLoginResolver = async (_, { authCode }, ctx) => {
  try {
    return bioInteractiveLogin(authCode)
  } catch (e) {
    logger.error(`bioInteractiveLoginResolver error: ${e.message}`)
    throw new Error(e)
  }
}

const profileDataResolver = async identity => {
  const { profileData } = identity

  return JSON.stringify(profileData)
}

module.exports = {
  Mutation: {
    updateUserProfile: updateUserProfileResolver,
    submitQuestionnaire: submitQuestionnaireResolver,
    bioInteractiveLogin: bioInteractiveLoginResolver,
  },
  Query: {
    filterUsers: filterUsersResolver,
  },
  User: {
    displayName: displayNameResolver,
  },
  Identity: {
    profileData: profileDataResolver,
  },
}
