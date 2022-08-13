/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client'

export const GET_AUTHOR_DASHBOARD = gql`
  query GetAuthorDashboard(
    $orderBy: String
    $ascending: Boolean
    $page: Int
    $pageSize: Int
    $searchQuery: String
  ) {
    getAuthorDashboard(
      orderBy: $orderBy
      ascending: $ascending
      page: $page
      pageSize: $pageSize
      searchQuery: $searchQuery
    ) {
      result {
        id
        versions(latestOnly: true) {
          id
          content

          submitted
          underReview
          published
          publicationDate

          topics {
            topic
            subtopic
          }

          courses {
            course
            units {
              # application
              # courseTopic
              # essentialKnowledge
              learningObjective
              # skill
              understanding
              # unit
            }
          }

          cognitiveLevel
          # affectiveLevel
          # psychomotorLevel
        }
      }
      totalCount
    }
  }
`

export const GET_EDITOR_DASHBOARD = gql`
  query GetEditorDashboard(
    $orderBy: String
    $ascending: Boolean
    $page: Int
    $pageSize: Int
    $searchQuery: String
  ) {
    getManagingEditorDashboard(
      orderBy: $orderBy
      ascending: $ascending
      page: $page
      pageSize: $pageSize
      searchQuery: $searchQuery
    ) {
      result {
        id
        rejected
        versions(latestOnly: true) {
          id
          content

          submitted
          underReview
          published
          publicationDate

          topics {
            topic
            subtopic
          }

          courses {
            course
            units {
              # application
              # courseTopic
              # essentialKnowledge
              learningObjective
              # skill
              understanding
              # unit
            }
          }

          cognitiveLevel
          # affectiveLevel
          # psychomotorLevel
        }
      }
      totalCount
    }
  }
`

export const CREATE_QUESTION = gql`
  mutation CreateQuestion {
    createQuestion {
      id
    }
  }
`

export const QUESTION = gql`
  query Question($id: ID!) {
    question(id: $id) {
      id
      versions(latestOnly: true) {
        id
        content

        submitted
        underReview
        published

        topics {
          topic
          subtopic
        }

        courses {
          course
          units {
            application
            courseTopic
            essentialKnowledge
            learningObjective
            skill
            understanding
            unit
          }
        }

        keywords
        biointeractiveResources

        cognitiveLevel
        affectiveLevel
        psychomotorLevel
        readingLevel

        questionType
      }
    }
  }
`

export const UPDATE_QUESTION = gql`
  mutation UpdateQuestion(
    $questionId: ID!
    $questionVersionId: ID!
    $input: UpdateQuestionInput!
  ) {
    updateQuestion(
      questionId: $questionId
      questionVersionId: $questionVersionId
      input: $input
    ) {
      id
      versions(latestOnly: true) {
        id
        content

        submitted
        underReview
        published

        questionType

        topics {
          topic
          subtopic
        }

        courses {
          course
          units {
            application
            courseTopic
            essentialKnowledge
            learningObjective
            skill
            understanding
          }
        }

        keywords
        biointeractiveResources

        cognitiveLevel
        affectiveLevel
        psychomotorLevel
        readingLevel
      }
    }
  }
`

export const SUBMIT_QUESTION = gql`
  mutation SubmitQuestion(
    $questionId: ID!
    $questionVersionId: ID!
    $input: UpdateQuestionInput!
  ) {
    submitQuestion(
      questionId: $questionId
      questionVersionId: $questionVersionId
      input: $input
    ) {
      id
      agreedTc
      versions(latestOnly: true) {
        submitted
      }
    }
  }
`

export const REJECT_QUESTION = gql`
  mutation RejectQuestion($questionId: ID!) {
    rejectQuestion(questionId: $questionId) {
      id
      rejected
    }
  }
`

export const MOVE_QUESTION_VERSION_TO_REVIEW = gql`
  mutation MoveQuestionVersionToReview($questionVersionId: ID!) {
    moveQuestionVersionToReview(questionVersionId: $questionVersionId) {
      id
      underReview
    }
  }
`

export const PUBLISH_QUESTION_VERSION = gql`
  mutation PublishQuestionVersion($questionVersionId: ID!) {
    publishQuestionVersion(questionVersionId: $questionVersionId) {
      id
      published
      publicationDate
    }
  }
`
