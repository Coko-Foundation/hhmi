const fs = require('fs')
const path = require('path')

const reportResolvers = require('./report.resolvers')

module.exports = {
  typeDefs: fs.readFileSync(path.join(__dirname, 'report.graphql'), 'utf-8'),
  resolvers: reportResolvers,
}
