const { submitReview } = require('../../controllers/review.controller')

const submitReviewResolver = async (_, { input }, ctx) => {
  return submitReview(ctx.user, input)
}

module.exports = {
  Mutation: {
    submitReview: submitReviewResolver,
  },
}
