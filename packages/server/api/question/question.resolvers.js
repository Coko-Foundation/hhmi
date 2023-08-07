const {
  getAuthor,
  getQuestion,
  getQuestionVersions,
  getLeadingContentForQuestion,
  getPublishedQuestions,
  getAuthorDashboard,
  getReviewerDashboard,
  getManagingEditorDashboard,
  getPublishedQuestionsIds,
  assignAuthorship,

  createQuestion,
  updateQuestion,
  duplicateQuestion,
  submitQuestion,
  rejectQuestion,
  moveQuestionVersionToReview,
  moveQuestionVersionToProduction,
  publishQuestionVersion,
  generateWordFile,
  generateScormZip,
  createNewQuestionVersion,

  uploadFiles,
  getImageUrls,
} = require('../../controllers/question.controllers')

const questionResolver = async (_, { id, options }) => {
  return getQuestion(id, options)
}

const getPublishedQuestionsResolver = async (_, { params, options }) => {
  return getPublishedQuestions(params, options)
}

const getPublishedQuestionsIdsResolver = async () => {
  return getPublishedQuestionsIds()
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

const createQuestionResolver = async (_, { input }, ctx) => {
  return createQuestion(ctx.user, input)
}

const duplicateQuestionResolver = async (_, { questionId }, ctx) => {
  return duplicateQuestion(ctx.user, questionId)
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

const moveQuestionVersionToProductionResolver = async (
  _,
  { questionVersionId },
) => {
  return moveQuestionVersionToProduction(questionVersionId)
}

const publishQuestionVersionResolver = async (_, { questionVersionId }) => {
  return publishQuestionVersion(questionVersionId)
}

const assignAuthorshipResolver = async (_, { questionId, userId }) => {
  return assignAuthorship(questionId, userId)
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

const contentResolver = async version => {
  const { content } = version
  if (content === null) return null

  const withImageUrls = await getImageUrls(content)
  return JSON.stringify(withImageUrls)
}

const generateWordFileResolver = async (_, { questionVersionId, options }) => {
  return generateWordFile(questionVersionId, options)
}

const generateScormZipResolver = async (_, { questionVersionId }) => {
  return generateScormZip(questionVersionId)
}

const createNewQuestionVersionResolver = async (_, { questionId }) => {
  return createNewQuestionVersion(questionId)
}

const uploadFilesResolver = async (_, { files }) => {
  return uploadFiles(files)
}

const authorResolver = async ({ id }) => {
  return getAuthor(id)
}

const leadingContentResolver = async version => {
  return getLeadingContentForQuestion(version)
}

module.exports = {
  Query: {
    question: questionResolver,
    getPublishedQuestions: getPublishedQuestionsResolver,
    getAuthorDashboard: getAuthorDashboardResolver,
    getReviewerDashboard: getReviewerDashboardResolver,
    getManagingEditorDashboard: getManagingEditorDashboardResolver,
    getPublishedQuestionsIds: getPublishedQuestionsIdsResolver,
  },
  Mutation: {
    createQuestion: createQuestionResolver,
    duplicateQuestion: duplicateQuestionResolver,
    updateQuestion: updateQuestionResolver,
    submitQuestion: submitQuestionResolver,
    rejectQuestion: rejectQuestionResolver,
    moveQuestionVersionToReview: moveQuestionVersionToReviewResolver,
    moveQuestionVersionToProduction: moveQuestionVersionToProductionResolver,
    publishQuestionVersion: publishQuestionVersionResolver,
    assignAuthorship: assignAuthorshipResolver,
    generateWordFile: generateWordFileResolver,
    generateScormZip: generateScormZipResolver,
    createNewQuestionVersion: createNewQuestionVersionResolver,
    uploadFiles: uploadFilesResolver,
  },
  Question: {
    versions: versionsResolver,
    author: authorResolver,
  },
  QuestionVersion: {
    question: versionQuestionResolver,
    content: contentResolver,
    leadingContent: leadingContentResolver,
  },
}
