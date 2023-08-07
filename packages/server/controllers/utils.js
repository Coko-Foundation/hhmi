const path = require('path')
const cloneDeep = require('lodash/cloneDeep')
const { logger, fileStorage, File, uuid } = require('@coko/server')

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
    const { fileId } = image.attrs.extraData
    const file = await File.findById(fileId)
    const medium = file.storedObjects.find(o => o.type === 'medium')
    const { extension, key, id } = medium

    const downloadPath = path.join(
      tempFolderPath,
      `${id}-${uuid()}.${extension}`,
    )

    await fileStorage.download(key, downloadPath)
    // eslint-disable-next-line no-param-reassign
    imageData[image.attrs.id] = downloadPath

    return
  }

  if (!n.content) return

  await Promise.all(
    n.content.map(async i => findImages(i, imageData, tempFolderPath)),
  )
}

module.exports = { getImageUrls, findImages }
