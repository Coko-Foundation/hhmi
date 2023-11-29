const { submitReview } = require('../../controllers/review.controller')

const submitReviewResolver = async (_, { questionVersionId, content }, ctx) => {
  return submitReview(questionVersionId, content, ctx.user)
}

module.exports = {
  Mutation: {
    submitReview: submitReviewResolver,
  },
}
