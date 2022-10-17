const fs = require('fs')
const path = require('path')

const { logger } = require('@coko/server')

const ensureTempFolderExists = () => {
  logger.info('Ensuring "tmp" folder exists...')

  const tempFolderPath = path.join(__dirname, '..', 'tmp')

  fs.stat(tempFolderPath, (err, stats) => {
    if (err || !stats.isDirectory()) {
      logger.info('"tmp" folder does not exist. Creating...')
      fs.mkdirSync(tempFolderPath)
      logger.info('"tmp" folder created')
    } else {
      logger.info('"tmp" folder already exists')
    }
  })
}

ensureTempFolderExists()
