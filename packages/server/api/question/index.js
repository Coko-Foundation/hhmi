const fs = require('fs')
const path = require('path')

const questionResolvers = require('./question.resolvers')

module.exports = {
  typeDefs: fs.readFileSync(path.join(__dirname, 'question.graphql'), 'utf-8'),
  resolvers: questionResolvers,
}
