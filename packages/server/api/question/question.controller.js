const { logger, useTransaction } = require('@coko/server')
const { Question, QuestionVersion } = require('../../models')

const {
  labels: { QUESTION_CONTROLLER },
} = require('./constants')

const getQuestion = async (id, options = {}) => {
  try {
    const { trx, ...restOptions } = options
    return useTransaction(
      async tr => {
        logger.info(
          `${QUESTION_CONTROLLER} getQuestion: fetching question with id ${id}`,
        )

        return Question.findById(id, { trx: tr, ...restOptions })
      },
      { trx, passedTrxOnly: true },
    )
  } catch (e) {
    logger.error(`${QUESTION_CONTROLLER} getQuestion: ${e.message}`)
    throw new Error(e)
  }
}

const getQuestions = async (where, options = {}) => {
  try {
    const { trx } = options

    return useTransaction(
      async tr => {
        logger.info(`${QUESTION_CONTROLLER} getQuestions: fetching questions `)
        return Question.find(
          {},
          { trx: tr, orderBy: [{ column: 'updated', order: 'desc' }] },
        )
      },
      { trx, passedTrxOnly: true },
    )
  } catch (e) {
    logger.error(`${QUESTION_CONTROLLER} getQuestions: ${e.message}`)
    throw new Error(e)
  }
}

const createQuestion = async (data, options = {}) => {
  try {
    const { trx } = options

    return useTransaction(
      async tr => {
        logger.info(
          `${QUESTION_CONTROLLER} createQuestion: creating a new question`,
        )
        const question = await Question.insert({}, { trx: tr })
        await QuestionVersion.insert({ questionId: question.id }, { trx: tr })
        return question
      },
      { trx },
    )
  } catch (e) {
    logger.error(`${QUESTION_CONTROLLER} createQuestion: ${e.message}`)
    throw new Error(e)
  }
}

const updateQuestion = async (id, data, options = {}) => {
  try {
    const { trx } = options
    const { questionVersionId, agreedTc, ...rest } = data

    return useTransaction(
      async tr => {
        logger.info(
          `${QUESTION_CONTROLLER} updateQuestion: updating question with id ${id}`,
        )

        const updatedQuestion = await Question.patchAndFetchById(
          id,
          { agreedTc },
          {
            trx: tr,
          },
        )

        await QuestionVersion.patchAndFetchById(
          questionVersionId,
          { ...rest },
          {
            trx: tr,
          },
        )

        return updatedQuestion
      },
      { trx },
    )
  } catch (e) {
    logger.error(`${QUESTION_CONTROLLER} updateQuestion: ${e.message}`)
    throw new Error(e)
  }
}

const deleteQuestion = async (id, options = {}) => {
  try {
    const { trx, ...restOptions } = options
    return useTransaction(
      async tr => {
        logger.info(
          `${QUESTION_CONTROLLER} deleteQuestion: deleting question with id ${id}`,
        )
        return Question.deleteById(id, { trx: tr, ...restOptions })
      },
      { trx, passedTrxOnly: true },
    )
  } catch (e) {
    logger.error(`${QUESTION_CONTROLLER} deleteQuestion: ${e.message}`)
    throw new Error(e)
  }
}

const getQuestionVersions = async (questionId, latestOnly, options = {}) => {
  try {
    const { trx } = options
    return useTransaction(
      async tr => {
        logger.info(
          `${QUESTION_CONTROLLER} getQuestionVersions: fetching question versions for question with id ${questionId}`,
        )

        const latestVersion = await QuestionVersion.find(
          { questionId },
          { orderBy: [{ column: 'created', order: 'desc' }] },
        )

        const { result } = latestVersion

        if (latestOnly) {
          return [result[0]]
        }

        return result
      },
      { trx, passedTrxOnly: true },
    )
  } catch (e) {
    logger.error(`${QUESTION_CONTROLLER} getQuestionVersions: ${e.message}`)
    throw new Error(e)
  }
}

module.exports = {
  getQuestion,
  getQuestions,
  getQuestionVersions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
}
