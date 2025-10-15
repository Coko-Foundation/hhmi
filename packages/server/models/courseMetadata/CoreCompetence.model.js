const {
  BaseModel,
  modelTypes: { stringNotEmpty },
} = require('@coko/server')

const Subcompetence = require('./Subcompetence.model')

class CoreCompetence extends BaseModel {
  static get tableName() {
    return 'core_competence'
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
      subcompetencies: {
        relation: BaseModel.HasManyRelation,
        modelClass: Subcompetence,
        join: {
          from: 'core_competence.id',
          to: 'subcompetence.coreCompetenceId',
        },
        modify: query => {
          query.orderBy('subcompetence.order', 'asc')
        },
      },
    }
  }
}

module.exports = CoreCompetence
