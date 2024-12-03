const {
  BaseModel,
  modelJsonSchemaTypes: { id, stringNotEmpty, arrayOfIds },
  logger,
} = require('@coko/server')

const Question = require('../question/question.model')
const User = require('../user/user.model')

class Report extends BaseModel {
  static get tableName() {
    return 'reports'
  }

  constructor(properties) {
    super(properties)
    this.type = 'report'
  }

  static get relationMappings() {
    return {
      question: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Question,
        join: {
          from: 'reports.questionId',
          to: 'questions.id',
        },
      },
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'reports.userId',
          to: 'users.id',
        },
      },
    }
  }

  static get schema() {
    return {
      properties: {
        questionId: id,
        userId: id,
        content: stringNotEmpty,
        attachmentIds: arrayOfIds,
      },
    }
  }

  static async createReport(questionId, userId, content, options = {}) {
    try {
      const { trx } = options

      return this.insert({ questionId, userId, content }, { trx })
    } catch (e) {
      logger.error(e)
      throw new Error(e)
    }
  }
}

module.exports = Report
