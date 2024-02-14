const fs = require('fs')
const path = require('path')

const reviewResolvers = require('./review.resolvers')

module.exports = {
  typeDefs: fs.readFileSync(path.join(__dirname, 'review.graphql'), 'utf-8'),
  resolvers: reviewResolvers,
}
