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

  static async findListQuestions(
    listId,
    searchQuery,
    options = {},
    customOrder = [],
  ) {
    const listMembers = await ListMember.find({ listId })
    const questionIds = listMembers.result.map(q => q.questionId)

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
        'question_versions.complex_item_set_id',
        'question_versions.question_type',
      )
      .distinctOn('questions.id')
      .where({
        published: true,
      })
      .whereIn('questions.id', questionIds)
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

    const response = await Promise.all([
      // the questions to display
      new Promise((resolve, _reject) => {
        applyListQueryOptions(parentQuery, {
          ...options,
          ...(options.orderBy === 'custom' ? { customOrder } : {}),
        }).then(results => resolve(results))
      }),
      // the ids of all related questions (i.e. questions of the list)
      new Promise((resolve, _reject) => {
        applyListQueryOptions(parentQuery, {
          orderBy: options.orderBy,
          ascending: options.ascending,
          ...(options.orderBy === 'custom' ? { customOrder } : {}),
        }).then(result => {
          resolve(result.result.map(q => q.id))
        })
      }),
    ])

    const questions = {
      ...response[0],
      relatedQuestionsIds: response[1],
    }

    // fix order of questions to group set questions together if order is 'custom'
    if (options.orderBy === 'custom') {
      const complexItemSets = questions.result.map(q => q.complexItemSetId)
      const uniqueSets = [...new Set(complexItemSets)].filter(s => !!s)

      if (uniqueSets.length) {
        const map = new Map()
        uniqueSets.forEach(key => {
          map.set(
            key,
            questions.result.filter(q => q.complexItemSetId === key),
          )
        })

        const questionsSorted = []
        questions.result.forEach(q => {
          if (q.complexItemSetId === null) {
            questionsSorted.push(q)
          } else if (map.get(q.complexItemSetId)) {
            questionsSorted.push(map.get(q.complexItemSetId))
            map.delete(q.complexItemSetId)
          }
        })
        questions.result = questionsSorted.flat()
      }
    }

    return questions
  }
}

module.exports = List
