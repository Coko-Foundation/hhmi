const { logger } = require('@coko/server')
const { seedUser } = require('./utils/user')

const { User } = require('../models')

// eslint-disable-next-line import/newline-after-import
;(async () => {
  const exists = await User.findOne({
    username: 'admin0',
  })

  if (exists) {
    logger.info('[seedAdmin0]: `admin0` with admin privelages already exists')
    return
  }

  await seedUser('admin0@hhmi.org', true, 'admin0', 'admin')
  logger.info(
    '[seedAdmin0]: User `admin0` has been created with admin privelages',
  )
})()
