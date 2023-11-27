const {
  BaseModel,
  modelTypes: { id, object, stringNullable },
} = require('@coko/server')

const QuestionVersion = require('../questionVersion/questionVersion.model')
const User = require('../user/user.model')

class Review extends BaseModel {
  static get tableName() {
    return 'reviews'
  }

  constructor(properties) {
    super(properties)
    this.type = 'review'
  }

  static get relationMappings() {
    return {
      questionVersion: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: QuestionVersion,
        join: {
          from: 'reviews.questionVersionId',
          to: 'questionVersions.id',
        },
      },
      reviewer: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'reviews.reviewerId',
          to: 'users.id',
        },
      },
    }
  }

  static get schema() {
    return {
      properties: {
        questionVersionId: id,
        reviewerId: id,

        content: stringNullable,
        status: object,
      },
    }
  }

  static async createReview(
    questionVersionId,
    reviewerId,
    content,
    status,
    options = {},
  ) {
    try {
      const { trx } = options

      return Review.insert(
        { questionVersionId, reviewerId, content, status },
        { trx },
      )
    } catch (e) {
      console.error(e)
      throw new Error(e)
    }
  }
}

module.exports = Review
