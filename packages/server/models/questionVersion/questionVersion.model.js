const cloneDeep = require('lodash/cloneDeep')

const {
  BaseModel,
  modelJsonSchemaTypes: {
    arrayOfStrings,
    boolean,
    dateNullable,
    id,
    idNullable,
    objectNullable,
    string,
    stringNullable,
    integerPositive,
    arrayOfIds,
    object,
  },
} = require('@coko/server')

const { extractDocumentText, hasRoleHelper } = require('../helpers')
const Question = require('../question/question.model')
const ComplexItemSet = require('../complexItemSet/complexItemSet.model')

class QuestionVersion extends BaseModel {
  static get tableName() {
    return 'questionVersions'
  }

  constructor(properties) {
    super(properties)
    this.type = 'questionVersion'
  }

  static get relationMappings() {
    return {
      question: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Question,
        join: {
          from: 'questionVersions.questionId',
          to: 'questions.id',
        },
      },
      complexItemSet: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: ComplexItemSet,
        join: {
          from: 'question_versions.complexItemSetId',
          to: 'complexItemSets.id',
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
        const cleanUpUrls = node => {
          if (!node.content) return node

          const modifiedNode = cloneDeep(node)

          modifiedNode.content = node.content.map(item => {
            if (item.type === 'figure') {
              const clonedItem = cloneDeep(item)
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

          return modifiedNode
        }

        data.content = cleanUpUrls(data.content)
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
        complexItemSetId: idNullable,
        dependsOn: arrayOfIds,

        content: objectNullable,
        contentText: stringNullable,

        submitted: boolean,
        editing: boolean,
        accepted: boolean,
        underReview: boolean,
        inProduction: boolean,
        published: boolean,
        unpublished: boolean,

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
          type: ['array', 'null'],
          default: [],
          items: object,
        },

        // courses: {
        //   type: arrayOfObjectsNullable,
        //   items: {
        //     type: 'object',
        //     // required: ['course', 'units'],
        //     properties: {
        //       course: 'string',
        //       units: {
        //         type: 'array',
        //         default: [],
        //         items: {
        //           type: 'object',
        //           required: [],
        //           additionalProperties: false,
        //           properties: {
        //             unit: stringNullable,
        //             courseTopic: stringNullable,
        //             // AP courses
        //             essentialKnowledge: stringNullable,
        //             learningObjective: stringNullable,
        //             // IB courses
        //             application: stringNullable,
        //             skill: stringNullable,
        //             understanding: stringNullable,
        //             // vision and change
        //             coreConcept: stringNullable,
        //             subdiscipline: stringNullable,
        //             subdisciplineStatement: stringNullable,
        //             coreCompetence: stringNullable,
        //             subcompetence: stringNullable,
        //             subcompetenceStatement: stringNullable,
        //             // aamc metadata
        //             concept: stringNullable,
        //             category: stringNullable,
        //           },
        //         },
        //       },
        //     },
        //   },
        // },

        keywords: arrayOfStrings,
        biointeractiveResources: arrayOfStrings,

        cognitiveLevel: stringNullable,
        affectiveLevel: stringNullable,
        psychomotorLevel: stringNullable,
        readingLevel: stringNullable,
        literatureAttribution: stringNullable,

        questionType: stringNullable,
        lastEdit: dateNullable,

        amountOfReviewers: integerPositive,
        isReviewerAutomationOn: boolean,
        reviewerPool: arrayOfIds,
      },
    }
  }

  static async hasRole(userId, manuscriptVersionId, role) {
    return hasRoleHelper(userId, manuscriptVersionId, role)
  }

  async hasRole(userId, role) {
    return hasRoleHelper(userId, this.id, role)
  }
}

module.exports = QuestionVersion
