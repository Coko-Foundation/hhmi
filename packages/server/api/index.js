const merge = require('lodash/merge')

const question = require('./question')
const user = require('./user')
const team = require('./team')

module.exports = {
  typeDefs: [question.typeDefs, user.typeDefs, team.typeDefs].join(' '),
  resolvers: merge({}, question.resolvers, user.resolvers, team.resolvers),
}
