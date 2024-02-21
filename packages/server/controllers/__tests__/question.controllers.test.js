const config = require('config')
const { internet } = require('faker')

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
  updateReviewerPool,
  changeAmountOfReviewers,
  changeReviewerAutomationStatus,
  reviewerStatus,
  getReviewerChatParticipants,
  getReviewerDashboard,
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
  createGlobalReviewerTeamWithUsers,
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

    const team = await Team.findTeamByRoleAndObject(
      'reviewer',
      questionVersion.id,
    )

    const teamMember1 = await TeamMember.findOne({
      teamId: team.id,
      userId: user1.id,
    })

    const teamMember2 = await TeamMember.findOne({
      teamId: team.id,
      userId: user2.id,
    })

    const teamMemberIds = [teamMember1.id, teamMember2.id]

    expect(questionVersion.reviewerPool).toHaveLength(2)
    questionVersion.reviewerPool.forEach(teamMemberId =>
      expect(teamMemberIds).toContain(teamMemberId),
    )

    questionVersion = await updateReviewerPool(questionVersion.id, [user2.id])

    expect(questionVersion.reviewerPool).toHaveLength(1)
    expect(questionVersion.reviewerPool[0]).toBe(teamMember2.id)
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

    // TODO: enable after https://gitlab.coko.foundation/cokoapps/server/-/merge_requests/66
    // expect(teamMember1.status).toBe(REVIEWER_STATUSES.added)
    // expect(teamMember2.status).toBe(REVIEWER_STATUSES.added)

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

    await TeamMember.findOne({
      teamId: reviewerTeam.id,
      userId: user3.id,
    })

    await TeamMember.findOne({
      teamId: reviewerTeam.id,
      userId: user4.id,
    })

    expect(teamMember1.status).toBe(REVIEWER_STATUSES.accepted)
    expect(teamMember2.status).toBe(REVIEWER_STATUSES.rejected)

    // expect(teamMember3.status).toBe(REVIEWER_STATUSES.added)
    // expect(teamMember4.status).toBe(REVIEWER_STATUSES.added)
  })

  test('reviewerStatus returns the correct status', async () => {
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
    const question3 = await createEmptyQuestion()

    const questionVersion1 = await QuestionVersion.findOne({
      questionId: question1.id,
    })

    const questionVersion2 = await QuestionVersion.findOne({
      questionId: question2.id,
    })

    const questionVersion3 = await QuestionVersion.findOne({
      questionId: question3.id,
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

    results = await Review.getReviewsForQuestionVersion(questionVersion3.id)
    expect(results).toHaveLength(0)
  })

  test('getReviewerChatParticipants retrieves the correct participants', async () => {
    const question = await createEmptyQuestion()

    const questionVersion = await QuestionVersion.findOne({
      questionId: question.id,
    })

    const reviewer1 = await createUser()
    const reviewer2 = await createUser()
    const editor1 = await createUser()
    const editor2 = await createUser()
    const handlingEditor = await createUser()

    const editorTeam = await Team.insert({
      role: 'editor',
      global: true,
      displayName: 'Managing Editor',
    })

    await Team.updateMembershipByTeamId(editorTeam.id, [editor1.id, editor2.id])

    const handlingEditorTeam = await Team.insert({
      role: 'handlingEditor',
      displayName: 'Handling Editor',
      objectId: question.id,
      objectType: 'question',
    })

    await Team.updateMembershipByTeamId(handlingEditorTeam.id, [
      handlingEditor.id,
    ])

    await updateReviewerPool(questionVersion.id, [reviewer1.id, reviewer2.id])
    await acceptOrRejectInvitation(questionVersion.id, true, '', reviewer1.id)
    await acceptOrRejectInvitation(
      questionVersion.id,
      false,
      'nah',
      reviewer2.id,
    )

    const otherQuestion = await createEmptyQuestion()

    const otherQuestionVersion = await QuestionVersion.findOne({
      questionId: otherQuestion.id,
    })

    const otherReviewer = await createUser()
    const otherHandlingEditor = await createUser()

    const otherHandlingEditorTeam = await Team.insert({
      role: 'handlingEditor',
      displayName: 'Handling Editor',
      objectId: otherQuestion.id,
      objectType: 'question',
    })

    await Team.updateMembershipByTeamId(otherHandlingEditorTeam.id, [
      otherHandlingEditor.id,
    ])

    await updateReviewerPool(otherQuestionVersion.id, [otherReviewer.id])
    await acceptOrRejectInvitation(
      otherQuestionVersion.id,
      true,
      '',
      otherReviewer.id,
    )

    const expectedParticipantIds = [
      editor1.id,
      editor2.id,
      handlingEditor.id,
      reviewer1.id,
    ]

    const otherParticipantIds = [
      otherHandlingEditor.id,
      otherReviewer.id,
      reviewer2.id,
    ]

    const participants = await getReviewerChatParticipants(question.id)
    const receivedParticipantIds = participants.map(p => p.id)

    expectedParticipantIds.forEach(participantId =>
      expect(receivedParticipantIds).toContain(participantId),
    )

    otherParticipantIds.forEach(otherParticipantId =>
      expect(receivedParticipantIds).not.toContain(otherParticipantId),
    )

    expect(true).toBe(true)
  })

  test('getReviewerDashboard returns questions which are only in under_review status', async () => {
    const question1 = await Question.insert({})
    const question2 = await Question.insert({})

    const { user } = await createGlobalReviewerTeamWithUsers()
    QuestionVersion.insert({
      questionId: question1.id,
      underReview: true,
    })

    QuestionVersion.insert({
      questionId: question2.id,
      underReview: false,
      inProduction: true,
    })

    const q1Team = await Team.insert({
      objectId: question1.id,
      objectType: 'question',
      role: 'reviewer',
      displayName: 'Reviewer',
    })

    const q2Team = await Team.insert({
      objectId: question2.id,
      objectType: 'question',
      role: 'reviewer',
      displayName: 'Reviewer',
    })

    await Team.addMember(q1Team.id, user.id)
    await Team.addMember(q2Team.id, user.id)
    const { result } = await getReviewerDashboard(user.id, { filters: {} })
    expect(result.some(res => res.id === question2.id)).toBe(false)
  })
})
