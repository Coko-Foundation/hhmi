const {
  BaseModel,
  modelTypes: { boolean },
  // uuid,
} = require('@coko/server')

const QuestionVersion = require('../questionVersion/questionVersion.model')
const { applyListQueryOptions } = require('../helpers')

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

  static async filterPublishedQuestions(params = {}, options = {}) {
    try {
      const query = Question.query(options.trx)
        .leftJoin(
          'question_versions',
          'questions.id',
          'question_versions.question_id',
        )
        .select('questions.*', 'question_versions.publication_date')
        .distinctOn('questions.id')
        .where({
          published: true,
        })
        .orderBy([
          'questions.id',
          { column: 'question_versions.created', order: 'desc' },
        ])

      if (params.filters) {
        if (params.filters.topic) {
          query.whereJsonSupersetOf('topics', [{ topic: params.filters.topic }])
        }

        if (params.filters.subtopic) {
          query.whereJsonSupersetOf('topics', [
            { subtopic: params.filters.subtopic },
          ])
        }

        if (params.filters.course) {
          query.whereJsonSupersetOf('courses', [
            { course: params.filters.course },
          ])
        }

        if (params.filters.unit) {
          query.whereJsonSupersetOf('courses', [
            {
              units: [
                {
                  unit: params.filters.unit,
                },
              ],
            },
          ])
        }

        if (params.filters.courseTopic) {
          query.whereJsonSupersetOf('courses', [
            {
              units: [
                {
                  courseTopic: params.filters.courseTopic,
                },
              ],
            },
          ])
        }

        if (params.filters.learningObjective) {
          query.whereJsonSupersetOf('courses', [
            {
              units: [
                {
                  learningObjective: params.filters.learningObjective,
                },
              ],
            },
          ])
        }

        if (params.filters.essentialKnowledge) {
          query.whereJsonSupersetOf('courses', [
            {
              units: [
                {
                  essentialKnowledge: params.filters.essentialKnowledge,
                },
              ],
            },
          ])
        }

        if (params.filters.application) {
          query.whereJsonSupersetOf('courses', [
            {
              units: [
                {
                  application: params.filters.application,
                },
              ],
            },
          ])
        }

        if (params.filters.skill) {
          query.whereJsonSupersetOf('courses', [
            {
              units: [
                {
                  skill: params.filters.skill,
                },
              ],
            },
          ])
        }

        if (params.filters.understanding) {
          query.whereJsonSupersetOf('courses', [
            {
              units: [
                {
                  understanding: params.filters.understanding,
                },
              ],
            },
          ])
        }

        if (
          params.filters.cognitiveLevel &&
          params.filters.cognitiveLevel.length
        ) {
          query.whereIn('cognitive_level', params.filters.cognitiveLevel)
        }

        if (params.filters.questionType && params.filters.questionType.length) {
          query.whereIn('questionType', params.filters.questionType)
        }
      }

      if (params.searchQuery) {
        query.where('content_text', 'ilike', `%${params.searchQuery}%`)

        const queryStrings = params.searchQuery.split(' ')
        queryStrings.forEach(queryString => {
          query.orWhereJsonSupersetOf('keywords', [queryString])
        })
      }

      query.as('q1')

      // wrapped into a parent query so that the subsequent ordering is applied to unique question versions
      // and not between versions of the same question
      const parentQuery = Question.query(options.trx).select('*').from(query)

      return applyListQueryOptions(parentQuery, options)
    } catch (e) {
      console.error('Question model: filter failed', e)
      throw new Error(e)
    }
  }

  // eg. find all questions this user is an author of
  static async findByRole(userId, role, options = {}) {
    const query = Question.query(options.trx)
      .leftJoin('teams', 'questions.id', 'teams.object_id')
      .leftJoin('team_members', 'team_members.team_id', 'teams.id')
      .where({ role, userId })

    if (options.searchQuery) {
      query
        .leftJoin(
          'question_versions',
          'question_versions.question_id',
          'questions.id',
        )
        .where('content_text', 'ilike', `%${options.searchQuery}%`)

      const queryStrings = options.searchQuery.split(' ')
      queryStrings.forEach(queryString => {
        query.orWhereJsonSupersetOf('keywords', [queryString])
      })
    }

    return applyListQueryOptions(query, options)
  }

  // eg. find all questions apart from the ones this user is an author of
  static async findByExcludingRole(userId, role, options = {}) {
    const { submittedOnly } = options

    let query = Question.query(options.trx).whereNotIn(
      'questions.id',
      builder => {
        return builder
          .select('questions.id')
          .from('questions')
          .leftJoin('teams', 'teams.objectId', 'questions.id')
          .leftJoin('team_members', 'team_members.team_id', 'teams.id')
          .where({
            role,
            userId,
          })
      },
    )

    if (options.searchQuery) {
      query
        .leftJoin(
          'question_versions',
          'question_versions.question_id',
          'questions.id',
        )
        .where('content_text', 'ilike', `%${options.searchQuery}%`)

      const queryStrings = options.searchQuery.split(' ')
      queryStrings.forEach(queryString => {
        query.orWhereJsonSupersetOf('keywords', [queryString])
      })
    }

    if (submittedOnly)
      query = query.whereIn('questions.id', builder => {
        return builder
          .select('questions.id')
          .from('questions')
          .leftJoin(
            'question_versions',
            'questions.id',
            'question_versions.question_id',
          )
          .where({
            submitted: true,
          })
      })

    return applyListQueryOptions(query, options)
  }
}

module.exports = Question
