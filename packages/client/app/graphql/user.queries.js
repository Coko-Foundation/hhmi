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
