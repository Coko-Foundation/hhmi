const { Review, QuestionVersion, User } = require('../../models')
const clearDb = require('../../models/__tests__/_clearDb')

const {
  updateReviewerPool,
  changeAmountOfReviewers,
} = require('../question.controllers')

const { inviteMaxReviewers } = require('../review.controller')
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
})
