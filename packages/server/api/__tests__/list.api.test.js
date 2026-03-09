const createGraphQLServer = require('./helpers/createTestServer')

const { List, ListMember, User, Question } = require('../../models')
const clearDb = require('../../models/__tests__/_clearDb')
const { createList } = require('../../controllers/list.controllers')

const EDIT_LIST = `
  mutation RenameList($listId: ID!, $title: String!) {
    editList(listId: $listId, title: $title) {
      id
      title
    }
  }
`

const ADD_TO_LIST = `
  mutation AddToList($listId: ID!, $questionIds: [ID!]!) {
    addToList(listId: $listId, questionIds: $questionIds) {
      listId
      questionId
    }
  }
`

const REMOVE_FROM_LIST = `
  mutation RemoveFromList($listId: ID!, $questionIds: [ID!]!) {
    deleteFromList(listId: $listId, questionIds: $questionIds)
  }
`

const REORDER_LIST = `
  mutation ReorderList($listId: ID!, $customOrder: [ID!]!) {
    reorderList(listId: $listId, customOrder: $customOrder) {
      customOrder
    }
  }
`

describe('List API authorization', () => {
  beforeEach(async () => clearDb())

  afterAll(() => {
    const list = List.knex()
    const user = User.knex()
    const listMember = ListMember.knex()
    list.destroy()
    listMember.destroy()
    user.destroy()
  })

  it('allows list author to edit list title', async () => {
    const user = await User.insert({
      isActive: true,
    })

    const list = await createList(user.id, 'test list')

    const newTitle = 'test list renamed'

    const testServer = createGraphQLServer()

    const response = await testServer.executeOperation(
      {
        query: EDIT_LIST,
        variables: {
          listId: list.id,
          title: newTitle,
        },
      },
      {
        contextValue: {
          userId: user.id,
        },
      },
    )

    const result = response.body.singleResult

    expect(result.errors).toBe(undefined)
    expect(result.data.editList.title).toBe(newTitle)
  })
  it('blocks non-author from editing list title', async () => {
    const author = await User.insert({
      isActive: true,
    })

    const user = await User.insert({
      isActive: true,
    })

    const list = await createList(author.id, 'test list')

    const newTitle = 'test list renamed'

    const testServer = createGraphQLServer()

    const response = await testServer.executeOperation(
      {
        query: EDIT_LIST,
        variables: {
          listId: list.id,
          title: newTitle,
        },
      },
      {
        contextValue: {
          userId: user.id,
        },
      },
    )

    const result = response.body.singleResult

    expect(result.data).toBe(null)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].message).toEqual('Not Authorised!')
  })

  it('allows list author to add items to list', async () => {
    const user = await User.insert({
      isActive: true,
    })

    const list = await createList(user.id, 'test list')
    const question = await Question.insert({})
    const testServer = createGraphQLServer()

    const response = await testServer.executeOperation(
      {
        query: ADD_TO_LIST,
        variables: {
          listId: list.id,
          questionIds: [question.id],
        },
      },
      {
        contextValue: {
          userId: user.id,
        },
      },
    )

    const result = response.body.singleResult

    expect(result.errors).toBe(undefined)
    expect(result.data.addToList[0].questionId).toBe(question.id)
  })
  it('blocks non-author from adding items to list', async () => {
    const author = await User.insert({
      isActive: true,
    })

    const user = await User.insert({
      isActive: true,
    })

    const list = await createList(author.id, 'test list')
    const question = await Question.insert({})
    const testServer = createGraphQLServer()

    const response = await testServer.executeOperation(
      {
        query: ADD_TO_LIST,
        variables: {
          listId: list.id,
          questionIds: [question.id],
        },
      },
      {
        contextValue: {
          userId: user.id,
        },
      },
    )

    const result = response.body.singleResult

    expect(result.data).toBe(null)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].message).toEqual('Not Authorised!')
  })

  it('allows list author to remove items from list', async () => {
    const user = await User.insert({
      isActive: true,
    })

    const list = await createList(user.id, 'test list')
    const question = await Question.insert({})
    const testServer = createGraphQLServer()

    await testServer.executeOperation(
      {
        query: ADD_TO_LIST,
        variables: {
          listId: list.id,
          questionIds: [question.id],
        },
      },
      {
        contextValue: {
          userId: user.id,
        },
      },
    )

    const response = await testServer.executeOperation(
      {
        query: REMOVE_FROM_LIST,
        variables: {
          listId: list.id,
          questionIds: [question.id],
        },
      },
      {
        contextValue: {
          userId: user.id,
        },
      },
    )

    const result = response.body.singleResult

    expect(result.errors).toBe(undefined)
    expect(result.data.deleteFromList).toBe(1)
  })
  it('blocks non-author from removing items from list', async () => {
    const author = await User.insert({
      isActive: true,
    })

    const user = await User.insert({
      isActive: true,
    })

    const list = await createList(author.id, 'test list')
    const question = await Question.insert({})
    const testServer = createGraphQLServer()

    await testServer.executeOperation(
      {
        query: ADD_TO_LIST,
        variables: {
          listId: list.id,
          questionIds: [question.id],
        },
      },
      {
        contextValue: {
          userId: author.id,
        },
      },
    )

    const response = await testServer.executeOperation(
      {
        query: REMOVE_FROM_LIST,
        variables: {
          listId: list.id,
          questionIds: [question.id],
        },
      },
      {
        contextValue: {
          userId: user.id,
        },
      },
    )

    const result = response.body.singleResult

    expect(result.data).toBe(null)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].message).toEqual('Not Authorised!')
  })

  it('allows list author to reorder items in a list', async () => {
    const user = await User.insert({
      isActive: true,
    })

    const list = await createList(user.id, 'test list')
    const question1 = await Question.insert({})
    const question2 = await Question.insert({})
    const testServer = createGraphQLServer()

    await testServer.executeOperation(
      {
        query: ADD_TO_LIST,
        variables: {
          listId: list.id,
          questionIds: [question1.id, question2.id],
        },
      },
      {
        contextValue: {
          userId: user.id,
        },
      },
    )

    const response = await testServer.executeOperation(
      {
        query: REORDER_LIST,
        variables: {
          listId: list.id,
          customOrder: [question2.id, question1.id],
        },
      },
      {
        contextValue: {
          userId: user.id,
        },
      },
    )

    const result = response.body.singleResult

    expect(result.errors).toBe(undefined)
    expect(result.data.reorderList.customOrder[0]).toBe(question2.id)
  })
  it('blocks non-author from reordering items in a list', async () => {
    const author = await User.insert({
      isActive: true,
    })

    const user = await User.insert({
      isActive: true,
    })

    const list = await createList(author.id, 'test list')
    const question1 = await Question.insert({})
    const question2 = await Question.insert({})
    const testServer = createGraphQLServer()

    await testServer.executeOperation(
      {
        query: ADD_TO_LIST,
        variables: {
          listId: list.id,
          questionIds: [question1.id, question2.id],
        },
      },
      {
        contextValue: {
          userId: author.id,
        },
      },
    )

    const response = await testServer.executeOperation(
      {
        query: REORDER_LIST,
        variables: {
          listId: list.id,
          customOrder: [question2.id, question1.id],
        },
      },
      {
        contextValue: {
          userId: user.id,
        },
      },
    )

    const result = response.body.singleResult

    expect(result.data).toBe(null)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].message).toEqual('Not Authorised!')
  })
})
