const {
  getAttachments,
  submitReview,
} = require('../../controllers/review.controller')

const submitReviewResolver = async (_, { input }, ctx) => {
  const { questionVersionId, content, attachments } = input
  return submitReview(questionVersionId, content, ctx.userId, attachments)
}

const attachmentsResolver = async ({ id }) => {
  return getAttachments(id)
}

module.exports = {
  Mutation: {
    submitReview: submitReviewResolver,
  },
  Review: {
    attachments: attachmentsResolver,
  },
}
