const {
  getQuestion,
  getQuestionVersions,
  getPublishedQuestions,
  getAuthorDashboard,
  getReviewerDashboard,
  getManagingEditorDashboard,

  createQuestion,
  updateQuestion,
  submitQuestion,
  rejectQuestion,
  moveQuestionVersionToReview,
  publishQuestionVersion,
} = require('../../controllers/question.controllers')

const questionResolver = async (_, { id }) => {
  return getQuestion(id)
}

const getPublishedQuestionsResolver = async (_, { params, options }) => {
  return getPublishedQuestions(params, options)
}

const getAuthorDashboardResolver = async (_, args, ctx) => {
  return getAuthorDashboard(ctx.user, args)
}

const getReviewerDashboardResolver = async (_, args, ctx) => {
  return getReviewerDashboard(ctx.user, args)
}

const getManagingEditorDashboardResolver = async (_, args, ctx) => {
  return getManagingEditorDashboard(ctx.user, args)
}

const createQuestionResolver = async (_, __, ctx) => {
  return createQuestion(ctx.user)
}

const updateQuestionResolver = async (
  _,
  { questionId, questionVersionId, input },
  ctx,
) => {
  return updateQuestion(questionId, questionVersionId, input)
}

const submitQuestionResolver = async (
  _,
  { questionId, questionVersionId, input },
  ctx,
) => {
  return submitQuestion(questionId, questionVersionId, input)
}

const rejectQuestionResolver = async (_, { questionId }, ctx) => {
  return rejectQuestion(questionId)
}

const moveQuestionVersionToReviewResolver = async (
  _,
  { questionVersionId },
) => {
  return moveQuestionVersionToReview(questionVersionId)
}

const publishQuestionVersionResolver = async (_, { questionVersionId }) => {
  return publishQuestionVersion(questionVersionId)
}

const versionsResolver = async (
  question,
  { latestOnly, publishedOnly },
  ctx,
) => {
  // return ctx.loaders.Question.questionVersionsBasedOnQuestionIdsLoader.load(
  //   question.id,
  //   latestOnly,
  // )
  return getQuestionVersions(question.id, { latestOnly, publishedOnly })
}

const versionQuestionResolver = async version => {
  return getQuestion(version.questionId)
}

const contentResolver = version => {
  const { content } = version
  return content === null ? content : JSON.stringify(content)
}

module.exports = {
  Query: {
    question: questionResolver,
    getPublishedQuestions: getPublishedQuestionsResolver,
    getAuthorDashboard: getAuthorDashboardResolver,
    getReviewerDashboard: getReviewerDashboardResolver,
    getManagingEditorDashboard: getManagingEditorDashboardResolver,
  },
  Mutation: {
    createQuestion: createQuestionResolver,
    updateQuestion: updateQuestionResolver,
    submitQuestion: submitQuestionResolver,
    rejectQuestion: rejectQuestionResolver,
    moveQuestionVersionToReview: moveQuestionVersionToReviewResolver,
    publishQuestionVersion: publishQuestionVersionResolver,
  },
  Question: {
    versions: versionsResolver,
  },
  QuestionVersion: {
    question: versionQuestionResolver,
    content: contentResolver,
  },
}
