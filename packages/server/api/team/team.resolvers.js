const {
  updateGlobalTeams,
  getNonTeamMemberUsers,
  filterGlobalTeamMembers,
  addExternalReviewer,
  inviteReviewer,
  revokeInvitation,
  searchForReviewers,
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

const addExternalReviewerResolver = async (
  _,
  { questionVersionId, input },
  ctx,
) => {
  return addExternalReviewer(questionVersionId, input)
}

const inviteReviewerResolver = async (
  _,
  { questionVersionId, reviewerId },
  ctx,
) => {
  return inviteReviewer(questionVersionId, reviewerId)
}

const revokeInvitationResolver = async (
  _,
  { questionVersionId, reviewerId },
) => {
  return revokeInvitation(questionVersionId, reviewerId)
}

const searchForReviewersResolver = (_, { searchTerm, questionVersionId }) => {
  return searchForReviewers(searchTerm, questionVersionId)
}

module.exports = {
  Query: {
    getNonTeamMemberUsers: getNonTeamMemberUsersResolver,
    filterGlobalTeamMembers: filterGlobalTeamMembersResolver,
    searchForReviewers: searchForReviewersResolver,
  },
  Mutation: {
    updateGlobalTeams: updateGlobalTeamsResolver,
    addExternalReviewer: addExternalReviewerResolver,
    inviteReviewer: inviteReviewerResolver,
    revokeInvitation: revokeInvitationResolver,
  },
}
