/* eslint-disable global-require */
const {
  rule,
  isAuthenticated,
  deny,
  allow,
} = require('@coko/server/authorization')

const isActive = rule()(async (_, __, ctx) => {
  if (!ctx.userId) return false

  const { User } = require('@coko/server')
  const user = await User.query().findById(ctx.userId)
  return user.isActive
})

const isEditor = rule()(async (_, __, ctx) => {
  if (!ctx.userId) return false

  const { User } = require('@coko/server')
  const user = await User.query().findById(ctx.userId)
  return user.isActive && user.hasGlobalRole('editor')
})

const isProduction = rule()(async (_, __, ctx) => {
  if (!ctx.userId) return false

  const { User } = require('@coko/server')
  const user = await User.query().findById(ctx.userId)
  return user.isActive && user.hasGlobalRole('production')
})

const isHandlingEditor = rule()(async (_, __, ctx) => {
  if (!ctx.userId) return false

  const { User } = require('@coko/server')
  const user = await User.query().findById(ctx.userId)
  return user.isActive && user.hasGlobalRole('handlingEditor')
})

const isReviewer = rule()(async (_, __, ctx) => {
  if (!ctx.userId) return false

  const { User } = require('@coko/server')
  const user = await User.query().findById(ctx.userId)
  return user.isActive && user.hasGlobalRole('reviewer')
})

const canSubmitReview = rule()(async (_, __, ctx) => {
  if (!ctx.userId) return false

  const { User } = require('@coko/server')
  const user = await User.query().findById(ctx.userId)

  const isUserReviewer = await user.hasGlobalRole('reviewer')
  const isUserEditor = await user.hasGlobalRole('editor')
  const isUserHE = await user.hasGlobalRole('handlingEditor')
  const isUserAdmin = await user.hasGlobalRole('admin')

  return (
    user.isActive && (isUserReviewer || isUserEditor || isUserHE || isUserAdmin)
  )
})

const isAdmin = rule()(async (_, __, ctx) => {
  if (!ctx.userId) return false

  const { User } = require('@coko/server')
  const user = await User.query().findById(ctx.userId)
  return user.isActive && user.hasGlobalRole('admin')
})

const isAuthor = rule()(async (_, { questionId }, ctx) => {
  if (!ctx.userId) return false

  const { User, Team } = require('@coko/server')
  const user = await User.query().findById(ctx.userId)

  if (!user.isActive) return false

  return isObjectAuthor(Team, ctx.userId, questionId)
})

const isObjectAuthor = async (teamModel, user, objectId) => {
  const questionAuthor = await teamModel
    .query()
    .leftJoin('team_members', 'team_members.team_id', 'teams.id')
    .select('teams.role')
    .findOne({
      'teams.object_id': objectId,
      'team_members.user_id': user,
      'teams.role': 'author',
    })

  return !!questionAuthor
}

const canUpdateQuestion = rule()(
  async (_, { questionId, questionVersionId }, ctx) => {
    // must be logged in
    if (!ctx.userId) return false

    const { User, Team } = require('@coko/server')
    const { Question } = require('../models')

    const user = await User.query().findById(ctx.userId)
    // must be active
    if (!user.isActive) return false

    const question = await Question.query()
      .leftJoin(
        'question_versions',
        'questions.id',
        'question_versions.question_id',
      )
      .select(
        'questions.id',
        'questions.rejected',
        'question_versions.submitted',
        'question_versions.editing',
        'question_versions.accepted',
        'question_versions.under_review',
        'question_versions.in_production',
        'question_versions.published',
        'question_versions.unpublished',
      )
      .findOne({
        'questions.id': questionId,
        'question_versions.id': questionVersionId,
      })

    if (question.rejected) return false

    if (!question.submitted || question.editing) {
      // needs to be the author
      return isObjectAuthor(Team, ctx.userId, questionId)
    }

    if (question.accepted) {
      // only editors, handling editors, production team members or admins can edit
      const isUserEditor = await user.hasGlobalRole('editor')
      const isUserHE = await user.hasGlobalRole('handlingEditor')
      const isUserAdmin = await user.hasGlobalRole('admin')
      return isUserEditor || isUserAdmin || isUserHE
    }

    // the only other editable state is 'inProduction'
    if (question.inProduction) {
      // only editors, handling editors, production team members or admins can edit
      const isUserEditor = await user.hasGlobalRole('editor')
      const isUserHE = await user.hasGlobalRole('handlingEditor')
      const isUserAdmin = await user.hasGlobalRole('admin')
      const isFromProductionTeam = await user.hasGlobalRole('production')
      return isUserEditor || isUserAdmin || isFromProductionTeam || isUserHE
    }

    // if just submitted, under review or published
    return false
  },
)

// editors or handling editors can move to review
const canMoveToReview = rule()(async (_, __, ctx) => {
  if (!ctx.userId) return false

  const { User } = require('@coko/server')
  const user = await User.query().findById(ctx.userId)

  return (
    user.isActive &&
    ((await user.hasGlobalRole('editor')) ||
      user.hasGlobalRole('handlingEditor'))
  )
})

// editors or handling editors (aslo reviewers?) can move to production
const canMoveToProduction = rule()(async (_, __, ctx) => {
  if (!ctx.userId) return false

  const { User } = require('@coko/server')
  const user = await User.query().findById(ctx.userId)

  return (
    user.isActive &&
    ((await user.hasGlobalRole('editor')) ||
      user.hasGlobalRole('handlingEditor'))
  )
})

// editors, handling editors, and admins (also production team?) can publish
const canPublish = rule()(async (_, __, ctx) => {
  if (!ctx.userId) return false

  const { User } = require('@coko/server')
  const user = await User.query().findById(ctx.userId)

  return (
    user.isActive &&
    ((await user.hasGlobalRole('editor')) ||
      (await user.hasGlobalRole('handlingEditor')) ||
      user.hasGlobalRole('admin'))
  )
})

// only editors and admins can create new question verions
const canCreateNewVersion = rule()(async (_, __, ctx) => {
  if (!ctx.userId) return false

  const { User } = require('@coko/server')
  const user = await User.query().findById(ctx.userId)

  return (
    user.isActive &&
    ((await user.hasGlobalRole('editor')) || user.hasGlobalRole('admin'))
  )
})

// editors and handlingEditors can accept questions
const canAcceptQuestion = rule()(async (_, { questionVersionId }, ctx) => {
  if (!ctx.userId) return false

  const { User } = require('@coko/server')
  const { QuestionVersion } = require('../models')
  const user = await User.query().findById(ctx.userId)

  const questionVersion = await QuestionVersion.query().findById(
    questionVersionId,
  )

  return (
    user.isActive &&
    !questionVersion.editing &&
    ((await user.hasGlobalRole('editor')) ||
      user.hasGlobalRole('handlingEditor'))
  )
})

const canEditQuestion = rule()(
  async (_, { questionId, questionVersionId }, ctx) => {
    if (!ctx.userId) return false

    const { User, Team } = require('@coko/server')
    const { QuestionVersion } = require('../models')
    const user = await User.query().findById(ctx.userId)

    if (!user.isActive) return false

    const questionVersion = await QuestionVersion.query().findById(
      questionVersionId,
    )

    return (
      isObjectAuthor(Team, ctx.userId, questionId) && !questionVersion.accepted
    )
  },
)

// editors and handlingEditors can reject questions
const canRejectQuestion = rule()(async (_, __, ctx) => {
  if (!ctx.userId) return false

  const { User } = require('@coko/server')
  const user = await User.query().findById(ctx.userId)

  return (
    user.isActive &&
    ((await user.hasGlobalRole('editor')) ||
      user.hasGlobalRole('handlingEditor'))
  )
})

const canUnpublishQuestion = rule()(async (_, __, ctx) => {
  if (!ctx.userId) return false

  const { User } = require('@coko/server')
  const user = await User.query().findById(ctx.userId)

  return (
    user.isActive &&
    ((await user.hasGlobalRole('editor')) || user.hasGlobalRole('admin'))
  )
})

const canAssignAuthor = rule()(async (_, { questionId }, ctx) => {
  if (!ctx.userId) return false

  const { User /* Team */ } = require('@coko/server')
  const { Question } = require('../models')
  const user = await User.query().findById(ctx.userId)
  const userIsAdmin = await user.hasGlobalRole('admin')

  const question = await Question.query().findById(questionId)

  // const adminAndAuthor =
  //   userIsAdmin && (await isQuestionAuthor(Team, ctx.userId, questionId))
  const adminOrEditorAndDeletedAuthor =
    !!question.deletedAuthorName &&
    (userIsAdmin || (await user.hasGlobalRole('editor')))

  return user.isActive && (userIsAdmin || adminOrEditorAndDeletedAuthor)
})

const canArchiveQuestions = rule()(async (_, { questionIds }, ctx) => {
  if (!ctx.userId) return false

  const { User, Team } = require('@coko/server')
  const user = await User.query().findById(ctx.userId)

  if (
    user.isActive &&
    (user.hasGlobalRole('editor') || user.hasGlobalRole('handlingEditor'))
  ) {
    return true
  }

  const result = await Promise.all(
    questionIds.map(qId => isObjectAuthor(Team, ctx.userId, qId)),
  )

  return result.every(r => r)
})

const isAdminOrEditor = rule()(async (_, __, ctx) => {
  if (!ctx.userId) return false

  const { User } = require('@coko/server')
  const user = await User.query().findById(ctx.userId)
  const userIsAdmin = await user.hasGlobalRole('admin')

  return userIsAdmin || user.hasGlobalRole('editor')
})

const isAdminOrEditorOrHE = rule()(async (_, __, ctx) => {
  if (!ctx.userId) return false

  const { User } = require('@coko/server')
  const user = await User.query().findById(ctx.userId)
  const userIsAdmin = await user.hasGlobalRole('admin')
  const userIsEditor = await user.hasGlobalRole('editor')
  const userIsHE = await user.hasGlobalRole('handlingEditor')

  return userIsAdmin || userIsEditor || userIsHE
})

const canUpdateProfile = rule()(async (_, { input: { id } }, ctx) => {
  if (!ctx.userId) return false

  const { User } = require('@coko/server')
  const user = await User.query().findById(ctx.userId)

  return user.isActive && id === ctx.userId
})

const canDeleteOrDeactivateUsers = rule()(async (_, { ids }, ctx) => {
  if (!ctx.userId) return false

  const { User } = require('@coko/server')
  const user = await User.query().findById(ctx.userId)
  return (
    user.isActive &&
    user.hasGlobalRole('admin') &&
    ids.indexOf(ctx.userId) === -1
  )
})

const canEditSet = rule()(async (_, { id }, ctx) => {
  if (!ctx.userId) return false

  const { User, Team } = require('@coko/server')
  const { Question } = require('../models')
  const user = await User.query().findById(ctx.userId)
  const userIsEditor = await user.hasGlobalRole('editor')

  if (user.isActive && userIsEditor) {
    return true
  }

  // if not admin or editor, check if user is the author and set doesn't contains accepted or published items
  const setAuthor = await isObjectAuthor(Team, ctx.userId, id)

  if (!setAuthor) {
    return false
  }

  const questions = await Question.query()
    .leftJoin(
      'question_versions',
      'questions.id',
      'question_versions.question_id',
    )
    .select(
      'questions.*',
      'question_versions.accepted',
      'question_versions.published',
      'question_versions.complex_item_set_id',
    )
    .distinctOn('questions.id')
    .where({
      complex_item_set_id: id,
    })
    .orderBy([
      'questions.id',
      { column: 'question_versions.created', order: 'desc' },
    ])

  const containsAccepted = questions.some(q => q.accepted || q.published)

  return !containsAccepted
})

const permissions = {
  Mutation: {
    '*': deny,
    // Authentication
    bioInteractiveLogin: allow,
    login: allow,
    signUp: allow,
    verifyEmail: allow,
    resendVerificationEmail: allow,
    resendVerificationEmailAfterLogin: isAuthenticated,
    resetPassword: allow,
    // Users
    submitQuestionnaire: canUpdateProfile,
    updateUserProfile: canUpdateProfile,
    updatePassword: canUpdateProfile,
    deleteUsers: canDeleteOrDeactivateUsers,
    deactivateUsers: canDeleteOrDeactivateUsers,
    downloadUsersData: isAdmin,
    deleteUsersRelatedItems: canDeleteOrDeactivateUsers,
    activateUsers: isAdmin,
    sendPasswordResetEmail: allow,

    // Teams
    updateTeamMembership: isAdmin,

    // Questions
    createQuestion: isActive,
    updateQuestion: canUpdateQuestion,
    submitQuestion: isAuthor,
    acceptQuestion: canAcceptQuestion,
    editQuestion: canEditQuestion,
    rejectQuestion: canRejectQuestion,
    moveQuestionVersionToReview: canMoveToReview,
    moveQuestionVersionToProduction: canMoveToProduction,
    publishQuestionVersion: canPublish,
    unpublishQuestionVersion: canUnpublishQuestion,
    createNewQuestionVersion: canCreateNewVersion,
    assignAuthorship: canAssignAuthor,
    changeArchiveStatusForItems: canArchiveQuestions,
    assignHandlingEditors: isAdminOrEditor,
    unassignHandlingEditor: isAdminOrEditor,
    updateReviewerPool: canMoveToReview,
    changeAmountOfReviewers: canMoveToReview,
    changeReviewerAutomationStatus: canMoveToReview,
    duplicateQuestion: isActive,
    reportIssue: isActive,
    uploadFiles: isActive,

    createChatThread: isActive,
    cancelEmailNotification: isActive,

    generateWordFile: isActive,
    generateQtiZip: isActive,

    // lists
    createList: isActive,
    editList: isActive,
    deleteLists: isActive,
    addToList: isActive,
    deleteFromList: isActive,
    exportQuestions: isActive,
    exportList: isActive,
    exportQuestionsQTI: isActive,
    exportListQTI: isActive,
    reorderList: isActive,
    // Sets
    createComplexItemSet: isActive,
    editComplexItemSet: canEditSet,
    deleteComplexItemSet: isAdmin,
    deleteComplexItemSets: isAdmin,
    assignSetAuthor: isAdmin,
    exportSets: isActive,
    exportSetQuestions: isActive,
    exportSetsQTI: isActive,
    exportSetQuestionsQTI: isActive,
    // Notifications
    markAs: isActive,
    // Reviews
    inviteReviewer: canMoveToReview, // editors and handling editors
    revokeInvitation: canMoveToReview, // editors and handling editors
    acceptOrRejectInvitation: isReviewer,
    submitReview: canSubmitReview,
    // Chats
    // sendChatMessage: isActive,
    // editMessage: isActive,
    // deleteMessage: isActive,
    // v4?
    sendChatMessage: isActive,
    editChatMessage: isActive,
    deleteChatMessage: isActive,
    // Metadata
    updateResource: isAdmin,
    deleteResource: isAdmin,
    addResource: isAdmin,
    disableCourseMetadata: isAdmin,
    enableCourseMetadata: isAdmin,
    editCourseMetadata: isAdmin,
    addCourseMetadata: isAdmin,
    reorderCourseMetadata: isAdmin,
  },
  Query: {
    '*': deny,
    getLoginConfig: allow,
    getMetadata: allow,
    getMetadataOld: allow,
    getMetadataOptimized: allow,
    getResources: allow,
    // Lists
    myLists: isActive,
    list: isActive,
    // Users
    currentUser: isActive,
    filterUsers: isAdminOrEditor,
    user: isAdmin,
    getCountriesForUserProfile: isActive,
    getStatesByCountryForUserProfile: isActive,
    // Teams
    teams: isAdmin,
    getNonTeamMemberUsers: isAdmin,
    filterGlobalTeamMembers: isActive,
    searchForReviewers: isAdminOrEditorOrHE,
    // Questions:
    question: isActive,
    getAuthorDashboard: isActive,
    getManagingEditorDashboard: isEditor,
    getHandlingEditorDashboard: isHandlingEditor,
    getReviewerDashboard: isReviewer,
    getInProductionDashboard: isProduction,
    getPublishedQuestions: isActive,
    getPublishedQuestionsIds: isActive,
    getQuestionsHandlingEditors: isAdminOrEditor,
    // chats
    chatChannel: isActive,
    chatChannels: isActive,
    getAuthorChatParticipants: isActive,
    getProductionChatParticipants: isActive,
    getReviewerChatParticipants: isActive,
    // Sets
    complexItemSets: isActive,
    complexItemSet: isActive,
    getAvailableSets: isActive,
    // Files
    file: isActive,
    // Notifications
    getUnreadNotificationsCount: isActive,
    userNotifications: isActive,
  },
}

module.exports = permissions
