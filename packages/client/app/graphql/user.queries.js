/* eslint-disable import/prefer-default-export */

import { gql } from '@apollo/client'

export const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    isActive

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

    apIbCourses
    employmentStatus
    otherLevel

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
`

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`

export const SUBMIT_QUESTIONNAIRE = gql`
  mutation SubmitQuestionnaire($input: UserProfileInput!) {
    submitQuestionnaire(input: $input) {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`

export const UPDATE_PROFILE = gql`
  mutation UpdateUserProfile($input: UserProfileInput!) {
    updateUserProfile(input: $input) {
      ...UserFields
    }
  }
  ${USER_FIELDS}
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

export const FILTER_USERS_OPTIONS = gql`
  query FilterUsers($params: UsersQueryParams) {
    filterUsers(params: $params) {
      result {
        value: id
        label: displayName
      }
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

export const ACTIVATE_USERS = gql`
  mutation ActivateUsers($ids: [ID!]!) {
    activateUsers(ids: $ids) {
      id
    }
  }
`

export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword($input: UpdatePasswordInput!) {
    updatePassword(input: $input)
  }
`

export const DELETE_RELATED_ITEMS = gql`
  mutation DeleteUserRelatedItems($ids: [ID!]!) {
    deleteUsersRelatedItems(ids: $ids)
  }
`
