const { logger } = require('@coko/server')
const { List, ListMember, Team, User } = require('../../models')

/**
 *
 * @param {string} title
 * @param {string} username
 * @returns {boolean}
 */

const createList = async (title, username) => {
  try {
    const user = await User.findOne({ username })
    const list = await List.insert({ title })

    const authorTeam = await Team.insert({
      objectId: list.id,
      objectType: 'list',
      role: 'author',
      displayName: 'Author',
    })

    await Team.addMember(authorTeam.id, user.id)
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
 * @returns {boolean}
 */

const addToExistingList = async (title, questionId) => {
  try {
    const list = await List.findOne({ title })
    await ListMember.insertIgnoreDuplicates({
      listId: list.id,
      questionId,
    })
    return true
  } catch (err) {
    logger.error(err)
    return false
  }
}

module.exports = {
  createList,
  addToExistingList,
}
