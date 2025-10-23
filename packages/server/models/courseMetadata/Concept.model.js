const {
  BaseModel,
  modelJsonSchemaTypes: { stringNotEmpty },
} = require('@coko/server')

const Category = require('./Category.model')

class Concept extends BaseModel {
  static get tableName() {
    return 'concept'
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
      categories: {
        relation: BaseModel.HasManyRelation,
        modelClass: Category,
        join: {
          from: 'concept.id',
          to: 'category.conceptId',
        },
        modify: query => {
          query.orderBy('category.order', 'asc')
        },
      },
    }
  }
}

module.exports = Concept
