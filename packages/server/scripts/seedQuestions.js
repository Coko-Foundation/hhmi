const { logger } = require('@coko/server')
const metadata = require('./utils/mockMetadata')

const {
  EmptyQuestionVersions,
  EmptyQuestions,
  createQuestion,
  updateStatus,
} = require('./utils/question')

/**
 * @dev : Cmd arguements
 *            [2] - operationType [deleteAll,create] (required)
 * ---> when  [2] = create
 *                  [3] - username of the author
 *                  [4] - question dates(
 *                        Say we pass -2 it takes the date before 2 days from
 *                        the current date. This affects created,updated,publication_date.)
 *                  [5] - metadata type [biochemistry,anatomy,population]
 *                  [6] - question status [submitted,underReview,published,inProduction]
 * ---> when [2] = updateStatus.
 *                 [3] - bookId
 *                 [4]- [submitted, underReview, published,inProduction]
 */

const validDataType = ['biochemistry', 'anatomy', 'population']

const validQuestionStatus = [
  'submitted',
  'underReview',
  'published',
  'inProduction',
]

const checkDataType = (validData, dataType) => {
  let index = -1

  if (dataType) {
    index = validData.findIndex(
      vd => vd.toLowerCase() === dataType.toLowerCase(),
    )
  }

  return {
    index,
    isTrue: index >= 0,
  }
}

;(async () => {
  try {
    const operationType = process.argv[2]

    switch (operationType) {
      case 'create': {
        const username = process.argv[3]
        const dateRange = Number(process.argv[4]) || 0

        const { isTrue: isValidType, index: typeIndex } = checkDataType(
          validDataType,
          process.argv[5],
        )

        const { isTrue: isValidStatus, index: statusIndex } = checkDataType(
          validQuestionStatus,
          process.argv[6],
        )

        const questionStatus = isValidStatus
          ? validQuestionStatus[statusIndex]
          : validQuestionStatus[0]

        const date = new Date()

        date.setDate(date.getDate() + dateRange)
        if (!username) throw new Error('Username not provided')

        if (isValidType) {
          createQuestion(
            username,
            date,
            metadata[validDataType[typeIndex]],
            questionStatus,
          )
        } else {
          createQuestion(
            username,
            date,
            metadata[validDataType[0]],
            questionStatus,
          )
        }

        logger.info(
          `[seedQuestions]: question created under the author ${username}`,
        )
        break
      }

      case 'updateStatus': {
        const questionId = process.argv[3]

        const { isTrue: isValidStatus, index: statusIndex } = checkDataType(
          validQuestionStatus,
          process.argv[4],
        )

        const questionStatus = isValidStatus
          ? validQuestionStatus[statusIndex]
          : validQuestionStatus[0]

        const result = await updateStatus(questionId, questionStatus)

        if (result) {
          logger.info(
            `[seedQuestions]: question ${questionId} updated to ${questionStatus}`,
          )
        } else {
          logger.error(`[seedQuestions]: something wen't wrong!`)
        }

        break
      }

      case 'deleteAll':
        await EmptyQuestionVersions()
        await EmptyQuestions()
        logger.info(`[seedQuestions]: Emptied questions and question_versions`)
        break
      default:
        logger.info('Invalid operation type')
    }
  } catch (err) {
    logger.error(err)
  }
})()
