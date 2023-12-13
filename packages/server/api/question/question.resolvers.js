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
  getAuthorChatParticipants,
  assignAuthorship,
  getHandlingEditorDashboard,
  getInProductionDashboard,

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
  generateQtiZip,
  createNewQuestionVersion,

  assignHandlingEditors,
  unassignHandlingEditor,
  getQuestionsHandlingEditors,
  getChatThreadForQuestion,

  uploadFiles,
  getImageUrls,
  getProductionChatParticipants,
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

const getInProductionDashboardResolver = async (_, args, ctx) => {
  return getInProductionDashboard(ctx.user, args)
}

const createQuestionResolver = async (_, { input }, ctx) => {
  return createQuestion(ctx.user, input)
}

const getHandlingEditorDashboardResolver = async (_, args, ctx) => {
  return getHandlingEditorDashboard(ctx.user, args)
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
  return getQuestionVersions(question.id, {
    latestOnly,
    publishedOnly,
  })
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

const generateQtiZipResolver = async (_, { questionVersionId }) => {
  return generateQtiZip(questionVersionId)
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

const assignHandlingEditorsResolver = async (_, { questionIds, userIds }) => {
  return assignHandlingEditors(questionIds, userIds)
}

const getQuestionsHandlingEditorsResolver = async (_, { questionId }) => {
  return getQuestionsHandlingEditors(questionId)
}

const unassignHandlingEditorResolver = async (_, { questionId, userId }) => {
  return unassignHandlingEditor(questionId, userId)
}

const authorChatThreadResolver = async question => {
  return getChatThreadForQuestion(question.id, 'authorChat')
}

const productionChatThreadResolver = async question => {
  return getChatThreadForQuestion(question.id, 'productionChat')
}

const heAssignedResolver = async question => {
  const assignedHEs = await getQuestionsHandlingEditors(question.id)
  return assignedHEs.length > 0
}

const getAuthorChatParticipantsResolver = async (_, { id }) => {
  return getAuthorChatParticipants(id)
}

const getProductionChatParticipantsResolver = async (_, { id }) => {
  return getProductionChatParticipants(id)
}

module.exports = {
  Query: {
    question: questionResolver,
    getPublishedQuestions: getPublishedQuestionsResolver,
    getAuthorDashboard: getAuthorDashboardResolver,
    getReviewerDashboard: getReviewerDashboardResolver,
    getManagingEditorDashboard: getManagingEditorDashboardResolver,
    getPublishedQuestionsIds: getPublishedQuestionsIdsResolver,
    getHandlingEditorDashboard: getHandlingEditorDashboardResolver,
    getQuestionsHandlingEditors: getQuestionsHandlingEditorsResolver,
    getAuthorChatParticipants: getAuthorChatParticipantsResolver,
    getInProductionDashboard: getInProductionDashboardResolver,
    getProductionChatParticipants: getProductionChatParticipantsResolver,
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
    generateQtiZip: generateQtiZipResolver,
    createNewQuestionVersion: createNewQuestionVersionResolver,
    uploadFiles: uploadFilesResolver,
    assignHandlingEditors: assignHandlingEditorsResolver,
    unassignHandlingEditor: unassignHandlingEditorResolver,
  },
  Question: {
    versions: versionsResolver,
    author: authorResolver,
    authorChatThreadId: authorChatThreadResolver,
    productionChatThreadId: productionChatThreadResolver,
    heAssigned: heAssignedResolver,
  },
  QuestionVersion: {
    question: versionQuestionResolver,
    content: contentResolver,
    leadingContent: leadingContentResolver,
  },
}
