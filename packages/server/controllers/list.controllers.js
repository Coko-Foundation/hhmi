const path = require('path')
const { logger, useTransaction, fileStorage, uuid } = require('@coko/server')
const config = require('config')

const { List, ListMember, Team, Question } = require('../models')

const { clearTempImageFiles } = require('./helpers')
const { labels } = require('./constants')
const WaxToDocxConverter = require('../services/docx/hhmiDocx.service')

const AUTHOR_TEAM = config.teams.nonGlobal.author
const BASE_MESSAGE = `${labels.LIST_CONTROLLERS}:`

const getList = async (_user, listId) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} getList:`

  try {
    return List.findById(listId)
  } catch (e) {
    logger.error(`${CONTROLLER_MESSAGE} ${e.message}`)
    throw new Error(e)
  }
}

const getListQuestions = async list => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} getListQuestions:`

  try {
    const listMembers = await ListMember.find({ listId: list.id })
    const quesitonIds = listMembers.result.map(q => q.questionId)

    const questions = await List.findListQuestionsByIds(
      quesitonIds,
      list.questionsQuery,
      list.questionsOptions,
      list.customOrder,
    )

    return questions
  } catch (e) {
    logger.error(`${CONTROLLER_MESSAGE} ${e.message}`)
    throw new Error(e)
  }
}

const createList = async (userId, title, questions = []) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} createList:`

  try {
    return useTransaction(async trx => {
      const list = await List.insert(
        {
          title,
        },
        { trx },
      )

      const authorTeam = await Team.insert(
        {
          objectId: list.id,
          objectType: 'list',
          role: AUTHOR_TEAM.role,
          displayName: AUTHOR_TEAM.displayName,
        },
        { trx },
      )

      await Team.addMember(authorTeam.id, userId, { trx })

      if (questions.length) {
        addToList(list.id, questions)
      }

      return list
    })
  } catch (e) {
    logger.error(`${CONTROLLER_MESSAGE} ${e.message}`)
    throw new Error(e)
  }
}

const editList = async (listId, title, options = {}) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} editList:`

  try {
    return useTransaction(
      async trx => {
        return List.patchAndFetchById(listId, { title }, trx)
      },
      {
        trx: options.trx,
      },
    )
  } catch (e) {
    logger.error(`${CONTROLLER_MESSAGE} ${e.message}`)
    throw new Error(e)
  }
}

const addToList = async (listId, questionIds) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} addToList:`

  return useTransaction(async trx => {
    const results = await Promise.all(
      questionIds.map(questionId => {
        return new Promise((resolve, reject) => {
          ListMember.insertIgnoreDuplicates(
            {
              listId,
              questionId,
            },
            { trx },
          )
            .then(result => {
              resolve(result)
            })
            .catch(error => {
              reject(error)
            })
        })
      }),
    ).catch(error => {
      logger.error(`${CONTROLLER_MESSAGE} ${error.message}`)
      throw new Error(error)
    })

    return results
  })
}

const getUserLists = async (userId, options = {}) => {
  return List.findByAuthor(userId, options)
}

const deleteLists = async (ids, options = {}) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} deleteLists:`

  try {
    const listMembers = await ListMember.findByListIds(ids)

    if (listMembers.length) {
      await ListMember.deleteByIds(listMembers.map(member => member.id))
    }

    return List.deleteByIds(ids, options)
  } catch (e) {
    logger.error(`${CONTROLLER_MESSAGE} ${e.message}`)
    throw new Error(e)
  }
}

const deleteFromList = async (listId, questionIds, options = {}) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} deleteFromList:`

  try {
    const listMembers = await ListMember.findListMembersByQuestionId(
      listId,
      questionIds,
      options,
    )

    let deletedMemberIds = []

    if (listMembers.length) {
      deletedMemberIds = await ListMember.deleteByIds(
        listMembers.map(member => member.id),
      )
    }

    return deletedMemberIds
  } catch (e) {
    logger.error(`${CONTROLLER_MESSAGE} ${e.message}`)
    throw new Error(e)
  }
}

const exportQuestionsToWordFile = async (
  listId,
  questionIds,
  orderBy,
  ascending,
  options = {},
) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} exportQuestionsToWordFile:`
  logger.info(
    `${CONTROLLER_MESSAGE} generating word file for list of questions with ids ${questionIds}`,
  )

  const imageData = {}

  try {
    const { showFeedback } = options

    const versions = await Promise.all(
      questionIds.map(async questionId => {
        const versionsResult = await Question.getVersions(questionId, {
          latestOnly: true,
          publishedOnly: true,
        })

        return versionsResult.result[0]
      }),
    )

    if (orderBy !== 'custom') {
      // sort by ascending or descending (publication date)
      versions.sort((a, b) => {
        return ascending ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy]
      })
    } else {
      const list = await List.findById(listId)

      versions.sort((a, b) => {
        // non-sorted items (new questions that were added later) go to the end
        if (list.customOrder.indexOf(a.questionId) === -1) return 1000
        if (list.customOrder.indexOf(b.questionId) === -1) return -1000

        // the rest is sorted as per customOrder
        return (
          list.customOrder.indexOf(a.questionId) -
          list.customOrder.indexOf(b.questionId)
        )
      })
    }

    const tempFolderPath = path.join(__dirname, '..', 'tmp')

    const findImages = async n => {
      if (!n) return

      if (n.type === 'figure') {
        const [image] = n.content
        const { fileId } = image.attrs.extraData
        const file = await File.findById(fileId)
        const medium = file.storedObjects.find(o => o.type === 'medium')
        const { extension, key, id } = medium

        const downloadPath = path.join(
          tempFolderPath,
          `${id}-${uuid()}.${extension}`,
        )

        await fileStorage.download(key, downloadPath)
        imageData[image.attrs.id] = downloadPath

        return
      }

      if (!n.content) return

      await Promise.all(n.content.map(async i => findImages(i)))
    }

    await Promise.all(
      versions.map(version =>
        version.content.content.map(async node => findImages(node)),
      ),
    )

    const fullContent = {
      type: 'doc',
      content: [
        {
          type: 'question_list',
          content: [],
        },
      ],
    }

    versions.forEach(version => {
      fullContent.content[0].content.push({
        type: 'question',
        content: [...version.content.content],
      })
    })

    const converter = new WaxToDocxConverter(
      fullContent,
      imageData,
      {},
      {
        showFeedback,
      },
    )

    const filename = `${listId}-partial.docx`
    const filePath = path.join(tempFolderPath, filename)
    await converter.writeToPath(filePath)
    await clearTempImageFiles(imageData)
    return filename
  } catch (error) {
    await clearTempImageFiles(imageData)
    logger.error(`${CONTROLLER_MESSAGE} ${error}`)
    throw new Error(error)
  }
}

const exportListToWordFile = async (
  listId,
  orderBy,
  ascending,
  options = {},
) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} exportListToWordFile:`
  logger.info(
    `${CONTROLLER_MESSAGE} generating word file for list with id ${listId}`,
  )

  const imageData = {}

  try {
    const { showFeedback } = options

    const questions = await getListQuestions({
      id: listId,
      questionsOptions: { page: 0, pageSize: 1000 }, // all questions in a list
    })

    const questionIds = questions.result.map(question => question.id)

    const versions = await Promise.all(
      questionIds.map(async questionId => {
        const versionsResult = await Question.getVersions(questionId, {
          latestOnly: true,
          publishedOnly: true,
        })

        return versionsResult.result[0]
      }),
    )

    if (versions.length === 0) {
      logger.error(`${CONTROLLER_MESSAGE} 'list is empty'`)
      throw new Error("The list you're trying to export is empty")
    }

    if (orderBy !== 'custom') {
      // sort by ascending or descending (publication date)
      versions.sort((a, b) => {
        return ascending ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy]
      })
    } else {
      // get list and sort versions by custom order specified in the list
      const list = await List.findById(listId)

      versions.sort((a, b) => {
        // non-sorted items (new questions that were added later) go to the end
        if (list.customOrder.indexOf(a.questionId) === -1) return 1000
        if (list.customOrder.indexOf(b.questionId) === -1) return -1000

        // the rest is sorted as per customOrder
        return (
          list.customOrder.indexOf(a.questionId) -
          list.customOrder.indexOf(b.questionId)
        )
      })
    }

    const tempFolderPath = path.join(__dirname, '..', 'tmp')

    const findImages = async n => {
      if (!n) return

      if (n.type === 'figure') {
        const [image] = n.content
        const { fileId } = image.attrs.extraData
        const file = await File.findById(fileId)
        const medium = file.storedObjects.find(o => o.type === 'medium')
        const { extension, key, id } = medium

        const downloadPath = path.join(
          tempFolderPath,
          `${id}-${uuid()}.${extension}`,
        )

        await fileStorage.download(key, downloadPath)
        imageData[image.attrs.id] = downloadPath

        return
      }

      if (!n.content) return

      await Promise.all(n.content.map(async i => findImages(i)))
    }

    await Promise.all(
      versions.map(version =>
        version.content.content.map(async node => findImages(node)),
      ),
    )

    const fullContent = {
      type: 'doc',
      content: [
        {
          type: 'question_list',
          content: [],
        },
      ],
    }

    versions.forEach(version => {
      fullContent.content[0].content.push({
        type: 'question',
        content: [...version.content.content],
      })
    })

    const converter = new WaxToDocxConverter(
      fullContent,
      imageData,
      {},
      {
        showFeedback,
      },
    )

    const filename = `${listId}.docx`
    const filePath = path.join(tempFolderPath, filename)
    await converter.writeToPath(filePath)
    await clearTempImageFiles(imageData)
    return filename
  } catch (error) {
    await clearTempImageFiles(imageData)
    logger.error(`${CONTROLLER_MESSAGE} ${error}`)
    throw new Error(error)
  }
}

const reorderList = async (listId, customOrder, options = {}) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} reorderList:`

  try {
    return useTransaction(
      async trx => {
        return List.patchAndFetchById(listId, { customOrder }, trx)
      },
      {
        trx: options.trx,
      },
    )
  } catch (e) {
    logger.error(`${CONTROLLER_MESSAGE} ${e.message}`)
    throw new Error(e)
  }
}

module.exports = {
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
}
