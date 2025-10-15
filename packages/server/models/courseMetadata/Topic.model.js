const {
  BaseModel,
  modelTypes: { stringNotEmpty },
} = require('@coko/server')

const LearningObjective = require('./LearningObjective.model')
const Application = require('./Application.model')
const Skill = require('./Skill.model')
const Understanding = require('./Understanding.model')

class Topic extends BaseModel {
  static get tableName() {
    return 'topic'
  }

  static get schema() {
    return {
      properties: {
        label: stringNotEmpty,
        value: stringNotEmpty,
      },
    }
  }

  static get relationMappings() {
    return {
      learningObjectives: {
        relation: BaseModel.HasManyRelation,
        modelClass: LearningObjective,
        join: {
          from: 'topic.id',
          to: 'learning_objective.topicId',
        },
        modify: query => {
          query.orderBy('learning_objective.order', 'asc')
        },
      },
      applications: {
        relation: BaseModel.HasManyRelation,
        modelClass: Application,
        join: {
          from: 'topic.id',
          to: 'application.topicId',
        },
        modify: query => {
          query.orderBy('application.order', 'asc')
        },
      },
      skills: {
        relation: BaseModel.HasManyRelation,
        modelClass: Skill,
        join: {
          from: 'topic.id',
          to: 'skill.topicId',
        },
        modify: query => {
          query.orderBy('skill.order', 'asc')
        },
      },
      understandings: {
        relation: BaseModel.HasManyRelation,
        modelClass: Understanding,
        join: {
          from: 'topic.id',
          to: 'understanding.topicId',
        },
        modify: query => {
          query.orderBy('understanding.order', 'asc')
        },
      },
    }
  }
}

module.exports = Topic
