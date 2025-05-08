const {
  rule,
  isAuthenticated,
  deny,
  allow,
} = require('@coko/server/authorization')

const isActive = rule()(async (_, __, ctx) => {
  if (!ctx.user) return false

  const UserModel = ctx.connectors.User.model
  const user = await UserModel.query().findById(ctx.user)
  return user.isActive
})

const isEditor = rule()(async (_, __, ctx) => {
  if (!ctx.user) return false

  const UserModel = ctx.connectors.User.model
  const user = await UserModel.query().findById(ctx.user)
  return user.isActive && user.hasGlobalRole('editor')
})

const isProduction = rule()(async (_, __, ctx) => {
  if (!ctx.user) return false

  const UserModel = ctx.connectors.User.model
  const user = await UserModel.query().findById(ctx.user)
  return user.isActive && user.hasGlobalRole('production')
})

const isHandlingEditor = rule()(async (_, __, ctx) => {
  if (!ctx.user) return false

  const UserModel = ctx.connectors.User.model
  const user = await UserModel.query().findById(ctx.user)
  return user.isActive && user.hasGlobalRole('handlingEditor')
})

const isReviewer = rule()(async (_, __, ctx) => {
  if (!ctx.user) return false

  const UserModel = ctx.connectors.User.model
  const user = await UserModel.query().findById(ctx.user)
  return user.isActive && user.hasGlobalRole('reviewer')
})

const isAdmin = rule()(async (_, __, ctx) => {
  if (!ctx.user) return false

  const UserModel = ctx.connectors.User.model
  const user = await UserModel.query().findById(ctx.user)
  return user.isActive && user.hasGlobalRole('admin')
})

const isAuthor = rule()(async (_, { questionId }, ctx) => {
  if (!ctx.user) return false

  const UserModel = ctx.connectors.User.model
  const user = await UserModel.query().findById(ctx.user)

  if (!user.isActive) return false

  return isQuestionAuthor(ctx.connectors.Team.model, ctx.user, questionId)
})

const isQuestionAuthor = async (teamModel, user, questionId) => {
  const questionAuthor = await teamModel
    .query()
    .leftJoin('team_members', 'team_members.team_id', 'teams.id')
    .select('teams.role')
    .findOne({
      'teams.object_id': questionId,
      'team_members.user_id': user,
      'teams.role': 'author',
    })

  return !!questionAuthor
}

const canUpdateQuestion = rule()(
  async (_, { questionId, questionVersionId }, ctx) => {
    // must be logged in
    if (!ctx.user) return false

    const UserModel = ctx.connectors.User.model
    const user = await UserModel.query().findById(ctx.user)
    // must be active
    if (!user.isActive) return false

    const QuestionModel = ctx.connectors.Question.model

    const question = await QuestionModel.query()
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
      return isQuestionAuthor(ctx.connectors.Team.model, ctx.user, questionId)
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
  if (!ctx.user) return false
  if (!ctx.user) return false

  const UserModel = ctx.connectors.User.model
  const user = await UserModel.query().findById(ctx.user)

  return (
    user.isActive &&
    ((await user.hasGlobalRole('editor')) ||
      user.hasGlobalRole('handlingEditor'))
  )
})

// editors or handling editors (aslo reviewers?) can move to production
const canMoveToProduction = rule()(async (_, __, ctx) => {
  if (!ctx.user) return false
  if (!ctx.user) return false

  const UserModel = ctx.connectors.User.model
  const user = await UserModel.query().findById(ctx.user)

  return (
    user.isActive &&
    ((await user.hasGlobalRole('editor')) ||
      user.hasGlobalRole('handlingEditor'))
  )
})

// editors, handling editors, and admins (also production team?) can publish
const canPublish = rule()(async (_, __, ctx) => {
  if (!ctx.user) return false
  if (!ctx.user) return false

  const UserModel = ctx.connectors.User.model
  const user = await UserModel.query().findById(ctx.user)

  return (
    user.isActive &&
    ((await user.hasGlobalRole('editor')) ||
      (await user.hasGlobalRole('handlingEditor')) ||
      user.hasGlobalRole('admin'))
  )
})

// only editors and admins can create new question verions
const canCreateNewVersion = rule()(async (_, __, ctx) => {
  if (!ctx.user) return false

  const UserModel = ctx.connectors.User.model
  const user = await UserModel.query().findById(ctx.user)

  return (
    user.isActive &&
    ((await user.hasGlobalRole('editor')) || user.hasGlobalRole('admin'))
  )
})

// editors and handlingEditors can accept questions
const canAcceptQuestion = rule()(async (_, { questionVersionId }, ctx) => {
  if (!ctx.user) return false

  const UserModel = ctx.connectors.User.model
  const user = await UserModel.query().findById(ctx.user)

  const QuestionVersionModel = ctx.connectors.QuestionVersion.model

  const questionVersion = await QuestionVersionModel.query().findById(
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
    if (!ctx.user) return false

    const UserModel = ctx.connectors.User.model
    const user = await UserModel.query().findById(ctx.user)

    if (!user.isActive) return false

    const QuestionVersionModel = ctx.connectors.QuestionVersion.model

    const questionVersion = await QuestionVersionModel.query().findById(
      questionVersionId,
    )

    return (
      isQuestionAuthor(ctx.connectors.Team.model, ctx.user, questionId) &&
      !questionVersion.accepted
    )
  },
)

// editors and handlingEditors can reject questions
const canRejectQuestion = rule()(async (_, __, ctx) => {
  if (!ctx.user) return false

  const UserModel = ctx.connectors.User.model
  const user = await UserModel.query().findById(ctx.user)

  return (
    user.isActive &&
    ((await user.hasGlobalRole('editor')) ||
      user.hasGlobalRole('handlingEditor'))
  )
})

const canUnpublishQuestion = rule()(async (_, __, ctx) => {
  if (!ctx.user) return false

  const UserModel = ctx.connectors.User.model
  const user = await UserModel.query().findById(ctx.user)

  return (
    user.isActive &&
    ((await user.hasGlobalRole('editor')) || user.hasGlobalRole('admin'))
  )
})

const canAssignAuthor = rule()(async (_, { questionId }, ctx) => {
  if (!ctx.user) return false

  const UserModel = ctx.connectors.User.model
  const user = await UserModel.query().findById(ctx.user)
  const userIsAdmin = await user.hasGlobalRole('admin')

  const QuestionModel = ctx.connectors.Question.model
  const question = await QuestionModel.query().findById(questionId)

  const adminOrEditorAndDeletedAuthor =
    !!question.deletedAuthorName &&
    (userIsAdmin || (await user.hasGlobalRole('editor')))

  return user.isActive && (userIsAdmin || adminOrEditorAndDeletedAuthor)
})

const canArchiveQuestions = rule()(async (_, { questionIds }, ctx) => {
  if (!ctx.user) return false

  const UserModel = ctx.connectors.User.model
  const user = await UserModel.query().findById(ctx.user)

  if (
    user.isActive &&
    (user.hasGlobalRole('editor') || user.hasGlobalRole('handlingEditor'))
  ) {
    return true
  }

  const result = await Promise.all(
    questionIds.map(qId =>
      isQuestionAuthor(ctx.connectors.Team.model, ctx.user, qId),
    ),
  )

  return result.every(r => r)
})

const isAdminOrEditor = rule()(async (_, __, ctx) => {
  if (!ctx.user) return false

  const UserModel = ctx.connectors.User.model
  const user = await UserModel.query().findById(ctx.user)
  const userIsAdmin = await user.hasGlobalRole('admin')

  return userIsAdmin || user.hasGlobalRole('editor')
})

const isAdminOrEditorOrHE = rule()(async (_, __, ctx) => {
  if (!ctx.user) return false

  const UserModel = ctx.connectors.User.model
  const user = await UserModel.query().findById(ctx.user)
  const userIsAdmin = await user.hasGlobalRole('admin')
  const userIsEditor = await user.hasGlobalRole('editor')
  const userIsHE = await user.hasGlobalRole('handlingEditor')

  return userIsAdmin || userIsEditor || userIsHE
})

const canUpdateProfile = rule()(async (_, { input: { id } }, ctx) => {
  if (!ctx.user) return false

  const UserModel = ctx.connectors.User.model
  const user = await UserModel.query().findById(ctx.user)

  return user.isActive && id === ctx.user
})

const canDeleteOrDeactivateUsers = rule()(async (_, { ids }, ctx) => {
  if (!ctx.user) return false

  const UserModel = ctx.connectors.User.model
  const user = await UserModel.query().findById(ctx.user)
  return (
    user.isActive && user.hasGlobalRole('admin') && ids.indexOf(ctx.user) === -1
  )
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
    resendVerificationEmailFromLogin: allow,
    resendVerificationEmailAfterLogin: isAuthenticated,
    resetPassword: allow,
    // Users
    submitQuestionnaire: canUpdateProfile,
    updateUserProfile: canUpdateProfile,
    updatePassword: canUpdateProfile,
    deleteUsers: canDeleteOrDeactivateUsers,
    deactivateUsers: canDeleteOrDeactivateUsers,
    deleteUsersRelatedItems: canDeleteOrDeactivateUsers,
    activateUsers: isAdmin,
    sendPasswordResetEmail: allow,

    // Teams
    addTeamMember: isActive,
    updateTeamMembership: isActive,
    updateGlobalTeams: isAdmin,

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
    editComplexItemSet: isActive,
    deleteComplexItemSet: isActive,
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
    submitReview: isReviewer,
    // Chats
    sendMessage: isActive,
    editMessage: isActive,
    deleteMessage: isActive,
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
    getResources: allow,
    // Lists
    myLists: isActive,
    list: isActive,
    // Users
    currentUser: isActive,
    filterUsers: isAdminOrEditor,
    user: isAdmin,
    // Teams
    getGlobalTeams: isAdmin,
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
    chatThread: isActive,
    chatThreads: isActive,
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
