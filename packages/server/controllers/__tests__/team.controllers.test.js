const { uuid } = require('@coko/server')
const { internet, name, random } = require('faker')

const {
  Team,
  TeamMember,
  QuestionVersion,
  User,
} = require('../../models/index')

const {
  createUser,
  createIdentity,
} = require('../../models/__tests__/__helpers__/users')

const { createEmptyQuestion } = require('./__helpers__/questions')

const {
  createGlobalTeamWithUsers,
  createGlobalEditorTeamWithUsers,
  createGlobalReviewerTeamWithUsers,
  createGlobalHandlingEditorTeamWithUsers,
} = require('../../models/__tests__/__helpers__/teams')

const {
  updateGlobalTeams,
  getNonTeamMemberUsers,
  addExternalReviewer,
  inviteReviewer,
  revokeInvitation,
  searchForReviewers,
} = require('../team.controllers')

const clearDb = require('../../models/__tests__/_clearDb')
const { REVIEWER_STATUSES } = require('../constants')
const { updateReviewerPool } = require('../question.controllers')
const metadata = require('../metadataValues')

describe('Team Controller', () => {
  beforeEach(() => clearDb())

  afterAll(() => {
    const knex = Team.knex()
    knex.destroy()
  })

  it('updateGlobalTeams returns a team', async () => {
    const { team } = await createGlobalTeamWithUsers()

    const fetchedTeam = await updateGlobalTeams([
      {
        id: team.id,
        members: [],
      },
    ])

    expect(fetchedTeam).toBeDefined()
  })

  it('updateGlobalTeams returns the team for the given id', async () => {
    const { team } = await createGlobalTeamWithUsers()

    const fetchedTeam = await updateGlobalTeams([
      {
        id: team.id,
        members: [],
      },
    ])

    expect(fetchedTeam[0].id).toEqual(team.id)
  })

  it('updateGlobalTeams creates team members for a team id', async () => {
    const { team } = await createGlobalTeamWithUsers()
    const userOne = await createUser()
    const userTwo = await createUser()

    await updateGlobalTeams([
      {
        id: team.id,
        members: [userOne.id, userTwo.id],
      },
    ])

    const members = await TeamMember.find({ teamId: team.id })

    expect(members.result).toBeDefined()
  })

  it('updateGlobalTeams returns a team with team members for given user ids', async () => {
    const { team } = await createGlobalTeamWithUsers()
    const userOne = await createUser()
    const userTwo = await createUser()

    await updateGlobalTeams([
      {
        id: team.id,
        members: [userOne.id, userTwo.id],
      },
    ])

    const membersResponse = await TeamMember.find({ teamId: team.id })
    const members = membersResponse.result

    const hasUserOne = !!members.filter(member => member.userId === userOne.id)
      .length

    const hasUserTwo = !!members.filter(member => member.userId === userTwo.id)
      .length

    expect(hasUserOne && hasUserTwo).toBe(true)
  })

  it('updateGlobalTeams adds a team member to existing team members', async () => {
    const { team } = await createGlobalTeamWithUsers()
    const userOne = await createUser()
    const userTwo = await createUser()
    const userThree = await createUser()

    await updateGlobalTeams([
      {
        id: team.id,
        members: [userOne.id, userTwo.id],
      },
    ])

    await updateGlobalTeams([
      {
        id: team.id,
        members: [userOne.id, userTwo.id, userThree.id],
      },
    ])

    const membersResponse = await TeamMember.find({ teamId: team.id })
    const members = membersResponse.result

    const hasUserOne = !!members.filter(member => member.userId === userOne.id)
      .length

    const hasUserTwo = !!members.filter(member => member.userId === userTwo.id)
      .length

    const hasUserThree = !!members.filter(
      member => member.userId === userThree.id,
    ).length

    expect(hasUserOne && hasUserTwo && hasUserThree).toBe(true)
  })

  it("updateGlobalTeams replaces a given team's members with given user ids", async () => {
    const { team } = await createGlobalTeamWithUsers()
    const userOne = await createUser()
    const userTwo = await createUser()
    const userThree = await createUser()

    await updateGlobalTeams([
      {
        id: team.id,
        members: [userOne.id, userTwo.id],
      },
    ])

    await updateGlobalTeams([
      {
        id: team.id,
        members: [userOne.id, userThree.id],
      },
    ])

    const membersResponse = await TeamMember.find({ teamId: team.id })
    const members = membersResponse.result

    const hasUserOne = !!members.filter(member => member.userId === userOne.id)
      .length

    const hasUserTwo = !!members.filter(member => member.userId === userTwo.id)
      .length

    const hasUserThree = !!members.filter(
      member => member.userId === userThree.id,
    ).length

    expect(hasUserOne && !hasUserTwo && hasUserThree).toBe(true)
  })

  it(`updateGlobalTeams deletes user's assigment when removed from gloabl team`, async () => {
    const { team: HETeam, user: HE } =
      await createGlobalHandlingEditorTeamWithUsers()

    const question = await createEmptyQuestion()

    const questionHETeam = await Team.insert({
      objectId: question.id,
      objectType: 'question',
      role: 'handlingEditor',
      displayName: 'Handling Editor',
    })

    await Team.addMember(questionHETeam.id, HE.id)

    const teamToBeUpdated = [
      {
        id: HETeam.id,
        members: [],
        removedMembers: [HE.id],
      },
    ]

    await updateGlobalTeams(teamToBeUpdated)

    // eslint-disable-next-line no-promise-executor-return
    await new Promise(resolve => setTimeout(resolve, 100))

    const questionAssigment = await TeamMember.find({
      teamId: questionHETeam.id,
    })

    expect(questionAssigment.totalCount).toBe(0)
  })

  it('updateGlobalTeams throws when trying to update a non existent team', async () => {
    await expect(
      updateGlobalTeams([
        {
          id: uuid(),
          members: [],
        },
      ]),
    ).rejects.toThrow(/NotFoundError/)
  })

  it('updateGlobalTeams throws when trying to add a non existent user to a team', async () => {
    const { team } = await createGlobalTeamWithUsers()
    await expect(
      updateGlobalTeams([
        {
          id: team.id,
          members: [uuid()],
        },
      ]),
    ).rejects.toThrow(
      /insert or update on table "team_members" violates foreign key constraint "team_members_user_id_foreign"/,
    )
  })

  it('updateGlobalTeams updates multiple valid teams', async () => {
    const { team: teamOne } = await createGlobalEditorTeamWithUsers()
    const { team: teamTwo } = await createGlobalReviewerTeamWithUsers()

    const userOne = await createUser()
    const userTwo = await createUser()
    const userThree = await createUser()
    const userFour = await createUser()

    await updateGlobalTeams([
      {
        id: teamOne.id,
        members: [userOne.id, userTwo.id],
      },
      {
        id: teamTwo.id,
        members: [userThree.id, userFour.id],
      },
    ])

    const teamOneMembersResponse = await TeamMember.find({ teamId: teamOne.id })
    const teamTwoMembersResponse = await TeamMember.find({ teamId: teamTwo.id })
    const teamOneMembers = teamOneMembersResponse.result
    const teamTwoMembers = teamTwoMembersResponse.result

    const teamOneHasUserOne = !!teamOneMembers.filter(
      member => member.userId === userOne.id,
    ).length

    const teamOneHasUserTwo = !!teamOneMembers.filter(
      member => member.userId === userTwo.id,
    ).length

    const teamTwoHasUserThree = !!teamTwoMembers.filter(
      member => member.userId === userThree.id,
    ).length

    const teamTwoHasUserFour = !!teamTwoMembers.filter(
      member => member.userId === userFour.id,
    ).length

    expect(
      teamOneHasUserOne &&
        teamOneHasUserTwo &&
        teamTwoHasUserThree &&
        teamTwoHasUserFour,
    ).toBe(true)
  })

  it('getNonTeamMemberUsers returns a defined array when getting a falsy searchValue', async () => {
    const { team } = await createGlobalEditorTeamWithUsers()

    const result = await getNonTeamMemberUsers(team.id, null)

    expect(result).toBeDefined()
  })

  it('getNonTeamMemberUsers returns an empty array when getting a falsy searchValue', async () => {
    const { team } = await createGlobalEditorTeamWithUsers()

    const result = await getNonTeamMemberUsers(team.id, null)

    expect(result.length).toEqual(0)
  })

  it('getNonTeamMemberUsers returns an empty array when getting a mismatching searchValue', async () => {
    const { team } = await createGlobalEditorTeamWithUsers()

    await createUser()
    await createUser()
    await createUser()

    const result = await getNonTeamMemberUsers(team.id, 'something')

    expect(result.length).toEqual(0)
  })

  it('getNonTeamMemberUsers returns a non-empty array when getting a simple searchValue', async () => {
    const { team } = await createGlobalEditorTeamWithUsers()

    await createUser()
    await createUser()
    await createUser()

    const result = await getNonTeamMemberUsers(team.id, 'e')

    expect(result.length).toBeGreaterThan(0)
  })

  it('addExternalReviewer creates a non-global reviewer team if one does not exist', async () => {
    let question = await createEmptyQuestion()

    let questionVersion = await QuestionVersion.findOne({
      questionId: question.id,
    })

    let reviewerTeam = await Team.findOne({ objectId: questionVersion.id })

    expect(reviewerTeam).toBeFalsy()

    const editor = await createUser()

    let email = internet.email()
    const givenNames = name.firstName()
    const surname = name.lastName()

    const results1 = await addExternalReviewer(
      questionVersion.id,
      { email, givenNames, surname },
      editor.id,
    )

    expect(results1.userExists).toBe(false)

    reviewerTeam = await Team.findOne({ objectId: questionVersion.id })
    const teamMember1 = await TeamMember.findById(results1.teamMemberId)

    expect(reviewerTeam.id).toBe(teamMember1.teamId)
    expect(teamMember1.status).toBe(REVIEWER_STATUSES.invited)

    question = await createEmptyQuestion()

    questionVersion = await QuestionVersion.findOne({
      questionId: question.id,
    })

    reviewerTeam = await Team.findOne({ objectId: questionVersion.id })

    expect(reviewerTeam).toBeFalsy()

    email = internet.email().toLowerCase()
    const user2 = await createUser()
    const identity2 = await createIdentity(user2, email, false, null)

    expect(identity2.email).toBe(email)

    const results2 = await addExternalReviewer(
      questionVersion.id,
      { email, givenNames: user2.givenNames, surname: user2.surname },
      editor.id,
    )

    expect(results2.userExists).toBe(true)

    reviewerTeam = await Team.findOne({ objectId: questionVersion.id })
    const teamMember2 = await TeamMember.findById(results2.teamMemberId)

    expect(reviewerTeam.id).toBe(teamMember2.teamId)
    expect(teamMember1.status).toBe(REVIEWER_STATUSES.invited)
  })

  it('inviteReviewer throws an error if user is not in reviewer pool', async () => {
    const question = await createEmptyQuestion()
    const editor = await createUser()
    const user1 = await createUser()
    const user2 = await createUser()

    await createIdentity(user1, internet.email(), false, null)

    let questionVersion = await QuestionVersion.findOne({
      questionId: question.id,
    })

    questionVersion = await updateReviewerPool(questionVersion.id, [user1.id])

    const teamMember1 = await inviteReviewer(
      questionVersion.id,
      user1.id,
      editor.id,
    )

    expect(teamMember1.status).toBe(REVIEWER_STATUSES.invited)

    await expect(
      inviteReviewer(questionVersion.id, user2.id, editor.id),
    ).rejects.toThrow(
      /Invite reviewer: User was never added to the reviewer pool/,
    )
  })

  it('revokeInvitation throws errors if invalid users are passed', async () => {
    const question = await createEmptyQuestion()
    const user1 = await createUser()
    const user2 = await createUser()
    const editor = await createUser()

    await createIdentity(user1, internet.email(), false, null)

    let questionVersion = await QuestionVersion.findOne({
      questionId: question.id,
    })

    questionVersion = await updateReviewerPool(questionVersion.id, [user1.id])

    await inviteReviewer(questionVersion.id, user1.id, editor.id)

    const teamMember = await revokeInvitation(questionVersion.id, user1.id)

    expect(teamMember.status).toBe(REVIEWER_STATUSES.revoked)

    await expect(
      revokeInvitation(questionVersion.id, user2.id),
    ).rejects.toThrow(/User was never added to the reviewer pool/)

    await expect(
      revokeInvitation(questionVersion.id, user1.id),
    ).rejects.toThrow(/Invitation has been revoked already/)
  })

  it('searchForReviewers also returns matching training and topics', async () => {
    const question = await createEmptyQuestion()

    const emptyUser = await User.insert({
      givenNames: 'EmptyUser',
      surname: 'I Should not show',
    })

    let searchTerm

    let questionVersion = await QuestionVersion.findOne({
      questionId: question.id,
    })

    questionVersion = await updateReviewerPool(questionVersion.id, [
      emptyUser.id,
    ])

    const reviewerTeam = await Team.findOne({
      role: 'reviewer',
      objectId: questionVersion.id,
    })

    const topicValues = metadata.topics.map(t => t.value)

    const user1 = await User.insert({
      givenNames: 'One',
      surname: 'van der Grass',
      topicsReviewing: random.arrayElements(topicValues),
    })

    const user2 = await User.insert({
      givenNames: 'Two',
      surname: 'van der Grass',
    })

    await User.insert({
      givenNames: name.firstName(),
      surname: name.lastName(),
      receivedTraining: true,
      topicsReviewing: random.arrayElements(topicValues),
    })

    await User.insert({
      givenNames: name.firstName(),
      surname: name.lastName(),
      receivedTraining: true,
      receivedInclusiveLanguageTraining: true,
    })

    await User.insert({
      givenNames: name.firstName(),
      surname: name.lastName(),
      receivedTraining: true,
      topicsReviewing: random.arrayElements(topicValues),
    })

    searchTerm = 'a'

    const searchResults1 = await searchForReviewers(
      searchTerm,
      questionVersion.id,
    )

    // do we have all expected users?
    searchResults1.forEach(u =>
      expect(
        u.givenNames.includes(searchTerm) ||
          u.surname.includes(searchTerm) ||
          u.receivedTraining ||
          u.receivedInclusiveLanguageTraining ||
          u.topicsReviewing.some(t => t.toLowerCase().includes(searchTerm)),
      ).toBe(true),
    )

    // do we have any unwanted users?
    await Promise.all(
      searchResults1.map(async u => {
        const teamMember = await TeamMember.findOne({
          teamId: reviewerTeam.id,
          userId: u.id,
        })

        expect(
          teamMember && questionVersion.reviewerPool.includes(teamMember.id),
        ).toBeFalsy()
      }),
    )

    questionVersion = await updateReviewerPool(questionVersion.id, [
      emptyUser.id,
      user2.id,
    ])

    searchTerm = 'ass'

    const searchResults2 = await searchForReviewers(
      searchTerm,
      questionVersion.id,
    )

    // do we have all expected users?
    searchResults2.forEach(u =>
      expect(
        u.givenNames.includes(searchTerm) ||
          u.surname.includes(searchTerm) ||
          u.receivedTraining ||
          u.receivedInclusiveLanguageTraining ||
          u.topicsReviewing.some(t => t.toLowerCase().includes(searchTerm)),
      ).toBe(true),
    )

    expect(searchResults2.map(f => f.id)).toContain(user1.id)
    expect(searchResults2.map(f => f.id)).not.toContain(user2.id)

    // do we have any unwanted users?
    await Promise.all(
      searchResults2.map(async u => {
        const teamMember = await TeamMember.findOne({
          teamId: reviewerTeam.id,
          userId: u.id,
        })

        expect(
          teamMember && questionVersion.reviewerPool.includes(teamMember.id),
        ).toBeFalsy()
      }),
    )
  })
})
