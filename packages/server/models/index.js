const Identity = require('@coko/server/src/models/identity/identity.model')

const Question = require('./question/question.model')
const QuestionVersion = require('./questionVersion/questionVersion.model')
const Team = require('./team/team.model')
const TeamMember = require('./teamMember/teamMember.model')
const User = require('./user/user.model')
const List = require('./list/list.model')
const ListMember = require('./listMember/listMember.model')
const ComplexItemSet = require('./complexItemSet/complexItemSet.model')
const Review = require('./review/review.model')
const Notification = require('./notification/notification.model')
const ArchivedItem = require('./archivedItem/archivedItem.model')

module.exports = {
  Question,
  QuestionVersion,
  Team,
  TeamMember,
  User,
  Identity,
  List,
  ListMember,
  ComplexItemSet,
  Review,
  Notification,
  ArchivedItem,
}
