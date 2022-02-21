const { logger } = require('@coko/server')
const orderBy = require('lodash/orderBy')

const QuestionVersion = require('../questionVersion/questionVersion.model')

const questionVersionsBasedOnQuestionIdsLoader = async (
  questionIds,
  latestOnly = false,
) => {
  try {
    logger.info(
      `[QUESTION LOADER] - questionVersionsBasedOnQuestionIdsLoader: fetching versions for questionIds ${questionIds}`,
    )

    const questionVersions = await QuestionVersion.query().whereIn(
      'questionId',
      questionIds,
    )

    return questionIds.map(questionId => {
      const relevant = questionVersions.filter(
        questionVersion => questionVersion.questionId === questionId,
      )

      const ordered = orderBy(relevant, ['created'], ['desc'])

      if (latestOnly) {
        return ordered[0]
      }

      return ordered
    })
  } catch (e) {
    logger.error(
      `[QUESTION LOADER] - questionVersionsBasedOnQuestionIdsLoader: ${e.message}`,
    )
    throw new Error(e)
  }
}

module.exports = {
  questionVersionsBasedOnQuestionIdsLoader,
}
