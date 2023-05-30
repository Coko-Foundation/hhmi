const { BaseModel, useTransaction, logger } = require('@coko/server')

const List = require('../list/list.model')
const Question = require('../question/question.model')

class ListMember extends BaseModel {
  static get tableName() {
    return 'listMembers'
  }

  constructor(properties) {
    super(properties)
    this.type = 'listMember'
  }

  static get relationMappings() {
    return {
      question: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Question,
        join: {
          from: 'list_members.questionId',
          to: 'questions.id',
        },
      },
      list: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: List,
        join: {
          from: 'list_members.listId',
          to: 'lists.id',
        },
      },
    }
  }

  static get schema() {
    return {
      type: 'object',
      required: ['listId', 'questionId'],
      properties: {
        listId: {
          type: 'string',
          format: 'uuid',
        },
        questionId: {
          type: 'string',
          format: 'uuid',
        },
      },
    }
  }

  static async findByListIds(ids, options = {}) {
    return ListMember.query(options.trx).whereIn('listId', ids)
  }

  static async findListMembersByQuestionId(listId, questionIds, options = {}) {
    return ListMember.query(options.trx)
      .where('listId', listId)
      .whereIn('questionId', questionIds)
  }

  // insert method to ignore when question is duplicated in the list
  static async insertIgnoreDuplicates(data, options = {}) {
    try {
      const { trx, related } = options

      return useTransaction(
        async tr => {
          let queryBuilder = this.query(tr)

          if (related) {
            queryBuilder = queryBuilder.withGraphFetched(related)
          }

          return queryBuilder
            .insert(data)
            .onConflict(['listId', 'questionId'])
            .ignore()
        },

        {
          trx,
          passedTrxOnly: true,
        },
      )
    } catch (e) {
      logger.error('ListMember model: insertIgnoreDuplicates failed', e)
      throw new Error(e)
    }
  }
}

module.exports = ListMember
