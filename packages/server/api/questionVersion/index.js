const fs = require('fs')

module.exports = {
  typeDefs: fs.readFileSync(`${__dirname}/questionVersion.graphql`, 'utf-8'),
}
