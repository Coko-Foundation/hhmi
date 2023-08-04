const fs = require('fs')
const path = require('path')

const configResolvers = require('./config.resolvers')

module.exports = {
  typeDefs: fs.readFileSync(path.join(__dirname, 'config.graphql'), 'utf-8'),
  resolvers: configResolvers,
}
