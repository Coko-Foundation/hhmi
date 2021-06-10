const { eslint } = require('@coko/lint')

eslint.ignorePatterns.push('**/node_modules')

eslint.rules['react/jsx-props-no-spreading'] = 0

eslint.settings = {
  'import/core-modules': ['ui'],
}

module.exports = eslint
