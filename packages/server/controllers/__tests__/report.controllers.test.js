const config = require('config')
const { internet } = require('faker')

const {
  createUser,
  createIdentity,
} = require('../../models/__tests__/__helpers__/users')

const clearDb = require('../../models/__tests__/_clearDb')
const { createEmptyQuestion } = require('./__helpers__/questions')
const { Team, Report } = require('../../models')
const { reportIssue } = require('../report.controller')

const ADMIN_TEAM = config.get('teams.global').find(t => t.role === 'admin')

describe('Report controller', () => {
  beforeEach(() => clearDb())

  test('reportIssue saves the content and alerts admins', async () => {
    const question = await createEmptyQuestion()
    const admin1 = await createUser()
    const admin2 = await createUser()
    const reporter = await createUser()

    await createIdentity(admin1, internet.email(), false, null)
    await createIdentity(admin2, internet.email(), false, null)
    await createIdentity(reporter, internet.email(), false, null)

    const adminTeam = await Team.insert({
      role: ADMIN_TEAM.role,
      global: true,
      displayName: ADMIN_TEAM.displayName,
    })

    await Team.updateMembershipByTeamId(adminTeam.id, [admin1.id, admin2.id])

    let report = await Report.findOne({
      questionId: question.id,
      userId: reporter.id,
    })

    expect(report).toBeFalsy()

    const reportContent =
      'The answer options are all incorrect.\nPlease fix spelling too.'

    const reportId = await reportIssue(
      question.id,
      reportContent,
      [],
      reporter.id,
    )

    expect(reportId).not.toBeFalsy()
    report = await Report.findById(reportId)

    expect(report.id).toBe(reportId)
    expect(report.content).toBe(reportContent)
    expect(report.attachmentIds.length).toBe(0)
  })
})
