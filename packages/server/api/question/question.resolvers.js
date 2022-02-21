const { logger } = require('@coko/server')

const {
  labels: { QUESTION_RESOLVER },
} = require('./constants')

const {
  getQuestion,
  getQuestions,
  // getQuestionVersions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = require('./question.controller')

const questionResolver = async (_, { id }, ctx) => {
  try {
    logger.error(`${QUESTION_RESOLVER} question`)
    return getQuestion(id)
  } catch (e) {
    logger.error(`${QUESTION_RESOLVER} question: ${e.message}`)
    throw new Error(e)
  }
}

const questionsResolver = async (_, { where }, ctx) => {
  try {
    // const {
    //   page: { pageNumber, pageSize },
    // } = where
    logger.info(`${QUESTION_RESOLVER} questions`)
    // return getQuestions(where, { page: pageNumber, pageSize })
    return getQuestions(where)
  } catch (e) {
    logger.error(`${QUESTION_RESOLVER} questions: ${e.message}`)
    throw new Error(e)
  }
}

const createQuestionResolver = async (_, { input }, ctx) => {
  try {
    logger.info(`${QUESTION_RESOLVER} createQuestion`)
    return createQuestion(input)
  } catch (e) {
    logger.error(`${QUESTION_RESOLVER} createQuestion: ${e.message}`)
    throw new Error(e)
  }
}

const updateQuestionResolver = async (_, { id, input }, ctx) => {
  try {
    logger.info(`${QUESTION_RESOLVER} updateQuestion`)
    return updateQuestion(id, input)
  } catch (e) {
    logger.error(`${QUESTION_RESOLVER} updateQuestion: ${e.message}`)
    throw new Error(e)
  }
}

const deleteQuestionResolver = async (_, { id }, ctx) => {
  try {
    logger.info(`${QUESTION_RESOLVER} deleteQuestion`)
    return deleteQuestion(id)
  } catch (e) {
    logger.error(`${QUESTION_RESOLVER} deleteQuestion: ${e.message}`)
    throw new Error(e)
  }
}

module.exports = {
  Query: {
    question: questionResolver,
    questions: questionsResolver,
  },
  Mutation: {
    createQuestion: createQuestionResolver,
    updateQuestion: updateQuestionResolver,
    submitQuestion: updateQuestionResolver,
    autoSaveQuestion: updateQuestionResolver,
    deleteQuestion: deleteQuestionResolver,
  },
  Question: {
    async versions(question, { latestOnly }, ctx) {
      return ctx.loaders.Question.questionVersionsBasedOnQuestionIdsLoader.load(
        question.id,
        latestOnly,
      )
      // return getQuestionVersions(question.id, latestOnly)
    },
  },
}
