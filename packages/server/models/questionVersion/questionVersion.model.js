const cloneDeep = require('lodash/cloneDeep')

const {
  BaseModel,
  modelTypes: {
    arrayOfStrings,
    boolean,
    dateNullable,
    id,
    objectNullable,
    string,
    stringNullable,
  },
} = require('@coko/server')

const extractDocumentText = data => {
  let allContent = ''

  const extract = obj => {
    const { content } = obj
    if (!Array.isArray(content)) return

    content.forEach(item => {
      const { text, content: itemContent } = item

      if (text) allContent += `${text} `
      if (itemContent) extract(item)
    })
  }

  extract(data)
  return allContent
}

class QuestionVersion extends BaseModel {
  static get tableName() {
    return 'questionVersions'
  }

  constructor(properties) {
    super(properties)
    this.type = 'questionVersion'
  }

  static get relationMappings() {
    // eslint-disable-next-line global-require
    const Question = require('../question/question.model')

    return {
      question: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Question,
        join: {
          from: 'questionVersions.questionId',
          to: 'questions.id',
        },
      },
    }
  }

  $parseJson(json, opt) {
    const data = super.$parseJson(json, opt)

    // transform stringified wax content to json before storing in the db
    if (data.content && typeof data.content === 'string') {
      data.content = JSON.parse(data.content)

      // clean up potentially invalid src attribute from data
      // (urls from the file server expire and will be generated on fetch)
      if (data.content) {
        data.content.content = data.content.content.map(item => {
          if (item.type === 'figure') {
            const clonedItem = cloneDeep(item)
            const { src } = clonedItem.content[0].attrs

            // make sure non-url existing images are not deleted
            if (src.startsWith('data:image')) return item

            clonedItem.content[0].attrs.src = null
            return clonedItem
          }

          return item
        })
      }

      // store pure text of the question separately (for use in searching)
      data.contentText = extractDocumentText(data.content)
    }

    return data
  }

  static get schema() {
    return {
      properties: {
        questionId: id,

        content: objectNullable,
        contentText: stringNullable,

        submitted: boolean,
        underReview: boolean,
        inProduction: boolean,
        published: boolean,

        publicationDate: dateNullable,

        topics: {
          type: 'array',
          default: [],
          items: {
            type: 'object',
            required: ['topic'],
            additionalProperties: false,
            properties: {
              topic: string,
              subtopic: stringNullable,
            },
          },
        },

        courses: {
          type: 'array',
          default: [],
          items: {
            type: 'object',
            required: ['course', 'units'],
            properties: {
              course: 'string',
              units: {
                type: 'array',
                default: [],
                items: {
                  type: 'object',
                  required: [],
                  additionalProperties: false,
                  properties: {
                    application: stringNullable,
                    coreCompetence: stringNullable,
                    coreConcept: stringNullable,
                    courseTopic: stringNullable,
                    essentialKnowledge: stringNullable,
                    learningObjective: stringNullable,
                    skill: stringNullable,
                    subcompetence: stringNullable,
                    subcompetenceStatement: stringNullable,
                    subdiscipline: stringNullable,
                    subdisciplineStatement: stringNullable,
                    understanding: stringNullable,
                    unit: stringNullable,
                  },
                },
              },
            },
          },
        },

        keywords: arrayOfStrings,
        biointeractiveResources: arrayOfStrings,

        cognitiveLevel: stringNullable,
        affectiveLevel: stringNullable,
        psychomotorLevel: stringNullable,
        readingLevel: stringNullable,

        questionType: stringNullable,
        lastEdit: dateNullable,
      },
    }
  }
}

module.exports = QuestionVersion
