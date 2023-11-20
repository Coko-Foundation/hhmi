const { useTransaction, logger } = require('@coko/server')
const { Review, TeamMember, Team } = require('../models')
const { REVIEWER_STATUSES } = require('./constants')

const reviewSubmittedStatus = {
  pending: false,
  submitted: true,
}

const baseMessage = 'Review controller:'

// const reviews = async (questionId, reviewerId) => {
// 	try {
// 		return Review.
// 	}
// }

const submitReview = async (userId, input, options = {}) => {
  const { questionVersionId, content } = input

  try {
    const review = await Review.createReview(
      questionVersionId,
      userId,
      content,
      reviewSubmittedStatus,
      options,
    )

    // const teamMember = await TeamMember.query()
    //   .leftJoin('teams', 'teams.id', 'team_id')
    //   .findOne({
    //     userId: review.reviewerId,
    //     role: 'reviewer',
    //     objectId: review.questionVersionId,
    //   })

    // notify('reviewSubitted', {reviewId: review.id, userId})

    // await stopJob(`review-reminder-${teamMember.id}`)
    // await stopJob(`revoke-invitation-after-accept-${teamMember.id}`)

    return review.id
  } catch (e) {
    throw new Error(e)
  }
}

const inviteMaxReviewers = async (questionVersion, options = {}) => {
  const { amountOfReviewers: MAX_REVIEWERS, id, reviewerPool } = questionVersion

  try {
    return useTransaction(async trx => {
      const reviewerTeam = await Team.findOne({
        objectId: id,
        role: 'reviewer',
      })

      const reviewerTeamMembers = await Promise.all(
        reviewerPool.map(reviewerId =>
          TeamMember.findOne({ teamId: reviewerTeam.id, userId: reviewerId }),
        ),
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

module.exports = {
  submitReview,
  inviteMaxReviewers,
}
