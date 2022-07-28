const fs = require('fs')
const path = require('path')

const teamResolvers = require('./team.resolvers')

module.exports = {
  typeDefs: fs.readFileSync(path.join(__dirname, 'team.graphql'), 'utf-8'),
  resolvers: teamResolvers,
}
