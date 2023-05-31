const fs = require('fs')
const { logger } = require('@coko/server')

const clearTempImageFiles = async imageData => {
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

module.exports = {
  clearTempImageFiles,
}
