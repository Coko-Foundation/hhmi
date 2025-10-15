const {
  BaseModel,
  modelTypes: { stringNotEmpty },
} = require('@coko/server')

class EssentialKnowledge extends BaseModel {
  static get tableName() {
    return 'essential_knowledge'
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

module.exports = EssentialKnowledge
