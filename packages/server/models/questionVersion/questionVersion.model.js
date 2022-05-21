const {
  BaseModel,
  modelTypes: {
    id,
    arrayOfStrings,
    boolean,
    objectNullable,
    stringNullable,
    arrayOfObjectsNullable,
  },
} = require('@coko/server')

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

  static get schema() {
    return {
      properties: {
        questionId: id,
        content: stringNullable,

        submitted: boolean,
        underReview: boolean,
        published: boolean,

        topic: stringNullable,
        subTopic: stringNullable,
        framework: stringNullable,
        frameworkMetadata: objectNullable,
        keywords: arrayOfStrings,
        biointeractiveResources: stringNullable,
        cognitiveLevel: stringNullable,
        affectiveLevel: stringNullable,
        psychomotorLevel: stringNullable,
        readingLevel: stringNullable,
        supplementaryFields: arrayOfObjectsNullable, // e.g. [{topic:"Value", subTopic:Value, frameworkMetadata:{...}},...]
      },
    }
  }
}

module.exports = QuestionVersion
