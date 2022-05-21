/* eslint-disable import/no-extraneous-dependencies */

const { migrate } = require('@pubsweet/db-manager')

module.exports = async jestConfig => {
  await migrate()
}
