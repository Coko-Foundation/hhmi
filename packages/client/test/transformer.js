/* eslint-disable import/no-extraneous-dependencies */
const babelJest = require('babel-jest')

module.exports = babelJest.createTransformer({
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
  env: {
    testing: {
      presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
    },
  },
})
