const config = require('config')
const { internet } = require('faker')

const { uuid } = require('@coko/server')

const {
  generateScormZip,
  getQuestionVersions,
  updateQuestion,
  duplicateQuestion: duplicateQuestionController,
  assignHandlingEditors,
  unassignHandlingEditor,
  getAuthorChatParticipants,
  getProductionChatParticipants,
  updateReviewerPool,
  changeAmountOfReviewers,
  changeReviewerAutomationStatus,
  reviewerStatus,
} = require('../question.controllers')

const {
  createEmptyQuestion,
  exampleQuestionVersion,
  exampleQuestionVersionTwo,
} = require('./__helpers__/questions')

const {
  createGlobalEditorTeamWithUsers,
  createGlobalProductionTeamWithUsers,
} = require('../../models/__tests__/__helpers__/teams')

const HE_TEAM = config.teams.nonGlobal.handlingEditor

const clearDb = require('../../models/__tests__/_clearDb')

const {
  Question,
  QuestionVersion,
  Team,
  TeamMember,
  User,
  Review,
} = require('../../models')

const { REVIEWER_STATUSES } = require('../constants')

const {
  createUser,
  createIdentity,
} = require('../../models/__tests__/__helpers__/users')

const { acceptOrRejectInvitation } = require('../team.controllers')

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

  test('updateReviewerPool adds and removes user to the pool', async () => {
    const question = await createEmptyQuestion()
    const user1 = await User.insert({})
    const user2 = await User.insert({})

    let questionVersion = await QuestionVersion.findOne({
      questionId: question.id,
    })

    expect(questionVersion.reviewerPool).toHaveLength(0)

    const ids = [user1.id, user2.id]

    questionVersion = await updateReviewerPool(questionVersion.id, ids)

    expect(questionVersion.reviewerPool).toHaveLength(2)
    questionVersion.reviewerPool.forEach(userId =>
      expect(ids).toContain(userId),
    )

    questionVersion = await updateReviewerPool(questionVersion.id, [user2.id])

    expect(questionVersion.reviewerPool).toHaveLength(1)
    expect(questionVersion.reviewerPool[0]).toBe(user2.id)
  })

  test('changeAmountOfReviewers updates number of reviewers', async () => {
    const question = await createEmptyQuestion()

    let questionVersion = await QuestionVersion.findOne({
      questionId: question.id,
    })

    expect(questionVersion.amountOfReviewers).toBe(0)

    questionVersion = await changeAmountOfReviewers(questionVersion.id, 3)

    expect(questionVersion.amountOfReviewers).toBe(3)

    questionVersion = await changeAmountOfReviewers(questionVersion.id, 1)

    expect(questionVersion.amountOfReviewers).toBe(1)
  })

  test('changeReviewerAutomationStatus sends out max invites', async () => {
    const question = await createEmptyQuestion()
    const user1 = await User.insert({})
    const user2 = await User.insert({})
    const user3 = await User.insert({})
    const user4 = await User.insert({})

    let questionVersion = await QuestionVersion.findOne({
      questionId: question.id,
    })

    expect(questionVersion.isReviewerAutomationOn).toBe(false)

    await updateReviewerPool(questionVersion.id, [user1.id, user2.id])

    questionVersion = await changeReviewerAutomationStatus(
      questionVersion.id,
      true,
    )

    expect(questionVersion.isReviewerAutomationOn).toBe(true)

    const reviewerTeam = await Team.findOne({
      role: 'reviewer',
      objectId: questionVersion.id,
    })

    let teamMember1 = await TeamMember.findOne({
      teamId: reviewerTeam.id,
      userId: user1.id,
    })

    let teamMember2 = await TeamMember.findOne({
      teamId: reviewerTeam.id,
      userId: user2.id,
    })

    expect(teamMember1.status).toBe(REVIEWER_STATUSES.added)
    expect(teamMember2.status).toBe(REVIEWER_STATUSES.added)

    await teamMember1.patch({ status: REVIEWER_STATUSES.accepted })
    await teamMember2.patch({ status: REVIEWER_STATUSES.rejected })

    await updateReviewerPool(questionVersion.id, [
      user1.id,
      user2.id,
      user3.id,
      user4.id,
    ])

    teamMember1 = await TeamMember.findOne({
      teamId: reviewerTeam.id,
      userId: user1.id,
    })

    teamMember2 = await TeamMember.findOne({
      teamId: reviewerTeam.id,
      userId: user2.id,
    })

    const teamMember3 = await TeamMember.findOne({
      teamId: reviewerTeam.id,
      userId: user3.id,
    })

    const teamMember4 = await TeamMember.findOne({
      teamId: reviewerTeam.id,
      userId: user4.id,
    })

    expect(teamMember1.status).toBe(REVIEWER_STATUSES.accepted)
    expect(teamMember2.status).toBe(REVIEWER_STATUSES.rejected)

    expect(teamMember3.status).toBe(REVIEWER_STATUSES.added)
    expect(teamMember4.status).toBe(REVIEWER_STATUSES.added)
  })

  test('reviewerStatusForReviewer returns the correct status', async () => {
    const question = await createEmptyQuestion()
    const editor = await createUser()
    const handlingEditor1 = await createUser()
    const handlingEditor2 = await createUser()

    await createIdentity(editor, internet.email(), false, null)

    await createIdentity(handlingEditor1, internet.email(), false, null)

    await createIdentity(handlingEditor2, internet.email(), false, null)

    let questionVersion = await QuestionVersion.findOne({
      questionId: question.id,
    })

    const editorTeam = await Team.insert({
      role: 'editor',
      global: true,
      displayName: 'Managing Editor',
    })

    await Team.updateMembershipByTeamId(editorTeam.id, [editor.id])

    const handlingEditorTeam = await Team.insert({
      role: 'handlingEditor',
      displayName: 'Handling Editor',
      objectId: questionVersion.questionId,
      objectType: 'question',
    })

    await Team.updateMembershipByTeamId(handlingEditorTeam.id, [
      handlingEditor1.id,
      handlingEditor2.id,
    ])

    questionVersion = await QuestionVersion.findOne({
      questionId: question.id,
    })

    const reviewer = await createUser()
    const user = await createUser()

    const result1 = await reviewerStatus(questionVersion.id, reviewer.id)

    expect(result1).toBe(null)

    await updateReviewerPool(questionVersion.id, [reviewer.id])

    const team = await Team.findOne({
      objectId: questionVersion.id,
      role: 'reviewer',
    })

    await acceptOrRejectInvitation(questionVersion.id, true, null, reviewer.id)

    const teamMember = await TeamMember.findOne({
      teamId: team.id,
      userId: reviewer.id,
    })

    const status = await reviewerStatus(questionVersion.id, reviewer.id)

    expect(status).toBe(REVIEWER_STATUSES.accepted)
    expect(teamMember.status).toBe(status)

    const result2 = await reviewerStatus(questionVersion.id, user.id)

    expect(result2).toBe(null)
  })

  test('questionVersionReviews returns reviews for the given questionVersionId', async () => {
    const question1 = await createEmptyQuestion()
    const question2 = await createEmptyQuestion()

    const questionVersion1 = await QuestionVersion.findOne({
      questionId: question1.id,
    })

    const questionVersion2 = await QuestionVersion.findOne({
      questionId: question2.id,
    })

    let results = await Review.getReviewsForQuestionVersion(questionVersion1.id)

    expect(results).toHaveLength(0)

    const user1 = await createUser()
    const user2 = await createUser()
    const user3 = await createUser()
    const user4 = await createUser()
    const user5 = await createUser()

    const reviewStatus = {
      pending: false,
      submitted: true,
    }

    await Review.createReview(
      questionVersion1.id,
      user1.id,
      "User 1's review",
      reviewStatus,
    )

    await Review.createReview(
      questionVersion1.id,
      user2.id,
      "User 2's review",
      reviewStatus,
    )

    await Review.createReview(
      questionVersion1.id,
      user3.id,
      "User 3's review",
      reviewStatus,
    )

    const review32 = await Review.createReview(
      questionVersion2.id,
      user3.id,
      "User 3's review",
      reviewStatus,
    )

    await Review.createReview(
      questionVersion2.id,
      user4.id,
      "User 4's review",
      reviewStatus,
    )

    await Review.createReview(
      questionVersion2.id,
      user5.id,
      "User 5's review",
      reviewStatus,
    )

    const group1 = [user1.id, user2.id, user3.id]
    results = await Review.getReviewsForQuestionVersion(questionVersion1.id)
    expect(results).toHaveLength(3)
    results.forEach(r => expect(group1).toContain(r.reviewerId))

    const group2 = [user3.id, user4.id, user5.id]
    results = await Review.getReviewsForQuestionVersion(questionVersion2.id)
    expect(results).toHaveLength(3)
    results.forEach(r => expect(group2).toContain(r.reviewerId))

    results = await Review.getReviewsForQuestionVersion(
      questionVersion2.id,
      true,
      user3.id,
    )

    expect(results).toHaveLength(1)
    expect(results[0].reviewerId).toBe(user3.id)
    expect(results[0].content).toBe(review32.content)
  })
})
