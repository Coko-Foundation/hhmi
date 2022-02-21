const merge = require('lodash/merge')

const question = require('./question')
const questionVersion = require('./questionVersion')

module.exports = {
  typeDefs: [question.typeDefs, questionVersion.typeDefs].join(' '),
  resolvers: merge({}, question.resolvers),
}
