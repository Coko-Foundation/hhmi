const { logger, useTransaction } = require('@coko/server')
const { ChatThread, ChatMessage } = require('@coko/server/src/models')

const {
  Question,
  QuestionVersion,
  Team,
  User,
  ComplexItemSet,
} = require('../../models')

const getUser = async username => {
  const user = await User.findOne({ username })
  return user
}

const assingHandlingEditor = async (questionId, userId) => {
  try {
    const existingTeam = await Team.findOne({
      objectId: questionId,
      role: 'handlingEditor',
    })

    if (existingTeam) {
      await Team.addMember(existingTeam.id, userId)
      return true
    }

    const newTeam = await Team.insert({
      objectId: questionId,
      objectType: 'question',
      role: 'handlingEditor',
      displayName: 'Handling Editor',
    })

    await Team.addMember(newTeam.id, userId)
    return true
  } catch (err) {
    logger.error(err)
    return false
  }
}

const EmptyQuestionVersions = async () => {
  try {
    await QuestionVersion.query().delete()
    return true
  } catch (err) {
    logger.error(err)
    return false
  }
}

const EmptyQuestions = async () => {
  try {
    await ChatMessage.query().delete()
    await ChatThread.query().delete()
    await Question.query().delete()
    return true
  } catch (err) {
    logger.error(err)
    return false
  }
}

/**
 *
 * @param {string} username
 * @param {string} date
 * @param {object} data
 * @param {boolean} questionStatus
 * @returns {boolean}
 */
const createQuestion = async (
  username,
  date,
  data,
  questionStatus,
  HEUsername = undefined,
) => {
  const transactionCallback = async trx => {
    try {
      const user = await getUser(username)
      const questionData = await Question.insert({})

      const authorTeam = await Team.insert({
        objectId: questionData.id,
        objectType: 'question',
        role: 'author',
        displayName: 'Author',
      })

      const tm = await Team.addMember(authorTeam.id, user.id)

      if (HEUsername) {
        const he = await getUser(HEUsername)
        await assingHandlingEditor(questionData.id, he.id)
      }

      const questionVersion = await QuestionVersion.query(trx)
        .patch({
          ...data,
          questionId: questionData.id,
          created: date,
          updated: date,
          publicationDate: date,
          submitted: true,
          ...(questionStatus === 'notSubmitted'
            ? { submitted: false }
            : { [questionStatus]: true }),
        })
        .where('question_id', questionData.id)
        .returning('id')
      // temporary fix for created date issue

      // temporary fix for created date issue
      await Question.query(trx).findById(questionData.id).patch({
        created: date,
      })

      await QuestionVersion.query(trx).findById(questionVersion[0].id).patch({
        created: date,
      })

      if (!(questionData && questionVersion && tm)) {
        throw new Error("Something wen't wrong!")
      }

      return true
    } catch (err) {
      logger.error(err)
      return false
    }
  }

  return useTransaction(transactionCallback)
}

/**
 *
 * @param {string} id
 * @param {string} status
 * @returns {boolean}
 */

const updateStatus = async (id, status) => {
  const transactionCallback = async trx => {
    let patchValue = {}

    if (status === 'notSubmitted') {
      patchValue = {
        ...patchValue,
        submitted: false,
        published: false,
        inProduction: false,
        underReview: false,
      }
    } else if (status === 'published') {
      patchValue = { ...patchValue, inProduction: false, published: true }
    } else {
      patchValue = { [status]: true }
    }

    try {
      const updatedQuestion = await QuestionVersion.query()
        .patch(patchValue)
        .where('questionId', id)
        .returning('*')
        .first()

      if (status === 'published') {
        await ComplexItemSet.query()
          .patch({
            isPublished: true,
          })
          .where({ id: updatedQuestion.complexItemSetId })
      }

      if (!updatedQuestion) {
        throw new Error("Something wen't wrong!")
      }

      return true
    } catch (err) {
      logger.error(err)
      return false
    }
  }

  return useTransaction(transactionCallback)
}

/**
 *
 * @param {string} questionId - question id
 * @returns {boolean}
 */

const createChatThread = async relatedObjectId => {
  try {
    await ChatThread.insert({ relatedObjectId, chatType: 'question' })
    return true
  } catch (err) {
    logger.error(err)
    return false
  }
}

module.exports = {
  createChatThread,
  EmptyQuestionVersions,
  EmptyQuestions,
  createQuestion,
  updateStatus,
  assingHandlingEditor,
}
