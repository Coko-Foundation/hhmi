const {
  BaseModel,
  modelTypes: { boolean },
} = require('@coko/server')

// eslint-disable-next-line import/no-extraneous-dependencies
const { db } = require('@pubsweet/db-manager')

const { ChatThread } = require('@coko/server/src/models')

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

  static async insert(data, versionData, options = {}) {
    const question = await super.insert(data, options)
    await this.createNewVersion(
      { questionId: question.id, ...versionData },
      { trx: options.trx },
    )
    return question
  }

  static async getQuestion(questionId, options = {}) {
    try {
      const { trx } = options
      return Question.query(trx)
        .select('questions.*')
        .findOne('questions.id', questionId)
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  }

  static async duplicateQuestion(id, options = {}) {
    const question = await this.insert({})

    const originalQuestionVersions = await this.getVersions(id, {
      latestOnly: true,
      publishedOnly: true,
    })

    const {
      content,
      topics,
      courses,
      keywords,
      biointeractiveResources,
      cognitiveLevel,
      affectiveLevel,
      psychomotorLevel,
      readingLevel,
      questionType,
    } = originalQuestionVersions.result[0]

    await QuestionVersion.query(options.trx)
      .patch({
        questionId: question.id,
        content,
        submitted: false,
        topics,
        courses,
        keywords,
        biointeractiveResources,
        cognitiveLevel,
        affectiveLevel,
        psychomotorLevel,
        readingLevel,
        questionType,
      })
      .where('question_id', question.id)
    return question
  }

  // TO DO -- if there is a previous versions, you should copy its contents
  static async createNewVersion(data, options = {}) {
    const previousVersions = await this.getVersions(data.questionId, {
      latestOnly: true,
      publishedOnly: true,
    })

    if (previousVersions.totalCount > 0) {
      const {
        questionId,
        complexItemSetId,
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
          complexItemSetId,
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

    return QuestionVersion.insert(data, { trx: options.trx })
  }

  async createNewVersion(data = {}, options = {}) {
    return Question.createNewVersion({ ...data, questionId: this.id }, options)
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

      if (filters.complexItemSet && filters.complexItemSet.length) {
        query.whereIn('complex_item_set_id', filters.complexItemSet)
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
          'question_versions.complex_item_set_id',
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

      const response = await Promise.all([
        new Promise(resolve => {
          applyListQueryOptions(parentQuery, options).then(result =>
            resolve(result),
          )
        }),
        // get all question ids for the applied filters, unpaginated
        new Promise(resolve => {
          applyListQueryOptions(parentQuery, {
            orderBy: options.orderBy,
            ascending: options.ascending,
          }).then(result => {
            resolve(result.result.map(q => q.id))
          })
        }),
      ])

      return {
        ...response[0],
        relatedQuestionsIds: response[1],
      }
    } catch (e) {
      console.error('Question model: filter failed', e)
      throw new Error(e)
    }
  }

  static async getPublishedQuestionsIds(options) {
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

      query.as('q1')

      const parentQuery = Question.query(options.trx).select('*').from(query)

      const questions = await applyListQueryOptions(parentQuery, {
        orderBy: 'publication_date',
        ascending: false,
      })

      return questions.result.map(q => q.id)
    } catch (e) {
      console.error('Question model: getPublishedQuestionsIds failed', e)
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
    const { submittedOnly, filters = {} } = options

    const { status, searchQuery, heAssigned, author } = filters

    const query = Question.query(options.trx).leftJoin(
      'question_versions',
      'questions.id',
      'question_versions.question_id',
    )

    const selectFields = ['questions.*', 'question_versions.submitted']

    // if searchQuery, we'll need the question's content and keywords
    if (searchQuery) {
      selectFields.push(
        ...['question_versions.content_text', 'question_versions.keywords'],
      )
    }

    // if status, we'll need the status fields
    if (status) {
      selectFields.push(
        ...[
          'question_versions.under_review',
          'question_versions.in_production',
          'question_versions.published',
        ],
      )
    }

    // if author, we'll need the question's author displayName, surname and first name
    if (author) {
      query
        .leftJoin('teams', builder => {
          builder
            .on('teams.object_id', '=', 'questions.id')
            .andOn('teams.role', '=', db.raw('?', ['author']))
        })
        .leftJoin('team_members', 'team_members.team_id', 'teams.id')
        .leftJoin('users', 'users.id', 'team_members.user_id')

      selectFields.push(
        ...['users.displayName', 'users.givenNames', 'users.surname'],
      )
    }

    query.select(selectFields)

    if (submittedOnly) {
      query.where({ submitted: true })
    }

    // create initial query for questions excluding author's ones
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

    // get unique question versions per question
    const parentQuery = Question.query(options.trx).select('*').from(query)

    // apply additional filters by chaining `where` clauses
    // status filter
    switch (status) {
      case '':
      case null:
      case undefined:
        break

      case 'submitted':
        parentQuery.where({
          under_review: false,
          in_production: false,
          published: false,
          rejected: false,
        })
        break

      case 'rejected':
        parentQuery.where({ rejected: true })
        break

      default:
        // all other statuses: under_review, in_production or published
        parentQuery.where(status, true)
        break
    }

    // heAssigned filter
    if (typeof heAssigned !== 'undefined' && heAssigned !== null) {
      if (heAssigned) {
        // fetch results for which exists a team_member for question's 'handlingEditor' team
        parentQuery.whereExists(builder => {
          builder
            .select('*')
            .from('team_members')
            .leftJoin('teams', 'teams.id', 'team_members.team_id')
            .where({
              'teams.role': 'handlingEditor',
              'teams.global': false,
            })
            .whereRaw('teams.object_id = q1.id')
        })
      } else {
        // fetch results for which there is no team_member for question's 'handlingEditor' team
        parentQuery.whereNotExists(builder => {
          builder
            .select('*')
            .from('team_members')
            .leftJoin('teams', 'teams.id', 'team_members.team_id')
            .where({
              'teams.role': 'handlingEditor',
              'teams.global': false,
            })
            .whereRaw('teams.object_id = q1.id')
        })
      }
    }

    // author filter
    if (author) {
      parentQuery.where(builder => {
        return builder
          .where('givenNames', 'ilike', `%${author}%`)
          .orWhere('surname', 'ilike', `%${author}%`)
          .orWhere('displayName', 'ilike', `%${author}%`)
      })
    }

    // search query filter
    if (searchQuery) {
      parentQuery.where('content_text', 'ilike', `%${searchQuery}%`)

      const queryStrings = searchQuery.split(' ')
      queryStrings.forEach(queryString => {
        parentQuery.orWhereJsonSupersetOf('keywords', [queryString])
      })
    }

    return applyListQueryOptions(parentQuery, options)
  }

  static async getAuthor(questionId, options = {}) {
    const { trx } = options

    try {
      const author = await Question.query(trx)
        .leftJoin('teams', 'questions.id', 'teams.object_id')
        .leftJoin('team_members', 'teams.id', 'team_members.team_id')
        .select('team_members.user_id')
        .findOne({ 'teams.role': 'author', 'teams.objectId': questionId })

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

  static async getHandlingEditors(questionId, options = {}) {
    const { trx } = options

    try {
      return User.query(trx)
        .leftJoin('team_members', 'users.id', 'team_members.user_id')
        .leftJoin('teams', 'team_members.team_id', 'teams.id')
        .select('users.*', 'teams.object_id')
        .where({ 'teams.role': 'handlingEditor', 'teams.objectId': questionId })
    } catch (e) {
      console.error('Question model: getHandlingEditors failed', e)
      throw new Error(e)
    }
  }

  static async getChatThread(questionId, options = {}) {
    const { trx } = options

    try {
      const chat = await ChatThread.query(trx)
        .select('id')
        .findOne({ relatedObjectId: questionId })

      return chat?.id
    } catch (e) {
      console.error('Question model: getHandlingEditors failed', e)
      throw new Error(e)
    }
  }

  static async getSetsQuestionsForUser(complexItemSetId, userId, options = {}) {
    const userTeams = await User.getTeams(userId, options.trx)

    const isEditor = userTeams.some(
      team =>
        (team.global && team.role === 'editor') ||
        team.role === 'handlingEditor',
    )

    const query = Question.query(options.trx)
      .leftJoin(
        'question_versions',
        'questions.id',
        'question_versions.question_id',
      )
      .distinctOn('questions.id')
      .orderBy([
        'questions.id',
        { column: 'question_versions.created', order: 'desc' },
      ])

    if (!isEditor) {
      query
        .leftJoin('teams', 'questions.id', 'teams.object_id')
        .leftJoin('team_members', 'team_members.team_id', 'teams.id')
        .where({
          published: true,
          complexItemSetId,
        })
        .orWhere({
          complexItemSetId,
          role: 'author',
          userId,
        })
    } else {
      query.where({ complexItemSetId })
    }

    query.debug()

    return applyListQueryOptions(query, options)
  }
}

module.exports = Question
