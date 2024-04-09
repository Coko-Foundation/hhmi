/* eslint-disable import/no-extraneous-dependencies */

const { migrate } = require('@coko/server')

module.exports = async jestConfig => {
  await migrate()
}
