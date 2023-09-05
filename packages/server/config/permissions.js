const { rule, isAuthenticated } = require('@coko/server/authorization')

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

const isHandlingEditor = rule()(async (_, __, ctx) => {
  if (!ctx.user) return false

  const UserModel = ctx.connectors.User.model
  const user = await UserModel.query().findById(ctx.user)
  return user.isActive && user.hasGlobalRole('handlingEditor')
})

const isAdmin = rule()(async (_, __, ctx) => {
  if (!ctx.user) return false

  const UserModel = ctx.connectors.User.model
  const user = await UserModel.query().findById(ctx.user)
  return user.isActive && user.hasGlobalRole('admin')
})

const isAdminAndAuthor = rule()(async (_, { questionId }, ctx) => {
  if (!ctx.user) return false

  const UserModel = ctx.connectors.User.model
  const user = await UserModel.query().findById(ctx.user)
  const userIsAdmin = await user.hasGlobalRole('admin')
  return (
    user.isActive &&
    userIsAdmin &&
    isQuestionAuthor(ctx.connectors.Team.model, ctx.user, questionId)
  )
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
        'question_versions.under_review',
        'question_versions.in_production',
        'question_versions.published',
      )
      .findOne({
        'questions.id': questionId,
        'question_versions.id': questionVersionId,
      })

    if (question.rejected) return false

    if (!question.submitted) {
      // needs to be the author
      return isQuestionAuthor(ctx.connectors.Team.model, ctx.user, questionId)
    }

    // the only other editable state is 'inProduction'
    if (question.inProduction) {
      // only editors, handling editors or admins can edit
      return (
        (await user.hasGlobalRole('editor')) ||
        (await user.hasGlobalRole('handlingEditor')) ||
        user.hasGlobalRole('admin')
      )
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

const permissions = {
  Mutation: {
    // Authentication
    resendVerificationEmailAfterLogin: isAuthenticated,
    // Users
    submitQuestionnaire: isActive,
    updateUserProfile: isActive,
    updatePassword:
      isActive &&
      rule()(async (_, { input: { id } }, { user }) => {
        // only if id from arguments is same as current user's id
        return id === user
      }),
    deleteUsers:
      isAdmin &&
      rule()(async (_, args, ctx) => {
        // allow only if current user is not in the list of ids to delete
        return args.ids.indexOf(ctx.user) === -1
      }),
    deactivateUsers:
      isAdmin &&
      rule()(async (_, args, ctx) => {
        // allow only if current user is not in the list of ids to deactivate
        return args.ids.indexOf(ctx.user) === -1
      }),
    activateUsers: isAdmin,

    // Teams
    addTeamMember: isActive,
    updateTeamMembership: isActive,
    updateGlobalTeams: isAdmin,

    // Questions
    createQuestion: isActive,
    updateQuestion: canUpdateQuestion,
    submitQuestion: isAuthor,
    rejectQuestion: isEditor,
    moveQuestionVersionToReview: canMoveToReview,
    moveQuestionVersionToProduction: canMoveToProduction,
    publishQuestionVersion: canPublish,
    createNewQuestionVersion: canCreateNewVersion,
    assignAuthorship: isAdminAndAuthor,
  },
  Query: {
    // Users
    filterUsers: isAdmin,
    // Teams
    getGlobalTeams: isAdmin,
    getNonTeamMemberUsers: isAdmin,
    // Questions:
    getAuthorDashboard: isActive,
    getManagingEditorDashboard: isEditor,
    getHandlingEditorDashboard: isHandlingEditor,
    getInProductionDashboard: isActive,
  },
}

module.exports = permissions
