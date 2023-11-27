const merge = require('lodash/merge')

const question = require('./question')
const user = require('./user')
const team = require('./team')
const file = require('./file')
const metadata = require('./metadata')
const resource = require('./resource')
const list = require('./list')
const config = require('./config')
const complexItemSet = require('./complexItemSet')
const chat = require('./chat')
const review = require('./review')

module.exports = {
  typeDefs: [
    question.typeDefs,
    user.typeDefs,
    team.typeDefs,
    file.typeDefs,
    metadata.typeDefs,
    resource.typeDefs,
    list.typeDefs,
    config.typeDefs,
    complexItemSet.typeDefs,
    chat.typeDefs,
    review.typeDefs,
  ].join(' '),
  resolvers: merge(
    {},
    question.resolvers,
    user.resolvers,
    team.resolvers,
    file.resolvers,
    metadata.resolvers,
    resource.resolvers,
    list.resolvers,
    config.resolvers,
    complexItemSet.resolvers,
    chat.resolvers,
    review.resolvers,
  ),
}
