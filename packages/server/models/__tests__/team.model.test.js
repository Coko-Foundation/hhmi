const { Team, User, Question, TeamMember } = require('../index')
const clearDb = require('./_clearDb')

describe('Team Model', () => {
  beforeEach(() => clearDb())

  afterAll(async () => {
    await clearDb()
    const knex = Team.knex()
    knex.destroy()
  })

  test('can get non team member users for a team', async () => {
    const userOne = await User.insert({
      givenNames: 'John',
      surname: 'Green',
    })

    const userTwo = await User.insert({
      givenNames: 'Alicia',
      surname: 'Briggs',
    })

    const userThree = await User.insert({
      givenNames: 'Alice',
      surname: 'Merchant',
    })

    const userFour = await User.insert({
      givenNames: 'Kent',
      surname: 'Barker',
    })

    const team = await Team.insert({
      role: 'editor',
      displayName: 'Managing Editor',
      global: true,
    })

    await Team.addMember(team.id, userOne.id)

    const resultOne = await Team.searchForNonTeamMemberUsers(team.id, '')
    expect(resultOne).toEqual([])

    const resultTwo = await Team.searchForNonTeamMemberUsers(team.id, 'bark')
    expect(resultTwo).toHaveLength(1)
    expect(resultTwo[0].id).toEqual(userFour.id)

    const resultThree = await Team.searchForNonTeamMemberUsers(team.id, 'alic')
    expect(resultThree).toHaveLength(2)
    expect(resultThree.find(u => u.id === userTwo.id).id).toEqual(userTwo.id)
    expect(resultThree.find(u => u.id === userThree.id).id).toEqual(
      userThree.id,
    )
  })

  test('assigning author to a question', async () => {
    const question = await Question.insert({})
    const admin = await User.insert({})
    const author = await User.insert({})

    const team = await Team.insert({
      role: 'author',
      displayName: 'Author',
      objectId: question.id,
      objectType: 'question',
    })

    await Team.addMember(team.id, admin.id)

    const result = await Team.assignQuestionAuthor(question.id, author.id)
    const fetchedTeam = await TeamMember.find({ teamId: team.id })
    expect(fetchedTeam.result[0].userId).toEqual(author.id)
    expect(result).toBe(true)
  })
})
