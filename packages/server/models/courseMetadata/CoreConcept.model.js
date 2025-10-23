const {
  BaseModel,
  modelJsonSchemaTypes: { stringNotEmpty },
} = require('@coko/server')

const Subdiscipline = require('./Subdiscipline.model')

class CoreConcept extends BaseModel {
  static get tableName() {
    return 'core_concept'
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
      subdisciplines: {
        relation: BaseModel.HasManyRelation,
        modelClass: Subdiscipline,
        join: {
          from: 'core_concept.id',
          to: 'subdiscipline.coreConceptId',
        },
        modify: query => {
          query.orderBy('subdiscipline.order', 'asc')
        },
      },
    }
  }
}

module.exports = CoreConcept
