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
        rejected
        versions(latestOnly: true) {
          id
          content

          submitted
          underReview
          inProduction
          published
          publicationDate

          complexItemSetId
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
    $filters: DashboardFilters
  ) {
    getManagingEditorDashboard(
      orderBy: $orderBy
      ascending: $ascending
      page: $page
      pageSize: $pageSize
      filters: $filters
    ) {
      result {
        id
        rejected
        author {
          displayName
        }
        heAssigned
        versions(latestOnly: true) {
          id
          content

          submitted
          underReview
          inProduction
          published
          publicationDate

          complexItemSetId
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

export const GET_HANDLING_EDITOR_DASHBOARD = gql`
  query GetHandlingEditorDashboard(
    $orderBy: String
    $ascending: Boolean
    $page: Int
    $pageSize: Int
    $searchQuery: String
  ) {
    getHandlingEditorDashboard(
      orderBy: $orderBy
      ascending: $ascending
      page: $page
      pageSize: $pageSize
      searchQuery: $searchQuery
    ) {
      result {
        id
        rejected
        author {
          displayName
        }
        versions(latestOnly: true) {
          id
          content

          submitted
          underReview
          inProduction
          published
          publicationDate

          complexItemSetId
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

export const ASSING_HANDLING_EDITORS = gql`
  mutation assignHandlingEditors($questionIds: [ID!]!, $userIds: [ID!]!) {
    assignHandlingEditors(questionIds: $questionIds, userIds: $userIds) {
      questionId
      hasAuthorshipConflict
      members
    }
  }
`

export const UNASSING_HANDLING_EDITOR = gql`
  mutation unassignHandlingEditor($questionId: ID!, $userId: ID!) {
    unassignHandlingEditor(questionId: $questionId, userId: $userId)
  }
`

export const GET_QUESTION_HANDLING_EDITORS = gql`
  query getQuestionsHandlingEditors($questionId: ID!) {
    getQuestionsHandlingEditors(questionId: $questionId) {
      id
      displayName
    }
  }
`

export const GET_QUESTION_PARTICIPANTS = gql`
  query GetQuestionParticipants($id: ID!) {
    getQuestionParticipants(id: $id) {
      id
      display: displayName
    }
  }
`

export const CREATE_QUESTION = gql`
  mutation CreateQuestion($input: UpdateQuestionInput) {
    createQuestion(input: $input) {
      id
    }
  }
`

export const DUPLICATE_QUESTION = gql`
  mutation DuplicateQuestion($questionId: ID!) {
    duplicateQuestion(questionId: $questionId) {
      id
    }
  }
`

export const QUESTION = gql`
  query Question($id: ID!, $published: Boolean) {
    question(id: $id) {
      id
      rejected
      versions(latestOnly: true, publishedOnly: $published) {
        id
        content
        lastEdit

        submitted
        underReview
        inProduction
        published

        topics {
          topic
          subtopic
        }

        courses {
          course
          units {
            unit
            courseTopic
            # AP courses
            learningObjective
            essentialKnowledge
            # IB courses
            application
            skill
            understanding
            # vision and change
            coreCompetence
            coreConcept
            subcompetence
            subcompetenceStatement
            subdiscipline
            subdisciplineStatement
            # aamc
            concept
            category
          }
        }

        keywords
        biointeractiveResources

        cognitiveLevel
        affectiveLevel
        psychomotorLevel
        readingLevel

        questionType
        complexItemSetId
        leadingContent
      }

      chatThreadId
      heAssigned
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
        lastEdit

        submitted
        underReview
        inProduction
        published

        leadingContent
        complexItemSetId
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
            unit
            # vision and change
            coreCompetence
            coreConcept
            subcompetence
            subcompetenceStatement
            subdiscipline
            subdisciplineStatement
            # aamc
            concept
            category
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
      versions(latestOnly: true, publishedOnly: false) {
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

export const MOVE_QUESTION_VERSION_TO_PRODUCTION = gql`
  mutation MoveQuestionVersionToProdution($questionVersionId: ID!) {
    moveQuestionVersionToProduction(questionVersionId: $questionVersionId) {
      id
      underReview
      inProduction
    }
  }
`

export const PUBLISH_QUESTION_VERSION = gql`
  mutation PublishQuestionVersion($questionVersionId: ID!) {
    publishQuestionVersion(questionVersionId: $questionVersionId) {
      id
      inProduction
      published
      publicationDate
    }
  }
`

export const CREATE_NEW_VERSION = gql`
  mutation CreateNewQuestionVersion($questionId: ID!) {
    createNewQuestionVersion(questionId: $questionId) {
      id
      versions(latestOnly: true, publishedOnly: false) {
        id
        content
        lastEdit

        submitted
        underReview
        inProduction
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

export const GET_PUBLISHED_QUESTIONS = gql`
  query GetPublishedQuestions(
    $params: FilterQuestionsParams
    $options: QuestionPageInput
  ) {
    getPublishedQuestions(params: $params, options: $options) {
      result {
        id
        author {
          displayName
        }
        versions(latestOnly: true, publishedOnly: true) {
          id
          content
          complexItemSetId

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
              learningObjective
              understanding
            }
          }

          cognitiveLevel
        }
      }
      totalCount
      relatedQuestionsIds
    }
  }
`

export const GET_PUBLISHED_QUESTIONS_IDS = gql`
  query GetPublishedQuestionsIds {
    getPublishedQuestionsIds
  }
`

export const GENERATE_WORD_FILE = gql`
  mutation GenerateWordFile(
    $questionVersionId: ID!
    $options: GenerateWordFileOptionsInput
  ) {
    generateWordFile(questionVersionId: $questionVersionId, options: $options)
  }
`

export const GENERATE_SCORM_ZIP = gql`
  mutation GenerateScormZip($questionVersionId: ID!) {
    generateScormZip(questionVersionId: $questionVersionId)
  }
`

export const GENERATE_QTI_ZIP = gql`
  mutation GenerateQtiZip($questionVersionId: ID!) {
    generateQtiZip(questionVersionId: $questionVersionId)
  }
`

export const UPLOAD_FILES = gql`
  mutation ($files: [Upload!]!) {
    uploadFiles(files: $files) {
      id
      url(size: medium)
    }
  }
`

export const ASSIGN_QUESTION_AUTHOR = gql`
  mutation ($questionId: ID!, $userId: ID!) {
    assignAuthorship(questionId: $questionId, userId: $userId)
  }
`
