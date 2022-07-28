const { useTransaction } = require('@coko/server')

const { Team } = require('../models')

const getNonTeamMemberUsers = async (teamId, searchValue) => {
  return Team.searchForNonTeamMemberUsers(teamId, searchValue)
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

module.exports = { updateGlobalTeams, getNonTeamMemberUsers }
