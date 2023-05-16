const { logger, useTransaction } = require('@coko/server')
const { Question, QuestionVersion, Team, User } = require('../../models')

module.exports.EmptyQuestionVersions = async () => {
  try {
    await QuestionVersion.query().delete()
    return true
  } catch (err) {
    logger.error(err)
    return false
  }
}

module.exports.EmptyQuestions = async () => {
  try {
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
module.exports.createQuestion = async (
  username,
  date,
  data,
  questionStatus,
) => {
  const transactionCallback = async trx => {
    try {
      const user = await User.findOne({ username })
      const questionData = await Question.insert({}, { trx })

      const authorTeam = await Team.insert(
        {
          objectId: questionData.id,
          objectType: 'question',
          role: 'author',
          displayName: 'Author',
        },
        { trx },
      )

      const tm = await Team.addMember(authorTeam.id, user.id, { trx })

      const questionVersion = await QuestionVersion.insert(
        {
          ...data,
          questionId: questionData.id,
          created: date,
          updated: date,
          publicationDate: date,
          [questionStatus]: true,
        },
        { trx },
      )
      // temporary fix for created date issue

      await Question.query(trx).findById(questionData.id).patch({
        created: date,
      })

      await QuestionVersion.query().findById(questionVersion.id).patch({
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

module.exports.updateStatus = async (id, status) => {
  const transactionCallback = async trx => {
    try {
      const updatedQuestion = await QuestionVersion.query()
        .patch({
          [status]: true,
        })
        .where('questionId', id)

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
