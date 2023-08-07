const {
  BaseModel,
  modelTypes: { objectNullable, stringNullable },
} = require('@coko/server')

const cloneDeep = require('lodash/cloneDeep')
const { applyListQueryOptions, extractDocumentText } = require('../helpers')
const QuestionVersion = require('../question/question.model')

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

          modifiedNode.content = node.content.map(item => {
            if (item.type === 'figure') {
              const clonedItem = cloneDeep(item)
              const { src } = clonedItem.content[0].attrs

              // make sure non-url existing images are not deleted
              if (src.startsWith('data:image')) return item

              clonedItem.content[0].attrs.src = null
              return clonedItem
            }

            return cleanUpUrls(item)
          })

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
}

module.exports = ComplexItemSet
