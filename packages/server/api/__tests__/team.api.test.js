const { internet } = require('faker')
const createGraphQLServer = require('./helpers/createTestServer')

const { User, Team, TeamMember, QuestionVersion } = require('../../models')

const clearDb = require('../../models/__tests__/_clearDb')

const {
  createUser,
  createIdentity,
} = require('../../models/__tests__/__helpers__/users')

const {
  createEmptyQuestion,
} = require('../../controllers/__tests__/__helpers__/questions')

const { updateReviewerPool } = require('../../controllers/question.controllers')

// gql queries
const UPDATE_GLOBAL_TEAMS = `
  mutation updateGlobalTeams($teamId: ID!, $members: [ID!]!) {
    updateTeamMembership(teamId: $teamId, members: $members) {
      id
      role
      displayName
      members {
        id
        user {
          id
          displayName
        }
      }
    }
  }
`

const QUESTION = `
  query Question($id: ID!, $published: Boolean) {
    question(id: $id) {
      versions(latestOnly: true, publishedOnly: $published) {
        id
        reviewerStatus
        isReviewerAutomationOn
        amountOfReviewers
        reviews {
          id
          status {
             submitted
           }
        }
        reviewerPool {
          id
          status
          reviewSubmitted
		  user {
			id
			displayName
			topicsReviewing
			receivedTraining
			receivedInclusiveLanguageTraining
			defaultIdentity{
			  id
			  email
			}
		  }
        }
      }
    }
  }
`

const ACCEPT_OR_REJECT_REVIEW_INVITATION = `
  mutation AcceptOrRejectReviewInvitation(
    $questionVersionId: ID!
    $accepted: Boolean!
    $reason: String
  ) {
    acceptOrRejectInvitation(
      questionVersionId: $questionVersionId
      accepted: $accepted
      reason: $reason
    )
  }
`

const SUBMIT_REVIEW = `
  mutation SubmitReview($input: SubmitReviewInput!) {
    submitReview(input: $input)
  }
`

describe('Team API authorization', () => {
  beforeEach(async () => clearDb())

  afterAll(() => {
    const team = Team.knex()
    const teamMember = TeamMember.knex()
    const user = User.knex()
    team.destroy()
    teamMember.destroy()
    user.destroy()
  })

  it('blocks inactive users from updating global teams', async () => {
    const user = await User.insert({
      isActive: false,
    })

    const testServer = await createGraphQLServer()

    const response = await testServer.executeOperation(
      {
        query: UPDATE_GLOBAL_TEAMS,
        variables: {
          teamId: '48b95dcb-54b2-4c55-b5bf-d832ce368601',
          members: ['48b95dcb-54b2-4c55-b5bf-d832ce368602'],
        },
      },
      {
        contextValue: {
          userId: user.id,
        },
      },
    )

    const result = response.body.singleResult

    expect(user.isActive).toBe(false)
    expect(result.data).toBe(null)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].message).toEqual('Not Authorised!')
  })

  it('blocks users who are not admins from updating global teams', async () => {
    const user = await User.insert({
      isActive: true,
    })

    const testServer = await createGraphQLServer()

    const response = await testServer.executeOperation(
      {
        query: UPDATE_GLOBAL_TEAMS,
        variables: {
          teamId: '48b95dcb-54b2-4c55-b5bf-d832ce368601',
          members: ['48b95dcb-54b2-4c55-b5bf-d832ce368602'],
        },
      },
      {
        contextValue: {
          userId: user.id,
        },
      },
    )

    const result = response.body.singleResult

    const isAdmin = await user.hasGlobalRole('admin')
    expect(user.isActive).toBe(true)
    expect(isAdmin).toBe(false)
    expect(result.data).toBe(null)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].message).toEqual('Not Authorised!')
  })

  it('allow active admin users to update global teams', async () => {
    const user = await User.insert({
      isActive: true,
    })

    const user2 = await User.insert({
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

    const testServer = await createGraphQLServer()

    const response = await testServer.executeOperation(
      {
        query: UPDATE_GLOBAL_TEAMS,
        variables: {
          teamId: globalTeam.id,
          members: [user.id, user2.id],
        },
      },
      {
        contextValue: {
          userId: user.id,
        },
      },
    )

    const result = response.body.singleResult

    const isAdmin = await user.hasGlobalRole('admin')

    expect(user.isActive).toBe(true)
    expect(isAdmin).toBe(true)
    expect(result.errors).toBe(undefined)
    expect(result.data).not.toBe(null)
  })

  it('returns the correct review status', async () => {
    const user = await createUser()
    const editor = await createUser()
    const handlingEditor1 = await createUser()
    const handlingEditor2 = await createUser()

    await createIdentity(editor, internet.email(), false, null)
    await createIdentity(handlingEditor1, internet.email(), false, null)
    await createIdentity(handlingEditor2, internet.email(), false, null)

    const question = await createEmptyQuestion()
    const reviewer1 = await createUser()
    const reviewer2 = await createUser()

    await createIdentity(reviewer1, internet.email(), false, null)
    await createIdentity(reviewer2, internet.email(), false, null)

    const questionVersion = await QuestionVersion.findOne({
      questionId: question.id,
    })

    const editorTeam = await Team.insert({
      role: 'editor',
      global: true,
      displayName: 'Managing Editor',
    })

    await Team.updateMembershipByTeamId(editorTeam.id, [editor.id])

    const handlingEditorTeam = await Team.insert({
      role: 'handlingEditor',
      displayName: 'Handling Editor',
      objectId: questionVersion.questionId,
      objectType: 'question',
    })

    await Team.updateMembershipByTeamId(handlingEditorTeam.id, [
      handlingEditor1.id,
      handlingEditor2.id,
    ])

    const reviewerTeam = await Team.insert({
      role: 'reviewer',
      global: true,
      displayName: 'Reviewer',
    })

    await Team.updateMembershipByTeamId(reviewerTeam.id, [
      reviewer1.id,
      reviewer2.id,
    ])

    await updateReviewerPool(questionVersion.id, [reviewer1.id, reviewer2.id])

    const testServer = await createGraphQLServer()

    const response1 = await testServer.executeOperation(
      {
        query: QUESTION,
        variables: {
          id: question.id,
        },
      },
      {
        contextValue: {
          userId: user.id,
        },
      },
    )

    const data1 = response1.body.singleResult.data

    const [version1] = data1.question.versions

    version1.reviewerPool.forEach(reviewer =>
      expect(reviewer.reviewSubmitted).toBe(false),
    )

    const reviewerServer1 = await createGraphQLServer()
    const reviewerServer2 = await createGraphQLServer()

    await reviewerServer1.executeOperation(
      {
        query: ACCEPT_OR_REJECT_REVIEW_INVITATION,
        variables: {
          questionVersionId: questionVersion.id,
          accepted: false,
          reason: 'no',
        },
      },
      {
        contextValue: {
          userId: reviewer1.id,
        },
      },
    )

    await reviewerServer2.executeOperation(
      {
        query: ACCEPT_OR_REJECT_REVIEW_INVITATION,
        variables: {
          questionVersionId: questionVersion.id,
          accepted: true,
        },
      },
      {
        contextValue: {
          userId: reviewer2.id,
        },
      },
    )

    const response2 = await testServer.executeOperation(
      {
        query: QUESTION,
        variables: {
          id: question.id,
        },
      },
      {
        contextValue: {
          userId: user.id,
        },
      },
    )

    const data2 = response2.body.singleResult.data

    const [version2] = data2.question.versions

    expect(
      version2.reviewerPool.find(r => r.user.id === reviewer1.id)
        .reviewSubmitted,
    ).toBe(false)

    expect(
      version2.reviewerPool.find(r => r.user.id === reviewer2.id)
        .reviewSubmitted,
    ).toBe(false)

    await reviewerServer2.executeOperation(
      {
        query: SUBMIT_REVIEW,
        variables: {
          input: {
            questionVersionId: version2.id,
            attachments: [],
            content: 'all good',
          },
        },
      },
      {
        contextValue: {
          userId: reviewer2.id,
        },
      },
    )

    const response3 = await testServer.executeOperation(
      {
        query: QUESTION,
        variables: {
          id: question.id,
        },
      },
      {
        contextValue: {
          userId: user.id,
        },
      },
    )

    const data3 = response3.body.singleResult.data

    const [version3] = data3.question.versions

    expect(
      version3.reviewerPool.find(r => r.user.id === reviewer1.id)
        .reviewSubmitted,
    ).toBe(false)

    expect(
      version3.reviewerPool.find(r => r.user.id === reviewer2.id)
        .reviewSubmitted,
    ).toBe(true)
  })
})
