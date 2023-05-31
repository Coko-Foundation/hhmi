const {
  BaseModel,
  modelTypes: { boolean },
  // uuid,
} = require('@coko/server')

// eslint-disable-next-line import/no-extraneous-dependencies
const { db } = require('@pubsweet/db-manager')

const QuestionVersion = require('../questionVersion/questionVersion.model')
const User = require('../user/user.model')
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

  static async getQuestion(id, options = {}) {
    try {
      const { trx } = options
      return Question.query(trx)
        .select('questions.*')
        .findOne('questions.id', id)
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }

  // TO DO -- if there is a previous versions, you should copy its contents
  static async createNewVersion(questionId, options = {}) {
    const previousVersions = await this.getVersions(questionId, {
      latestOnly: true,
      publishedOnly: true,
    })

    if (previousVersions.totalCount > 0) {
      const {
        content,
        submitted,
        topics,
        courses,
        keywords,
        biointeractiveResources,
        cognitiveLevel,
        affectiveLevel,
        psychomotorLevel,
        readingLevel,
        questionType,
      } = previousVersions.result[0]

      return QuestionVersion.insert(
        {
          questionId,
          content,
          submitted,
          topics,
          courses,
          keywords,
          biointeractiveResources,
          cognitiveLevel,
          affectiveLevel,
          psychomotorLevel,
          readingLevel,
          questionType,
          inProduction: true,
          published: false,
        },
        { trx: options.trx },
      )
    }

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

  static async applyFilters(filters, searchQuery, query) {
    if (filters) {
      if (filters.topic) {
        query.whereJsonSupersetOf('topics', [{ topic: filters.topic }])
      }

      if (filters.subtopic) {
        query.whereJsonSupersetOf('topics', [{ subtopic: filters.subtopic }])
      }

      if (filters.course) {
        query.whereJsonSupersetOf('courses', [{ course: filters.course }])
      }

      if (filters.unit) {
        query.whereJsonSupersetOf('courses', [
          {
            units: [
              {
                unit: filters.unit,
              },
            ],
          },
        ])
      }

      if (filters.courseTopic) {
        query.whereJsonSupersetOf('courses', [
          {
            units: [
              {
                courseTopic: filters.courseTopic,
              },
            ],
          },
        ])
      }

      if (filters.learningObjective) {
        query.whereJsonSupersetOf('courses', [
          {
            units: [
              {
                learningObjective: filters.learningObjective,
              },
            ],
          },
        ])
      }

      if (filters.essentialKnowledge) {
        query.whereJsonSupersetOf('courses', [
          {
            units: [
              {
                essentialKnowledge: filters.essentialKnowledge,
              },
            ],
          },
        ])
      }

      if (filters.application) {
        query.whereJsonSupersetOf('courses', [
          {
            units: [
              {
                application: filters.application,
              },
            ],
          },
        ])
      }

      if (filters.skill) {
        query.whereJsonSupersetOf('courses', [
          {
            units: [
              {
                skill: filters.skill,
              },
            ],
          },
        ])
      }

      if (filters.understanding) {
        query.whereJsonSupersetOf('courses', [
          {
            units: [
              {
                understanding: filters.understanding,
              },
            ],
          },
        ])
      }

      if (filters.cognitiveLevel && filters.cognitiveLevel.length) {
        query.whereIn('cognitive_level', filters.cognitiveLevel)
      }

      if (filters.questionType && filters.questionType.length) {
        query.whereIn('questionType', filters.questionType)
      }
    }

    if (searchQuery) {
      query
        .where('content_text', 'ilike', `%${searchQuery}%`)
        .orWhere('author', 'ilike', `%${searchQuery}%`)

      const queryStrings = searchQuery.split(' ')
      queryStrings.forEach(queryString => {
        query.orWhereJsonSupersetOf('keywords', [queryString])
      })
    }

    // return query
  }

  static async filterPublishedQuestions(params = {}, options = {}) {
    try {
      const query = Question.query(options.trx)
        .leftJoin(
          'question_versions',
          'questions.id',
          'question_versions.question_id',
        )
        .leftJoin('teams', 'teams.objectId', 'questions.id')
        .leftJoin('team_members', 'team_members.team_id', 'teams.id')
        .leftJoin('users', 'users.id', 'team_members.user_id')
        .select(
          'questions.*',
          'question_versions.publication_date',
          'question_versions.topics',
          'question_versions.content_text',
          'question_versions.keywords',
          'question_versions.courses',
          'question_versions.question_type',
          'question_versions.cognitive_level',
          'users.display_name as author',
        )
        .distinctOn('questions.id')
        .where({
          published: true,
        })
        .orderBy([
          'questions.id',
          { column: 'question_versions.created', order: 'desc' },
        ])

      query.as('q1')

      // wrapped into a parent query so that the subsequent ordering is applied to unique question versions
      // and not between versions of the same question
      const parentQuery = Question.query(options.trx).select('*').from(query)

      if (params.filters || params.searchQuery) {
        this.applyFilters(params.filters, params.searchQuery, parentQuery)
      }

      return applyListQueryOptions(parentQuery, options)
    } catch (e) {
      console.error('Question model: filter failed', e)
      throw new Error(e)
    }
  }

  static async getPreviousOrNextQuestionId(
    which,
    currentQuestionId,
    params = {},
    options = {},
  ) {
    const { ascending, orderBy } = options

    try {
      const allQuestionsSubquery = Question.query()
        .leftJoin(
          'question_versions',
          'questions.id',
          'question_versions.question_id',
        )
        .select('questions.id', 'question_versions.publication_date')
        .distinctOn('questions.id')
        .where({
          published: true,
        })
        .orderBy([
          'questions.id',
          { column: 'question_versions.created', order: 'desc' },
        ])

      if (params.filters || params.searchQuery) {
        this.applyFilters(
          params.filters,
          params.searchQuery,
          allQuestionsSubquery,
        )
      }

      allQuestionsSubquery.as('sq1')

      let allQuestionsQuery = Question.query()
        .select('*')
        .from(allQuestionsSubquery)

      let ascendingValue
      if ((ascending && which === 'NEXT') || (!ascending && which === 'PREV'))
        ascendingValue = 'asc'
      if ((ascending && which === 'PREV') || (!ascending && which === 'NEXT'))
        ascendingValue = 'desc'
      if (orderBy)
        allQuestionsQuery = allQuestionsQuery.orderBy(orderBy, ascendingValue)

      const currentQuestionQuery = Question.query()
        .leftJoin(
          'question_versions',
          'questions.id',
          'question_versions.question_id',
        )
        .select('questions.id', 'question_versions.publication_date')
        .distinctOn('questions.id')
        .where({
          published: true,
        })
        .orderBy([
          'questions.id',
          { column: 'question_versions.created', order: 'desc' },
        ])
        .where('questions.id', currentQuestionId)

      const query = Question.query()
        .with('all_questions', allQuestionsQuery)
        .with('current_question', currentQuestionQuery)
        .select('id')
        .from('allQuestions')
        .where(
          orderBy, // publication_date
          (ascending && which === 'NEXT') || (!ascending && which === 'PREV')
            ? '>'
            : '<',
          db.raw(`(select ${orderBy} from current_question)`),
        )
        .limit(1)

      // query.debug()

      const result = await query

      return {
        // return 0 if there is no result
        questionId: result.length && result[0].id,
      }
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
        .distinctOn('questions.id')
        .orderBy([
          'questions.id',
          { column: 'question_versions.created', order: 'desc' },
        ])
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

    const query = Question.query(options.trx).leftJoin(
      'question_versions',
      'questions.id',
      'question_versions.question_id',
    )

    // if searchQuery, we need the author's display name
    if (options.searchQuery) {
      query
        .leftJoin('teams', 'teams.object_id', 'questions.id')
        .leftJoin('team_members', 'team_members.team_id', 'teams.id')
        .leftJoin('users', 'users.id', 'team_members.user_id')
    }

    const selectFields = ['questions.*', 'question_versions.submitted']

    if (options.searchQuery) {
      selectFields.push(
        ...[
          'question_versions.content_text',
          'question_versions.keywords',
          'users.display_name as author',
        ],
      )
    }

    query.select(selectFields)

    if (submittedOnly) {
      query.where({ submitted: true })
    }

    query
      .distinctOn('questions.id')
      .orderBy([
        'questions.id',
        { column: 'question_versions.created', order: 'desc' },
      ])
      .whereNotIn('questions.id', builder => {
        return builder
          .select('questions.id')
          .from('questions')
          .leftJoin('teams', 'teams.objectId', 'questions.id')
          .leftJoin('team_members', 'team_members.team_id', 'teams.id')
          .where({
            role,
            userId,
          })
      })

    query.as('q1')

    const parentQuery = Question.query(options.trx).select('*').from(query)

    if (options.searchQuery) {
      parentQuery
        .where('content_text', 'ilike', `%${options.searchQuery}%`)
        .orWhere('author', 'ilike', `%${options.searchQuery}%`)

      const queryStrings = options.searchQuery.split(' ')
      queryStrings.forEach(queryString => {
        parentQuery.orWhereJsonSupersetOf('keywords', [queryString])
      })
    }

    return applyListQueryOptions(parentQuery, options)
  }

  static async getAuthor(id, options = {}) {
    const { trx } = options

    try {
      const author = await Question.query(trx)
        .leftJoin('teams', 'questions.id', 'teams.object_id')
        .leftJoin('team_members', 'teams.id', 'team_members.team_id')
        .select('team_members.user_id')
        .findOne({ 'teams.role': 'author', 'teams.objectId': id })

      if (author.userId) {
        const user = await User.findById(author.userId)
        return user
      }

      return null
    } catch (e) {
      console.error('Question model: getAuthor failed', e)
      // throw new Error(e)
      // return null to show question even when user does not exist
      return null
    }
  }
}

module.exports = Question
