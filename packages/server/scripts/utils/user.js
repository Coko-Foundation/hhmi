const crypto = require('crypto')
const { logger } = require('@coko/server')

const { Identity, User, Team } = require('../../models')

/**
 *
 * @param {string} email
 * @param {string} role
 * @returns {boolean}
 */
const addToTeams = async (email, role) => {
  try {
    const roles = ['admin', 'reviewer', 'editor']

    const checkRole = () => {
      const index = roles.findIndex(fn => fn === role)

      return index >= 0
    }

    if (!checkRole()) {
      throw new Error('Invalid role!')
    }

    const identity = await Identity.findOne({
      email,
    })

    const user = await User.findById(identity.userId)

    const team = await Team.findOne({
      role,
      global: true,
    })

    await Team.addMember(team.id, user.id)
    return true
  } catch (err) {
    logger.error(err)
    return false
  }
}

/**
 *
 * @param {string} email
 * @param {boolean} profileSubmitted
 * @param {string} username
 * @param {string} role
 * @returns {boolean}
 */

const seedUser = async (email, profileSubmitted, username, role) => {
  try {
    const newUser = await User.insert({
      username,
      displayName: username,
      password: 'Password@123',
      agreedTc: true,
      isActive: true,
      profileSubmitted,
    })

    const verificationToken = crypto.randomBytes(64).toString('hex')
    const verificationTokenTimestamp = new Date()

    await Identity.insert({
      userId: newUser.id,
      email,
      isVerified: true,
      isDefault: true,
      verificationTokenTimestamp,
      verificationToken,
    })

    await addToTeams(email, role)

    return true
  } catch (err) {
    return false
  }
}

module.exports = { seedUser, addToTeams }
