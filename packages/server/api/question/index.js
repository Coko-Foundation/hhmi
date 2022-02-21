const fs = require('fs')

const questionResolvers = require('./question.resolvers')

module.exports = {
  typeDefs: fs.readFileSync(`${__dirname}/question.graphql`, 'utf-8'),
  resolvers: questionResolvers,
}
