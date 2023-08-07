const {
  getComplexItemSets,
  getComplexItemSet,
  createComplexItemSet,
  editComplexItemSet,
  getQuestionForComplexItemSet,
  getAuthorForComplexItemSet,
  containsSubmissions,
} = require('../../controllers/complexItemSet.controller')

const { getImageUrls } = require('../../controllers/utils')

const complexItemSetsResolver = async (_, { params, options }) => {
  return getComplexItemSets(params, options)
}

const complexItemSetResolver = async (
  _,
  { id, onlyPublishedQuestions, questionsOptions },
  ctx,
) => {
  const complexItemSet = await getComplexItemSet(id)
  complexItemSet.options = questionsOptions
  complexItemSet.onlyPublishedQuestions = onlyPublishedQuestions
  return complexItemSet
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
  return getQuestionForComplexItemSet(
    complexItemSet.id,
    // complexItemSet.onlyPublishedQuestions,
    complexItemSet.options,
  )
}

const authorResolver = async complexItemSet => {
  return getAuthorForComplexItemSet(complexItemSet.id)
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
  },
  Mutation: {
    createComplexItemSet: createComplexItemSetResolver,
    editComplexItemSet: editComplexItemSetResolver,
    deleteComplexItemSet: deleteComplexItemSetResolver,
  },
  ComplexItemSet: {
    questions: complexItemSetQuestionsResolver,
    author: authorResolver,
    leadingContent: leadingContentResolver,
    containsSubmissions: containsSubmissionsResolver,
  },
}
