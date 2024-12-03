const { logger, useTransaction, subscriptionManager } = require('@coko/server')
const { ChatChannel } = require('@coko/server/src/models')
const config = require('config')
const { uniq } = require('lodash')

const {
  Team,
  TeamMember,
  Identity,
  User,
  Question,
  QuestionVersion,
  Review,
} = require('../models')

const { REVIEWER_STATUSES } = require('./constants')
const { inviteMaxReviewers } = require('./review.controller')

const metadataValues = require('./metadataValues')
const CokoNotifier = require('../services/notify')
const { actions } = require('./constants')

const HE_TEAM = config.teams.nonGlobal.find(t => t.role === 'handlingEditor')
const REVIEWER_TEAM = config.teams.nonGlobal.find(t => t.role === 'reviewer')
const EDITOR_TEAM = config.teams.global.find(t => t.role === 'editor')

const BASE_MESSAGE = 'Team controllers:'

const getNonTeamMemberUsers = async (teamId, searchValue) => {
  logger.info(
    `${BASE_MESSAGE} getNonTeamMemberUsers: searching for non team member users for team id ${teamId}`,
  )

  return Team.searchForNonTeamMemberUsers(teamId, searchValue)
}

const filterGlobalTeamMembers = async (role, query, options) => {
  logger.info(
    `${BASE_MESSAGE} filterGlobalTeamMembers: searching for users with role ${role} matching the query ${query}`,
  )

  return Team.filterGlobalTeamMembers(role, query, options)
}

const updateGlobalTeams = async teams => {
  return useTransaction(async trx => {
    const result = []

    await Promise.all(
      teams.map(async team => {
        const t = await Team.findById(team.id)
        result.push(t)

        return Team.updateMembershipByTeamId(team.id, team.members, { trx })
      }),
    )

    // if members were deleted from handlingEditors or reviewers teams, we need to delete their assignments
    const modifiedHEorReviewer = result.some(
      r => r.role === HE_TEAM.role || r.role === REVIEWER_TEAM.role,
    )

    if (modifiedHEorReviewer) {
      await Promise.all(
        teams.map(team => {
          const { removedMembers } = team

          const dbTeam = result.find(r => r.id === team.id)

          if (removedMembers) {
            removedMembers.map(async member => {
              await TeamMember.query()
                .delete()
                .where('user_id', member)
                .whereIn('team_id', builder => {
                  builder
                    .select('team_members.team_id')
                    .from('team_members')
                    .leftJoin('teams', 'team_members.team_id', 'teams.id')
                    .where('teams.global', false)
                    .whereIn('teams.role', [dbTeam?.role])
                })
            })
          }

          return null
        }),
      )
    }

    // make sure the teams are returned
    return result
  })
}

const addExternalReviewer = async (questionVersionId, input) => {
  const { email, givenNames, surname } = input

  logger.info(
    `${BASE_MESSAGE} addExternalReviewer: adding external reviewer ${givenNames} ${surname}`,
  )

  let user, teamMember
  let userExists = false

  try {
    await useTransaction(async trx => {
      const userIdentity = await Identity.findOne({ email })

      if (userIdentity) {
        userExists = true
        user = await User.findById(userIdentity.userId)
      } else {
        user = await User.insert(
          {
            agreedTc: false,
            givenNames,
            surname,
          },
          { trx },
        )

        await Identity.insert(
          {
            email,
            isVerified: false,
            isDefault: true,
            userId: user.id,
          },
          { trx },
        )
      }

      let reviewerTeam = await Team.findOne({
        objectId: questionVersionId,
        role: REVIEWER_TEAM.role,
      })

      if (!reviewerTeam) {
        reviewerTeam = await Team.insert(
          {
            objectId: questionVersionId,
            objectType: 'questionVersion',
            role: REVIEWER_TEAM.role,
            displayName: REVIEWER_TEAM.displayName,
          },
          { trx },
        )
      }

      teamMember = await TeamMember.findOne({
        teamId: reviewerTeam.id,
        userId: user.id,
      })

      if (teamMember) {
        throw new Error(
          `${BASE_MESSAGE} addExternalReviewer: User has already been added to reviewer team`,
        )
      } else {
        const version = await QuestionVersion.findById(questionVersionId)

        if (!version)
          throw new Error(
            `${BASE_MESSAGE} addExternalReviewer: Cannot find question version`,
          )

        const currentMembers = await TeamMember.find({
          teamId: reviewerTeam.id,
        })

        if (
          currentMembers &&
          currentMembers.length > version.amountOfReviewers
        ) {
          throw new Error(
            `${BASE_MESSAGE} addExternalReviewer: No available reviewer slots`,
          )
        }

        teamMember = await TeamMember.insert(
          {
            status: REVIEWER_STATUSES.invited,
            teamId: reviewerTeam.id,
            userId: user.id,
          },
          { trx },
        )

        await version.patch(
          {
            reviewerPool: uniq([...version.reviewerPool, user.id]),
          },
          { trx },
        )

        const notifier = new CokoNotifier()
        notifier.notify('hhmi.addExternalReviewer', {
          questionId: version.questionId,
          to: email,
        })
      }
    })

    return {
      teamMemberId: teamMember.id,
      userExists,
    }
  } catch (e) {
    logger.error(
      `${BASE_MESSAGE} addExternalReviewer: Transaction failed! Rolling back...`,
    )
    throw new Error(e)
  }
}

const inviteReviewer = async (questionVersionId, reviewerId) => {
  logger.info(
    `${BASE_MESSAGE} inviteReviewer: inviting user ${reviewerId} to join question version ${questionVersionId}`,
  )

  let reviewer = await TeamMember.query()
    .leftJoin('teams', 'team_members.team_id', 'teams.id')
    .findOne({
      objectId: questionVersionId,
      role: 'reviewer',
      userId: reviewerId,
    })

  if (!reviewer)
    throw new Error(
      `${BASE_MESSAGE} inviteReviewer: User was never added to the reviewer pool`,
    )

  let invitedAlready = false
  const { invited, accepted, rejected } = REVIEWER_STATUSES
  const invitedAlreadyStatuses = [invited, accepted, rejected]

  if (invitedAlreadyStatuses.includes(reviewer.status)) invitedAlready = true

  if (!invitedAlready) {
    try {
      reviewer = await TeamMember.patchAndFetchById(reviewer.id, {
        status: invited,
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  subscriptionManager.publish(
    `${actions.DASHBOARD_UPDATED}.${reviewerId}`,
    'reviewer',
  )

  const notifier = new CokoNotifier()
  notifier.notify('hhmi.reviewerInvited', {
    reviewerId,
    questionVersionId,
  })

  return reviewer
}

const revokeInvitation = async (questionVersionId, reviewerId) => {
  logger.info(
    `${BASE_MESSAGE} revokeInvitation: revoking invite for user ${reviewerId} to join question version ${questionVersionId}`,
  )

  try {
    return useTransaction(async trx => {
      const questionVersion = await QuestionVersion.findById(
        questionVersionId,
        { trx },
      )

      let reviewer = await TeamMember.query(trx)
        .leftJoin('teams', 'team_members.team_id', 'teams.id')
        .findOne({
          objectId: questionVersionId,
          role: REVIEWER_TEAM.role,
          userId: reviewerId,
        })

      if (!reviewer)
        throw new Error(
          `${BASE_MESSAGE} revokeInvitation: User was never added to the reviewer pool`,
        )

      if (reviewer.status === REVIEWER_STATUSES.revoked)
        throw new Error('Invitation has been revoked already')

      reviewer = await TeamMember.patchAndFetchById(
        reviewer.id,
        {
          status: REVIEWER_STATUSES.revoked,
        },
        { trx },
      )

      if (questionVersion.isReviewerAutomationOn) {
        await inviteMaxReviewers(questionVersion, { trx })
      }

      subscriptionManager.publish(
        `${actions.DASHBOARD_UPDATED}.${reviewerId}`,
        'reviewer',
      )

      const notifier = new CokoNotifier()
      notifier.notify('hhmi.revokeInvitation', {
        questionId: questionVersion.questionId,
        reviewerId,
      })

      return reviewer
    })
  } catch (e) {
    logger.error(`${BASE_MESSAGE} revokeInvitation: ${e}`)
    throw new Error(e)
  }
}

const searchForReviewers = async (searchTerm, questionVersionId) => {
  const ASSESSMENT_TRAINING = 'assessment training'
  const LANGUAGE_TRAINING = 'language training'

  const topicValues = metadataValues.topics
    .filter(topic => topic.label.toLocaleLowerCase().includes(searchTerm))
    .map(t => t.value)

  try {
    return useTransaction(async trx => {
      const questionVersion = await QuestionVersion.findById(
        questionVersionId,
        { trx },
      )

      const author = await Question.getAuthor(questionVersion.questionId, {
        trx,
      })

      const teamMembers = await TeamMember.query(trx).findByIds(
        questionVersion.reviewerPool,
      )

      const globalReviewerTeam = await Team.findGlobalTeamByRole(
        REVIEWER_TEAM.role,
        { trx },
      )

      const globalTeamMembers = await TeamMember.find(
        {
          teamId: globalReviewerTeam.id,
        },
        { trx },
      )

      const globalTeamMemberIds = globalTeamMembers.result.map(g => g.userId)

      const userIds = teamMembers.map(t => t.userId)

      const search = `%${searchTerm}%`

      const searchQuery = User.query(trx)
        .select('*')
        .from(builder => {
          builder
            .select('users.*')
            .from('users')
            .where('given_names', 'ilike', search)
            .orWhere('surname', 'ilike', search)
            .orWhere('display_name', 'ilike', search)

          if (ASSESSMENT_TRAINING.includes(searchTerm)) {
            builder.orWhere('receivedTraining', true)
          }

          if (LANGUAGE_TRAINING.includes(searchTerm)) {
            builder.orWhere('receivedInclusiveLanguageTraining', true)
          }

          topicValues.forEach(topic =>
            builder.orWhereRaw(
              `users.topics_reviewing::jsonb @> '["${topic}"]'`,
            ),
          )

          builder.as('full_results')
        })
        .whereIn('id', globalTeamMemberIds)
        .whereNotIn('full_results.id', userIds)

      if (author?.id) {
        searchQuery.whereNot({ id: author.id })
      }

      const results = await searchQuery

      return results
    })
  } catch (e) {
    logger.error(`Search for reviewer: ${e}`)
    throw new Error(e)
  }
}

const acceptOrRejectInvitation = async (
  questionVersionId,
  accepted,
  reason,
  userId,
) => {
  if (typeof accepted !== 'boolean')
    throw new Error(
      `${BASE_MESSAGE} acceptOrRejectInvitation: Invalid value for "accepted"`,
    )

  logger.info(
    `${BASE_MESSAGE} acceptOrRejectInvitation: ${
      accepted ? 'accept' : 'reject'
    }ing user ${userId} to review questionVersion ${questionVersionId}`,
  )

  return useTransaction(async trx => {
    const reviewerTeam = await Team.findOne(
      {
        objectId: questionVersionId,
        role: 'reviewer',
      },
      { trx },
    )

    if (!reviewerTeam)
      throw new Error(
        `${BASE_MESSAGE} acceptOrRejectInvitation: No reviewer team found for ${questionVersionId}`,
      )

    const status = REVIEWER_STATUSES[accepted ? 'accepted' : 'rejected']

    const teamMember = await TeamMember.findOne(
      {
        teamId: reviewerTeam.id,
        userId,
      },
      { trx },
    )

    teamMember.patch(
      { status, ...(!accepted && { description: reason }) },
      { trx },
    )

    const questionVersion = await QuestionVersion.findById(questionVersionId, {
      trx,
    })

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

    if (accepted) {
      await Review.insert(
        {
          questionVersionId,
          reviewerId: userId,
          status: {
            pending: true,
            submitted: false,
          },
        },
        { trx },
      )

      await ChatChannel.insert(
        {
          relatedObjectId: questionVersion.questionId,
          chatType: `reviewerChat-${userId}`,
        },
        { trx },
      )
    }

    const notifier = new CokoNotifier()

    identities.forEach(id => {
      notifier.notify(`hhmi.${accepted ? 'accept' : 'reject'}Invitation`, {
        email: id.email,
        questionId: questionVersion.questionId,
        reviewerId: userId,
        reason: accepted ? null : reason,
      })
    })

    return accepted
  })
}

const reviewSubmitted = async teamMember => {
  const { userId, status, teamId } = teamMember

  if (status !== REVIEWER_STATUSES.accepted) return false

  const team = await Team.findById(teamId)

  const review = await Review.findOne({
    questionVersionId: team.objectId,
    reviewerId: userId,
  })

  if (!review) return false

  return review.status.submitted
}

module.exports = {
  updateGlobalTeams,
  getNonTeamMemberUsers,
  filterGlobalTeamMembers,
  addExternalReviewer,
  inviteReviewer,
  revokeInvitation,
  searchForReviewers,
  acceptOrRejectInvitation,
  reviewSubmitted,
}
