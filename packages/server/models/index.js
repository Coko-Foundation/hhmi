const Team = require('@coko/server/src/models/team/team.model')
const TeamMember = require('@coko/server/src/models/teamMember/teamMember.model')
const Identity = require('@coko/server/src/models/identity/identity.model')

const Question = require('./question/question.model')
const QuestionVersion = require('./questionVersion/questionVersion.model')
const User = require('./user/user.model')

module.exports = {
  Question,
  QuestionVersion,
  Team,
  TeamMember,
  User,
  Identity,
}
