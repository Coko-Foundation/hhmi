const { createFile, logger, useTransaction } = require('@coko/server')
const config = require('config')

const CokoNotifier = require('../services/notify')
const { labels } = require('./constants')
const { Report, Team, TeamMember, Identity, User } = require('../models')
const { getFileUrl } = require('./file.controllers')

const ADMIN_TEAM = config.get('teams.global').find(t => t.role === 'admin')

const BASE_MESSAGE = `${labels.QUESTION_CONTROLLERS}:`

const reportIssue = async (questionId, content, attachments, userId) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} reportIssue:`

  try {
    return useTransaction(async trx => {
      logger.info(
        `${CONTROLLER_MESSAGE} reporting issue for question with id ${questionId}`,
      )

      const attachmentData = await Promise.all(attachments)

      const report = await Report.createReport(questionId, userId, content, {
        trx,
      })

      const uploadedAttachments = await Promise.all(
        attachmentData.map(async attachment => {
          const stream = attachment.createReadStream()

          const storedFile = await createFile(
            stream,
            attachment.filename,
            null,
            null,
            [],
            report.id,
            { trx },
          )

          return storedFile
        }),
      )

      const attachmentIds = uploadedAttachments.map(u => u.id)

      if (attachmentIds.length) {
        await Report.patchAndFetchById(report.id, { attachmentIds }, { trx })
      }

      const emailAttachments = await Promise.all(
        uploadedAttachments.map(async file => {
          const url = await getFileUrl(file, 'medium')
          return {
            href: url,
            filename: file.name,
            content: url,
          }
        }),
      )

      const adminTeam = await Team.findOne(
        {
          role: ADMIN_TEAM.role,
          global: true,
        },
        { trx },
      )

      const admins = await TeamMember.find({ teamId: adminTeam.id }, { trx })

      const identities = await Identity.query(trx).whereIn(
        'userId',
        admins.result.map(admin => admin.userId),
      )

      const reporter = await User.findById(userId, { trx })

      const reporterIdenitity = await Identity.findOne(
        { userId, isDefault: true },
        { trx },
      )

      const notifier = new CokoNotifier()

      identities.forEach(id => {
        notifier.notify('hhmi.submitReport', {
          reporterDisplayName: reporter.displayName,
          reporterEmail: reporterIdenitity.email,
          reportContent: content,
          attachments: emailAttachments,
          questionId,
          to: id.email,
        })
      })

      return report.id
    })
  } catch (e) {
    logger.error(`${CONTROLLER_MESSAGE} ${e.message}`)
    throw new Error(e)
  }
}

module.exports = {
  reportIssue,
}
