const { uuid } = require('@coko/server')

const {
  generateScormZip,
  getQuestionVersions,
  updateQuestion,
  duplicateQuestion: duplicateQuestionController,
} = require('../question.controllers')

const {
  createEmptyQuestion,
  exampleQuestionVersion,
  exampleQuestionVersionTwo,
} = require('./__helpers__/questions')

const clearDb = require('../../models/__tests__/_clearDb')
const { Question, QuestionVersion, Team, User } = require('../../models/index')

describe('Question Controller', () => {
  beforeEach(() => clearDb())

  afterAll(async () => {
    await clearDb()
    const knex = QuestionVersion.knex()
    knex.destroy()
  })

  test('duplicates existing question and sets correct author', async () => {
    const question = await Question.insert({})
    const user1 = await User.insert({})
    const user2 = await User.insert({})

    const questionVersion = await QuestionVersion.findOne({
      questionId: question.id,
    })

    const authorTeam = await Team.insert({
      role: 'author',
      displayName: 'Author',
      objectId: question.id,
      objectType: 'question',
    })

    await Team.addMember(authorTeam.id, user1.id)

    await questionVersion.patch({
      published: true,
    })

    const duplicateQuestion = await duplicateQuestionController(
      user2.id,
      question.id,
    )

    const author = await Question.getAuthor(duplicateQuestion.id)
    expect(author.id).not.toBe(user1.id)
    expect(author.id).toBe(user2.id)
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
