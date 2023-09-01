const { logger, useTransaction } = require('@coko/server')

const { Team } = require('../models')

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

    // make sure the teams are returned
    return result
  })
}

module.exports = {
  updateGlobalTeams,
  getNonTeamMemberUsers,
  filterGlobalTeamMembers,
}
