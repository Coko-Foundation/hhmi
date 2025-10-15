const {
  BaseModel,
  modelTypes: { stringNotEmpty },
} = require('@coko/server')

const EssentialKnowledge = require('./EssentialKnowledge.model')

class LearningObjective extends BaseModel {
  static get tableName() {
    return 'learning_objective'
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
      essentialKnowledges: {
        relation: BaseModel.HasManyRelation,
        modelClass: EssentialKnowledge,
        join: {
          from: 'learning_objective.id',
          to: 'essential_knowledge.learningObjectiveId',
        },
        modify: query => {
          query.orderBy('essential_knowledge.order', 'asc')
        },
      },
    }
  }
}

module.exports = LearningObjective
