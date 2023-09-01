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

export {
  TEAM,
  GLOBAL_TEAMS,
  ADD_TEAM_MEMBER,
  UPDATE_TEAM_MEMBERSHIP,
  NON_TEAM_MEMBER_USERS,
  UPDATE_GLOBAL_TEAMS,
  FILTER_GLOBAL_TEAM_MEMBERS,
}
