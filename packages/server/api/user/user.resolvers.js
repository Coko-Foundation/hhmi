const { logger } = require('@coko/server')

const {
  updateUserProfile,
  submitQuestionnaire,
  filterUsers,
  getDisplayName,
  bioInteractiveLogin,
  deleteUsersRelatedItems,
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

const deleteUsersRelatedItemsResolver = async (_, { ids }) => {
  return deleteUsersRelatedItems(ids)
}

module.exports = {
  Mutation: {
    updateUserProfile: updateUserProfileResolver,
    submitQuestionnaire: submitQuestionnaireResolver,
    bioInteractiveLogin: bioInteractiveLoginResolver,
    deleteUsersRelatedItems: deleteUsersRelatedItemsResolver,
  },
  Query: {
    filterUsers: filterUsersResolver,
  },
  User: {
    displayName: displayNameResolver,
  },
}
