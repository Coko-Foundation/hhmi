const {
  BaseModel,
  modelJsonSchemaTypes: { stringNotEmpty },
} = require('@coko/server')

class SciencePractice extends BaseModel {
  static get tableName() {
    return 'science_practice'
  }

  static get schema() {
    return {
      properties: {
        label: stringNotEmpty,
        value: stringNotEmpty,
      },
    }
  }
}

module.exports = SciencePractice
