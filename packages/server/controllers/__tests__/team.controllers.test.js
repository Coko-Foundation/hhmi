const { uuid } = require('@coko/server')

const { Team, TeamMember } = require('../../models/index')
const { createUser } = require('../../models/__tests__/__helpers__/users')
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
} = require('../team.controllers')

const clearDb = require('../../models/__tests__/_clearDb')

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
})
