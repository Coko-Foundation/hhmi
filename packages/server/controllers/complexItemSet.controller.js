const { logger, useTransaction } = require('@coko/server')
const config = require('config')
const { ComplexItemSet, Question, Team, User } = require('../models')
const { labels } = require('./constants')
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
}
