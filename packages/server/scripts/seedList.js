const { logger } = require('@coko/server')

const { createList, addToExistingList } = require('./utils/list')

/**
 * @dev : Cmd arguements
 *        [2] - operationType [create,addToLists]
 * --->   when [2] = create
 *                  [3] - list title
 *                  [4] - username of the author
 * --->   when [2] = addToList
 *                   [3] - list title
 *                   [4] - question id
 */

// eslint-disable-next-line import/newline-after-import
;(async () => {
  const operationType = process.argv[2]
  const title = process.argv[3]

  try {
    switch (operationType) {
      case 'create': {
        const username = process.argv[4]

        const result = createList(title, username)

        if (!result) {
          throw new Error("Something wen't wrong!")
        }

        logger.info(`[seedList]: created ${title} with author as ${username}`)
        break
      }

      case 'addToList': {
        const questionId = process.argv[4]
        const result = addToExistingList(title, questionId)

        if (!result) throw new Error("Something wen't wrong!")

        logger.info(`added question with id - ${questionId} to list ${title}`)

        break
      }

      default:
        throw new Error('Invalid operation')
    }
  } catch (err) {
    logger.error(err)
  }
})()
