const config = require('config')

const { logger, useTransaction } = require('@coko/server')
const Team = require('@coko/server/src/models/team/team.model')

const { Question, QuestionVersion } = require('../models')
const { labels } = require('./constants')

const AUTHOR_TEAM = config.teams.nonGlobal.author
const BASE_MESSAGE = `${labels.QUESTION_CONTROLLERS}:`

const getQuestion = async questionId => {
  logger.info(
    `${BASE_MESSAGE} getQuestion: fetching question with id ${questionId}`,
  )

  return Question.findById(questionId)
}

const getQuestionVersions = async (questionId, options = {}) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} getQuestionVersions:`
  logger.info(
    `${CONTROLLER_MESSAGE} fetching versions for question with id ${questionId}`,
  )

  try {
    const { latestOnly, publishedOnly, trx } = options

    const res = await Question.getVersions(questionId, {
      latestOnly,
      publishedOnly,
      trx,
    })

    return res.result
  } catch (e) {
    logger.error(`${CONTROLLER_MESSAGE} ${e.message}`)
    throw new Error(e)
  }
}

const getPublishedQuestions = (options = {}) => {
  const { orderBy, page, pageSize, trx } = options
  return Question.getPublishedQuestions({ orderBy, page, pageSize, trx })
}

// const getDashboardData = (userId, isManagingEditor) => {
//   const authorData = Question.findByRole(userId, 'author')
//   const reviewerData = Question.findByRole(userId, 'reviewer')

//   let managingEditorData

//   // managing editor gets all questions apart from the ones they authored themselves
//   if (isManagingEditor) {
//     managingEditorData = Question.findByExcludingRole(userId, 'author')
//   }

//   return {
//     author: authorData,
//     reviewer: reviewerData,
//     editor: managingEditorData,
//   }
// }

const getAuthorDashboard = (userId, options = {}) => {
  const { orderBy, page, pageSize, trx } = options
  return Question.findByRole(userId, 'author', { orderBy, page, pageSize, trx })
}

const getReviewerDashboard = (userId, options = {}) => {
  const { orderBy, page, pageSize, trx } = options

  return Question.findByRole(userId, 'reviewer', {
    orderBy,
    page,
    pageSize,
    trx,
  })
}

const getManagingEditorDashboard = (userId, options = {}) => {
  const { orderBy, page, pageSize, trx } = options

  // managing editor gets all questions apart from the ones they authored themselves
  return Question.findByExcludingRole(userId, 'author', {
    orderBy,
    page,
    pageSize,
    trx,
  })
}

/**
 * Create question & first question version
 * Add user that created it to the author team
 */
const createQuestion = async (userId, options = {}) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} createQuestion:`
  logger.info(`${CONTROLLER_MESSAGE} Create question by user with id ${userId}`)

  try {
    return useTransaction(
      async trx => {
        const question = await Question.insert({}, { trx })

        const authorTeam = await Team.insert(
          {
            objectId: question.id,
            objectType: 'question',
            role: AUTHOR_TEAM.role,
            displayName: AUTHOR_TEAM.displayName,
          },
          { trx },
        )

        await Team.addMember(authorTeam.id, userId, { trx })

        return question
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

const submitQuestion = async (
  questionId,
  questionVersionId,
  data,
  options = {},
) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} submitQuestion:`
  logger.info(`${CONTROLLER_MESSAGE} submitting question with id ${questionId}`)

  try {
    const newData = { ...data, submitted: true }
    return updateQuestion(questionId, questionVersionId, newData, options)
  } catch (e) {
    logger.error(`${CONTROLLER_MESSAGE} ${e.message}`)
    throw new Error(e)
  }
}

const updateQuestion = async (
  questionId,
  questionVersionId,
  data,
  options = {},
) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} updateQuestion:`
  logger.info(`${CONTROLLER_MESSAGE} updating question with id ${questionId}`)

  try {
    const { agreedTc, ...versionData } = data

    return useTransaction(
      async trx => {
        const updatedQuestion = await Question.patchAndFetchById(
          questionId,
          { agreedTc },
          { trx },
        )

        await QuestionVersion.patchAndFetchById(
          questionVersionId,
          { ...versionData },
          { trx },
        )

        return updatedQuestion
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

const rejectQuestion = async (questionId, options = {}) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} rejectQuestion:`
  logger.info(`${CONTROLLER_MESSAGE} rejecting question with id ${questionId}`)

  try {
    return Question.patchAndFetchById(
      questionId,
      { rejected: true },
      { trx: options.trx },
    )
  } catch (e) {
    logger.error(`${CONTROLLER_MESSAGE} ${e.message}`)
    throw new Error(e)
  }
}

const moveQuestionVersionToReview = async (questionVersionId, options = {}) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} moveQuestionVersionToReview:`
  logger.info(
    `${CONTROLLER_MESSAGE} moving question version with id ${questionVersionId} to review`,
  )

  try {
    return QuestionVersion.patchAndFetchById(
      questionVersionId,
      { underReview: true },
      { trx: options.trx },
    )
  } catch (e) {
    logger.error(`${CONTROLLER_MESSAGE} ${e.message}`)
    throw new Error(e)
  }
}

const publishQuestionVersion = async (questionVersionId, options = {}) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} publishQuestionVersion:`
  logger.info(
    `${CONTROLLER_MESSAGE} publishing question version with id ${questionVersionId}`,
  )

  try {
    return QuestionVersion.patchAndFetchById(
      questionVersionId,
      {
        underReview: false,
        published: true,
      },
      { trx: options.trx },
    )
  } catch (e) {
    logger.error(`${CONTROLLER_MESSAGE} ${e.message}`)
    throw new Error(e)
  }
}

// const deleteQuestion = async questionId => {
//   const CONTROLLER_MESSAGE = `${BASE_MESSAGE} deleteQuestion:`
//   logger.info(
//     `${CONTROLLER_MESSAGE} deleting question with id ${questionId} and all its versions`,
//   )
//
//   try {
//     return useTransaction(
//       async trx => {
//         // await
//         return Question.deleteById(questionId)
//       },
//       { trx },
//     )
//   } catch (e) {
//     logger.error(`${QUESTION_CONTROLLER} deleteQuestion: ${e.message}`)
//     throw new Error(e)
//   }
// }

module.exports = {
  getQuestion,
  getQuestionVersions,
  getPublishedQuestions,

  getAuthorDashboard,
  getReviewerDashboard,
  getManagingEditorDashboard,

  createQuestion,
  updateQuestion,

  moveQuestionVersionToReview,
  publishQuestionVersion,
  rejectQuestion,
  submitQuestion,
}
