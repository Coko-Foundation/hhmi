const { migrationManager } = require('@coko/server')

module.exports = async jestConfig => {
  await migrationManager.migrate()
}
