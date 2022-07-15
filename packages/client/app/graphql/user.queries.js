/* eslint-disable import/prefer-default-export */

import { gql } from '@apollo/client'

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id

      givenNames
      surname
      username
      displayName
      middleName
      pronouns

      phone

      country
      state
      city
      address
      zipCode

      position
      organization
      institutionalSetting
      teachingExperience
      typeOfInstitution

      coursesTeaching
      topicsReviewing

      receivedTraining
      receivedInclusiveLanguageTraining

      source

      profileSubmitted

      defaultIdentity {
        id
        email
        isVerified
      }

      teams {
        id
        role
        global
        objectId
      }
    }
  }
`

export const SUBMIT_QUESTIONNAIRE = gql`
  mutation SubmitQuestionnaire($input: UserProfileInput!) {
    submitQuestionnaire(input: $input) {
      id
      profileSubmitted

      teams {
        id
        role
        global
        objectId
      }
    }
  }
`

export const UPDATE_PROFILE = gql`
  mutation UpdateUserProfile($input: UserProfileInput!) {
    updateUserProfile(input: $input) {
      id

      teams {
        id
        role
        global
        objectId
      }
    }
  }
`

export const GET_USERS = gql`
  query GetUsers($queryParams: UsersQueryParams, $options: PageInput) {
    users(queryParams: $queryParams, options: $options) {
      result {
        id
        displayName
        defaultIdentity {
          email
        }
        coursesTeaching
        created
        isActive
      }
      totalCount
    }
  }
`

export const FILTER_USERS = gql`
  query FilterUsers($params: UsersQueryParams, $options: PageInput) {
    filterUsers(params: $params, options: $options) {
      result {
        id
        displayName
        defaultIdentity {
          email
        }
        coursesTeaching
        created
        isActive

        teams {
          role
        }
      }
      totalCount
    }
  }
`

export const DELETE_USERS = gql`
  mutation DeleteUsers($ids: [ID!]!) {
    deleteUsers(ids: $ids)
  }
`

export const DEACTIVATE_USERS = gql`
  mutation DeactivateUsers($ids: [ID!]!) {
    deactivateUsers(ids: $ids) {
      id
    }
  }
`
