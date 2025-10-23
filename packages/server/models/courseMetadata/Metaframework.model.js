const {
  BaseModel,
  modelJsonSchemaTypes: { stringNotEmpty },
} = require('@coko/server')

const CoreConcept = require('./CoreConcept.model')
const CoreCompetence = require('./CoreCompetence.model')
const Concept = require('./Concept.model')

class MetaFramework extends BaseModel {
  static get tableName() {
    return 'meta_framework'
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
      coreConcepts: {
        relation: BaseModel.HasManyRelation,
        modelClass: CoreConcept,
        join: {
          from: 'meta_framework.id',
          to: 'core_concept.metaFrameworkId',
        },
        modify: query => {
          query.orderBy('core_concept.order', 'asc')
        },
      },
      coreCompetencies: {
        relation: BaseModel.HasManyRelation,
        modelClass: CoreCompetence,
        join: {
          from: 'meta_framework.id',
          to: 'core_competence.metaFrameworkId',
        },
        modify: query => {
          query.orderBy('core_competence.order', 'asc')
        },
      },
      concepts: {
        relation: BaseModel.HasManyRelation,
        modelClass: Concept,
        join: {
          from: 'meta_framework.id',
          to: 'concept.metaFrameworkId',
        },
        modify: query => {
          query.orderBy('concept.order', 'asc')
        },
      },
    }
  }
}

module.exports = MetaFramework
