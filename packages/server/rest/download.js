const fs = require('fs')
const path = require('path')
const { logger } = require('@coko/server')

const download = app => {
  app.get('/api/download/:filename', async (req, res) => {
    try {
      const filePath = path.join(__dirname, '..', 'tmp', req.params.filename)

      res.download(filePath, downloadErr => {
        if (downloadErr) {
          logger.error(downloadErr)
          res.send(500)
        }

        res.end()

        // delete temp file
        fs.unlink(filePath, unlinkErr => {
          if (unlinkErr) {
            logger.error(`${filePath} NOT deleted after download! ${unlinkErr}`)
          } else {
            logger.info(`${filePath} deleted from temp folder`)
          }
        })
      })
    } catch (e) {
      logger.error(e)
      res.send(500)
    }
  })
}

module.exports = download
