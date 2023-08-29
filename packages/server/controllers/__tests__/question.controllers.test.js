const config = require('config')

const { uuid } = require('@coko/server')

const {
  getAuthorDashboard,
  getManagingEditorDashboard,
  generateScormZip,
  getQuestionVersions,
  updateQuestion,
  duplicateQuestion: duplicateQuestionController,
  assignHandlingEditors,
  unassignHandlingEditor,
  getAuthorChatParticipants,
  getProductionChatParticipants,
  getHandlingEditorDashboard,
  assignAuthorship,
} = require('../question.controllers')

const {
  createEmptyQuestion,
  exampleQuestionVersion,
  exampleQuestionVersionTwo,
} = require('./__helpers__/questions')

const {
  createGlobalHandlingEditorTeamWithUsers,
  createGlobalEditorTeamWithUsers,
  createGlobalProductionTeamWithUsers,
} = require('../../models/__tests__/__helpers__/teams')

const HE_TEAM = config.teams.nonGlobal.handlingEditor

const clearDb = require('../../models/__tests__/_clearDb')
const { Question, QuestionVersion, Team, User } = require('../../models/index')

describe('Question Controller', () => {
  beforeEach(() => clearDb())

  // afterAll(async () => {
  //   await clearDb()
  //   const knex = QuestionVersion.knex()
  //   knex.destroy()
  // })

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

  test('assignAuthorship assign correct author to the question', async () => {
    const question = await createEmptyQuestion()
    const user = await User.insert({})
    const assigned = await assignAuthorship(question.id, user.id)
    const author = await Question.getAuthor(question.id)
    expect(assigned).toBe(true)
    expect(user.id).toBe(author.id)
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

  test('getAuthorChatParticipants gets correct question participants', async () => {
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

    const participants = await getAuthorChatParticipants(question.id)

    const participantUsernames = participants.map(
      participant => participant.displayName,
    )

    expect(participantUsernames).toContain(updatedEditor[0].displayName)
    expect(participantUsernames).toContain(HE.displayName)
    expect(participantUsernames).toContain(author.displayName)
  })

  test('getProductionChatParticipants gets correct question participants', async () => {
    const { user: editor } = await createGlobalEditorTeamWithUsers()

    const { user: productionMember } =
      await createGlobalProductionTeamWithUsers()

    const updatedEditor = await User.query()
      .update({
        displayName: 'editor 1',
        username: 'editor1',
      })
      .where({ id: editor.id })
      .returning('displayName')

    const updatedProductionMember = await User.query()
      .update({
        displayName: 'productionMember',
        username: 'productionMember',
      })
      .where({ id: productionMember.id })
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

    const participants = await getProductionChatParticipants(question.id)

    const participantUsernames = participants.map(
      participant => participant.displayName,
    )

    expect(participantUsernames).toContain(updatedEditor[0].displayName)
    expect(participantUsernames).toContain(HE.displayName)
    expect(participantUsernames).toContain(
      updatedProductionMember[0].displayName,
    )
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
  test('getAuthorDashboard: returns questions the user has authored', async () => {
    const question1 = await Question.insert({})
    const question2 = await Question.insert({})
    const question3 = await Question.insert({})

    const user1 = await User.insert({})
    const user2 = await User.insert({})

    await QuestionVersion.insert({
      questionId: question1.id,
      underReview: true,
      submitted: true,
      published: true,
    })

    await QuestionVersion.insert({
      questionId: question2.id,
      submitted: false,
    })

    await QuestionVersion.insert({
      questionId: question2.id,
      submitted: false,
    })

    const q1Team = await Team.insert({
      objectId: question1.id,
      objectType: 'question',
      role: 'author',
      displayName: 'Author',
    })

    const q2Team = await Team.insert({
      objectId: question2.id,
      objectType: 'question',
      role: 'author',
      displayName: 'Author',
    })

    const q3Team = await Team.insert({
      objectId: question3.id,
      objectType: 'question',
      role: 'author',
      displayName: 'Author',
    })

    await Team.addMember(q1Team.id, user1.id)
    await Team.addMember(q2Team.id, user1.id)
    await Team.addMember(q3Team.id, user2.id)

    const { result, totalCount } = await getAuthorDashboard(user1.id)
    expect(totalCount).toBe(2)
    const qIds = [(question1.id, question2.id)]
    qIds.forEach(qId => {
      expect(
        result.some(res => res.id === qId && res.id !== question3.id),
      ).toBe(true)
    })
  })

  test('getManagingEditorDashboard: returns questions excluding authored questions', async () => {
    const question1 = await Question.insert({})
    const question2 = await Question.insert({})

    const { user: editor } = await createGlobalEditorTeamWithUsers()

    await QuestionVersion.insert({
      questionId: question1.id,
      submitted: true,
    })

    await QuestionVersion.insert({
      questionId: question2.id,
      submitted: true,
    })

    const q1Team = await Team.insert({
      objectId: question1.id,
      objectType: 'question',
      role: 'author',
      displayName: 'Author',
    })

    await Team.addMember(q1Team.id, editor.id)
    const { result } = await getManagingEditorDashboard(editor.id)
    expect(result.some(res => res.id !== question1.id)).toBe(true)
  })

  test('getManagingEditorDashboard: returns only submitted questions', async () => {
    const question1 = await Question.insert({})
    const question2 = await Question.insert({})

    const { user: editor } = await createGlobalEditorTeamWithUsers()

    await QuestionVersion.insert({
      questionId: question1.id,
      submitted: true,
    })

    await QuestionVersion.insert({
      questionId: question2.id,
      submitted: false,
    })

    const { result } = await getManagingEditorDashboard(editor.id)
    expect(result.some(res => res.id !== question2.id)).toBe(true)
  })

  test('getManagingEditorDashboard: filters questions with the given status', async () => {
    const question1 = await Question.insert({})
    const question2 = await Question.insert({})

    const { user: editor } = await createGlobalEditorTeamWithUsers()

    await QuestionVersion.insert({
      questionId: question1.id,
      submitted: true,
    })

    await QuestionVersion.insert({
      questionId: question2.id,
      submitted: true,
      underReview: true,
    })

    const { result, totalCount } = await getManagingEditorDashboard(editor.id, {
      filters: {
        status: 'underReview',
      },
    })

    expect(totalCount).toEqual(1)
    expect(result[0].id !== question1.id).toBe(true)
  })

  test('getManagingEditorDashboard: filters questions with the given HE', async () => {
    const question1 = await Question.insert({})
    const question2 = await Question.insert({})
    const { user: ME } = await createGlobalEditorTeamWithUsers()

    const { user: HE } = await createGlobalHandlingEditorTeamWithUsers()

    await QuestionVersion.insert({
      questionId: question1.id,
      submitted: true,
    })

    await QuestionVersion.insert({
      questionId: question2.id,
      submitted: false,
    })

    const q1HeTeam = await Team.insert({
      objectId: question1.id,
      objectType: 'question',
      role: 'handlingEditor',
      displayName: 'Handling Editor',
    })

    await Team.addMember(q1HeTeam.id, HE.id)

    const { result, totalCount } = await getManagingEditorDashboard(ME.id, {
      filters: {
        heAssigned: HE.id,
      },
    })

    expect(totalCount).toEqual(1)
    expect(result[0].id === question1.id).toBe(true)
  })

  test('getHandlingEditorDashboard: only returns questions that are assigned to the HE', async () => {
    const question1 = await Question.insert({})
    const question2 = await Question.insert({})

    const { user: HE } = await createGlobalHandlingEditorTeamWithUsers()

    await QuestionVersion.insert({
      questionId: question1.id,
      submitted: true,
    })

    await QuestionVersion.insert({
      questionId: question2.id,
      submitted: false,
    })

    const q1HeTeam = await Team.insert({
      objectId: question1.id,
      objectType: 'question',
      role: 'handlingEditor',
      displayName: 'Handling Editor',
    })

    await Team.addMember(q1HeTeam.id, HE.id)

    const { result } = await getHandlingEditorDashboard(HE.id)
    expect(result[0].id).toEqual(question1.id)
  })

  test('getHandlingEditorDashboard: filters questions with given status', async () => {
    const question1 = await Question.insert({})
    const question2 = await Question.insert({})

    const { user: HE } = await createGlobalHandlingEditorTeamWithUsers()

    await QuestionVersion.insert({
      questionId: question1.id,
      submitted: true,
      inProduction: true,
    })

    await QuestionVersion.insert({
      questionId: question2.id,
      submitted: true,
      underReview: true,
    })

    const q1HeTeam = await Team.insert({
      objectId: question1.id,
      objectType: 'question',
      role: 'handlingEditor',
      displayName: 'Handling Editor',
    })

    await Team.addMember(q1HeTeam.id, HE.id)

    const { result, totalCount } = await getHandlingEditorDashboard(HE.id, {
      filters: {
        status: 'inProduction',
      },
    })

    expect(totalCount).toEqual(1)
    expect(result[0].id === question1.id).toBe(true)
  })
})
