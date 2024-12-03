const {
  BaseModel,
  modelJsonSchemaTypes: { id, stringNotEmpty },
  logger,
} = require('@coko/server')

const Question = require('../question/question.model')
const User = require('../user/user.model')

class ArchivedItem extends BaseModel {
  static get tableName() {
    return 'archivedItems'
  }

  constructor(properties) {
    super(properties)
    this.type = 'archivedItem'
  }

  static get relationMappings() {
    return {
      question: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Question,
        join: {
          from: 'archivedItems.questionId',
          to: 'questions.id',
        },
      },
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'archivedItems.userId',
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

        role: stringNotEmpty,
      },
    }
  }

  static async archiveQuestions(questionIds, userId, role, options = {}) {
    try {
      const { trx } = options

      const data = questionIds.map(questionId => ({ questionId, userId, role }))

      return this.insert(data, { trx })
    } catch (e) {
      logger.error(e)
      throw new Error(e)
    }
  }

  static async unarchiveQuestions(questionIds, userId, role, options = {}) {
    try {
      const { trx } = options

      return this.query(trx)
        .delete()
        .whereIn('questionId', questionIds)
        .where({ userId, role })
    } catch (e) {
      logger.error(e)
      throw new Error(e)
    }
  }
}

module.exports = ArchivedItem
