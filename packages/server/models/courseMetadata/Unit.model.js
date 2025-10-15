const {
  BaseModel,
  modelTypes: { stringNotEmpty },
} = require('@coko/server')

const Topic = require('./Topic.model')

class Unit extends BaseModel {
  static get tableName() {
    return 'unit'
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
      topics: {
        relation: BaseModel.HasManyRelation,
        modelClass: Topic,
        join: {
          from: 'unit.id',
          to: 'topic.unitId',
        },
        modify: query => {
          query.orderBy('topic.order', 'asc')
        },
      },
    }
  }
}

module.exports = Unit
