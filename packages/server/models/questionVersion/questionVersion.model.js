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

  static get schema() {
    return {
      properties: {
        questionId: id,
        content: stringNullable,
        topic: stringNullable,
        subTopic: stringNullable,
        submitted: boolean,
        keywords: arrayOfStrings,
        biointeractiveResources: stringNullable,
        cognitiveLevel: stringNullable,
        affectiveLevel: stringNullable,
        psychomotorLevel: stringNullable,
        readingLevel: stringNullable,
        framework: stringNullable,
        frameworkMetadata: objectNullable,
        supplementaryFields: arrayOfObjectsNullable, // e.g. [{topic:"Value", subTopic:Value, frameworkMetadata:{...}},...]
      },
    }
  }
}

module.exports = QuestionVersion
