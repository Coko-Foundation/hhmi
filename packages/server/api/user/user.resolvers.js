const {
  updateUserProfile,
  submitQuestionnaire,
} = require('../../controllers/user.controllers')

const updateUserProfileResolver = async (_, { input }, ctx) => {
  return updateUserProfile(ctx.user, input)
}

const submitQuestionnaireResolver = async (_, { input }, ctx) => {
  return submitQuestionnaire(ctx.user, input)
}

module.exports = {
  Mutation: {
    updateUserProfile: updateUserProfileResolver,
    submitQuestionnaire: submitQuestionnaireResolver,
  },
}
