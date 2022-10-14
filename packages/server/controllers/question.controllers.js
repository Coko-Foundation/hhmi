const config = require('config')

const { logger, useTransaction } = require('@coko/server')

const { Question, QuestionVersion, Team } = require('../models')
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

const getPublishedQuestions = async (params = {}, options = {}) => {
  try {
    const { orderBy, ascending, page, pageSize, trx } = options

    return useTransaction(
      async tr => {
        return Question.filterPublishedQuestions(params, {
          orderBy,
          ascending,
          page,
          pageSize,
          trx: tr,
        })
      },
      { trx, passedTrxOnly: true },
    )
  } catch (e) {
    logger.error(`error getPublishedQuestions: ${e.message}`)
    throw new Error(e)
  }

  // return Question.findPublished({ orderBy, page, pageSize, trx })
}

const getPreviousOrNextQuestionsIds = async (
  which,
  currentQuestionId,
  params = {},
  options = {},
) => {
  try {
    const { orderBy, ascending } = options

    return Question.getPreviousOrNextQuestionId(
      which,
      currentQuestionId,
      params,
      {
        orderBy,
        ascending,
      },
    )
  } catch (e) {
    logger.error(`error getPreviousOrNextQuestionsIds: ${e.message}`)
    throw new Error(e)
  }
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

const getAuthorDashboard = async (userId, options = {}) => {
  const { orderBy, ascending, page, pageSize, searchQuery, trx } = options

  return Question.findByRole(userId, 'author', {
    orderBy,
    ascending,
    page,
    pageSize,
    searchQuery,
    trx,
  })
}

const getReviewerDashboard = async (userId, options = {}) => {
  const { orderBy, ascending, page, pageSize, searchQuery, trx } = options

  return Question.findByRole(userId, 'reviewer', {
    orderBy,
    ascending,
    page,
    pageSize,
    searchQuery,
    trx,
  })
}

const getManagingEditorDashboard = async (userId, options = {}) => {
  const { orderBy, ascending, page, pageSize, searchQuery, trx } = options

  // managing editor gets all questions apart from the ones they authored themselves
  return Question.findByExcludingRole(userId, 'author', {
    orderBy,
    ascending,
    page,
    pageSize,
    searchQuery,
    submittedOnly: true,
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

// update Question by id
const modifyQuestion = async (questionId, data, options, controllerMessage) => {
  const CONTROLLER_MESSAGE = `${controllerMessage} modifyQuestion:`
  logger.info(`${CONTROLLER_MESSAGE} updating question with id ${questionId}`)

  try {
    return useTransaction(
      async trx => {
        return Question.patchAndFetchById(questionId, data, { trx })
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

const modifyQuestionVersion = async (
  questionVersionId,
  versionData,
  options,
  controllerMessage,
) => {
  const CONTROLLER_MESSAGE = `${controllerMessage} updateQuestionVersion:`
  logger.info(
    `${CONTROLLER_MESSAGE} updating question version with id ${questionVersionId}`,
  )

  try {
    return useTransaction(
      async trx => {
        return QuestionVersion.patchAndFetchById(
          questionVersionId,
          versionData,
          { trx },
        )
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

  const { agreedTc, ...versionData } = data
  const newData = { ...versionData, submitted: true }
  // set submitted = true in QuestionVersion
  await modifyQuestionVersion(
    questionVersionId,
    newData,
    options,
    CONTROLLER_MESSAGE,
  )
  // set agreedTc = true in Question and return
  return modifyQuestion(questionId, { agreedTc }, options, CONTROLLER_MESSAGE)
}

const updateQuestion = async (
  questionId,
  questionVersionId,
  data,
  options = {},
) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} updateQuestion:`
  logger.info(`${CONTROLLER_MESSAGE} updating question with id ${questionId}`)

  await modifyQuestionVersion(
    questionVersionId,
    { ...data, lastEdit: new Date() },
    options,
  )
  return getQuestion(questionId)
}

const rejectQuestion = async (questionId, options = {}) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} rejectQuestion:`
  logger.info(`${CONTROLLER_MESSAGE} rejecting question with id ${questionId}`)

  return modifyQuestion(questionId, { rejected: true }, { trx: options.trx })
}

const moveQuestionVersionToReview = async (questionVersionId, options = {}) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} moveQuestionVersionToReview:`
  logger.info(
    `${CONTROLLER_MESSAGE} moving question version with id ${questionVersionId} to review`,
  )

  return modifyQuestionVersion(
    questionVersionId,
    { underReview: true },
    { trx: options.trx },
  )
}

const publishQuestionVersion = async (questionVersionId, options = {}) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} publishQuestionVersion:`
  logger.info(
    `${CONTROLLER_MESSAGE} publishing question version with id ${questionVersionId}`,
  )

  return modifyQuestionVersion(
    questionVersionId,
    {
      underReview: false,
      published: true,
      publicationDate: new Date(),
    },
    { trx: options.trx },
  )
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
  getPreviousOrNextQuestionsIds,

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
