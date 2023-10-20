const fs = require('fs')
const path = require('path')

const complexItemSetResolvers = require('./complexItemSet.resolvers')

module.exports = {
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'complexItemSet.graphql'),
    'utf-8',
  ),
  resolvers: complexItemSetResolvers,
}
