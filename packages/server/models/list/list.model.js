const {
  BaseModel,
  modelTypes: { stringNullable },
} = require('@coko/server')

const ListMember = require('../listMember/listMember.model')
const Question = require('../question/question.model')
const { applyListQueryOptions } = require('../helpers')

class List extends BaseModel {
  static get tableName() {
    return 'lists'
  }

  constructor(properties) {
    super(properties)
    this.type = 'list'
  }

  static get relationMappings() {
    return {
      members: {
        relation: BaseModel.HasManyRelation,
        modelClass: ListMember,
        join: {
          from: 'lists.id',
          to: 'list_members.listId',
        },
      },
      questions: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Question,
        join: {
          from: 'lists.id',
          through: {
            modelClass: Question,
            from: 'list_members.listId',
            to: 'list_members.questionId',
          },
          to: 'questions.id',
        },
      },
    }
  }

  static get schema() {
    return {
      properties: {
        title: stringNullable,
        customOrder: {
          type: 'array',
          default: [],
          items: {
            type: 'string',
          },
        },
      },
    }
  }

  static async findByAuthor(userId, options = {}) {
    const { searchQuery } = options

    const query = List.query(options.trx)
      .leftJoin('teams', 'lists.id', 'teams.object_id')
      .leftJoin('team_members', 'team_members.team_id', 'teams.id')
      .where({ role: 'author', userId })

    if (searchQuery) {
      query.where('title', 'ilike', `%${searchQuery}%`)
    }

    return applyListQueryOptions(query, options)
  }

  static async findListQuestionsByIds(
    quesitonIds,
    searchQuery,
    options = {},
    customOrder = [],
  ) {
    const query = Question.query(options.trx)
      .leftJoin(
        'question_versions',
        'questions.id',
        'question_versions.question_id',
      )
      .select(
        'questions.*',
        'question_versions.publication_date',
        'question_versions.content_text',
      )
      .distinctOn('questions.id')
      .where({
        published: true,
      })
      .whereIn('questions.id', quesitonIds)
      .orderBy([
        'questions.id',
        { column: 'question_versions.publication_date', order: 'desc' },
      ])

    query.as('q1')

    // wrapped into a parent query so that the subsequent ordering is applied to unique question versions
    // and not between versions of the same question
    const parentQuery = Question.query(options.trx).select('*').from(query)

    if (searchQuery) {
      parentQuery.where('content_text', 'ilike', `%${searchQuery}%`)
    }

    // if we have a custom order get the list of question in default order and then sort it
    if (options.orderBy === 'custom') {
      const questions = await applyListQueryOptions(parentQuery, {
        ...options,
        orderBy: 'publication_date',
      })

      if (customOrder?.length) {
        questions.result.sort((a, b) => {
          // non-sorted items (new questions that were added later) go to the end
          if (customOrder.indexOf(a.id) === -1) return 1000
          if (customOrder.indexOf(b.id) === -1) return -1000

          // the rest is sorted as per customOrder
          return customOrder.indexOf(a.id) - customOrder.indexOf(b.id)
        })
      }

      return questions
    }

    return applyListQueryOptions(parentQuery, options)
  }
}

module.exports = List
