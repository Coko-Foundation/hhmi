/* eslint-disable global-require */
const emptyTempFolder = async () => {
  const { emptyTemp } = require('@coko/server')

  await emptyTemp()
}

module.exports = emptyTempFolder
