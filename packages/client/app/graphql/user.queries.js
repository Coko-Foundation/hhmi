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

      # roles

      defaultIdentity {
        id
        email
        isVerified
      }
    }
  }
`

export const SUBMIT_QUESTIONNAIRE = gql`
  mutation SubmitQuestionnaire($input: UserProfileInput!) {
    submitQuestionnaire(input: $input) {
      id
      profileSubmitted
    }
  }
`

export const UPDATE_PROFILE = gql`
  mutation UpdateUserProfile($input: UserProfileInput!) {
    updateUserProfile(input: $input) {
      id
    }
  }
`
