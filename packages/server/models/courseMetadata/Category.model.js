const {
  BaseModel,
  modelJsonSchemaTypes: { stringNotEmpty },
} = require('@coko/server')

class Category extends BaseModel {
  static get tableName() {
    return 'category'
  }

  static get schema() {
    return {
      properties: {
        label: stringNotEmpty,
        value: stringNotEmpty,
      },
    }
  }

  //   static get relationMappings() {
  //     return {
  //       coreConcepts: {
  //         relation: BaseModel.HasManyRelation,
  //         modelClass: CoreConcept,
  //         join: {
  //           from: 'meta_framework.id',
  //           to: 'core_concept.metaFrameworkId',
  //         },
  //         modify: query => {
  //           query.orderBy('core_concept.order', 'asc')
  //         },
  //       },
  //       coreCompetences: {
  //         relation: BaseModel.HasManyRelation,
  //         modelClass: CoreCompetence,
  //         join: {
  //           from: 'meta_framework.id',
  //           to: 'core_competence.metaFrameworkId',
  //         },
  //         modify: query => {
  //           query.orderBy('core_competence.order', 'asc')
  //         },
  //       },
  //       concepts: {
  //         relation: BaseModel.HasManyRelation,
  //         modelClass: Concept,
  //         join: {
  //           from: 'meta_framework.id',
  //           to: 'concept.metaFrameworkId',
  //         },
  //         modify: query => {
  //           query.orderBy('concept.order', 'asc')
  //         },
  //       },
  //     }
  //   }
}

module.exports = Category
