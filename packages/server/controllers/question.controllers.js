const fs = require('fs')
const path = require('path')
const config = require('config')
const cloneDeep = require('lodash/cloneDeep')

const {
  createFile,
  fileStorage,
  logger,
  uuid,
  useTransaction,
  File,
} = require('@coko/server')

const { Question, QuestionVersion, Team } = require('../models')
const WaxToDocxConverter = require('../services/docx/hhmiDocx.service')
const { labels } = require('./constants')
const WaxToScormConverter = require('../services/scorm/scorm.service')
const metadataResolver = require('./metadataHandler')
const resources = require('./resourcesData')

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

const createNewQuestionVersion = async (questionId, options = {}) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} createNewQuestionVersion:`
  logger.info(
    `${CONTROLLER_MESSAGE} Create new question version for question ${questionId}`,
  )

  try {
    return useTransaction(
      async trx => {
        await Question.createNewVersion(questionId, {
          trx,
        })

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

const generateWordFile = async (questionVersionId, options = {}) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} generateWordFile:`
  logger.info(
    `${CONTROLLER_MESSAGE} generating word file for question version with id ${questionVersionId}`,
  )

  const imageData = {}

  const clearTempImageFiles = async () => {
    await Promise.all(
      Object.keys(imageData).map(key => {
        return new Promise((resolve, reject) => {
          try {
            const pathToDelete = imageData[key]
            fs.unlink(pathToDelete, e => {
              if (e) throw new Error(e)
              logger.info(`${pathToDelete} deleted from temp folder`)
            })
            resolve()
          } catch (e) {
            if (e) {
              logger.error(e)
              reject(e)
            }
          }
        })
      }),
    )
  }

  try {
    // fake long wait
    // await new Promise(resolve => {
    //   setTimeout(resolve, 2000)
    // })

    // fake error
    // throw new Error('test')

    /* INIT */

    const { showFeedback, showMetadata } = options

    const version = await QuestionVersion.findById(questionVersionId)

    const formatDate = date => {
      if (!date) return 'N/A'

      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }

    // console.log(version.content)

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
      version.content.content.map(async node => findImages(node)),
    )

    const converter = new WaxToDocxConverter(
      version.content,
      imageData,
      {
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

    await clearTempImageFiles()
    return filename
  } catch (err) {
    await clearTempImageFiles()
    logger.error(`${CONTROLLER_MESSAGE} ${err}`)
    throw new Error(err)
  }
}

const resourceResolver = async () => resources

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

// Populates a wax document with valid image urls
const getImageUrls = async document => {
  try {
    const findImages = async doc => {
      if (!doc || !doc.content) return doc

      const clonedDocument = cloneDeep(doc)

      clonedDocument.content = await Promise.all(
        doc.content.map(async item => {
          if (item.type === 'figure') {
            const clonedItem = cloneDeep(item)
            const { attrs } = clonedItem.content[0]

            if (!attrs.extraData || !attrs.extraData.fileId) {
              logger.warn('Image without file id detected!')
              return item
            }

            const { fileId } = attrs.extraData
            const file = await File.findById(fileId)
            const { key } = file.storedObjects.find(o => o.type === 'medium')
            clonedItem.content[0].attrs.src = await fileStorage.getURL(key)
            return clonedItem
          }

          return findImages(item)
        }),
      )

      return clonedDocument
    }

    return findImages(document)
  } catch (e) {
    throw new Error(e)
  }
}

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
  moveQuestionVersionToProduction,
  publishQuestionVersion,
  rejectQuestion,
  submitQuestion,

  metadataResolver,
  resourceResolver,
  generateScormZip,
  generateWordFile,
  createNewQuestionVersion,

  uploadFiles,
  getImageUrls,
}
