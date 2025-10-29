const {
  getAttachments,
  submitReview,
} = require('../../controllers/review.controller')

const submitReviewResolver = async (_, { input }, ctx) => {
  const { questionVersionId, content, attachments, reviewerId } = input
  return submitReview(
    questionVersionId,
    content,
    reviewerId || ctx.userId,
    attachments,
  )
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
