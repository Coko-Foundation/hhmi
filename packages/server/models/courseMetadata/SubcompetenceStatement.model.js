const {
  BaseModel,
  modelTypes: { stringNotEmpty },
} = require('@coko/server')

class SubcompetenceStatement extends BaseModel {
  static get tableName() {
    return 'subcompetence_statement'
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

module.exports = SubcompetenceStatement
