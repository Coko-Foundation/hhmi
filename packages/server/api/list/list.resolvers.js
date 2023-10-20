const {
  getList,
  getListQuestions,
  createList,
  editList,
  addToList,
  getUserLists,
  deleteLists,
  deleteFromList,
  exportQuestionsToWordFile,
  exportListToWordFile,
  reorderList,
  exportQuestionsToQti,
  exportListToQti,
} = require('../../controllers/list.controllers')

const listResolver = async (
  _,
  { id, questionsQuery, questionsOptions },
  ctx,
) => {
  const list = await getList(ctx.user, id)
  list.questionsQuery = questionsQuery
  list.questionsOptions = questionsOptions
  return list
}

const myListsResolver = async (_, args, ctx) => {
  return getUserLists(ctx.user, args)
}

const createListResolver = async (_, { title, questions }, ctx) => {
  return createList(ctx.user, title, questions)
}

const editListResolver = async (_, { id, title }, ctx) => {
  return editList(id, title)
}

const deleteListsResolver = async (_, { ids }, ctx) => {
  return deleteLists(ids)
}

const addToListResolver = async (_, { listId, questionIds }, ctx) => {
  return addToList(listId, questionIds)
}

const deleteFromListResolver = async (_, { listId, questionIds }, ctx) => {
  return deleteFromList(listId, questionIds)
}

const exportQuestionsResolver = async (
  _,
  { listId, questionIds, orderBy, ascending, options },
  ctx,
) => {
  return exportQuestionsToWordFile(
    listId,
    questionIds,
    orderBy,
    ascending,
    options,
  )
}

const exportListResolver = async (
  _,
  { listId, orderBy, ascending, options },
  ctx,
) => {
  return exportListToWordFile(listId, orderBy, ascending, options)
}

const exportQuestionsQTIResolver = async (
  _,
  { listId, questionIds, orderBy, ascending },
) => {
  return exportQuestionsToQti(listId, questionIds, orderBy, ascending)
}

const exportListQTIResolver = async (_, { listId, orderBy, ascending }) => {
  return exportListToQti(listId, orderBy, ascending)
}

const reorderListResolver = (_, { listId, customOrder }) => {
  return reorderList(listId, customOrder)
}

const listQuestionsResolver = async list => {
  return getListQuestions(list)
}

module.exports = {
  Query: {
    list: listResolver,
    myLists: myListsResolver,
  },
  Mutation: {
    createList: createListResolver,
    editList: editListResolver,
    deleteLists: deleteListsResolver,
    addToList: addToListResolver,
    deleteFromList: deleteFromListResolver,
    exportQuestions: exportQuestionsResolver,
    exportList: exportListResolver,
    reorderList: reorderListResolver,
    exportQuestionsQTI: exportQuestionsQTIResolver,
    exportListQTI: exportListQTIResolver,
  },
  List: {
    questions: listQuestionsResolver,
  },
}
