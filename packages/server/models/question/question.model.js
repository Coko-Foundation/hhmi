const { cloneDeep } = require('lodash')

const {
  BaseModel,
  modelTypes: { boolean },
} = require('@coko/server')

const QuestionVersion = require('../questionVersion/questionVersion.model')

// TO DO -- move to cokoapps
const applyListQueryOptions = async (query, options = {}) => {
  let q = cloneDeep(query)
  const { orderBy, page, pageSize } = options

  if (orderBy) q = q.orderBy(orderBy)

  if (
    (Number.isInteger(page) && !Number.isInteger(pageSize)) ||
    (!Number.isInteger(page) && Number.isInteger(pageSize))
  ) {
    throw new Error(
      'both page and pageSize integers needed for paginated results',
    )
  }

  if (Number.isInteger(page) && Number.isInteger(pageSize)) {
    if (page < 0) {
      throw new Error(
        'invalid index for page (page should be an integer and greater than or equal to 0)',
      )
    }

    if (pageSize <= 0) {
      throw new Error(
        'invalid size for pageSize (pageSize should be an integer and greater than 0)',
      )
    }

    q = q.page(page, pageSize)
  }

  const result = await q
  const { results, total } = result

  return {
    result: page !== undefined ? results : result,
    totalCount: total || result.length,
  }
}

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
        rejected: boolean,
      },
    }
  }

  static get relationMappings() {
    return {
      versions: {
        relation: BaseModel.HasManyRelation,
        modelClass: QuestionVersion,
        join: {
          from: 'questions.id',
          to: 'questionVersions.questionId',
        },
      },
    }
  }

  static async insert(data, options = {}) {
    const question = await super.insert(data, options)
    await this.createNewVersion(question.id, { trx: options.trx })
    return question
  }

  // TO DO -- if there is a previous versions, you should copy its contents
  static async createNewVersion(questionId, options = {}) {
    return QuestionVersion.insert({ questionId }, { trx: options.trx })
  }

  async createNewVersion(options = {}) {
    return Question.createNewVersion(this.id, options)
  }

  static async getVersions(questionId, options = {}) {
    const { trx } = options
    const latestOnly = options.latestOnly || false
    const publishedOnly = options.publishedOnly || false

    const where = { questionId }
    if (publishedOnly) where.published = true

    const whereOptions = {
      orderBy: [
        {
          column: 'created',
          order: latestOnly ? 'desc' : 'asc',
        },
      ],
      page: latestOnly ? 0 : undefined,
      pageSize: latestOnly ? 1 : undefined,
    }

    return QuestionVersion.find(where, whereOptions, { trx })
  }

  async getVersions(options) {
    return Question.getVersions(this.id, options)
  }

  static async findPublished(options = {}) {
    const query = Question.query(options.trx)
      .leftJoin(
        'question_versions',
        'questions.id',
        'question_versions.question_id',
      )
      .select('questions.*')
      .distinct('questions.id')
      .where({
        published: true,
      })

    return applyListQueryOptions(query, options)
  }

  // eg. find all questions this user is an author of
  static async findByRole(userId, role, options = {}) {
    const query = Question.query(options.trx)
      .leftJoin('teams', 'questions.id', 'teams.object_id')
      .leftJoin('team_members', 'team_members.team_id', 'teams.id')
      .where({ role, userId })

    return applyListQueryOptions(query, options)
  }

  // eg. find all questions apart from the ones this user is an author of
  static async findByExcludingRole(userId, role, options = {}) {
    const query = Question.query(options.trx).whereRaw(
      `not id = some(
          select questions.id
          from questions
          left join "teams" on "questions"."id" = "teams"."object_id"
          left join team_members on team_members.team_id = teams.id
          where role = '${role}' and user_id = '${userId}'
      )`,
    )

    return applyListQueryOptions(query, options)
  }
}

module.exports = Question
