const {
  BaseModel,
  modelTypes: { boolean },
} = require('@coko/server')

class Question extends BaseModel {
  static get tableName() {
    return 'questions'
  }

  constructor(properties) {
    super(properties)
    this.type = 'question'
  }

  static get schema() {
    return {
      properties: {
        agreedTc: boolean,
      },
    }
  }
}

module.exports = Question
