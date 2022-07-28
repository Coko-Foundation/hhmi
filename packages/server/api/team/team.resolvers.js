const {
  updateGlobalTeams,
  getNonTeamMemberUsers,
} = require('../../controllers/team.controllers')

const getNonTeamMemberUsersResolver = async (_, { teamId, term }, ctx) => {
  return getNonTeamMemberUsers(teamId, term)
}

const updateGlobalTeamsResolver = async (_, { input }, ctx) => {
  return updateGlobalTeams(input)
}

module.exports = {
  Query: {
    getNonTeamMemberUsers: getNonTeamMemberUsersResolver,
  },
  Mutation: {
    updateGlobalTeams: updateGlobalTeamsResolver,
  },
}
