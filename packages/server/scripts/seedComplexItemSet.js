const { logger } = require('@coko/server')

const {
  createComplexItem,
  addQuestionToSet,
} = require('./utils/complexItemSet')

/**
 * @dev : Cmd arguements
 *            [2] - operationType [create,addQuestion]
 * ----> when [2] = create
 *                  [3] - username
 *                  [4] - title
 *                  [5] - leading content text
 * ----> when [2] = addQuestion
 *                  [3] - set title (make sure title is unique)
 *                  [4] - question id
 */

// eslint-disable-next-line import/newline-after-import
;(async () => {
  try {
    const operationType = process.argv[2]

    switch (operationType) {
      case 'create': {
        const username = process.argv[3]

        const title = process.argv[4]

        const contentText =
          process.argv[5] ||
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'

        const result = await createComplexItem(username, title, contentText)

        if (!result) {
          throw new Error("Something wen't wrong!")
        }

        logger.info(`[seedComplexItemSet]: set with title: "${title}" created!`)
        logger.info(`[seedComplexItemSet]: ${username} set as author!`)

        break
      }

      case 'addQuestion': {
        const title = process.argv[3]

        const questionId = process.argv[4]

        const result = await addQuestionToSet(title, questionId)

        if (!result) {
          throw new Error("Something wen't wrong!")
        }

        logger.info(
          `[seedComplexItemSet]: question - ${questionId} added to set "${title}"`,
        )

        break
      }

      default:
        throw new Error('Invalid operation')
    }

    process.exit(0)
  } catch (err) {
    logger.error(err)
    process.exit(1)
  }
})()
