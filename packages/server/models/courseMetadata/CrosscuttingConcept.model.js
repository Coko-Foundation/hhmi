const {
  BaseModel,
  modelJsonSchemaTypes: { stringNotEmpty },
} = require('@coko/server')

class CrosscuttingConcept extends BaseModel {
  static get tableName() {
    return 'crosscutting_concept'
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

module.exports = CrosscuttingConcept
