const path = require('path')
const config = require('config')

const { createFile, logger, useTransaction } = require('@coko/server')

const {
  User,
  Question,
  QuestionVersion,
  Team,
  TeamMember,
  ComplexItemSet,
} = require('../models')

const WaxToDocxConverter = require('../services/docx/hhmiDocx.service')
const { clearTempImageFiles } = require('./helpers')
const { labels } = require('./constants')
const WaxToScormConverter = require('../services/scorm/scorm.service')
const WaxToQTIConverter = require('../services/qti/qti.service')
const metadataResolver = require('./metadataHandler')
const resources = require('./resourcesData')
const { getImageUrls, findImages } = require('./utils')

const AUTHOR_TEAM = config.teams.nonGlobal.author
const HE_TEAM = config.teams.nonGlobal.handlingEditor
const EDITOR_TEAM = config.teams.nonGlobal.editor
const BASE_MESSAGE = `${labels.QUESTION_CONTROLLERS}:`

const getQuestion = async (questionId, options = {}) => {
  const { trx } = options
  logger.info(
    `${BASE_MESSAGE} getQuestion: fetching question with id ${questionId}`,
  )

  return Question.getQuestion(questionId, { trx })
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

const getLeadingContentForQuestion = async version => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} getLeadingContentForQuestion:`
  const { complexItemSetId } = version

  if (!complexItemSetId) return ''

  try {
    const complexItemSet = await ComplexItemSet.findById(complexItemSetId)

    const contentWithImageUrls = await getImageUrls(
      complexItemSet.leadingContent,
    )

    return JSON.stringify(contentWithImageUrls)
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

const getPublishedQuestionsIds = async (options = {}) => {
  try {
    return useTransaction(
      async tr => {
        return Question.getPublishedQuestionsIds(options)
      },
      { trx: options.trx, passedTrxOnly: true },
    )
  } catch (e) {
    logger.error(`error getPublishedQuestions: ${e.message}`)
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

const getAuthor = async questionId => {
  return Question.getAuthor(questionId)
}

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
  const { orderBy, ascending, page, pageSize, filters, trx } = options

  // managing editor gets all questions apart from the ones they authored themselves
  return Question.findByExcludingRole(userId, 'author', {
    orderBy,
    ascending,
    page,
    pageSize,
    submittedOnly: true,
    filters,
    trx,
  })
}

const getHandlingEditorDashboard = async (userId, options = {}) => {
  const { orderBy, ascending, page, pageSize, searchQuery, trx } = options

  return Question.findByRole(userId, 'handlingEditor', {
    orderBy,
    ascending,
    page,
    pageSize,
    searchQuery,
    trx,
  })
}

const getQuestionParticipants = async questionId => {
  const auth = await User.query()
    .select('users.username', 'users.id')
    .leftJoin('team_members', 'users.id', 'team_members.user_id')
    .leftJoin('teams', 'teams.id', 'team_members.team_id')
    .where(builder => {
      builder.where('teams.role', EDITOR_TEAM.role).orWhere(subquery => {
        subquery
          .whereIn('teams.role', [AUTHOR_TEAM.role, HE_TEAM.role])
          .whereExists(
            Team.query()
              .select(1)
              .from('questions')
              .whereRaw('questions.id=teams.object_id')
              .where('questions.id', questionId),
          )
      })
    })

  return auth
}

/**
 * Create question & first question version
 * Add user that created it to the author team
 */
const createQuestion = async (userId, versionData, options = {}) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} createQuestion:`
  logger.info(`${CONTROLLER_MESSAGE} Create question by user with id ${userId}`)

  try {
    return useTransaction(
      async trx => {
        const question = await Question.insert({}, versionData, { trx })

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

const duplicateQuestion = async (userId, questionId, options = {}) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} duplicateQuestion:`
  logger.info(
    `${CONTROLLER_MESSAGE} Duplicating question  with id ${questionId}`,
  )

  return useTransaction(
    async trx => {
      const question = await Question.duplicateQuestion(questionId, { trx })

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
        const questionVersion = await QuestionVersion.patchAndFetchById(
          questionVersionId,
          versionData,
          { trx },
        )

        if (
          questionVersion.complexItemSetId !== null &&
          questionVersion.published
        ) {
          await ComplexItemSet.patchAndFetchById(
            questionVersion.complexItemSetId,
            { isPublished: true },
            {
              trx,
            },
          )
        }

        return questionVersion
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

  await modifyQuestion(questionId, {}, options, CONTROLLER_MESSAGE)

  await modifyQuestionVersion(
    questionVersionId,
    { ...data, lastEdit: new Date() },
    options,
    CONTROLLER_MESSAGE,
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

const moveQuestionVersionToProduction = async (
  questionVersionId,
  options = {},
) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} moveQuestionVersionToProduction:`
  logger.info(
    `${CONTROLLER_MESSAGE} moving question version with id ${questionVersionId} to production`,
  )

  return modifyQuestionVersion(
    questionVersionId,
    { underReview: false, inProduction: true },
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
      // set submitted to true in case it was not set before (fast published by admins); needed to retrieve question with editor query
      submitted: true,
      inProduction: false,
      published: true,
      publicationDate: new Date(),
    },
    { trx: options.trx },
  )
}

const assignAuthorship = async (questionId, userId, options = {}) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} assignAuthorship:`
  logger.info(
    `${CONTROLLER_MESSAGE} assigning user ${userId} as author of question ${questionId}`,
  )

  try {
    // await Question.assignAuthorship(questionId, userId)
    return useTransaction(
      async trx => {
        return Team.assignQuestionAuthor(questionId, userId, {
          trx,
        })
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

const generateScormZip = async questionVersionId => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} generateScormZip:`
  logger.info(
    `${CONTROLLER_MESSAGE} exporting latest question version with question version id ${questionVersionId}`,
  )

  try {
    const questionVersion = await QuestionVersion.findById(questionVersionId)

    const scormExporter = new WaxToScormConverter(questionVersion)

    const exportFilename = await scormExporter.buildScormExport()

    return exportFilename
  } catch (e) {
    logger.error(`${CONTROLLER_MESSAGE} ${e.message}`)
    throw new Error(e)
  }
}

const generateQtiZip = async questionVersionId => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} generateScormZip:`
  logger.info(
    `${CONTROLLER_MESSAGE} exporting latest question version with question version id ${questionVersionId}`,
  )

  try {
    const questionVersion = await QuestionVersion.findById(questionVersionId)

    let complexItemSet

    if (questionVersion.complexItemSetId) {
      complexItemSet = await ComplexItemSet.findById(
        questionVersion.complexItemSetId,
      )
    }

    const qtiExporter = new WaxToQTIConverter(
      [
        {
          ...questionVersion,
          content: {
            type: 'doc',
            content: [
              ...(complexItemSet ? complexItemSet.leadingContent.content : []),
              ...questionVersion.content.content,
            ],
          },
        },
      ],
      questionVersion.questionId,
    )

    const exportFilename = await qtiExporter.buildQtiExport()

    return exportFilename
  } catch (e) {
    logger.error(`${CONTROLLER_MESSAGE} ${e.message}`)
    throw new Error(e)
  }
}

const createNewQuestionVersion = async (questionId, options = {}) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} createNewQuestionVersion:`
  logger.info(
    `${CONTROLLER_MESSAGE} Create new question version for question ${questionId}`,
  )

  try {
    return useTransaction(
      async trx => {
        await Question.createNewVersion(
          { questionId },
          {
            trx,
          },
        )

        return getQuestion(questionId)
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

const formatDate = date => {
  if (!date) return 'N/A'

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const generateWordFile = async (questionVersionId, options = {}) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} generateWordFile:`
  logger.info(
    `${CONTROLLER_MESSAGE} generating word file for question version with id ${questionVersionId}`,
  )

  const imageData = {}

  try {
    /* INIT */

    const { showFeedback, showMetadata } = options

    const version = await QuestionVersion.findById(questionVersionId)

    const tempFolderPath = path.join(__dirname, '..', 'tmp')

    await Promise.all(
      version.content.content.map(async node =>
        findImages(node, imageData, tempFolderPath),
      ),
    )

    let complexItemSet

    if (version.complexItemSetId) {
      complexItemSet = await ComplexItemSet.findById(version.complexItemSetId)

      await Promise.all(
        complexItemSet.leadingContent.content.map(async node =>
          findImages(node, imageData, tempFolderPath),
        ),
      )
    }

    const converter = new WaxToDocxConverter(
      // prepend content from complex item set (if there is one) to the document
      {
        type: 'doc',
        content: [
          ...(complexItemSet ? complexItemSet.leadingContent.content : []),
          ...version.content.content,
        ],
      },
      imageData,
      {
        complexItemSet: complexItemSet?.title,
        questionType: version.questionType,

        topics: version.topics,
        courses: version.courses,

        keywords: version.keywords,
        biointeractiveResources: version.biointeractiveResources,

        cognitiveLevel: version.cognitiveLevel,
        affectiveLevel: version.affectiveLevel,
        psychomotorLevel: version.psychomotorLevel,
        readingLevel: version.readingLevel,

        publicationDate: formatDate(version.publicationDate),
      },
      {
        showFeedback,
        showMetadata,
      },
    )

    /* CONVERT */

    const filename = `${version.questionId}.docx`
    const filePath = path.join(tempFolderPath, filename)
    await converter.writeToPath(filePath)

    await clearTempImageFiles(imageData)
    return filename
  } catch (err) {
    await clearTempImageFiles(imageData)
    logger.error(`${CONTROLLER_MESSAGE} ${err}`)
    throw new Error(err)
  }
}

const resourceResolver = async () => resources

const assignHandlingEditors = async (questionIds, userIds, options = {}) => {
  const { trx } = options

  const result = await Promise.all(
    questionIds.map(async questionId => {
      const existingTeam = await Team.findOne({
        objectId: questionId,
        role: HE_TEAM.role,
      })

      const authorTeam = await Team.findOne({
        objectId: questionId,
        role: AUTHOR_TEAM.role,
      })

      // filtering out HES who are authors of the current question
      const author = await TeamMember.findOne({
        teamId: authorTeam.id,
      })

      const hasAuthorshipConflict = userIds.includes(author.userId)

      const filteredHEs = userIds.filter(userId => author.userId !== userId)

      //

      let members = []

      if (existingTeam) {
        members = await Promise.all(
          filteredHEs.map(async userId => {
            const existingMember = await TeamMember.findOne({
              teamId: existingTeam.id,
              userId,
            })

            if (existingMember) {
              return existingMember.id
            }

            const assignedMember = await Team.addMember(existingTeam.id, userId)

            return assignedMember.id
          }),
        )

        return {
          questionId,
          hasAuthorshipConflict,
          members,
        }
      }

      const newTeam = await Team.insert(
        {
          objectId: questionId,
          objectType: 'question',
          role: HE_TEAM.role,
          displayName: HE_TEAM.displayName,
        },
        { trx },
      )

      members = await Promise.all(
        filteredHEs.map(async userId => {
          const assignedMember = await Team.addMember(newTeam.id, userId)
          return assignedMember.id
        }),
      )

      return {
        questionId,
        hasAuthorshipConflict,
        members,
      }
    }),
  )

  return result
}

const getQuestionsHandlingEditors = async (questionId, options = {}) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} assignHandlingEditor:`
  logger.info(
    `${CONTROLLER_MESSAGE} getting handling editors for question ${questionId}`,
  )

  try {
    return Question.getHandlingEditors(questionId, options)
  } catch (error) {
    logger.error(`${CONTROLLER_MESSAGE} ${error}`)
    throw new Error(error)
  }
}

const unassignHandlingEditor = async (questionId, userId, options = {}) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} unassignHandlingEditor:`
  logger.info(
    `${CONTROLLER_MESSAGE} removing user ${userId} as handling editor for question ${questionId}`,
  )

  try {
    return useTransaction(
      async trx => {
        return Team.removeNonGlobalTeam(questionId, userId, { trx })
      },
      { trx: options.trx, passedTrxOnly: true },
    )
  } catch (error) {
    logger.error(`${CONTROLLER_MESSAGE} ${error}`)
    throw new Error(error)
  }
}

const getChatThreadForQuestion = async (questionId, options = {}) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} getChatThreadForQuestion:`
  logger.info(
    `${CONTROLLER_MESSAGE} getting chat thread for question ${questionId}`,
  )

  try {
    return Question.getChatThread(questionId, options)
  } catch (error) {
    logger.error(`${CONTROLLER_MESSAGE} ${error}`)
    throw new Error(error)
  }
}

const uploadFiles = async files => {
  const filesData = await Promise.all(files)

  return Promise.all(
    filesData.map(async file => {
      const stream = file.createReadStream()
      const storedFile = await createFile(stream, file.filename)
      return storedFile
    }),
  )
}

module.exports = {
  getQuestion,
  getQuestionVersions,
  getLeadingContentForQuestion,
  getPublishedQuestions,
  getPublishedQuestionsIds,

  getAuthor,
  getAuthorDashboard,
  getReviewerDashboard,
  getManagingEditorDashboard,
  getHandlingEditorDashboard,
  getQuestionParticipants,

  createQuestion,
  duplicateQuestion,
  updateQuestion,

  moveQuestionVersionToReview,
  moveQuestionVersionToProduction,
  publishQuestionVersion,
  rejectQuestion,
  submitQuestion,
  createNewQuestionVersion,
  assignAuthorship,

  metadataResolver,
  resourceResolver,
  generateScormZip,
  generateWordFile,
  generateQtiZip,

  assignHandlingEditors,
  getQuestionsHandlingEditors,
  unassignHandlingEditor,

  getChatThreadForQuestion,

  uploadFiles,
  getImageUrls,
}
