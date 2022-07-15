const { logger } = require('@coko/server')

const {
  updateUserProfile,
  submitQuestionnaire,
  filterUsers,
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

module.exports = {
  Mutation: {
    updateUserProfile: updateUserProfileResolver,
    submitQuestionnaire: submitQuestionnaireResolver,
  },
  Query: {
    filterUsers: filterUsersResolver,
  },
}
