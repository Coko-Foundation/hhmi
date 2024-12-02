/* eslint-disable import/no-extraneous-dependencies */
const mime = require('mime-types')
const fs = require('fs-extra')
const { logger, useTransaction } = require('@coko/server')
const path = require('path')

const File = require('@coko/server/src/models/file/file.model')

const { fileStorage, tempFolderPath } = require('@coko/server')

exports.up = async () => {
  try {
    return useTransaction(async trx => {
      // upload default "missing file" image
      const fileStream = fs.createReadStream(
        path.join(__dirname, 'missing-file.png'),
      )

      const defaultStoredObjects = await fileStorage.upload(
        fileStream,
        'missing.png',
      )

      // check existing files and replace missing ones with a reference to the default image
      const files = await File.query(trx)

      await Promise.all(
        files.map(async file => {
          const mimetype = mime.lookup(file.name)

          if (mimetype.match(/^image\//)) {
            const tempFileDir = path.join(tempFolderPath, file.id)
            await fs.ensureDir(tempFileDir)

            const originalStoredObject = file.storedObjects.find(
              storedObject => storedObject.type === 'original',
            )

            const tempPath = path.join(tempFileDir, originalStoredObject.key)

            try {
              await fileStorage.download(originalStoredObject.key, tempPath)
            } catch (e) {
              logger.info('Missing key, replacing with default image')

              await File.query(trx).patchAndFetchById(file.id, {
                storedObjects: defaultStoredObjects,
              })
            }

            fs.unlinkSync(tempPath)
          }
        }),
      )

      return true
    })
  } catch (e) {
    logger.error('File: Replace missing images migration failed!')
    throw new Error(e)
  }
}
