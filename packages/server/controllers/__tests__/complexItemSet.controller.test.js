const {
  createComplexItemSet,
  editComplexItemSet,
  getAuthorForComplexItemSet,
  getQuestionForComplexItemSet,
  containsSubmissions,
} = require('../complexItemSet.controller')

const { exampleQuestionVersion } = require('./__helpers__/questions')

const {
  User,
  Question,
  QuestionVersion,
  ComplexItemSet,
  Team,
} = require('../../models/index')

const clearDb = require('../../models/__tests__/_clearDb')

describe('ComplexItemSet controller', () => {
  beforeEach(() => clearDb())

  afterAll(async () => {
    await clearDb()
    const knex = ComplexItemSet.knex()
    knex.destroy()
  })

  test('createComplexItemSet creates complex item with given data', async () => {
    const user = await User.insert({
      isActive: true,
    })

    const contentDescription = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          attrs: { class: 'paragraph' },
          content: [{ type: 'text', text: ' set 1 description' }],
        },
      ],
    }

    const complexItem = await createComplexItemSet(
      user.id,
      'set 1',
      contentDescription,
    )

    expect(complexItem.title).toBe('set 1')
    expect(complexItem.leadingContent).toEqual(
      JSON.stringify(contentDescription),
    )
  })

  test('editComplexItemSet updates complex item with given data', async () => {
    const user = await User.insert({
      isActive: true,
    })

    const complexItemSet = await createComplexItemSet(user.id, '', {})

    const editedTitle = 'edited set 1'

    const editedContent = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          attrs: { class: 'paragraph' },
          content: [{ text: ' edited description', type: 'text' }],
        },
      ],
    }

    const editedComplexItemSet = await editComplexItemSet(
      complexItemSet.id,
      editedTitle,
      editedContent,
    )

    expect(editedComplexItemSet.title).toBe(editedTitle)

    expect(JSON.stringify(editedComplexItemSet.leadingContent)).toEqual(
      JSON.stringify(editedContent),
    )
  })

  test('getAuthorForComplexItemSet gets correct author of the set', async () => {
    const user = await User.insert({})
    const complexItem = await createComplexItemSet(user.id, 'set 1', null)
    const author = await getAuthorForComplexItemSet(complexItem.id)
    expect(author[0].id).toBe(user.id)
  })

  test('getQuestionForComplexItemSet gets correct questions belonging to a set', async () => {
    const user = await User.insert({})
    const complexItem = await createComplexItemSet(user.id, 'set 3', null)

    // create question1 and set user as its author
    const question1 = await Question.insert({})

    const authorTeam = await Team.insert({
      role: 'author',
      displayName: 'Author',
      objectId: question1.id,
      objectType: 'question',
    })

    await Team.addMember(authorTeam.id, user.id)

    await QuestionVersion.insert({
      ...exampleQuestionVersion,
      published: false,
      questionId: question1.id,
      complexItemSetId: complexItem.id,
    })

    // create question2 where user is not its author
    const question2 = await Question.insert({})

    await QuestionVersion.insert({
      ...exampleQuestionVersion,
      published: false,
      questionId: question2.id,

      complexItemSetId: complexItem.id,
    })

    // create question3 where user is not its author but question is published
    const question3 = await Question.insert({})

    await QuestionVersion.insert({
      ...exampleQuestionVersion,
      published: true,
      questionId: question3.id,

      complexItemSetId: complexItem.id,
    })

    const fetchedSet = await getQuestionForComplexItemSet(
      complexItem.id,
      user.id,
    )

    const fetchedIds = fetchedSet.result.map(c => c.id)

    expect(fetchedSet.result.length).toEqual(2)
    expect(fetchedIds.includes(question1.id)).toBe(true)
    expect(fetchedIds.includes(question2.id)).toBe(false)
    expect(fetchedIds.includes(question3.id)).toBe(true)
  })

  test('containsSubmissions checks if there are submitted questions in a set', async () => {
    const user = await User.insert({})
    const question = await Question.insert({})
    const complexItem = await createComplexItemSet(user.id, 'set 1', null)
    await QuestionVersion.insert({
      questionId: question.id,
      submitted: true,
      complexItemSetId: complexItem.id,
    })

    const hasSubmissions = await containsSubmissions(complexItem)

    expect(hasSubmissions).toBe(true)
  })
})
