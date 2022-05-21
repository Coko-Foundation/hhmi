const { Question, QuestionVersion, Team, User } = require('..')

const clearDb = require('./_clearDb')

describe('Question model', () => {
  beforeEach(() => clearDb())

  afterAll(() => {
    clearDb()
    const knex = Question.knex()
    knex.destroy()
  })

  test('creates a first question version when creating a new question', async () => {
    const question = await Question.insert({})

    const versions = await QuestionVersion.find({
      questionId: question.id,
    })

    expect(versions.result.length).toBe(1)
  })

  test('creates new question version', async () => {
    const question = await Question.insert({})
    await Question.createNewVersion(question.id)

    const versions = await QuestionVersion.find({
      questionId: question.id,
    })

    expect(versions.result.length).toBe(2)
  })

  // Two questions, only one has a published version.
  // Results should return only the one question.
  test('finds published questions', async () => {
    const questionOne = await Question.insert({})
    await Question.insert({}) // question two

    const questionOneVersionOne = await QuestionVersion.findOne({
      questionId: questionOne.id,
    })

    await questionOneVersionOne.patch({
      published: true,
    })

    const questions = await Question.findPublished()

    expect(questions.result.length).toBe(1)
  })

  test('finds question versions', async () => {
    // question with 3 versions (first created with insert)
    // first two versions are published

    const question = await Question.insert({})
    await question.createNewVersion()
    await question.createNewVersion()

    const versions = await question.getVersions()
    expect(versions.totalCount).toBe(3)

    const [first, second, third] = versions.result

    await first.patch({ published: true })
    await second.patch({ published: true })

    const published = await question.getVersions({ publishedOnly: true })
    expect(published.totalCount).toBe(2)
    expect(published.result[0].id).toEqual(first.id)
    expect(published.result[1].id).toEqual(second.id)

    const latest = await question.getVersions({ latestOnly: true })
    expect(latest.result.length).toBe(1)
    expect(latest.result[0].id).toEqual(third.id)

    const latestPublished = await question.getVersions({
      latestOnly: true,
      publishedOnly: true,
    })

    expect(latestPublished.result.length).toBe(1)
    expect(latestPublished.result[0].id).toEqual(second.id)
  })

  test('find questions by role', async () => {
    const user = await User.insert({})

    // make questions and their author / reviewer teams
    const questionOne = await Question.insert({})
    const questionTwo = await Question.insert({})

    const authorTeamQuestionOne = await Team.insert({
      role: 'author',
      displayName: 'Author',
      objectId: questionOne.id,
      objectType: 'question',
    })

    /* eslint-disable no-unused-vars */
    // add multiple teams per question to ensure distinct works
    const reviewerTeamQuestionOne = await Team.insert({
      role: 'reviewer',
      displayName: 'Reviewer',
      objectId: questionOne.id,
      objectType: 'question',
    })

    const authorTeamQuestionTwo = await Team.insert({
      role: 'author',
      displayName: 'Author',
      objectId: questionTwo.id,
      objectType: 'question',
    })

    const reviewerTeamQuestionTwo = await Team.insert({
      role: 'reviewer',
      displayName: 'Reviewer',
      objectId: questionTwo.id,
      objectType: 'question',
    })
    /* eslint-enable no-unused-vars */

    // Find all questions this user is an author of:
    // results should be zero
    let authorQuestions = await Question.findByRole(user.id, 'author')
    expect(authorQuestions.totalCount).toBe(0)

    // results should now be one
    await Team.addMember(authorTeamQuestionOne.id, user.id)
    authorQuestions = await Question.findByRole(user.id, 'author')

    expect(authorQuestions.totalCount).toBe(1)
    expect(authorQuestions.result[0].id).toBe(questionOne.id)
  })

  test('find questions by excluding role', async () => {
    const user = await User.insert({})

    // make questions and their author / reviewer teams
    const questionOne = await Question.insert({})
    const questionTwo = await Question.insert({})

    const authorTeamQuestionOne = await Team.insert({
      role: 'author',
      displayName: 'Author',
      objectId: questionOne.id,
      objectType: 'question',
    })

    /* eslint-disable no-unused-vars */
    const reviewTeamQuestionOne = await Team.insert({
      role: 'reviewer',
      displayName: 'Reviewer',
      objectId: questionOne.id,
      objectType: 'question',
    })

    const authorTeamQuestionTwo = await Team.insert({
      role: 'author',
      displayName: 'Author',
      objectId: questionTwo.id,
      objectType: 'question',
    })

    const reviewTeamQuestionTwo = await Team.insert({
      role: 'reviewer',
      displayName: 'Reviewer',
      objectId: questionTwo.id,
      objectType: 'question',
    })
    /* eslint-enable no-unused-vars */

    // Find all questions this user is NOT an author of:
    // results should be two
    let questions = await Question.findByExcludingRole(user.id, 'author')
    expect(questions.totalCount).toBe(2)

    // make user author of one of them
    // results should now be one
    await Team.addMember(authorTeamQuestionOne.id, user.id)
    questions = await Question.findByExcludingRole(user.id, 'author')

    expect(questions.totalCount).toBe(1)
    expect(questions.result[0].id).toBe(questionTwo.id)
  })
})
