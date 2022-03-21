const fs = require('fs')
const path = require('path')

module.exports = {
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'questionVersion.graphql'),
    'utf-8',
  ),
}
