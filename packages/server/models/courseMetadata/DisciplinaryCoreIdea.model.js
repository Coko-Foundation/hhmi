const {
  BaseModel,
  modelJsonSchemaTypes: { stringNotEmpty },
} = require('@coko/server')

class CoreIdea extends BaseModel {
  static get tableName() {
    return 'disciplinary_core_idea'
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

module.exports = CoreIdea
