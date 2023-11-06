const config = require('config')

const { uuid } = require('@coko/server')

const {
  generateScormZip,
  getQuestionVersions,
  updateQuestion,
  duplicateQuestion: duplicateQuestionController,
  assignHandlingEditors,
  unassignHandlingEditor,
  getQuestionParticipants,
} = require('../question.controllers')

const {
  createEmptyQuestion,
  exampleQuestionVersion,
  exampleQuestionVersionTwo,
} = require('./__helpers__/questions')

const {
  createGlobalEditorTeamWithUsers,
} = require('../../models/__tests__/__helpers__/teams')

const HE_TEAM = config.teams.nonGlobal.handlingEditor

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

  test('getQuestionParticipants gets correct question participants', async () => {
    const { user: editor } = await createGlobalEditorTeamWithUsers()

    const updatedEditor = await User.query()
      .update({
        displayName: 'editor 1',
        username: 'editor1',
      })
      .where({ id: editor.id })
      .returning('displayName')

    const author = await User.insert({
      username: 'user1',
      displayName: 'user 1',
    })

    const HE = await User.insert({
      username: 'handlingEditor1',
      displayName: 'HE1',
    })

    const question = await Question.insert({})

    const authorTeam = await Team.insert({
      objectId: question.id,
      objectType: 'question',
      role: 'author',
      displayName: 'Author',
    })

    await Team.addMember(authorTeam.id, author.id)

    const handlingEditorTeam = await Team.insert({
      role: 'handlingEditor',
      displayName: 'Handling Editor',
      objectId: question.id,
      objectType: 'question',
    })

    await Team.addMember(handlingEditorTeam.id, HE.id)

    const participants = await getQuestionParticipants(question.id)

    const participantUsernames = participants.map(
      participant => participant.displayName,
    )

    expect(participantUsernames).toContain(updatedEditor[0].displayName)
    expect(participantUsernames).toContain(HE.displayName)
    expect(participantUsernames).toContain(author.displayName)
  })

  test('assignHandlingEditor assigns editor to correct team', async () => {
    const question = await createEmptyQuestion()
    const user = await User.insert({})
    await assignHandlingEditors([question.id], [user.id])

    const team = await Question.getHandlingEditors(question.id)
    expect(team.some(t => t.id === user.id)).toBe(true)
  })

  test('assignHandlingEditor ignores authors and sets hasAuthorshipConflict to true', async () => {
    const question = await Question.insert({})
    const user = await User.insert({})

    const authorTeam = await Team.insert({
      objectId: question.id,
      objectType: 'question',
      role: 'author',
      displayName: 'Author',
    })

    await Team.addMember(authorTeam.id, user.id)
    const result = await assignHandlingEditors([question.id], [user.id])
    expect(result[0].members.length).toEqual(0)
    expect(result[0].hasAuthorshipConflict).toBe(true)
  })

  test('unassigHandlingEditor unnassigns specified editor', async () => {
    const question = await createEmptyQuestion()
    const user1 = await User.insert({})
    const user2 = await User.insert({})

    const questionTeam = await Team.insert({
      objectId: question.id,
      objectType: 'question',
      role: HE_TEAM.role,
      displayName: HE_TEAM.displayName,
    })

    await Team.addMember(questionTeam.id, user1.id)
    await Team.addMember(questionTeam.id, user2.id)

    await unassignHandlingEditor(question.id, user1.id)
    const team = await Question.getHandlingEditors(question.id)
    expect(team.every(t => t.id !== user1.id)).toBe(true)
    expect(team.some(t => t.id === user2.id)).toBe(true)
  })
})
