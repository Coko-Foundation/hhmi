const {
  updateGlobalTeams,
  getNonTeamMemberUsers,
  filterGlobalTeamMembers,
  addExternalReviewer,
  inviteReviewer,
  revokeInvitation,
  searchForReviewers,
  acceptOrRejectInvitation,
  reviewSubmitted,
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

const accceptOrRejectInvitationResolver = (
  _,
  { questionVersionId, accepted, reason },
  ctx,
) => {
  return acceptOrRejectInvitation(questionVersionId, accepted, reason, ctx.user)
}

const reviewSubmittedResolver = async teamMember => {
  return reviewSubmitted(teamMember)
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
    acceptOrRejectInvitation: accceptOrRejectInvitationResolver,
  },
  TeamMember: {
    reviewSubmitted: reviewSubmittedResolver,
  },
}
