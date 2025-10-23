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
const Report = require('./report/report.model')
const Resource = require('./resources/resources.model')
const CourseMetadata = require('./courseMetadata/courseMetadata.model')
// new models
const Course = require('./courseMetadata/Course.model')
// const Unit = require('./courseMetadata/Unit.model')
// const Topic = require('./courseMetadata/Topic.model')
// const LearningObjective = require('./courseMetadata/LearningObjective.model')
// const EssentialKnowledge = require('./courseMetadata/EssentialKnowledge.model')
// const Application = require('./courseMetadata/Application.model')
// const Skill = require('./courseMetadata/Skill.model')
// const Understanding = require('./courseMetadata/Understanding.model')
// const MetaFramework = require('./courseMetadata/Metaframework.model')
const MetaFramework = require('./courseMetadata/Metaframework.model')

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
  Report,
  Resource,
  CourseMetadata,
  Course,
  // Unit,
  // Topic,
  // LearningObjective,
  // EssentialKnowledge,
  // Application,
  // Skill,
  // Understanding,
  MetaFramework,
}
