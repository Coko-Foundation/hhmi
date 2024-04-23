const { pubsubManager } = require('@coko/server')
const { actions } = require('../../controllers/constants')

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
  unpublishQuestionVersion,
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
  getReviewerChatParticipants,

  updateReviewerPool,
  changeAmountOfReviewers,
  changeReviewerAutomationStatus,
  reviewerStatus,
  questionVersionReviews,
  reviewerPool,
  changeArchiveStatusForItems,
  isItemArchivedForUser,
} = require('../../controllers/question.controllers')

const { getPubsub } = pubsubManager

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

const unpublishQuestionVersionResolver = async (_, { questionVersionId }) => {
  return unpublishQuestionVersion(questionVersionId)
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

const reviewerChatThreadIdResolver = async question => {
  return getChatThreadForQuestion(question.id, 'reviewerChat')
}

const heAssignedResolver = async question => {
  const assignedHEs = await getQuestionsHandlingEditors(question.id)
  return assignedHEs.length > 0
}

const isArchivedResolver = async (question, _, ctx) => {
  return isItemArchivedForUser(question.id, ctx.user)
}

const getAuthorChatParticipantsResolver = async (_, { id }) => {
  return getAuthorChatParticipants(id)
}

const getProductionChatParticipantsResolver = async (_, { id }) => {
  return getProductionChatParticipants(id)
}

const getReviewerChatParticipantsResolver = async (_, { id }) => {
  return getReviewerChatParticipants(id)
}

const updateReviewerPoolResolver = async (
  _,
  { questionVersionId, reviewerIds },
) => {
  return updateReviewerPool(questionVersionId, reviewerIds)
}

const changeAmountOfReviewersResolver = async (
  _,
  { questionVersionId, amount },
) => {
  return changeAmountOfReviewers(questionVersionId, amount)
}

const changeReviewerAutomationStatusResolver = async (
  _,
  { questionVersionId, value },
) => {
  return changeReviewerAutomationStatus(questionVersionId, value)
}

const reviewerStatusResolver = async (questionVersion, _, ctx) => {
  return reviewerStatus(questionVersion.id, ctx.user)
}

const questionVersionReviewsResolver = async (
  questionVersion,
  { currentUserOnly },
  ctx,
) => {
  return questionVersionReviews(questionVersion.id, currentUserOnly, ctx.user)
}

const reviewerPoolResolver = async questionVersion => {
  return reviewerPool(questionVersion)
}

const changeArchiveStatusForItemsResolver = async (
  _,
  { questionIds, isArchiving, role },
  ctx,
) => {
  return changeArchiveStatusForItems(questionIds, isArchiving, role, ctx.user)
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
    getReviewerChatParticipants: getReviewerChatParticipantsResolver,
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
    unpublishQuestionVersion: unpublishQuestionVersionResolver,
    createNewQuestionVersion: createNewQuestionVersionResolver,
    assignAuthorship: assignAuthorshipResolver,
    generateWordFile: generateWordFileResolver,
    generateScormZip: generateScormZipResolver,
    generateQtiZip: generateQtiZipResolver,
    uploadFiles: uploadFilesResolver,
    assignHandlingEditors: assignHandlingEditorsResolver,
    unassignHandlingEditor: unassignHandlingEditorResolver,
    updateReviewerPool: updateReviewerPoolResolver,
    changeAmountOfReviewers: changeAmountOfReviewersResolver,
    changeReviewerAutomationStatus: changeReviewerAutomationStatusResolver,
    changeArchiveStatusForItems: changeArchiveStatusForItemsResolver,
  },
  Subscription: {
    dashboardUpdate: {
      resolve: dashboardId => {
        return dashboardId
      },
      subscribe: async (_payload, _vars, ctx) => {
        const pubsub = await getPubsub()

        return pubsub.asyncIterator(`${actions.DASHBOARD_UPDATED}.${ctx.user}`)
      },
    },
  },
  Question: {
    versions: versionsResolver,
    author: authorResolver,
    authorChatThreadId: authorChatThreadResolver,
    productionChatThreadId: productionChatThreadResolver,
    reviewerChatThreadId: reviewerChatThreadIdResolver,
    heAssigned: heAssignedResolver,
    isArchived: isArchivedResolver,
  },
  QuestionVersion: {
    question: versionQuestionResolver,
    content: contentResolver,
    leadingContent: leadingContentResolver,
    reviewerStatus: reviewerStatusResolver,
    reviews: questionVersionReviewsResolver,
    reviewerPool: reviewerPoolResolver,
  },
}
