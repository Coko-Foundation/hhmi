const merge = require('lodash/merge')

const question = require('./question')
const questionVersion = require('./questionVersion')
const user = require('./user')

module.exports = {
  typeDefs: [question.typeDefs, questionVersion.typeDefs, user.typeDefs].join(
    ' ',
  ),
  resolvers: merge({}, question.resolvers, user.resolvers),
}
