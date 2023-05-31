const fs = require('fs')
const path = require('path')

const listResolvers = require('./list.resolvers')

module.exports = {
  typeDefs: fs.readFileSync(path.join(__dirname, 'list.graphql'), 'utf-8'),
  resolvers: listResolvers,
}
