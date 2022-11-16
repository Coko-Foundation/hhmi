const { getFile, getFileUrl } = require('../../controllers/file.controllers')

const fileResolver = async (_, { id }) => getFile(id)

const urlResolver = async (file, { size }) => getFileUrl(file, size)

module.exports = {
  Query: {
    file: fileResolver,
  },
  File: {
    url: urlResolver,
  },
}
