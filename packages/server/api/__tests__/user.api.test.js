/* eslint-disable jest/no-commented-out-tests */
const createGraphQLServer = require('./helpers/createTestServer')
const { Identity, User, Team, TeamMember } = require('../../models')

const clearDb = require('../../models/__tests__/_clearDb')

// gql queries
const FILTER_USERS = `
  query FilterUsers($params: UsersQueryParams, $options: UserFilterOptions) {
    filterUsers(params: $params, options: $options) {
      result {
        id
      }
      totalCount
    }
  }
`

const SUBMIT_QUESTIONNAIRE = `
  mutation SubmitQuestionnaire($input: UserProfileInput!) {
    submitQuestionnaire(input: $input) {
      id
    }
  }
`

const UPDATE_PROFILE = `
  mutation SubmitQuestionnaire($input: UserProfileInput!) {
    submitQuestionnaire(input: $input) {
      id
    }
  }
`

//   const DEACTIVATE_USERS = `
//   mutation DeactivateUsers($ids: [ID!]!) {
//     deactivateUsers(ids: $ids) {
//       id
//     }
//   }
// `

// const UPDATE_PASSWORD = `
//   mutation UpdatePassword($input: UpdatePasswordInput!) {
//     updatePassword(input: $input)
//   }`

describe('User API authorization', () => {
  beforeEach(async () => clearDb())

  afterAll(() => {
    const user = User.knex()
    user.destroy()
  })

  it('blocks inactive users from quering users', async () => {
    const user = await User.insert({
      isActive: false,
    })

    const testServer = await createGraphQLServer()

    const response = await testServer.executeOperation(
      {
        query: FILTER_USERS,
        variables: { isActive: true },
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

  it('blocks users who are not admins from quering users', async () => {
    const user = await User.insert({
      isActive: true,
    })

    const testServer = await createGraphQLServer()

    const response = await testServer.executeOperation(
      {
        query: FILTER_USERS,
        variables: { isActive: true },
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

  it('allows active users with admin role to query/filter users', async () => {
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

    const testServer = await createGraphQLServer()

    const response = await testServer.executeOperation(
      {
        query: FILTER_USERS,
        variables: { isActive: true },
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

  it('blocks inactive users from submitting the profile questionnaire', async () => {
    const user = await User.insert({
      isActive: false,
    })

    const testServer = await createGraphQLServer()

    const response = await testServer.executeOperation(
      {
        query: SUBMIT_QUESTIONNAIRE,
        variables: {
          input: {
            id: user.id,
            givenNames: 'givenNames',
            surname: 'surname',
            displayName: 'displayName',
            pronouns: 'pronouns',
            email: 'email',
            phone: 'phone',
            country: 'country',
            state: 'state',
            city: 'city',
            position: 'position',
            organization: 'organization',
            institutionalSetting: 'institutionalSetting',
            teachingExperience: 'teachingExperience',
            reviewerInterest: false,
            coursesTeaching: ['course1'],
            topicsReviewing: ['topic1'],
            receivedTraining: true,
            receivedInclusiveLanguageTraining: true,
          },
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

  it('allows active users to submit profile questionnaire', async () => {
    const user = await User.insert({
      isActive: true,
    })

    await Identity.insert({
      userId: user.id,
      email: 'user@coko.foundation',
      isSocial: false,
      isVerified: true,
      isDefault: true,
    })

    const testServer = await createGraphQLServer()

    const response = await testServer.executeOperation(
      {
        query: SUBMIT_QUESTIONNAIRE,
        variables: {
          input: {
            id: user.id,
            givenNames: 'givenNames',
            surname: 'surname',
            displayName: 'displayName',
            pronouns: 'pronouns',
            email: 'user@coko.foundation',
            phone: 'phone',
            country: 'country',
            state: 'state',
            city: 'city',
            position: 'position',
            organization: 'organization',
            institutionalSetting: 'institutionalSetting',
            teachingExperience: 'teachingExperience',
            reviewerInterest: false,
            coursesTeaching: ['course1'],
            topicsReviewing: ['topic1'],
            receivedTraining: true,
            receivedInclusiveLanguageTraining: true,
          },
        },
      },
      {
        contextValue: {
          userId: user.id,
        },
      },
    )

    const result = response.body.singleResult

    expect(user.isActive).toBe(true)
    expect(result.errors).toBe(undefined)
    expect(result.data).not.toBe(null)
  })

  it('blocks inactive users from updating their profile', async () => {
    const user = await User.insert({
      isActive: false,
    })

    const testServer = await createGraphQLServer()

    const response = await testServer.executeOperation(
      {
        query: UPDATE_PROFILE,
        variables: {
          input: {
            id: user.id,
            givenNames: 'givenNames',
            surname: 'surname',
            displayName: 'displayName',
            pronouns: 'pronouns',
            email: 'email',
            phone: 'phone',
            country: 'country',
            state: 'state',
            city: 'city',
            position: 'position',
            organization: 'organization',
            institutionalSetting: 'institutionalSetting',
            teachingExperience: 'teachingExperience',
            reviewerInterest: false,
            coursesTeaching: ['course1'],
            topicsReviewing: ['topic1'],
            receivedTraining: true,
            receivedInclusiveLanguageTraining: true,
          },
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

  it('allows active users to update their profile', async () => {
    const user = await User.insert({
      isActive: true,
    })

    await Identity.insert({
      userId: user.id,
      email: 'user@coko.foundation',
      isSocial: false,
      isVerified: true,
      isDefault: true,
    })

    const testServer = await createGraphQLServer()

    const response = await testServer.executeOperation(
      {
        query: UPDATE_PROFILE,
        variables: {
          input: {
            id: user.id,
            givenNames: 'givenNames',
            surname: 'surname',
            displayName: 'displayName',
            pronouns: 'pronouns',
            email: 'user@coko.foundation',
            phone: 'phone',
            country: 'country',
            state: 'state',
            city: 'city',
            position: 'position',
            organization: 'organization',
            institutionalSetting: 'institutionalSetting',
            teachingExperience: 'teachingExperience',
            reviewerInterest: false,
            coursesTeaching: ['course1'],
            topicsReviewing: ['topic1'],
            receivedTraining: true,
            receivedInclusiveLanguageTraining: true,
          },
        },
      },
      {
        contextValue: {
          userId: user.id,
        },
      },
    )

    const result = response.body.singleResult

    expect(user.isActive).toBe(true)
    expect(result.errors).toBe(undefined)
    expect(result.data).not.toBe(null)
  })
})

// it('blocks inactive users from updating their password', async () => {
//   const user = await User.insert({
//     isActive: false,
//   })

//   const testServer = await createGraphQLServer(user.id)

//   const result = await testServer.executeOperation({
//     query: UPDATE_PASSWORD,
//     variables: {
//       input: {
//         id: user.id,
//         currentPassword: 'currentPassword',
//         newPassword: 'newPassword',
//       },
//     },
//   })

//   expect(result.data).toBe(null)
//   expect(result.errors.length).toBe(1)
//   expect(result.errors[0].message).toEqual('Not Authorised!')
// })

// it("blocks users from updating another user's password", async () => {})

// it('blocks inactive users from deactivating other users', async () => {
//   const user = await User.insert({
//     isActive: false,
//   })

//   const testServer = await createGraphQLServer(user.id)

//   console.log(user.id)

//   const result = await testServer.executeOperation({
//     query: DEACTIVATE_USERS,
//     variables: {
//       ids: ['48b95dcb-54b2-4c55-b5bf-d832ce368601'],
//     },
//   })

//   console.log(result)

//   expect(result.data).toBe(null)
//   expect(result.errors.length).toBe(1)
//   expect(result.errors[0].message).toEqual('Not Authorised!')
// })
// it("blocks users who are not admins from deactivating other users", async () => {})
// it("blocks users from deactivating themselves", async () => {})
// it("blocks inactive users from deleting other users", async () => {})
// it("blocks users who are not admins from deleting other users", async () => {})
// it("blocks users from deleting themselves", async () => {})
