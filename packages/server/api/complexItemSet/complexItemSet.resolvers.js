const {
  getComplexItemSets,
  getComplexItemSet,
  getAvailableSets,
  createComplexItemSet,
  editComplexItemSet,
  getQuestionForComplexItemSet,
  getAuthorForComplexItemSet,
  containsSubmissions,
  assignAuthorForComplexItemSet,
} = require('../../controllers/complexItemSet.controller')

const { getImageUrls } = require('../../controllers/utils')

const complexItemSetsResolver = async (_, { params, options }, ctx) => {
  return getComplexItemSets(ctx.user, params, options)
}

const complexItemSetResolver = async (_, { id, questionsOptions }, ctx) => {
  const complexItemSet = await getComplexItemSet(id)
  complexItemSet.filter = { userId: ctx.user, questionsOptions }
  return complexItemSet
}

const availableSetsResolver = async (_, { publishedOnly }, ctx) => {
  // pass current user if we're asking for sets that a user can assign question to
  // (so set that are not necessarily published)
  const userId = publishedOnly ? null : ctx.user
  return getAvailableSets(userId)
}

const createComplexItemSetResolver = async (
  _,
  { title, leadingContent },
  ctx,
) => {
  return createComplexItemSet(ctx.user, title, leadingContent)
}

const editComplexItemSetResolver = async (
  _,
  { id, title, leadingContent },
  ctx,
) => {
  return editComplexItemSet(id, title, leadingContent)
}

const complexItemSetQuestionsResolver = async complexItemSet => {
  const { id, filter: { userId, questionsOptions } = {} } = complexItemSet
  return getQuestionForComplexItemSet(id, userId, questionsOptions)
}

const authorResolver = async complexItemSet => {
  return getAuthorForComplexItemSet(complexItemSet.id)
}

const assignSetAuthorResolver = async (_, { setId, userId }) => {
  return assignAuthorForComplexItemSet(setId, userId)
}

const leadingContentResolver = async complexItemSet => {
  const { leadingContent } = complexItemSet
  if (leadingContent === null) return null

  const withImageUrls = await getImageUrls(leadingContent)
  return JSON.stringify(withImageUrls)
}

const containsSubmissionsResolver = async complexItemSet => {
  return containsSubmissions(complexItemSet)
}

const deleteComplexItemSetResolver = () => {}

module.exports = {
  Query: {
    complexItemSets: complexItemSetsResolver,
    complexItemSet: complexItemSetResolver,
    getAvailableSets: availableSetsResolver,
  },
  Mutation: {
    createComplexItemSet: createComplexItemSetResolver,
    editComplexItemSet: editComplexItemSetResolver,
    deleteComplexItemSet: deleteComplexItemSetResolver,
    assignSetAuthor: assignSetAuthorResolver,
  },
  ComplexItemSet: {
    questions: complexItemSetQuestionsResolver,
    author: authorResolver,
    leadingContent: leadingContentResolver,
    containsSubmissions: containsSubmissionsResolver,
  },
}
