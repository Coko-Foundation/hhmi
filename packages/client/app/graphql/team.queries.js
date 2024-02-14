/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client'

const TEAM = gql`
  query Team($id: ID!) {
    team(id: $id) {
      id
      role
      displayName
      objectId
      objectType
      members {
        id
        user {
          id
          displayName
        }
      }
      global
    }
  }
`

const GLOBAL_TEAMS = gql`
  query GetGlobalTeams {
    getGlobalTeams {
      result {
        id
        displayName

        members {
          id
          user {
            id
            displayName
          }
        }
      }
    }
  }
`

const NON_TEAM_MEMBER_USERS = gql`
  query getNonTeamMemberUsers($id: ID!, $term: String!) {
    getNonTeamMemberUsers(teamId: $id, term: $term) {
      id
      displayName
    }
  }
`

const ADD_TEAM_MEMBER = gql`
  mutation AddTeamMember($teamId: ID!, $userId: ID!) {
    addTeamMember(teamId: $teamId, userId: $userId) {
      id
      role
      displayName
      objectId
      objectType
      members {
        id
        user {
          id
          displayName
        }
      }
      global
    }
  }
`

const UPDATE_TEAM_MEMBERSHIP = gql`
  mutation updateTeamMembership($teamId: ID!, $members: [ID!]!) {
    updateTeamMembership(teamId: $teamId, members: $members) {
      id
      role
      displayName
      objectId
      objectType
      members {
        id
        user {
          id
          displayName
        }
      }
      global
    }
  }
`

const UPDATE_GLOBAL_TEAMS = gql`
  mutation updateGlobalTeams($input: [UpdateGlobalTeamsInput!]!) {
    updateGlobalTeams(input: $input) {
      id
      role
      displayName
      members {
        id
        user {
          id
          displayName
        }
      }
    }
  }
`

const FILTER_GLOBAL_TEAM_MEMBERS = gql`
  query FilterTeamMembers(
    $role: String!
    $query: String
    $options: FilterTeamMembersInput
  ) {
    filterGlobalTeamMembers(role: $role, query: $query, options: $options) {
      result {
        value: id
        label: displayName
      }
    }
  }
`

const ACCEPT_OR_REJECT_REVIEW_INVITATION = gql`
  mutation AcceptOrRejectReviewInvitation(
    $questionVersionId: ID!
    $accepted: Boolean!
    $reason: String
  ) {
    acceptOrRejectInvitation(
      questionVersionId: $questionVersionId
      accepted: $accepted
      reason: $reason
    )
  }
`

const INVITE_REVIEWER = gql`
  mutation InviteReviewer($questionVersionId: ID!, $reviewerId: ID!) {
    inviteReviewer(
      questionVersionId: $questionVersionId
      reviewerId: $reviewerId
    ) {
      id
      user {
        id
      }
      status
    }
  }
`

const REVOKE_REVIEWER_INVITATION = gql`
  mutation RevokeInvitation($questionVersionId: ID!, $reviewerId: ID!) {
    revokeInvitation(
      questionVersionId: $questionVersionId
      reviewerId: $reviewerId
    ) {
      id
      status
    }
  }
`

const SEARCH_FOR_REVIEWERS = gql`
  query SearchForReviewers($searchTerm: String!, $questionVersionId: ID!) {
    searchForReviewers(
      searchTerm: $searchTerm
      questionVersionId: $questionVersionId
    ) {
      id
      displayName
      defaultIdentity {
        email
      }
      topicsReviewing
      receivedTraining
      receivedInclusiveLanguageTraining
    }
  }
`

export {
  TEAM,
  GLOBAL_TEAMS,
  ADD_TEAM_MEMBER,
  UPDATE_TEAM_MEMBERSHIP,
  NON_TEAM_MEMBER_USERS,
  UPDATE_GLOBAL_TEAMS,
  FILTER_GLOBAL_TEAM_MEMBERS,
  ACCEPT_OR_REJECT_REVIEW_INVITATION,
  INVITE_REVIEWER,
  REVOKE_REVIEWER_INVITATION,
  SEARCH_FOR_REVIEWERS,
}
