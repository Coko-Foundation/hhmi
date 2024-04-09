/* eslint-disable import/no-extraneous-dependencies */

const { db } = require('@coko/server')

module.exports = async () => {
  db.destroy()
}
