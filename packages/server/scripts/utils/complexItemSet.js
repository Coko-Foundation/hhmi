const { logger } = require('@coko/server')
const { ComplexItemSet, QuestionVersion, User } = require('../../models')

const {
  createComplexItemSet,
} = require('../../controllers/complexItemSet.controller')

/**
 *
 * @param {string} username
 * @param {string} title
 * @param {string} contentText
 * @returns {boolean}
 */

const createComplexItem = async (username, title, contentText) => {
  try {
    const leadingContentTemplate = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          attrs: { class: 'paragraph' },
          content: [{ type: 'text', text: contentText }],
        },
      ],
    }

    const user = await User.findOne({ username })

    if (!user) {
      throw new Error('User with the given username is not found!')
    }

    await createComplexItemSet(user.id, title, leadingContentTemplate)

    return true
  } catch (err) {
    logger.error(err)
    return false
  }
}

/**
 *
 * @param {string} title
 * @param {string} questionId
 */

const addQuestionToSet = async (title, questionId) => {
  try {
    const complexItemSet = await ComplexItemSet.findOne({ title })

    if (!complexItemSet) {
      throw new Error(
        "Context-dependent item set with the given title doesn't exist!",
      )
    }

    const res = await QuestionVersion.query()
      .findOne({
        questionId,
      })
      .patch({ complexItemSetId: complexItemSet.id })
      .returning('*')

    if (res.published) {
      await complexItemSet.patch({ isPublished: true })
    }

    if (!res) {
      throw new Error('Check the question id that is passed!')
    }

    return true
  } catch (err) {
    logger.error(err)
    return false
  }
}

module.exports = {
  createComplexItem,
  addQuestionToSet,
}
