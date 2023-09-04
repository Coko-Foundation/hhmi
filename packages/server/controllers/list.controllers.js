const path = require('path')
const { uniq } = require('lodash')

const { logger, useTransaction } = require('@coko/server')

const config = require('config')

const {
  List,
  ListMember,
  Team,
  Question,
  ComplexItemSet,
} = require('../models')

const { clearTempImageFiles } = require('./helpers')
const { findImages } = require('./utils')
const { labels } = require('./constants')
const WaxToDocxConverter = require('../services/docx/hhmiDocx.service')
const WaxToQTIConverter = require('../services/qti/qti.service')

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
    return List.findListQuestions(
      list.id,
      list.questionsQuery,
      list.questionsOptions,
      list.customOrder,
    )
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

    // update custom order
    const list = await List.findById(listId)

    await reorderList(listId, uniq([...list.customOrder, ...questionIds]), {
      trx,
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

    // remove questionIds from customOrder field
    const list = await List.findById(listId)

    const newCustomOrder = list.customOrder.filter(
      id => questionIds.indexOf(id) === -1,
    )

    await reorderList(listId, newCustomOrder, options)

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
  const tempFolderPath = path.join(__dirname, '..', 'tmp')

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

    // check for version.complexItemSetId
    const complexItemSets = versions.map(v => v.complexItemSetId)

    const uniqueSets = [...new Set(complexItemSets)].filter(s => !!s)

    const map = new Map()
    uniqueSets.forEach(key => {
      map.set(
        key,
        versions.filter(v => v.complexItemSetId === key),
      )
    })

    let versionsSorted = []
    versions.forEach(v => {
      if (v.complexItemSetId === null) {
        versionsSorted.push(v)
      } else if (map.get(v.complexItemSetId)) {
        versionsSorted.push(map.get(v.complexItemSetId))
        map.delete(v.complexItemSetId)
      }
    })
    versionsSorted = versionsSorted.flat()

    // if any, fetch them and resolve if they have any images
    const leadingContent = await Promise.all(
      uniqueSets.map(async id => {
        const set = await ComplexItemSet.findById(id)
        return { id, type: 'complexItemSet', content: set.leadingContent }
      }),
    )

    leadingContent.forEach(set => {
      const firstVersionOfSet = versionsSorted.findIndex(
        v => v.complexItemSetId === set.id,
      )

      versionsSorted.splice(firstVersionOfSet, 0, set)
    })

    const allVersionsContent = versionsSorted.map(
      version => version.content.content,
    )

    await Promise.all(
      allVersionsContent
        .flat()
        .map(async node => findImages(node, imageData, tempFolderPath)),
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

    versionsSorted.forEach((version, i) => {
      if (version.type === 'complexItemSet') {
        fullContent.content[0].content.push({
          type: 'leading_content',
          content: [...version.content.content],
        })
      } else {
        fullContent.content[0].content.push({
          type: 'question',
          content: [...version.content.content],
        })
      }
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

  try {
    const questions = await getListQuestions({
      id: listId,
      questionsOptions: { page: 0, pageSize: 1000 }, // all questions in a list
    })

    const questionIds = questions.result.map(question => question.id)

    return exportQuestionsToWordFile(
      listId,
      questionIds,
      orderBy,
      ascending,
      options,
    )
  } catch (error) {
    logger.error(`${CONTROLLER_MESSAGE} ${error}`)
    throw new Error(error)
  }
}

const exportQuestionsToQti = async (
  listId,
  questionIds,
  orderBy,
  ascending,
) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} exportQuestionsToQti:`
  logger.info(
    `${CONTROLLER_MESSAGE} generating qti package for list of questions with ids ${questionIds}`,
  )

  try {
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

    // TODO: handle complex item set questions

    const qtiExporter = new WaxToQTIConverter(versions, listId)

    const exportFilename = await qtiExporter.buildQtiExport()

    return exportFilename
  } catch (error) {
    logger.error(`${CONTROLLER_MESSAGE} ${error}`)
    throw new Error(error)
  }
}

const exportListToQti = async (listId, orderBy, ascending) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} exportListToQti:`
  logger.info(
    `${CONTROLLER_MESSAGE} generating qti package for list with id ${listId}`,
  )

  try {
    const questions = await getListQuestions({
      id: listId,
      questionsOptions: { page: 0, pageSize: 1000 }, // all questions in a list
    })

    const questionIds = questions.result.map(question => question.id)

    return exportQuestionsToQti(listId, questionIds, orderBy, ascending)
  } catch (error) {
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
  exportQuestionsToQti,
  exportListToQti,
  reorderList,
}
