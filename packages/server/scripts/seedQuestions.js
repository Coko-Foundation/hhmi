const { logger, db } = require('@coko/server')

const metadata = require('./utils/mockMetadata')

const {
  EmptyQuestionVersions,
  EmptyQuestions,
  createQuestion,
  createChatThread,
  updateStatus,
} = require('./utils/question')

/**
 * @dev : Cmd arguements
 *            [2] - operationType [deleteAll,create,updateStatus] (required)
 * ---> when  [2] = create
 *                  [3] - username of the author
 *                  [4] - question dates(
 *                        Say we pass -2 it takes the date before 2 days from
 *                        the current date. This affects created,updated,publication_date.)
 *                  [5] - metadata type [biochemistry,anatomy,population]
 *                  [6] - question status [notSubmitted,submitted,underReview,published,inProduction] (default - notSubmitted)
 *                  [7] - handling editor username
 * ---> when [2] = updateStatus.
 *                 [3] - bookId
 *                 [4]- [notSubmitted,submitted, underReview, published,inProduction] (default - notSubmitted)
 * ---> when [2] = createChat
 *                 [3] - related object id (question id) (required)
 */

const validDataType = ['biochemistry', 'anatomy', 'population', 'ecology']

const validQuestionStatus = [
  'notSubmitted',
  'submitted',
  'accepted',
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

        const HEUsername = process.argv[7]

        const questionStatus = isValidStatus
          ? validQuestionStatus[statusIndex]
          : validQuestionStatus[0]

        const date = new Date()

        date.setDate(date.getDate() + dateRange)
        if (!username) throw new Error('Username not provided')

        if (isValidType) {
          const courseData = metadata[validDataType[typeIndex]].courses

          const course = await db('course')
            .select()
            .where('value', courseData[0].course)
            .first()

          const unit = await db('unit')
            .select()
            .where('value', courseData[0].units[0].unit)
            .first()

          const topic = await db('topic')
            .select()
            .where('value', courseData[0].units[0].courseTopic)
            .first()

          const learningObjective = await db('learning_objective')
            .select()
            .where('value', courseData[0].units[0].learningObjective)
            .first()

          const essentialKnowledge = await db('essential_knowledge')
            .select()
            .where('value', courseData[0].units[0].essentialKnowledge)
            .first()

          metadata[validDataType[typeIndex]].courses = [
            {
              units: [
                {
                  unit: unit.id,
                  skill: null,
                  application: null,
                  courseTopic: topic.id,
                  understanding: null,
                  learningObjective: learningObjective.id,
                  essentialKnowledge: essentialKnowledge.id,
                },
              ],
              course: course.id,
            },
          ]

          createQuestion(
            username,
            date,
            metadata[validDataType[typeIndex]],
            questionStatus,
            HEUsername,
          )
        } else {
          await createQuestion(
            username,
            date,
            metadata[validDataType[0]],
            questionStatus,
          )
        }

        logger.info(
          `[seedQuestions]: question created under the author ${username} and is ${questionStatus}`,
        )
        if (HEUsername)
          logger.info(
            `[seedQuestions]: assigned ${HEUsername} as handling editor`,
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
            `[seedQuestions]: status of question ${questionId} updated to ${questionStatus}`,
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

      case 'createChat': {
        const questionId = process.argv[3]
        const res = await createChatThread(questionId)
        if (res)
          logger.info(
            `[seedQuestions]: chat thread created for question ${questionId}`,
          )
        break
      }

      default:
        logger.info('Invalid operation type')
    }

    process.exit(0)
  } catch (err) {
    logger.error(err)
    process.exit(1)
  }
})()
