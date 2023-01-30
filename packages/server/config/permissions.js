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
  const userIsEditor = await user.hasGlobalRole('editor')
  return user.isActive && userIsEditor
})

const isAdmin = rule()(async (_, __, ctx) => {
  if (!ctx.user) return false

  const UserModel = ctx.connectors.User.model
  const user = await UserModel.query().findById(ctx.user)
  const userIsAdmin = await user.hasGlobalRole('admin')
  return user.isActive && userIsAdmin
})

const isEditorOrAdmin = rule()(async (_, __, ctx) => {
  if (!ctx.user) return false

  const UserModel = ctx.connectors.User.model
  const user = await UserModel.query().findById(ctx.user)
  const userIsEditor = await user.hasGlobalRole('editor')
  const userIsAdmin = await user.hasGlobalRole('admin')
  return user.isActive && (userIsEditor || userIsAdmin)
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
      // only editors can edit
      const isUserEditor = await user.hasGlobalRole('editor')
      const isUserAdmin = await user.hasGlobalRole('admin')
      return isUserEditor || isUserAdmin
    }

    // if just submitted, under review or published
    return false
  },
)

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
    moveQuestionVersionToReview: isEditor,
    moveQuestionVersionToProduction: isEditor,
    publishQuestionVersion: isEditorOrAdmin,
    createNewQuestionVersion: isEditorOrAdmin,
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
  },
}

module.exports = permissions
