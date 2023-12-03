const { internet } = require('faker')
const { Review, QuestionVersion, User, Team } = require('../../models')

const {
  createUser,
  createIdentity,
} = require('../../models/__tests__/__helpers__/users')

const clearDb = require('../../models/__tests__/_clearDb')

const {
  updateReviewerPool,
  changeAmountOfReviewers,
} = require('../question.controllers')

const { inviteMaxReviewers, submitReview } = require('../review.controller')
const { createEmptyQuestion } = require('./__helpers__/questions')

describe('Review Controller', () => {
  beforeEach(clearDb)

  afterAll(async () => {
    await clearDb()
    const knex = Review.knex()
    knex.destroy()
  })

  test('invites max reviewers', async () => {
    const question = await createEmptyQuestion()
    const user1 = await User.insert({})
    const user2 = await User.insert({})

    const ids = [user1.id, user2.id]

    let questionVersion = await QuestionVersion.findOne({
      questionId: question.id,
    })

    let invitedMembers = await inviteMaxReviewers(questionVersion)

    expect(invitedMembers).toHaveLength(0)

    questionVersion = await updateReviewerPool(questionVersion.id, ids)
    invitedMembers = await inviteMaxReviewers(questionVersion)

    expect(invitedMembers).toHaveLength(0)

    questionVersion = await changeAmountOfReviewers(questionVersion.id, 2)
    invitedMembers = await inviteMaxReviewers(questionVersion)

    expect(invitedMembers).toHaveLength(2)

    invitedMembers.forEach(member => expect(ids).toContain(member.userId))
  })

  test('submitReview creates a review for the given user', async () => {
    const question = await createEmptyQuestion()
    const editor = await createUser()
    const handlingEditor1 = await createUser()
    const handlingEditor2 = await createUser()

    await createIdentity(editor, internet.email(), false, null)

    await createIdentity(handlingEditor1, internet.email(), false, null)

    await createIdentity(handlingEditor2, internet.email(), false, null)

    const questionVersion = await QuestionVersion.findOne({
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

    const reviewer = await createUser()

    let review = await Review.findOne({
      questionVersionId: questionVersion.id,
      reviewerId: reviewer.id,
    })

    expect(review).toBeFalsy()

    const reviewContent =
      'Yeah, looks alright.\nMaybe change some formatting stuff.'

    const reviewId = await submitReview(
      questionVersion.id,
      reviewContent,
      reviewer.id,
    )

    expect(reviewId).not.toBeFalsy()
    review = await Review.findById(reviewId)

    expect(review.id).toBe(reviewId)
    expect(review.content).toBe(reviewContent)
  })
})
