const { uuid } = require('@coko/server')

const {
  generateScormZip,
  getQuestionVersions,
  updateQuestion,
} = require('../question.controllers')

const {
  createEmptyQuestion,
  exampleQuestionVersion,
  exampleQuestionVersionTwo,
} = require('./__helpers__/questions')

const clearDb = require('../../models/__tests__/_clearDb')
const { QuestionVersion } = require('../../models/index')

describe('Question Controller', () => {
  beforeEach(() => clearDb())

  afterAll(async () => {
    await clearDb()
    const knex = QuestionVersion.knex()
    knex.destroy()
  })

  test('generateScormZip fails to export an empty question', async () => {
    const question = await createEmptyQuestion()

    const questionVersions = await getQuestionVersions(question.id, {
      latestOnly: true,
      publishedOnly: false,
    })

    const questionVersion = questionVersions[0]

    await expect(generateScormZip(questionVersion.id)).rejects.toThrow(
      'Error: WaxToScormConverter: No document provided',
    )

    // expect(questionExport).toBeFalsy()
  })

  test('generateScormZip fails to export an invalid question ID', async () => {
    const id = uuid()

    await expect(generateScormZip(id)).rejects.toThrow(
      'NotFoundError: NotFoundError',
    )
  })

  test('generateScormZip exports a basic question', async () => {
    const question = await createEmptyQuestion()

    const questionVersions = await getQuestionVersions(question.id, {
      latestOnly: true,
      publishedOnly: false,
    })

    const questionVersion = questionVersions[0]

    await updateQuestion(
      question.id,
      questionVersion.id,
      exampleQuestionVersion,
    )

    const exportFilename = await generateScormZip(questionVersion.id)

    expect(exportFilename).toBe(`${question.id}.zip`)
  })

  test('generateScormZip exports a non-question with', async () => {
    const question = await createEmptyQuestion()

    const questionVersions = await getQuestionVersions(question.id, {
      latestOnly: true,
      publishedOnly: false,
    })

    const questionVersion = questionVersions[0]

    await updateQuestion(
      question.id,
      questionVersion.id,
      exampleQuestionVersionTwo,
    )

    const exportFilename = await generateScormZip(questionVersion.id)

    expect(exportFilename).toBe(`${question.id}.zip`)
  })
})
