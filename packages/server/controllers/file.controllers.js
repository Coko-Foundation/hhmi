const { fileStorage, File } = require('@coko/server')

const getFile = async id => File.findById(id)

const getFileUrl = async (file, size) => {
  const target = file.storedObjects.find(o => {
    if (!o.mimetype.startsWith('image')) {
      return o.type === 'original'
    }

    return o.type === size
  })

  const { key } = target
  return fileStorage.getURL(key)
}

module.exports = { getFile, getFileUrl }
