const { logger, useTransaction } = require('@coko/server')
const path = require('path')
const config = require('config')
const { ComplexItemSet, Question, Team, User } = require('../models')
const { labels } = require('./constants')
const { findImages } = require('./utils')
const { clearTempImageFiles } = require('./helpers')
const WaxToDocxConverter = require('../services/docx/hhmiDocx.service')
const WaxToQTIConverter = require('../services/qti/qti.service')
// const { applyListQueryOptions } = require('../models/helpers')

const AUTHOR_TEAM = config.teams.nonGlobal.author
const BASE_MESSAGE = `${labels.SETS_CONTROLLERS}:`

const getComplexItemSets = async (user, params = {}, options = {}) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} getComplexItemSets:`

  const { searchQuery } = params

  try {
    return ComplexItemSet.filterSetsForUser(user, searchQuery, options)
  } catch (e) {
    logger.error(`${CONTROLLER_MESSAGE} ${e.message}`)
    throw new Error(e)
  }
}

const getComplexItemSet = async complexItemSetId => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} getComplexItemSet:`

  try {
    return ComplexItemSet.findById(complexItemSetId)
  } catch (e) {
    logger.error(`${CONTROLLER_MESSAGE} ${e.message}`)
    throw new Error(e)
  }
}

const getAvailableSets = async userId => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} getAvailableSets:`

  try {
    return ComplexItemSet.filterSetsForUser(userId)
  } catch (e) {
    logger.error(`${CONTROLLER_MESSAGE} ${e.message}`)
    throw new Error(e)
  }
}

const createComplexItemSet = async (userId, title, leadingContent) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} createComplexItemSet:`

  try {
    return useTransaction(async trx => {
      const complexItemSet = await ComplexItemSet.insert(
        {
          title,
          leadingContent,
        },
        { trx },
      )

      const authorTeam = await Team.insert(
        {
          objectId: complexItemSet.id,
          objectType: 'complexItemSet',
          role: AUTHOR_TEAM.role,
          displayName: AUTHOR_TEAM.displayName,
        },
        { trx },
      )

      await Team.addMember(authorTeam.id, userId, { trx })

      return {
        ...complexItemSet,
        leadingContent: JSON.stringify(complexItemSet.leadingContent),
      }
    })
  } catch (e) {
    logger.error(`${CONTROLLER_MESSAGE} ${e.message}`)
    throw new Error(e)
  }
}

const editComplexItemSet = async (id, title, leadingContent) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} editComplexItemSet:`

  try {
    return useTransaction(async trx => {
      const complexItemSet = await ComplexItemSet.patchAndFetchById(
        id,
        {
          title,
          leadingContent,
        },
        { trx },
      )

      return {
        ...complexItemSet,
        leadingContent: complexItemSet.leadingContent,
      }
    })
  } catch (e) {
    logger.error(`${CONTROLLER_MESSAGE} ${e.message}`)
    throw new Error(e)
  }
}

const getQuestionForComplexItemSet = async (
  complexItemSetId,
  userId,
  options = {},
) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} getQuestionForComplexItemSet:`

  try {
    return Question.getSetsQuestionsForUser(complexItemSetId, userId, options)
  } catch (e) {
    logger.error(`${CONTROLLER_MESSAGE} ${e.message}`)
    throw new Error(e)
  }
}

const getAuthorForComplexItemSet = async (complexItemSetId, options = {}) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} getAuthorForComplexItemSet:`

  try {
    const { trx } = options

    const author = await ComplexItemSet.query(trx)
      .leftJoin('teams', 'complex_item_sets.id', 'teams.object_id')
      .leftJoin('team_members', 'teams.id', 'team_members.team_id')
      .select('team_members.user_id')
      .findOne({ 'teams.role': 'author', 'teams.objectId': complexItemSetId })
      .throwIfNotFound()

    return User.findById(author.userId)
  } catch (e) {
    logger.error(`${CONTROLLER_MESSAGE} ${e.message}`)
    throw new Error(e)
  }
}

const containsSubmissions = async complexItemSet => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} containsSubmissions:`

  try {
    return useTransaction(async trx => {
      const questions = await Question.query(trx)
        .leftJoin(
          'question_versions',
          'questions.id',
          'question_versions.question_id',
        )
        .select(
          'questions.*',
          'question_versions.submitted',
          'question_versions.complex_item_set_id',
        )
        .distinctOn('questions.id')
        .where({
          complex_item_set_id: complexItemSet.id,
        })
        .orderBy([
          'questions.id',
          { column: 'question_versions.created', order: 'desc' },
        ])

      return questions.some(q => q.submitted)
    })
  } catch (e) {
    logger.error(`${CONTROLLER_MESSAGE} ${e.message}`)
    throw new Error(e)
  }
}

const assignAuthorForComplexItemSet = async (setId, userId) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} assignAuthorForComplexItemSet:`

  try {
    return useTransaction(async trx => {
      return Team.assignSetAuthor(setId, userId, {
        trx,
      })
    })
  } catch (e) {
    logger.error(`${CONTROLLER_MESSAGE} ${e.message}`)
    throw new Error(e)
  }
}

const exportSets = async (setIds, userId, options) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} exportSets:`
  logger.info(
    `${CONTROLLER_MESSAGE} generating word file for sets with ids ${setIds.join(
      ', ',
    )}`,
  )

  try {
    const questions = await Promise.all(
      setIds.map(async id => {
        const setQuestions = await getQuestionForComplexItemSet(
          id,
          userId,
          options,
        )

        return setQuestions.result
      }),
    )

    const questionIds = questions.flat().map(question => question.id)

    return exportSetQuestions(setIds, questionIds, options)
  } catch (error) {
    logger.error(`${CONTROLLER_MESSAGE} ${error}`)
    throw new Error(error)
  }
}

const exportSetQuestions = async (setIds, questionIds, options) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} exportSetQuestions:`
  logger.info(
    `${CONTROLLER_MESSAGE} generating word file for questions with ids ${questionIds}`,
  )

  const imageData = {}
  const tempFolderPath = path.join(__dirname, '..', 'tmp')

  try {
    const { showFeedback } = options

    const setIdsArray = typeof setIds === 'object' ? setIds : [setIds]

    const leadingContent = await Promise.all(
      setIdsArray.map(async id => {
        const set = await ComplexItemSet.findById(id)
        return { id, type: 'complexItemSet', content: set.leadingContent }
      }),
    )

    const versions = await Promise.all(
      questionIds.map(async questionId => {
        const versionsResult = await Question.getVersions(questionId, {
          latestOnly: true,
        })

        return versionsResult.result[0]
      }),
    )

    if (versions.length === 0) {
      logger.error(`${CONTROLLER_MESSAGE} 'list is empty'`)
      throw new Error("The list you're trying to export is empty")
    }

    const complexItemSets = versions.map(v => v.complexItemSetId)

    const map = new Map()
    complexItemSets.forEach(key => {
      map.set(
        key,
        versions.filter(v => v.complexItemSetId === key),
      )
    })

    let versionsSorted = []
    versions.forEach(v => {
      if (map.get(v.complexItemSetId)) {
        versionsSorted.push(map.get(v.complexItemSetId))
        map.delete(v.complexItemSetId)
      }
    })
    versionsSorted = versionsSorted.flat()

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

    const filename =
      setIdsArray.lengh > 1 ? `sets-export.docx` : `${setIdsArray[0]}.docx`

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

const exportSetsQTI = async (setIds, userId) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} exportSetsQTI:`
  logger.info(
    `${CONTROLLER_MESSAGE} generating qti package for sets with ids ${setIds.join(
      ', ',
    )}`,
  )

  try {
    const questions = await Promise.all(
      setIds.map(async id => {
        const setQuestions = await getQuestionForComplexItemSet(id, userId)

        return setQuestions.result
      }),
    )

    const questionIds = questions
      .flat()
      .map(question => question.id)
      .filter(question => question.questionType !== 'numerical')

    return exportSetQuestionsQTI(setIds, questionIds)
  } catch (error) {
    logger.error(`${CONTROLLER_MESSAGE} ${error}`)
    throw new Error(error)
  }
}

const exportSetQuestionsQTI = async (setIds, questionIds) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} exportSetQuestionsQTI:`
  logger.info(
    `${CONTROLLER_MESSAGE} generating qti package for questions with ids ${questionIds}`,
  )

  try {
    const setIdsArray = typeof setIds === 'object' ? setIds : [setIds]

    const leadingContent = await Promise.all(
      setIdsArray.map(async id => {
        const set = await ComplexItemSet.findById(id)
        return { id, type: 'complexItemSet', content: set.leadingContent }
      }),
    )

    const versions = await Promise.all(
      questionIds.map(async questionId => {
        const versionsResult = await Question.getVersions(questionId, {
          latestOnly: true,
        })

        return versionsResult.result[0]
      }),
    )

    versions.forEach((version, i) => {
      version.content.content.unshift(
        // ...[...complexItemSets[i].leadingContent.content],
        ...[
          ...leadingContent.find(l => l.id === version.complexItemSetId).content
            .content,
        ],
      )
    })

    const qtiExporter = new WaxToQTIConverter(
      versions,
      setIdsArray.lengh > 1 ? `sets-QTI-export` : `${setIdsArray[0]}`,
    )

    const exportFilename = await qtiExporter.buildQtiExport()

    return exportFilename
  } catch (error) {
    logger.error(`${CONTROLLER_MESSAGE} ${error}`)
    throw new Error(error)
  }
}

module.exports = {
  getComplexItemSets,
  getComplexItemSet,
  getAvailableSets,
  createComplexItemSet,
  editComplexItemSet,
  getQuestionForComplexItemSet,
  getAuthorForComplexItemSet,
  containsSubmissions,
  assignAuthorForComplexItemSet,
  exportSets,
  exportSetQuestions,
  exportSetsQTI,
  exportSetQuestionsQTI,
}
