const { useTransaction, logger, createFile } = require('@coko/server')
const { File, Identity } = require('@coko/server/src/models')
const config = require('config')

const { Review, TeamMember, Team, QuestionVersion } = require('../models')
const { REVIEWER_STATUSES } = require('./constants')
const { getFileUrl } = require('./file.controllers')
const CokoNotifier = require('../services/notify')

const HE_TEAM = config.teams.nonGlobal.handlingEditor
const EDITOR_TEAM = config.teams.global.editor

const reviewSubmittedStatus = {
  pending: false,
  submitted: true,
}

const baseMessage = 'Review controller:'

const submitReview = async (
  questionVersionId,
  content,
  userId,
  attachments = [],
) => {
  const CONTROLLER_MESSAGE = `${baseMessage} submitReview:`

  try {
    return useTransaction(async trx => {
      logger.info(
        `${CONTROLLER_MESSAGE} creating new review for questionVersion ${questionVersionId} by user ${userId}`,
      )

      const questionVersion = await QuestionVersion.findById(
        questionVersionId,
        { trx },
      )

      const attachmentData = await Promise.all(attachments)

      const review = await Review.createReview(
        questionVersionId,
        userId,
        content,
        reviewSubmittedStatus,
        { trx },
      )

      const uploadedAttachments = await Promise.all(
        attachmentData.map(async attachment => {
          const stream = attachment.createReadStream()

          const storedFile = await createFile(
            stream,
            attachment.filename,
            null,
            null,
            [],
            review.id,
            { trx },
          )

          return storedFile
        }),
      )

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

      const handlingEditorTeam = await Team.findOne(
        {
          objectId: questionVersion.questionId,
          role: HE_TEAM.role,
        },
        { trx },
      )

      const handlingEditors =
        handlingEditorTeam &&
        (await TeamMember.find(
          {
            teamId: handlingEditorTeam.id,
          },
          { trx },
        ))

      const editorTeam = await Team.findOne(
        {
          role: EDITOR_TEAM.role,
          global: true,
        },
        { trx },
      )

      const editors = await TeamMember.find(
        {
          teamId: editorTeam.id,
        },
        { trx },
      )

      const identities = await Identity.query(trx)
        .whereIn(
          'userId',
          handlingEditors ? handlingEditors.result.map(he => he.userId) : [],
        )
        .orWhereIn(
          'userId',
          editors.result.map(e => e.userId),
        )

      const notifier = new CokoNotifier()

      identities.forEach(id => {
        notifier.notify('hhmi.submitReview', {
          attachments: emailAttachments,
          review,
          to: id.email,
        })
      })

      // send a copy of the review back to the reviewer
      const reviewerIdentity = await Identity.findOne({ userId })
      notifier.notify('hhmi.sendReviewCopyToReviewer', {
        attachments: emailAttachments,
        review,
        to: reviewerIdentity.email,
      })

      return review.id
    })
  } catch (e) {
    logger.error(`${CONTROLLER_MESSAGE} ${e.message}`)
    throw new Error(e)
  }
}

const inviteMaxReviewers = async (questionVersion, options = {}) => {
  const { amountOfReviewers: MAX_REVIEWERS, reviewerPool } = questionVersion

  try {
    return useTransaction(async trx => {
      const reviewerTeamMembers = await Promise.all(
        reviewerPool.map(teamMemberId => TeamMember.findById(teamMemberId)),
      )

      const invitedAlready = reviewerTeamMembers.filter(member =>
        member.hasActiveInvitation(),
      )

      if (invitedAlready.length >= MAX_REVIEWERS) {
        logger.info(
          `${baseMessage} inviteMaxReviewers: Already at reviewer capacity. Not inviting anyone.`,
        )
        return []
      }

      const numberOfReviewersToInvite = MAX_REVIEWERS - invitedAlready.length

      const membersToInvite = reviewerTeamMembers
        .filter(member => member.canInvite())
        .slice(0, numberOfReviewersToInvite)

      const invitedMembers = await Promise.all(
        membersToInvite.map(member =>
          TeamMember.patchAndFetchById(
            member.id,
            { status: REVIEWER_STATUSES.invited },
            { trx },
          ),
        ),
      )

      // membersToInvite.forEach(member => {
      //   notify('reviewerInvited', {
      //     reviewerId: member.userId,
      //     versionId: id,
      //   })
      // })

      return invitedMembers
    })
  } catch (e) {
    logger.error(`${baseMessage} inviteMaxReviewers error: ${e}`)
    throw new Error()
  }
}

const getAttachments = async reviewId => {
  const files = await useTransaction(trx => {
    return File.query(trx)
      .select('files.name', 'files.storedObjects')
      .where({ objectId: reviewId })
  })

  const filesWithUrl = await Promise.all(
    files.map(async file => {
      const url = getFileUrl(file, 'medium')

      return { url, name: file.name }
    }),
  )

  return filesWithUrl
}

module.exports = {
  submitReview,
  inviteMaxReviewers,
  getAttachments,
}
