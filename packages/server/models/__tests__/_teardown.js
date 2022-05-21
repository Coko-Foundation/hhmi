/* eslint-disable import/no-extraneous-dependencies */

const { db } = require('@pubsweet/db-manager')

module.exports = async () => {
  db.destroy()
}
