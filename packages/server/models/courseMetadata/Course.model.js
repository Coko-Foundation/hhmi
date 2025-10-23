const {
  BaseModel,
  modelJsonSchemaTypes: { stringNotEmpty },
} = require('@coko/server')

const Unit = require('./Unit.model')

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
    }
  }
}

module.exports = Course
