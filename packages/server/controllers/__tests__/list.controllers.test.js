const config = require('config')

const { List, ListMember, Team, User } = require('../../models')

const {
  createList,
  editList,
  addToList,
  getUserLists,
  deleteLists,
  deleteFromList,
  reorderList,
} = require('../list.controllers')

const { createEmptyQuestion } = require('./__helpers__/questions')
const clearDb = require('../../models/__tests__/_clearDb')

const AUTHOR_TEAM = config.teams.nonGlobal.find(t => t.role === 'author')

describe('list controllers', () => {
  beforeEach(() => clearDb())

  afterAll(async () => {
    await clearDb()
    const knex = List.knex()
    knex.destroy()
  })

  it('createList', async () => {
    const user = await User.insert({})
    await createList(user.id, 'list1', [])
    const fetchedList = await List.find({ title: 'list1' })
    expect(fetchedList.totalCount).toBeGreaterThan(0)
    expect(fetchedList.result[0].title).toBe('list1')
  })

  it('editList', async () => {
    const list = await List.insert({ title: 'list1' })
    const editedList = await editList(list.id, 'list2')
    expect(editedList.title).toBe('list2')
  })

  it('addToList', async () => {
    const list = await List.insert({ title: 'list1' })
    const question1 = await createEmptyQuestion()
    const question2 = await createEmptyQuestion()
    await addToList(list.id, [question1.id, question2.id])
    const listMembers = await ListMember.find({ listId: list.id })
    expect(listMembers.totalCount).toEqual(2)

    const questionIdsToCheck = [question1.id, question2.id]
    const presentQuestionIds = listMembers.result.map(res => res.questionId)

    const inculdesAllQuestions = questionIdsToCheck.every(id => {
      return presentQuestionIds.includes(id)
    })

    expect(inculdesAllQuestions).toBe(true)
  })

  it('getUserList', async () => {
    const list1 = await List.insert({ title: 'list1' })
    const user = await User.insert({})

    const authorTeam1 = await Team.insert({
      objectId: list1.id,
      objectType: 'list',
      role: AUTHOR_TEAM.role,
      displayName: AUTHOR_TEAM.displayName,
    })

    await Team.addMember(authorTeam1.id, user.id)
    const userList = await getUserLists(user.id)
    expect(userList.totalCount).toBe(1)
    expect(userList.result[0].id).toBe(list1.id)
  })

  it('deleteLists', async () => {
    const list1 = await List.insert({ title: 'old_list' })
    const list2 = await List.insert({ title: 'new_list' })
    const deletedLists = await deleteLists([list1.id])
    const retrievedList2 = await List.findById(list2.id)

    expect(deletedLists).toEqual(1)
    expect(retrievedList2).toBeTruthy()
  })

  it('deleteFromList', async () => {
    const list1 = await List.insert({ title: 'list1' })
    const question1 = await createEmptyQuestion()
    const question2 = await createEmptyQuestion()
    const questionIds = [question1.id, question2.id]
    await addToList(list1.id, questionIds)

    await deleteFromList(list1.id, [question1.id])
    const listMembers = await ListMember.find({ listId: list1.id })
    const members = listMembers.result.map(member => member.questionId)
    expect(members).not.toContain(question1.id)
    expect(members).toContain(question2.id)
  })

  it('reorderList', async () => {
    const list = await List.insert({ title: 'list5' })
    const question1 = await createEmptyQuestion()
    const question2 = await createEmptyQuestion()
    const questionsIds = [question1.id, question2.id]
    const customOrder = [question2.id, question1.id]
    await addToList(list.id, questionsIds)
    await reorderList(list.id, customOrder)
    const fetchedList = await List.findById(list.id)
    expect(fetchedList.customOrder.length).toBeGreaterThan(0)
    expect(fetchedList.customOrder).toEqual(customOrder)
  })
})
