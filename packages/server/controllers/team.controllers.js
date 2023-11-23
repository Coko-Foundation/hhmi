const { logger, useTransaction } = require('@coko/server')
const config = require('config')
const { uniq } = require('lodash')

const {
  Team,
  TeamMember,
  Identity,
  User,
  QuestionVersion,
} = require('../models')

const { REVIEWER_STATUSES } = require('./constants')
const { inviteMaxReviewers } = require('./review.controller')

const metadataValues = require('./metadataValues')
const CokoNotifier = require('../services/notify')

const HE_TEAM = config.teams.nonGlobal.handlingEditor
const REVIEWER_TEAM = config.teams.nonGlobal.reviewer

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
                    .whereIn('teams.role', [HE_TEAM.role, REVIEWER_TEAM.role])
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
          'Add external reviewer: User has already been added to reviewer team',
        )
      } else {
        const version = await QuestionVersion.findById(questionVersionId)

        if (!version)
          throw new Error('Add external reviewer: Cannot find question version')

        const currentMembers = await TeamMember.find({
          teamId: reviewerTeam.id,
        })

        if (
          currentMembers &&
          currentMembers.length > version.amountOfReviewers
        ) {
          throw new Error('Add external reviewer: No available reviewer slots')
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
    logger.error('Add external reviewer: Transaction failed! Rolling back...')
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
      'Invite reviewer: User was never added to the reviewer pool',
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
      const questionVersion = await QuestionVersion.findById(questionVersionId)

      let reviewer = await TeamMember.query(trx)
        .leftJoin('teams', 'team_members.team_id', 'teams.id')
        .findOne({
          objectId: questionVersionId,
          role: REVIEWER_TEAM.role,
          userId: reviewerId,
        })

      if (!reviewer)
        throw new Error('User was never added to the reviewer pool')

      if (reviewer.status === REVIEWER_STATUSES.revoked)
        throw new Error('Invitation has been revoked already')

      reviewer = await TeamMember.patchAndFetchById(reviewer.id, {
        status: REVIEWER_STATUSES.revoked,
      })

      if (questionVersion.isReviewerAutomationOn) {
        await inviteMaxReviewers(questionVersion, { trx })
      }

      //   const notifier = new CokoNotifier()
      //   notifier.notify('hhmi.revokeInvitation', {
      //     questionId: questionVersion.questionId,
      //     reviewerId,
      //   })

      return reviewer
    })
  } catch (e) {
    logger.error(`Revoke invitation: ${e}`)
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

      const search = `%${searchTerm}%`

      const searchQuery = User.query(trx)
        .select('*')
        .from(builder => {
          builder
            .select('users.*')
            .from('users')
            .where('given_names', 'ilike', search)
            .orWhere('surname', 'ilike', search)

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
        .whereNotIn('full_results.id', builder =>
          builder
            .select('users.id')
            .from('users')
            .whereIn('users.id', questionVersion.reviewerPool)
            .pluck('id'),
        )

      const results = await searchQuery

      return results
    })
  } catch (e) {
    logger.error(`Search for reviewer: ${e}`)
    throw new Error(e)
  }
}

module.exports = {
  updateGlobalTeams,
  getNonTeamMemberUsers,
  filterGlobalTeamMembers,
  addExternalReviewer,
  inviteReviewer,
  revokeInvitation,
  searchForReviewers,
}
