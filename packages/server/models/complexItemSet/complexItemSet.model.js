const {
  BaseModel,
  modelJsonSchemaTypes: { boolean, objectNullable, stringNullable },
} = require('@coko/server')

const cloneDeep = require('lodash/cloneDeep')
const { applyListQueryOptions, extractDocumentText } = require('../helpers')
const QuestionVersion = require('../question/question.model')
const User = require('../user/user.model')

class ComplexItemSet extends BaseModel {
  static get tableName() {
    return 'complexItemSets'
  }

  constructor(properties) {
    super(properties)
    this.type = 'complexItemSet'
  }

  static get relationMappings() {
    return {
      questions: {
        relation: BaseModel.HasManyRelation,
        modelClass: QuestionVersion,
        join: {
          from: 'complexItemSets.id',
          to: 'questionVersions.complexItemSetId',
        },
      },
    }
  }

  $parseJson(json, opt) {
    const data = super.$parseJson(json, opt)

    // transform stringified wax content to json before storing in the db
    if (data.leadingContent && typeof data.leadingContent === 'string') {
      data.leadingContent = JSON.parse(data.leadingContent)

      // clean up potentially invalid src attribute from data
      // (urls from the file server expire and will be generated on fetch)
      if (data.leadingContent) {
        const cleanUpUrls = node => {
          if (!node.content) return node

          const modifiedNode = cloneDeep(node)

          modifiedNode.content = node.content
            .map(item => {
              if (item.type === 'figure') {
                const clonedItem = cloneDeep(item)

                // when figure lacks content (not proprely deleted from user) ignore it
                if (!clonedItem.content) {
                  return null
                }

                const { src } = clonedItem.content[0].attrs

                if (src) {
                  // make sure non-url existing images are not deleted
                  if (src.startsWith('data:image')) return item

                  clonedItem.content[0].attrs.src = null
                  return clonedItem
                }

                // if image is missing a src replace it with empty paragraph
                return {
                  type: 'paragraph',
                  attrs: {
                    class: 'paragraph',
                  },
                  content: [
                    {
                      text: ' ',
                      type: 'text',
                    },
                  ],
                }
              }

              return cleanUpUrls(item)
            })
            .filter(item => !!item)

          return modifiedNode
        }

        data.leadingContent = cleanUpUrls(data.leadingContent)
      }

      data.contentText = extractDocumentText(data.leadingContent)
    }

    return data
  }

  static get schema() {
    return {
      properties: {
        title: stringNullable,
        leadingContent: objectNullable,
        contentText: stringNullable,
        deletedAuthor: stringNullable,
        isPublished: boolean,
      },
    }
  }

  static async filterByQueryString(searchQuery, options) {
    const query = ComplexItemSet.query(options.trx).select('*')

    if (searchQuery) {
      query
        .where('title', 'ilike', `%${searchQuery}%`)
        .orWhere('content_text', 'ilike', `%${searchQuery}%`)
    }

    return applyListQueryOptions(query, options)
  }

  static async filterSetsForUser(userId, searchQuery, options) {
    // userId will be null if user is not logged in or only public sets were requested
    // Does not apply, all pages require the user to log in
    if (!userId) {
      return ComplexItemSet.query().select('*').where('isPublished', true)
    }

    // otherwise, filter sets according to role
    const userTeams = await User.getTeams(userId)

    const isEditorOrAdmin = userTeams.some(
      team =>
        team.global &&
        (team.role === 'editor' ||
          team.role === 'handlingEditor' ||
          team.role === 'admin'),
    )

    const authoredSets = userTeams
      .filter(
        team => team.role === 'author' && team.objectType === 'complexItemSet',
      )
      .map(team => team.objectId)

    const query = ComplexItemSet.query()

    const selectFields = ['complex_item_sets.*']

    if (searchQuery) {
      query
        .leftJoin('teams', 'teams.objectId', 'complex_item_sets.id')
        .leftJoin('team_members', 'team_members.team_id', 'teams.id')
        .leftJoin('users', 'users.id', 'team_members.user_id')

      selectFields.push(
        ...['users.display_name', 'users.given_names', 'users.surname'],
      )
    }

    if (isEditorOrAdmin) {
      query.select(selectFields)
    } else {
      query
        .leftJoin(
          'question_versions',
          'question_versions.complexItemSetId',
          'complexItemSets.id',
        )
        .select([...selectFields, 'question_versions.published'])
        .distinctOn('complexItemSets.id')
        .orderBy([
          'complexItemSets.id',
          { column: 'complexItemSets.updated', order: 'asc' },
        ])
        .whereIn('complexItemSets.id', authoredSets)
        .orWhere('question_versions.published', true)
    }

    if (searchQuery) {
      query.andWhere(builder =>
        builder
          .where('title', 'ilike', `%${searchQuery}%`)
          .orWhere('content_text', 'ilike', `%${searchQuery}%`)
          .orWhere('users.display_name', 'ilike', `%${searchQuery}%`)
          .orWhere('users.given_names', 'ilike', `%${searchQuery}%`)
          .orWhere('users.surname', 'ilike', `%${searchQuery}%`),
      )
    }

    query.as('q1')

    const parentQuery = ComplexItemSet.query().select('*').from(query)

    // paginate result only if options were passed
    return options ? applyListQueryOptions(parentQuery, options) : query
  }
}

module.exports = ComplexItemSet
