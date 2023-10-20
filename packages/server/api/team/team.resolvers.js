const {
  updateGlobalTeams,
  getNonTeamMemberUsers,
  filterGlobalTeamMembers,
} = require('../../controllers/team.controllers')

const getNonTeamMemberUsersResolver = async (_, { teamId, term }, ctx) => {
  return getNonTeamMemberUsers(teamId, term)
}

const filterGlobalTeamMembersResolver = async (
  _,
  { role, query, options },
  ctx,
) => {
  return filterGlobalTeamMembers(role, query, options)
}

const updateGlobalTeamsResolver = async (_, { input }, ctx) => {
  return updateGlobalTeams(input)
}

module.exports = {
  Query: {
    getNonTeamMemberUsers: getNonTeamMemberUsersResolver,
    filterGlobalTeamMembers: filterGlobalTeamMembersResolver,
  },
  Mutation: {
    updateGlobalTeams: updateGlobalTeamsResolver,
  },
}
