const {
  BaseModel,
  modelJsonSchemaTypes: { stringNotEmpty },
} = require('@coko/server')

class SubdisciplineStatement extends BaseModel {
  static get tableName() {
    return 'subdiscipline_statement'
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

module.exports = SubdisciplineStatement
