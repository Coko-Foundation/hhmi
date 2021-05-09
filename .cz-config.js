const { commitizen } = require('@coko/lint')

commitizen.scopes = ['client', 'ui', 'server', 'api', 'models', '*']

module.exports = commitizen
