const {
  BaseModel,
  modelJsonSchemaTypes: { stringNotEmpty },
} = require('@coko/server')

class Practice extends BaseModel {
  static get tableName() {
    return 'practice'
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

module.exports = Practice
