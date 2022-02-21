const model = require('./question.model')

const {
  questionVersionsBasedOnQuestionIdsLoader,
} = require('./question.loaders')

module.exports = {
  model,
  modelName: 'Question',
  modelLoaders: {
    questionVersionsBasedOnQuestionIdsLoader,
  },
}
