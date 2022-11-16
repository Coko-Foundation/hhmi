const fs = require('fs')
const path = require('path')

const fileResolvers = require('./file.resolvers')

module.exports = {
  typeDefs: fs.readFileSync(path.join(__dirname, 'file.graphql'), 'utf-8'),
  resolvers: fileResolvers,
}
