module.exports = [
  // models from coko server
  '@coko/server/src/models/user',
  '@coko/server/src/models/identity',
  '@coko/server/src/models/team',
  '@coko/server/src/models/teamMember',
  '@coko/server/src/models/chatThread',
  '@coko/server/src/models/chatMessage',
  '@coko/server/src/models/file',

  // local models
  './models/question',
  './models/questionVersion',
  './models/team',
  './models/user',
  './models/list',
  './models/listMember',
  './models/complexItemSet',

  // local api
  './api', // graphql
  './rest',
]
