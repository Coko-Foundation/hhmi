const { Question, QuestionVersion, Team, User } = require('..')

const clearDb = require('./_clearDb')

const topicsValue = [
  {
    topic: 'topic1',
    subtopic: 'subtopic1',
  },
]

const coursesValue = [
  {
    course: 'CourseName',
    units: [
      {
        unit: 'unit1',
        skill: 'skill1',
        application: 'application1',
        courseTopic: 'courseTopic1',
        understanding: 'understanding1',
        learningObjective: 'learningObjective1',
        essentialKnowledge: 'essentialKnowledge1',
      },
    ],
  },
]

describe('Question model', () => {
  beforeEach(() => clearDb())

  afterAll(async () => {
    await clearDb()
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
  // Results should return only the one published question.
  test('finds published questions', async () => {
    const questionOne = await Question.insert({})
    await Question.insert({}) // question two

    const questionOneVersionOne = await QuestionVersion.findOne({
      questionId: questionOne.id,
    })

    await questionOneVersionOne.patch({
      published: true,
    })

    const questions = await Question.filterPublishedQuestions()

    expect(questions.result.length).toBe(1)
  })

  test('finds only one result for published questions with multiple versions', async () => {
    const question = await Question.insert({})

    const questionVersionOne = await QuestionVersion.findOne({
      questionId: question.id,
    })

    await questionVersionOne.patch({
      published: true,
    })

    const questionVersionTwo = await question.createNewVersion()

    await questionVersionTwo.patch({
      published: true,
    })

    const versions = await QuestionVersion.find({
      questionId: question.id,
      published: true,
    })

    expect(versions.totalCount).toBe(2)

    const questions = await Question.filterPublishedQuestions(
      {},
      {
        orderBy: 'publicationDate',
        ascending: true,
      },
    )

    expect(questions.totalCount).toBe(1)
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

  test('filter questions by topic', async () => {
    const question = await Question.insert({})
    const questionOneVersionOne = await question.createNewVersion()

    const question2 = await Question.insert({})
    await question2.createNewVersion()

    await questionOneVersionOne.patch({
      published: true,
      topics: topicsValue,
    })

    const results = await Question.filterPublishedQuestions({
      filters: { topic: 'topic1' },
    })

    expect(results.totalCount).toBe(1)
  })

  test('filter questions by subtopic', async () => {
    const question = await Question.insert({})
    const questionOneVersionOne = await question.createNewVersion()

    const question2 = await Question.insert({})
    await question2.createNewVersion()

    await questionOneVersionOne.patch({
      published: true,
      topics: [
        {
          topic: 'topic1',
          subtopic: 'subtopic1',
        },
      ],
    })

    const results = await Question.filterPublishedQuestions({
      filters: { subtopic: 'subtopic1' },
    })

    expect(results.totalCount).toBe(1)
  })

  test('filter questions by course', async () => {
    const question = await Question.insert({})
    const questionOneVersionOne = await question.createNewVersion()

    const question2 = await Question.insert({})
    await question2.createNewVersion()

    await questionOneVersionOne.patch({
      published: true,
      courses: coursesValue,
    })

    const results = await Question.filterPublishedQuestions({
      filters: { course: 'CourseName' },
    })

    expect(results.totalCount).toBe(1)
  })

  test('filter questions by unit', async () => {
    const question = await Question.insert({})
    const questionOneVersionOne = await question.createNewVersion()

    const question2 = await Question.insert({})
    await question2.createNewVersion()

    await questionOneVersionOne.patch({
      published: true,
      courses: coursesValue,
    })

    const results = await Question.filterPublishedQuestions({
      filters: { unit: 'unit1' },
    })

    expect(results.totalCount).toBe(1)
  })

  test('filter questions by course topic', async () => {
    const question = await Question.insert({})
    const questionOneVersionOne = await question.createNewVersion()

    const question2 = await Question.insert({})
    await question2.createNewVersion()

    await questionOneVersionOne.patch({
      published: true,
      courses: coursesValue,
    })

    const results = await Question.filterPublishedQuestions({
      filters: { courseTopic: 'courseTopic1' },
    })

    expect(results.totalCount).toBe(1)
  })

  test('filter questions by learning objective', async () => {
    const question = await Question.insert({})
    const questionOneVersionOne = await question.createNewVersion()

    const question2 = await Question.insert({})
    await question2.createNewVersion()

    await questionOneVersionOne.patch({
      published: true,
      courses: coursesValue,
    })

    const results = await Question.filterPublishedQuestions({
      filters: { learningObjective: 'learningObjective1' },
    })

    expect(results.totalCount).toBe(1)
  })

  test('filter questions by essential knowledge', async () => {
    const question = await Question.insert({})
    const questionOneVersionOne = await question.createNewVersion()

    const question2 = await Question.insert({})
    await question2.createNewVersion()

    await questionOneVersionOne.patch({
      published: true,
      courses: coursesValue,
    })

    const results = await Question.filterPublishedQuestions({
      filters: { essentialKnowledge: 'essentialKnowledge1' },
    })

    expect(results.totalCount).toBe(1)
  })

  test('filter questions by application', async () => {
    const question = await Question.insert({})
    const questionOneVersionOne = await question.createNewVersion()

    const question2 = await Question.insert({})
    await question2.createNewVersion()

    await questionOneVersionOne.patch({
      published: true,
      courses: coursesValue,
    })

    const results = await Question.filterPublishedQuestions({
      filters: { application: 'application1' },
    })

    expect(results.totalCount).toBe(1)
  })

  test('filter questions by skill', async () => {
    const question = await Question.insert({})
    const questionOneVersionOne = await question.createNewVersion()

    const question2 = await Question.insert({})
    await question2.createNewVersion()

    await questionOneVersionOne.patch({
      published: true,
      courses: coursesValue,
    })

    const results = await Question.filterPublishedQuestions({
      filters: { skill: 'skill1' },
    })

    expect(results.totalCount).toBe(1)
  })

  test('filter questions by understanding', async () => {
    const question = await Question.insert({})
    const questionOneVersionOne = await question.createNewVersion()

    const question2 = await Question.insert({})
    await question2.createNewVersion()

    await questionOneVersionOne.patch({
      published: true,
      courses: coursesValue,
    })

    const results = await Question.filterPublishedQuestions({
      filters: { understanding: 'understanding1' },
    })

    expect(results.totalCount).toBe(1)
  })

  test('filter questions by cognitive level', async () => {
    const question = await Question.insert({})
    const questionOneVersionOne = await question.createNewVersion()

    const question2 = await Question.insert({})
    await question2.createNewVersion()

    await questionOneVersionOne.patch({
      published: true,
      cognitiveLevel: 'cognitive-level-1',
    })

    const results = await Question.filterPublishedQuestions({
      filters: { cognitiveLevel: ['cognitive-level-1'] },
    })

    expect(results.totalCount).toBe(1)
  })

  test('filter questions by question type', async () => {
    const question = await Question.insert({})
    const questionOneVersionOne = await question.createNewVersion()

    const question2 = await Question.insert({})
    await question2.createNewVersion()

    await questionOneVersionOne.patch({
      published: true,
      questionType: 'type-1',
    })

    const results = await Question.filterPublishedQuestions({
      filters: { questionType: ['type-1'] },
    })

    expect(results.totalCount).toBe(1)
  })
})
