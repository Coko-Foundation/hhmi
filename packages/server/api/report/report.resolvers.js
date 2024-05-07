const { reportIssue } = require('../../controllers/report.controller')

const reportIssueResolver = async (
  _,
  { questionId, content, attachments = [] },
  ctx,
) => {
  return reportIssue(questionId, content, attachments, ctx.user)
}

module.exports = {
  Mutation: {
    reportIssue: reportIssueResolver,
  },
}
