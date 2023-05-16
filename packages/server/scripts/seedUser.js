/* eslint-disable import/newline-after-import */
const { logger } = require('@coko/server')

const { seedUser, addToTeams } = require('./utils/user')

/**
 * @dev : cmd arguements
 *        [2]- operationType [create,addToTeams]
 * --->   [2] = create
 *              [3] - email id (required)
 *              [4] - profileSubmitted (required if role is to be specified)
 *              [5] - role [admin,reviewer,editor] (default - editor)
 * --->   [2] = addToTeams
 *              [3] - email id
 *              [4] - role [admin,reviewer,editor]
 */

;(async () => {
  const operationType = process.argv[2]
  const email = process.argv[3] || 'testUser@gmail.com'

  switch (operationType) {
    case 'create': {
      const profileSubmitted = process.argv[4] === 'profileSubmitted'
      const username = email.split('@')[0]
      const role = process.argv[5]

      const result = await seedUser(email, profileSubmitted, username, role)

      if (result) {
        logger.info(`[seedUser]: user created with email - ${email}.`)
        if (role) logger.info(`[seedUser]: user given ${role} role.`)
      } else {
        logger.info(`[seedUser]: something wen't wrong!`)
      }

      break
    }

    case 'addToTeams': {
      const role = process.argv[4]
      const result = await addToTeams(email, role)

      if (result) {
        logger.info(`[seedUser]: ${email} given ${role} role!`)
      } else {
        logger.info(`[seedUser]: something wen't wrong!`)
      }

      break
    }

    default:
      logger.info('[seedUser]: invalid operation')
  }
})()
