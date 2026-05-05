const Identity = require('@coko/server/src/models/identity/identity.model')
const User = require('../user/user.model')
const Team = require('../team/team.model')
const TeamMember = require('../teamMember/teamMember.model')
const Question = require('../question/question.model')
const Review = require('../review/review.model')
const { REVIEWER_STATUSES } = require('../../controllers/constants')
const clearDb = require('./_clearDb')

describe('User Model', () => {
  beforeEach(() => clearDb())
  afterAll(async () => {
    await clearDb()
    const knex = User.knex()
    knex.destroy()
  })

  test('getDisplayName', async () => {
    const user = await User.insert({
      displayName: 'testuser',
    })

    await Identity.insert({
      userId: user.id,
      email: 'testuser@gmail.com',
      isDefault: true,
    })

    const result = await User.getDisplayName(user)
    expect(result).toBe('testuser')
  })
  test('filter user returns correct user with displayName', async () => {
    await User.insert({
      displayName: 'user1',
    })
    const users = await User.filter({ search: 'user1' })
    expect(users.result[0].displayName).toBe('user1')
  })
  test('filter user returns correct user with email', async () => {
    const user = await User.insert({
      username: 'user1',
    })

    await Identity.insert({
      userId: user.id,
      email: 'testuser@gmail.com',
      isDefault: true,
    })
    const users = await User.filter({ search: 'testuser@gmail.com' })
    expect(users.result[0].username).toBe('user1')
  })
  test('filter user returns correct number of users', async () => {
    await User.insert({
      displayName: 'test 1',
    })
    await User.insert({
      displayName: 'test 2',
    })

    const result = await User.filter({
      search: 'test',
    })

    expect(result.totalCount).toBe(2)
  })
  test('filters users with correct query options', async () => {
    await User.insert({
      displayName: 'test 3',
    })
    await User.insert({
      displayName: 'test 2',
    })
    await User.insert({
      displayName: 'test 1',
    })

    const users = await User.filter(
      { search: 'test' },
      { orderBy: 'displayName', ascending: true },
    )

    expect(users.result[0].displayName).toBe('test 1')
    expect(users.result[1].displayName).toBe('test 2')
    expect(users.result[2].displayName).toBe('test 3')
    expect(users.totalCount).toBe(3)
  })
  test('filter users attaches default identity to users', async () => {
    const user = await User.insert({
      displayName: 'testuser',
    })

    await Identity.insert({
      userId: user.id,
      email: 'testuser@gmail.com',
      isDefault: true,
    })

    const users = await User.filter({})

    expect(users.result[0].defaultIdentity.email).toBe('testuser@gmail.com')
  })
  test('filter users return whether or not user is a reviewer', async () => {
    const user1 = await User.insert({
      displayName: 'test 3',
    })

    const user2 = await User.insert({
      displayName: 'test 2',
    })

    const reviwerTeam = await Team.insert({
      role: 'reviewer',
      displayName: 'Reviewer',
      global: true,
    })

    await Team.addMember(reviwerTeam.id, user1.id)

    const users = await User.filter({})
    expect(users.result.find(u => u.id === user1.id).isReviewer).toBe(true)
    expect(users.result.find(u => u.id === user2.id).isReviewer).toBe(false)
  })
  test('filters users based on reviewer record', async () => {
    // Create 3 users
    const user1 = await User.insert({
      displayName: 'test 1',
    })

    const user2 = await User.insert({
      displayName: 'test 2',
    })

    const user3 = await User.insert({
      displayName: 'test 3',
    })

    // Create global reviewer team
    const reviwerTeam = await Team.insert({
      role: 'reviewer',
      displayName: 'Reviewer',
      global: true,
    })

    // Add users to global reviewer team
    await Team.updateMembershipByTeamId(reviwerTeam.id, [
      user1.id,
      user2.id,
      user3.id,
    ])

    // Create a question and question version
    const question = await Question.insert({})
    const questionVersion = await question.createNewVersion()

    // Invite user1 and user2 to review
    const questionReviewTeam = await Team.insert({
      role: 'reviewer',
      displayName: 'Reviewer',
      objectId: questionVersion.id,
      objectType: 'questionVersion',
      global: false,
    })

    await Team.addMember(questionReviewTeam.id, user1.id)
    await Team.addMember(questionReviewTeam.id, user2.id)

    const teamMember1 = await TeamMember.findOne({
      teamId: questionReviewTeam.id,
      userId: user1.id,
    })

    const teamMember2 = await TeamMember.findOne({
      teamId: questionReviewTeam.id,
      userId: user2.id,
    })

    await TeamMember.patchAndFetchById(teamMember1.id, {
      status: REVIEWER_STATUSES.invited,
    })

    // user2 accepts invitation
    await TeamMember.patchAndFetchById(teamMember2.id, {
      status: REVIEWER_STATUSES.accepted,
    })

    // user2 submits a review
    await Review.createReview(questionVersion.id, user2.id, 'REVIEW CONTENT', {
      pending: false,
      submitted: true,
    })

    // should return only user1
    const invitedReviewers = await User.filter({
      role: 'reviewer',
      reviewerRecord: 'invited',
    })

    // should return only user2
    const reviewersWithSubmissions = await User.filter({
      role: 'reviewer',
      reviewerRecord: 'submitted',
    })

    // should return only user3
    const notInvitedReviewers = await User.filter({
      role: 'reviewer',
      reviewerRecord: 'notInvited',
    })

    expect(invitedReviewers.result.length).toBe(1)
    expect(invitedReviewers.result[0].id).toBe(user1.id)
    expect(reviewersWithSubmissions.result.length).toBe(1)
    expect(reviewersWithSubmissions.result[0].id).toBe(user2.id)
    expect(notInvitedReviewers.result.length).toBe(1)
    expect(notInvitedReviewers.result[0].id).toBe(user3.id)
  })
})
