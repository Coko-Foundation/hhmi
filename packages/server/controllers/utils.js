const path = require('path')
const fs = require('fs').promises
const cloneDeep = require('lodash/cloneDeep')
const { logger, fileStorage, File, uuid, db } = require('@coko/server')
const { CourseMetadata } = require('../models')

// Populates a wax document with valid image urls
const getImageUrls = async document => {
  try {
    const findImages = async doc => {
      if (!doc || !doc.content) return doc

      const clonedDocument = cloneDeep(doc)

      clonedDocument.content = await Promise.all(
        doc.content.map(async item => {
          if (item.type === 'figure' && item.content[0]?.attrs?.extraData) {
            const clonedItem = cloneDeep(item)
            const { attrs } = clonedItem.content[0]

            if (!attrs.extraData || !attrs.extraData.fileId) {
              logger.warn('Image without file id detected!')
              return item
            }

            const { fileId } = attrs.extraData
            const file = await File.findById(fileId)
            const { key } = file.storedObjects.find(o => o.type === 'medium')
            clonedItem.content[0].attrs.src = await fileStorage.getURL(key)
            return clonedItem
          }

          return findImages(item)
        }),
      )

      return clonedDocument
    }

    return findImages(document)
  } catch (e) {
    throw new Error(e)
  }
}

const findImages = async (n, imageData, tempFolderPath) => {
  if (!n) return

  if (n.type === 'figure') {
    const [image] = n.content
    const { attrs } = image

    if (attrs && attrs.extraData && attrs.extraData.fileId) {
      const { fileId } = attrs.extraData
      const file = await File.findById(fileId)
      const medium = file.storedObjects.find(o => o.type === 'medium')
      const { extension, key, id } = medium

      const downloadPath = path.join(
        tempFolderPath,
        `${id}-${uuid()}.${extension}`,
      )

      await fileStorage.download(key, downloadPath)
      // eslint-disable-next-line no-param-reassign
      imageData[attrs.id] = downloadPath
    } else {
      // convert base64 string into an image and upload it to tempFolderPath
      const matches = attrs.src.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)

      const ext = matches[1].substring(
        matches[1].indexOf('/') + 1,
        matches[1].length,
      )

      const buffer = Buffer.from(matches[2], 'base64')
      attrs.id = uuid()

      const downloadPath = path.join(tempFolderPath, `${attrs.id}.${ext}`)

      try {
        await fs.writeFile(downloadPath, buffer)
        // eslint-disable-next-line no-param-reassign
        imageData[attrs.id] = downloadPath
      } catch (e) {
        logger.error(e)
      }
    }

    return
  }

  if (!n.content) return

  await Promise.all(
    n.content.map(async i => findImages(i, imageData, tempFolderPath)),
  )
}

const formatDate = date => {
  if (!date) return 'N/A'

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const extractCourseLabels = async v => {
  const version = v
  version.courses = await Promise.all(
    version.courses.map(async course => {
      const units = await Promise.all(
        course.units.map(async unit => {
          // remove null values
          let validMetadata = Object.entries(unit).filter(
            ([_, value]) => value !== null,
          )

          // find labels from id values
          validMetadata = await Promise.all(
            validMetadata.map(async ([key, value]) => {
              if (value) {
                const tableName = await CourseMetadata.findTablenameByType(key)

                if (tableName) {
                  const res = await db(`${tableName}`)
                    .select('label')
                    .where('id', value)

                  return [key, res[0].label]
                }

                return [key, null]
              }

              return [key, null]
            }),
          )

          // recreate object
          return Object.fromEntries(validMetadata)
        }),
      )

      // find course label from id
      const res = await db(`course`).select('label').where('id', course.course)

      return {
        course: res[0].label,
        units,
      }
    }),
  )

  return version
}

module.exports = { getImageUrls, findImages, formatDate, extractCourseLabels }
