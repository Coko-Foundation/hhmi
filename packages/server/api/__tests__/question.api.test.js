const createGraphQLServer = require('./helpers/createTestServer')

const {
  User,
  Question,
  QuestionVersion,
  Team,
  TeamMember,
} = require('../../models')

const clearDb = require('../../models/__tests__/_clearDb')

// gql queries
const GET_AUTHOR_DASHBOARD = `
  query GetAuthorDashboard(
    $orderBy: String
    $ascending: Boolean
    $page: Int
    $pageSize: Int
    $searchQuery: String
  ) {
    getAuthorDashboard(
      orderBy: $orderBy
      ascending: $ascending
      page: $page
      pageSize: $pageSize
      searchQuery: $searchQuery
    ) {
      result {
        id
        versions(latestOnly: true) {
          id
        }
      }
      totalCount
    }
  }
`

const GET_EDITOR_DASHBOARD = `
  query GetEditorDashboard(
    $orderBy: String
    $ascending: Boolean
    $page: Int
    $pageSize: Int
    $searchQuery: String
  ) {
    getManagingEditorDashboard(
      orderBy: $orderBy
      ascending: $ascending
      page: $page
      pageSize: $pageSize
      searchQuery: $searchQuery
    ) {
      result {
        id
        versions(latestOnly: true) {
          id
        }
      }
      totalCount
    }
  }
`

const CREATE_QUESTION = `
  mutation CreateQuestion {
    createQuestion {
      id
    }
  }
`

const UPDATE_QUESTION = `
mutation UpdateQuestion(
  $questionId: ID!
  $questionVersionId: ID!
  $input: UpdateQuestionInput!
) {
  updateQuestion(
    questionId: $questionId
    questionVersionId: $questionVersionId
    input: $input
  ) {
    id
    versions(latestOnly: true) {
      id
    }
  }
}
`

const SUBMIT_QUESTION = `
  mutation SubmitQuestion(
    $questionId: ID!
    $questionVersionId: ID!
    $input: UpdateQuestionInput!
  ) {
    submitQuestion(
      questionId: $questionId
      questionVersionId: $questionVersionId
      input: $input
    ) {
      id
      agreedTc
      versions(latestOnly: true, publishedOnly: false) {
        submitted
      }
    }
  }
`

const REJECT_QUESTION = `
  mutation RejectQuestion($questionId: ID!) {
    rejectQuestion(questionId: $questionId) {
      id
      rejected
    }
  }
`

const MOVE_QUESTION_VERSION_TO_REVIEW = `
mutation MoveQuestionVersionToReview($questionVersionId: ID!) {
  moveQuestionVersionToReview(questionVersionId: $questionVersionId) {
    id
    underReview
  }
}
`

const MOVE_QUESTION_VERSION_TO_PRODUCTION = `
mutation MoveQuestionVersionToProdution($questionVersionId: ID!) {
  moveQuestionVersionToProduction(questionVersionId: $questionVersionId) {
    id
    underReview
    inProduction
  }
}
`

const PUBLISH_QUESTION_VERSION = `
mutation PublishQuestionVersion($questionVersionId: ID!) {
  publishQuestionVersion(questionVersionId: $questionVersionId) {
    id
  }
}
`

const CREATE_NEW_VERSION = `
mutation CreateNewQuestionVersion($questionId: ID!) {
  createNewQuestionVersion(questionId: $questionId) {
    id
    versions(latestOnly: true, publishedOnly: false) {
      id
    }
  }
}
`

const GET_QUESTION = `
query getQuestion($id:ID!){
  question(id:$id){
    id
    agreedTc
    rejected
    author{
      displayName
      givenNames
    }
  }
}
`

describe('Question API authorization', () => {
  beforeEach(async () => clearDb())

  afterAll(() => {
    const question = Question.knex()
    const user = User.knex()
    question.destroy()
    user.destroy()
  })

  it('gets correct author fields', async () => {
    const user = await User.insert({
      isActive: true,
      displayName: 'user1',
      givenNames: 'user 1',
    })

    const question = await Question.insert({})

    const authorTeamQuestion = await Team.insert({
      role: 'author',
      displayName: 'Author',
      objectId: question.id,
      objectType: 'question',
    })

    await Team.addMember(authorTeamQuestion.id, user.id)
    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: GET_QUESTION,
      variables: {
        id: question.id,
      },
    })

    expect(result.errors).toBe(undefined)
    expect(result.data.question.author.displayName).toBe('user1')
    expect(result.data.question.author.givenNames).toBe('user 1')
  })

  it("blocks inactive users from quering author's dashboard", async () => {
    const user = await User.insert({
      isActive: false,
    })

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: GET_AUTHOR_DASHBOARD,
      variables: {
        orderBy: 'created',
        ascending: true,
        page: 1,
        pageSize: 10,
        searchQuery: '',
      },
    })

    expect(user.isActive).toBe(false)
    expect(result.data).toBe(null)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].message).toEqual('Not Authorised!')
  })

  it("allows active users to query author's dashboard", async () => {
    const user = await User.insert({
      isActive: true,
    })

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: GET_AUTHOR_DASHBOARD,
      variables: {
        orderBy: 'created',
        ascending: true,
        page: 1,
        pageSize: 10,
        searchQuery: '',
      },
    })

    expect(user.isActive).toBe(true)
    expect(result.errors).toBe(undefined)
    expect(result.data).not.toBe(null)
  })

  it("blocks inactive users from quering editor's dashboard", async () => {
    const user = await User.insert({
      isActive: false,
    })

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: GET_EDITOR_DASHBOARD,
      variables: {
        orderBy: 'created',
        ascending: true,
        page: 1,
        pageSize: 10,
        searchQuery: '',
      },
    })

    expect(user.isActive).toBe(false)
    expect(result.data).toBe(null)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].message).toEqual('Not Authorised!')
  })

  it("blocks users who are not editors from quering editor's dashboard", async () => {
    const user = await User.insert({
      isActive: true,
    })

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: GET_EDITOR_DASHBOARD,
      variables: {
        orderBy: 'created',
        ascending: true,
        page: 1,
        pageSize: 10,
        searchQuery: '',
      },
    })

    const isEditor = await user.hasGlobalRole('editor')
    expect(user.isActive).toBe(true)
    expect(isEditor).toBe(false)
    expect(result.data).toBe(null)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].message).toEqual('Not Authorised!')
  })

  it("allows active users with editor role to query editor's dashboard", async () => {
    const user = await User.insert({
      isActive: true,
    })

    const editorTeam = await Team.insert({
      role: 'editor',
      displayName: 'Editor',
      global: true,
    })

    await TeamMember.insert({
      teamId: editorTeam.id,
      userId: user.id,
    })

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: GET_EDITOR_DASHBOARD,
      variables: {
        orderBy: 'created',
        ascending: true,
        page: 1,
        pageSize: 10,
        searchQuery: '',
      },
    })

    const isEditor = await user.hasGlobalRole('editor')
    expect(user.isActive).toBe(true)
    expect(isEditor).toBe(true)
    expect(result.errors).toBe(undefined)
    expect(result.data).not.toBe(null)
  })

  it('blocks inactive users from creating questions', async () => {
    const user = await User.insert({
      isActive: false,
    })

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: CREATE_QUESTION,
    })

    expect(user.isActive).toBe(false)
    expect(result.data).toBe(null)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].message).toEqual('Not Authorised!')
  })

  it('allows active users to create questions', async () => {
    const user = await User.insert({
      isActive: true,
    })

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: CREATE_QUESTION,
    })

    expect(user.isActive).toBe(true)
    expect(result.errors).toBe(undefined)
    expect(result.data).not.toBe(null)
  })

  it('blocks inactive users from updating questions', async () => {
    const user = await User.insert({
      isActive: false,
    })

    const question = await Question.insert({})
    const questionVersion = await Question.getVersions(question.id)

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: UPDATE_QUESTION,
      variables: {
        questionId: question.id,
        questionVersionId: questionVersion.result[0].id,
        input: {},
      },
    })

    expect(user.isActive).toBe(false)
    expect(result.data).toBe(null)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].message).toEqual('Not Authorised!')
  })
  it('blocks users from updating rejected questions', async () => {
    const user = await User.insert({
      isActive: true,
    })

    const question = await Question.insert({ rejected: true })
    const questionVersion = await Question.getVersions(question.id)

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: UPDATE_QUESTION,
      variables: {
        questionId: question.id,
        questionVersionId: questionVersion.result[0].id,
        input: {},
      },
    })

    expect(question.rejected).toBe(true)
    expect(result.data).toBe(null)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].message).toEqual('Not Authorised!')
  })
  it('blocks question update if question is not submitted and user is not its author', async () => {
    const user = await User.insert({
      isActive: true,
    })

    const question = await Question.insert({})
    const questionVersion = await Question.getVersions(question.id)

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: UPDATE_QUESTION,
      variables: {
        questionId: question.id,
        questionVersionId: questionVersion.result[0].id,
        input: {},
      },
    })

    expect(result.data).toBe(null)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].message).toEqual('Not Authorised!')
  })
  it('blocks question update if question is submitted but not yet under review', async () => {
    const user = await User.insert({
      isActive: true,
    })

    const question = await Question.insert({})
    const questionVersion = await Question.getVersions(question.id)

    const submittedVersion = await QuestionVersion.patchAndFetchById(
      questionVersion.result[0].id,
      { submitted: true },
    )

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: UPDATE_QUESTION,
      variables: {
        questionId: question.id,
        questionVersionId: submittedVersion.id,
        input: {},
      },
    })

    expect(submittedVersion.submitted).toBe(true)
    expect(result.data).toBe(null)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].message).toEqual('Not Authorised!')
  })
  it('blocks question update if question is under review', async () => {
    const user = await User.insert({
      isActive: true,
    })

    const question = await Question.insert({})
    const questionVersion = await Question.getVersions(question.id)

    const underReviewVersion = await QuestionVersion.patchAndFetchById(
      questionVersion.result[0].id,
      { underReview: true },
    )

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: UPDATE_QUESTION,
      variables: {
        questionId: question.id,
        questionVersionId: underReviewVersion.id,
        input: {},
      },
    })

    expect(underReviewVersion.underReview).toBe(true)
    expect(result.data).toBe(null)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].message).toEqual('Not Authorised!')
  })
  it('blocks non-editors from updating questions in production', async () => {
    const user = await User.insert({
      isActive: true,
    })

    const question = await Question.insert({})
    const questionVersion = await Question.getVersions(question.id)

    const inProductionVersion = await QuestionVersion.patchAndFetchById(
      questionVersion.result[0].id,
      { inProduction: true },
    )

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: UPDATE_QUESTION,
      variables: {
        questionId: question.id,
        questionVersionId: inProductionVersion.id,
        input: {},
      },
    })

    const isEditor = await user.hasGlobalRole('editor')
    expect(user.isActive).toBe(true)
    expect(isEditor).toBe(false)
    expect(inProductionVersion.inProduction).toBe(true)
    expect(result.data).toBe(null)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].message).toEqual('Not Authorised!')
  })
  it('blocks question update if question is published', async () => {
    const user = await User.insert({
      isActive: true,
    })

    const question = await Question.insert({})
    const questionVersion = await Question.getVersions(question.id)

    const publishedVersion = await QuestionVersion.patchAndFetchById(
      questionVersion.result[0].id,
      { published: true },
    )

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: UPDATE_QUESTION,
      variables: {
        questionId: question.id,
        questionVersionId: publishedVersion.id,
        input: {},
      },
    })

    expect(publishedVersion.published).toBe(true)
    expect(result.data).toBe(null)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].message).toEqual('Not Authorised!')
  })

  it('allows active authors to update question if it is not yet submitted', async () => {
    const user = await User.insert({
      isActive: true,
    })

    const question = await Question.insert({})
    const questionVersion = await Question.getVersions(question.id)

    const team = await Team.insert({
      role: 'author',
      displayName: 'Author',
      global: false,
      objectId: question.id,
      objectType: 'question',
    })

    await TeamMember.insert({
      teamId: team.id,
      userId: user.id,
    })

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: UPDATE_QUESTION,
      variables: {
        questionId: question.id,
        questionVersionId: questionVersion.result[0].id,
        input: {},
      },
    })

    const isAuthor = await Team.query()
      .leftJoin('team_members', 'team_members.team_id', 'teams.id')
      .select('teams.role')
      .findOne({
        'teams.object_id': question.id,
        'team_members.user_id': user.id,
        'teams.role': 'author',
      })

    expect(user.isActive).toBe(true)
    expect(isAuthor.role).toBe('author')
    expect(questionVersion.result[0].submitted).toBe(false)
    expect(result.errors).toBe(undefined)
    expect(result.data).not.toBe(null)
  })

  it('allows active editors to update question if it is in production', async () => {
    const user = await User.insert({
      isActive: true,
    })

    const globalTeam = await Team.insert({
      role: 'editor',
      displayName: 'Editor',
      global: true,
    })

    await TeamMember.insert({
      teamId: globalTeam.id,
      userId: user.id,
    })

    const question = await Question.insert({})
    const questionVersion = await Question.getVersions(question.id)

    const inProductionVersion = await QuestionVersion.patchAndFetchById(
      questionVersion.result[0].id,
      { submitted: true, inProduction: true },
    )

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: UPDATE_QUESTION,
      variables: {
        questionId: question.id,
        questionVersionId: inProductionVersion.id,
        input: {},
      },
    })

    const isEditor = await user.hasGlobalRole('editor')

    expect(user.isActive).toBe(true)
    expect(isEditor).toBe(true)
    expect(inProductionVersion.inProduction).toBe(true)
    expect(result.errors).toBe(undefined)
    expect(result.data).not.toBe(null)
  })

  it('blocks inactive users from submitting a question', async () => {
    const user = await User.insert({
      isActive: false,
    })

    const question = await Question.insert({})
    const questionVersion = await Question.getVersions(question.id)

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: SUBMIT_QUESTION,
      variables: {
        questionId: question.id,
        questionVersionId: questionVersion.result[0].id,
        input: {},
      },
    })

    expect(user.isActive).toBe(false)
    expect(result.data).toBe(null)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].message).toEqual('Not Authorised!')
  })

  it('blocks users from submitting a question of which they are not authors', async () => {
    const user = await User.insert({
      isActive: true,
    })

    const question = await Question.insert({})
    const questionVersion = await Question.getVersions(question.id)

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: SUBMIT_QUESTION,
      variables: {
        questionId: question.id,
        questionVersionId: questionVersion.result[0].id,
        input: {},
      },
    })

    expect(result.data).toBe(null)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].message).toEqual('Not Authorised!')
  })

  it('allows active authors to submit their questions', async () => {
    const user = await User.insert({
      isActive: true,
    })

    const question = await Question.insert({})
    const questionVersion = await Question.getVersions(question.id)

    const team = await Team.insert({
      role: 'author',
      displayName: 'Author',
      global: false,
      objectId: question.id,
      objectType: 'question',
    })

    await TeamMember.insert({
      teamId: team.id,
      userId: user.id,
    })

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: SUBMIT_QUESTION,
      variables: {
        questionId: question.id,
        questionVersionId: questionVersion.result[0].id,
        input: {},
      },
    })

    const isAuthor = await Team.query()
      .leftJoin('team_members', 'team_members.team_id', 'teams.id')
      .select('teams.role')
      .findOne({
        'teams.object_id': question.id,
        'team_members.user_id': user.id,
        'teams.role': 'author',
      })

    expect(user.isActive).toBe(true)
    expect(isAuthor.role).toBe('author')
    expect(result.errors).toBe(undefined)
    expect(result.data).not.toBe(null)
  })

  it('blocks inactive users from rejecting questions', async () => {
    const user = await User.insert({
      isActive: false,
    })

    const question = await Question.insert({})

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: REJECT_QUESTION,
      variables: {
        questionId: question.id,
      },
    })

    expect(user.isActive).toBe(false)
    expect(result.data).toBe(null)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].message).toEqual('Not Authorised!')
  })

  it('blocks users who are not editors from rejecting questions', async () => {
    const user = await User.insert({
      isActive: true,
    })

    const question = await Question.insert({})

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: REJECT_QUESTION,
      variables: {
        questionId: question.id,
      },
    })

    const isEditor = await user.hasGlobalRole('editor')
    expect(user.isActive).toBe(true)
    expect(isEditor).toBe(false)
    expect(result.data).toBe(null)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].message).toEqual('Not Authorised!')
  })

  it('allows active editors to reject questions', async () => {
    const user = await User.insert({
      isActive: true,
    })

    const globalTeam = await Team.insert({
      role: 'editor',
      displayName: 'Editor',
      global: true,
    })

    await TeamMember.insert({
      teamId: globalTeam.id,
      userId: user.id,
    })

    const question = await Question.insert({})

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: REJECT_QUESTION,
      variables: {
        questionId: question.id,
      },
    })

    const isEditor = await user.hasGlobalRole('editor')

    expect(user.isActive).toBe(true)
    expect(isEditor).toBe(true)
    expect(result.errors).toBe(undefined)
    expect(result.data).not.toBe(null)
  })

  it('blocks inactive users from moving questions to review', async () => {
    const user = await User.insert({
      isActive: false,
    })

    const question = await Question.insert({})
    const questionVersion = await Question.getVersions(question.id)

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: MOVE_QUESTION_VERSION_TO_REVIEW,
      variables: {
        questionVersionId: questionVersion.result[0].id,
      },
    })

    expect(user.isActive).toBe(false)
    expect(result.data).toBe(null)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].message).toEqual('Not Authorised!')
  })
  it('blocks users who are not editors from moving questions to review', async () => {
    const user = await User.insert({
      isActive: true,
    })

    const question = await Question.insert({})
    const questionVersion = await Question.getVersions(question.id)

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: MOVE_QUESTION_VERSION_TO_REVIEW,
      variables: {
        questionVersionId: questionVersion.result[0].id,
      },
    })

    const isEditor = await user.hasGlobalRole('editor')
    expect(user.isActive).toBe(true)
    expect(isEditor).toBe(false)
    expect(result.data).toBe(null)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].message).toEqual('Not Authorised!')
  })
  it('allows active editors to move questions to review', async () => {
    const user = await User.insert({
      isActive: true,
    })

    const globalTeam = await Team.insert({
      role: 'editor',
      displayName: 'Editor',
      global: true,
    })

    await TeamMember.insert({
      teamId: globalTeam.id,
      userId: user.id,
    })

    const question = await Question.insert({})
    const questionVersion = await Question.getVersions(question.id)

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: MOVE_QUESTION_VERSION_TO_REVIEW,
      variables: {
        questionVersionId: questionVersion.result[0].id,
      },
    })

    const isEditor = await user.hasGlobalRole('editor')

    expect(user.isActive).toBe(true)
    expect(isEditor).toBe(true)
    expect(result.errors).toBe(undefined)
    expect(result.data).not.toBe(null)
  })

  it('blocks inactive users from moving questions to production', async () => {
    const user = await User.insert({
      isActive: false,
    })

    const question = await Question.insert({})
    const questionVersion = await Question.getVersions(question.id)

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: MOVE_QUESTION_VERSION_TO_PRODUCTION,
      variables: {
        questionVersionId: questionVersion.result[0].id,
      },
    })

    expect(user.isActive).toBe(false)
    expect(result.data).toBe(null)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].message).toEqual('Not Authorised!')
  })
  it('blocks users who are not editors from moving questions to production', async () => {
    const user = await User.insert({
      isActive: true,
    })

    const question = await Question.insert({})
    const questionVersion = await Question.getVersions(question.id)

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: MOVE_QUESTION_VERSION_TO_PRODUCTION,
      variables: {
        questionVersionId: questionVersion.result[0].id,
      },
    })

    const isEditor = await user.hasGlobalRole('editor')
    expect(user.isActive).toBe(true)
    expect(isEditor).toBe(false)
    expect(result.data).toBe(null)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].message).toEqual('Not Authorised!')
  })
  it('allows active editors to move questions to production', async () => {
    const user = await User.insert({
      isActive: true,
    })

    const globalTeam = await Team.insert({
      role: 'editor',
      displayName: 'Editor',
      global: true,
    })

    await TeamMember.insert({
      teamId: globalTeam.id,
      userId: user.id,
    })

    const question = await Question.insert({})
    const questionVersion = await Question.getVersions(question.id)

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: MOVE_QUESTION_VERSION_TO_PRODUCTION,
      variables: {
        questionVersionId: questionVersion.result[0].id,
      },
    })

    const isEditor = await user.hasGlobalRole('editor')

    expect(user.isActive).toBe(true)
    expect(isEditor).toBe(true)
    expect(result.errors).toBe(undefined)
    expect(result.data).not.toBe(null)
  })

  it('blocks inactive users from publishing a question', async () => {
    const user = await User.insert({
      isActive: false,
    })

    const question = await Question.insert({})
    const questionVersion = await Question.getVersions(question.id)

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: PUBLISH_QUESTION_VERSION,
      variables: {
        questionVersionId: questionVersion.result[0].id,
      },
    })

    expect(user.isActive).toBe(false)
    expect(result.data).toBe(null)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].message).toEqual('Not Authorised!')
  })
  it('blocks users who are not editors from publishing a question', async () => {
    const user = await User.insert({
      isActive: true,
    })

    const question = await Question.insert({})
    const questionVersion = await Question.getVersions(question.id)

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: PUBLISH_QUESTION_VERSION,
      variables: {
        questionVersionId: questionVersion.result[0].id,
      },
    })

    const isEditor = await user.hasGlobalRole('editor')
    expect(user.isActive).toBe(true)
    expect(isEditor).toBe(false)
    expect(result.data).toBe(null)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].message).toEqual('Not Authorised!')
  })
  it('allows active editors to publish questions', async () => {
    const user = await User.insert({
      isActive: true,
    })

    const globalTeam = await Team.insert({
      role: 'editor',
      displayName: 'Editor',
      global: true,
    })

    await TeamMember.insert({
      teamId: globalTeam.id,
      userId: user.id,
    })

    const question = await Question.insert({})
    const questionVersion = await Question.getVersions(question.id)

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: PUBLISH_QUESTION_VERSION,
      variables: {
        questionVersionId: questionVersion.result[0].id,
      },
    })

    const isEditor = await user.hasGlobalRole('editor')

    expect(user.isActive).toBe(true)
    expect(isEditor).toBe(true)
    expect(result.errors).toBe(undefined)
    expect(result.data).not.toBe(null)
  })

  it('blocks inactive users from creating new question versions', async () => {
    const user = await User.insert({
      isActive: false,
    })

    const question = await Question.insert({})

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: CREATE_NEW_VERSION,
      variables: {
        questionId: question.id,
      },
    })

    expect(user.isActive).toBe(false)
    expect(result.data).toBe(null)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].message).toEqual('Not Authorised!')
  })
  it('blocks users who are not admins from creating new question versions', async () => {
    const user = await User.insert({
      isActive: true,
    })

    const question = await Question.insert({})

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: CREATE_NEW_VERSION,
      variables: {
        questionId: question.id,
      },
    })

    const isAdmin = await user.hasGlobalRole('admin')
    expect(user.isActive).toBe(true)
    expect(isAdmin).toBe(false)
    expect(result.data).toBe(null)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].message).toEqual('Not Authorised!')
  })
  it('allows active admins to create new question versions', async () => {
    const user = await User.insert({
      isActive: true,
    })

    const globalTeam = await Team.insert({
      role: 'admin',
      displayName: 'Admin',
      global: true,
    })

    await TeamMember.insert({
      teamId: globalTeam.id,
      userId: user.id,
    })

    const question = await Question.insert({})

    const testServer = await createGraphQLServer(user.id)

    const result = await testServer.executeOperation({
      query: CREATE_NEW_VERSION,
      variables: {
        questionId: question.id,
      },
    })

    const isAdmin = await user.hasGlobalRole('admin')

    expect(user.isActive).toBe(true)
    expect(isAdmin).toBe(true)
    expect(result.errors).toBe(undefined)
    expect(result.data).not.toBe(null)
  })
})
