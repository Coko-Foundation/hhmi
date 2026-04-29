const { logger, useTransaction } = require('@coko/server')
const crypto = require('crypto')
const { Identity, User } = require('../models')
const { addToTeams } = require('./utils/user')

const seedUser = async (email, username, givenNames, surname, role) => {
  try {
    logger.info(`Insert new user: ${email}`)

    const newUser = await User.insert({
      username,
      //   displayName: username,
      givenNames,
      surname,
      password: 'Password@123',
      agreedTc: true,
      isActive: true,
      profileSubmitted: true,
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

    if (role) await addToTeams(email, role)

    logger.info('created user ', email)

    return true
  } catch (err) {
    logger.error('Some error ocurred', err)
    return false
  }
}

// eslint-disable-next-line import/newline-after-import
module.exports = async (numberOfUsers = 100) => {
  try {
    await useTransaction(async trx => {
      const exists = await User.findOne({
        username: 'testUser0',
      })

      if (exists) {
        logger.info('[seed1000users]: `testUser0` already exists')
        return
      }

      logger.info(`CREATING ${numberOfUsers} test users`)

      // eslint-disable-next-line no-restricted-syntax
      for (const key of Array.from(Array(numberOfUsers).keys())) {
        // eslint-disable-next-line no-await-in-loop
        await seedUser(
          `testUser${key}@email.com`,
          `testUser${key}`,
          'Test',
          `User ${key}`,
          ['admin', 'reviewer', 'editor', 'handlingEditor', 'production'][
            Math.floor(Math.random() * 5)
          ],
          trx,
        )
      }

      //   await addToTeams('admin0@hhmi.org', 'admin')

      logger.info('[seed1000Users]: 1000 users created!!')
    })
  } catch (error) {
    throw new Error(error)
  }
}
