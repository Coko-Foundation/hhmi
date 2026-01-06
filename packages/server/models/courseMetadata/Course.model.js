const {
  BaseModel,
  modelJsonSchemaTypes: { stringNotEmpty },
} = require('@coko/server')

const Unit = require('./Unit.model')
const Practice = require('./Practice.model')
const CrosscuttingConcept = require('./CrosscuttingConcept.model')
const CoreIdea = require('./DisciplinaryCoreIdea.model')

class Course extends BaseModel {
  static get tableName() {
    return 'course'
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
      units: {
        relation: BaseModel.HasManyRelation,
        modelClass: Unit,
        join: {
          from: 'course.id',
          to: 'unit.courseId',
        },
        modify: query => {
          query.orderBy('unit.order', 'asc')
        },
      },
      practices: {
        relation: BaseModel.HasManyRelation,
        modelClass: Practice,
        join: {
          from: 'course.id',
          to: 'practice.courseId',
        },
        modify: query => {
          query.orderBy('practice.order', 'asc')
        },
      },
      crosscuttingConcepts: {
        relation: BaseModel.HasManyRelation,
        modelClass: CrosscuttingConcept,
        join: {
          from: 'course.id',
          to: 'crosscutting_concept.courseId',
        },
        modify: query => {
          query.orderBy('crosscutting_concept.order', 'asc')
        },
      },
      disciplinaryCoreIdeas: {
        relation: BaseModel.HasManyRelation,
        modelClass: CoreIdea,
        join: {
          from: 'course.id',
          to: 'disciplinary_core_idea.courseId',
        },
        modify: query => {
          query.orderBy('disciplinary_core_idea.order', 'asc')
        },
      },
    }
  }
}

module.exports = Course
