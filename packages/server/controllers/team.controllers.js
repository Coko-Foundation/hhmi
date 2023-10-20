const { logger, useTransaction } = require('@coko/server')
const config = require('config')

const { Team, TeamMember } = require('../models')

const HE_TEAM = config.teams.nonGlobal.handlingEditor
const REVIEWER_TEAM = config.teams.nonGlobal.reviewer

const getNonTeamMemberUsers = async (teamId, searchValue) => {
  logger.info(
    `Team controllers: getNonTeamMemberUsers: searching for non team member users for team id ${teamId}`,
  )

  return Team.searchForNonTeamMemberUsers(teamId, searchValue)
}

const filterGlobalTeamMembers = async (role, query, options) => {
  logger.info(
    `Team controllers: filterGlobalTeamMembers: searching for users with role ${role} matching the query ${query}`,
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

module.exports = {
  updateGlobalTeams,
  getNonTeamMemberUsers,
  filterGlobalTeamMembers,
}
