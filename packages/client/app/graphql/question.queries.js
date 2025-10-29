/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client'

export const GET_AUTHOR_DASHBOARD = gql`
  query GetAuthorDashboard(
    $orderBy: String
    $ascending: Boolean
    $page: Int
    $pageSize: Int
    $filters: DashboardFilters
    $archived: Boolean
  ) {
    getAuthorDashboard(
      orderBy: $orderBy
      ascending: $ascending
      page: $page
      pageSize: $pageSize
      filters: $filters
      archived: $archived
    ) {
      result {
        id
        rejected
        versions(latestOnly: true) {
          id
          content

          submitted
          accepted
          underReview
          inProduction
          published
          unpublished
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
              skill
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
    $archived: Boolean
  ) {
    getManagingEditorDashboard(
      orderBy: $orderBy
      ascending: $ascending
      page: $page
      pageSize: $pageSize
      filters: $filters
      archived: $archived
    ) {
      result {
        id
        rejected
        authors {
          displayName
        }
        heAssigned
        versions(latestOnly: true) {
          id
          content

          submitted
          accepted
          underReview
          inProduction
          published
          unpublished
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
              skill
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
    $filters: DashboardFilters
    $archived: Boolean
  ) {
    getHandlingEditorDashboard(
      orderBy: $orderBy
      ascending: $ascending
      page: $page
      pageSize: $pageSize
      filters: $filters
      archived: $archived
    ) {
      result {
        id
        rejected
        authors {
          displayName
        }
        versions(latestOnly: true) {
          id
          content

          submitted
          accepted
          underReview
          inProduction
          published
          unpublished
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
              skill
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

export const GET_REVIEWER_DASHBOARD = gql`
  query GetReviewerDashboard(
    $orderBy: String
    $ascending: Boolean
    $page: Int
    $pageSize: Int
    $filters: DashboardFilters
  ) {
    getReviewerDashboard(
      orderBy: $orderBy
      ascending: $ascending
      page: $page
      pageSize: $pageSize
      filters: $filters
    ) {
      result {
        id
        rejected
        authors {
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
              skill
              understanding
              # unit
            }
          }

          cognitiveLevel
          # affectiveLevel
          # psychomotorLevel

          reviewerStatus
          reviews {
            id
            content
            reviewerId
            status {
              submitted
            }
          }
        }
      }
      totalCount
    }
  }
`

export const GET_PRODUCTION_DASHBOARD = gql`
  query GetInProductionDashboard(
    $orderBy: String
    $ascending: Boolean
    $page: Int
    $pageSize: Int
    $filters: DashboardFilters
  ) {
    getInProductionDashboard(
      orderBy: $orderBy
      ascending: $ascending
      page: $page
      pageSize: $pageSize
      filters: $filters
    ) {
      result {
        id
        rejected
        authors {
          displayName
        }
        versions(latestOnly: true, publishedOnly: false) {
          id
          content

          submitted
          # underReview
          inProduction
          published
          unpublished
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
              skill
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

export const DASHBOARD_SUBSCRIPTION = gql`
  subscription DashboardUpdated {
    dashboardUpdate
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

export const GET_AUTHOR_CHAT_PARTICIPANTS = gql`
  query GetAuthorChatParticipants($id: ID!) {
    getAuthorChatParticipants(id: $id) {
      id
      display: displayName
      role
    }
  }
`

export const GET_PRODUCTION_CHAT_PARTICIPANTS = gql`
  query GetProductionChatParticipants($id: ID!) {
    getProductionChatParticipants(id: $id) {
      id
      display: displayName
      role
    }
  }
`

export const GET_REVIEWER_CHAT_PARTICIPANTS = gql`
  query GetReviewerChatParticipants($questionId: ID!, $reviewerId: ID!) {
    getReviewerChatParticipants(
      questionId: $questionId
      reviewerId: $reviewerId
    ) {
      id
      display: displayName
      role
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
        editing
        accepted
        underReview
        inProduction
        published
        unpublished

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
        literatureAttribution

        questionType
        complexItemSetId
        leadingContent
        dependsOn

        reviewerStatus
        isReviewerAutomationOn
        amountOfReviewers
        reviews {
          id
          content
          reviewerId
          attachments {
            name
            url
          }
          status {
            submitted
          }
        }
        reviewerPool {
          id
          status
          reviewSubmitted
          user {
            id
            displayName
            topicsReviewing
            receivedTraining
            receivedInclusiveLanguageTraining
            defaultIdentity {
              id
              email
            }
          }
        }
      }

      authors {
        id
        displayName
      }

      authorChatThreadId
      productionChatThreadId
      reviewerChatThreadId
      heAssigned
      deletedAuthorName
      isArchived
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
        accepted
        underReview
        inProduction
        published
        unpublished
        leadingContent
        complexItemSetId
        dependsOn
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
        literatureAttribution
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

export const ACCEPT_QUESTION = gql`
  mutation AcceptQuestionVersion($questionVersionId: ID!) {
    acceptQuestion(questionVersionId: $questionVersionId) {
      id
      accepted
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
        unpublished

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
        literatureAttribution

        questionType
      }
    }
  }
`
export const UNPUBLISH_QUESTION_VERSION = gql`
  mutation UnpublishQuestionVersion($questionVersionId: ID!) {
    unpublishQuestionVersion(questionVersionId: $questionVersionId) {
      id
      unpublished
      published
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
        authors {
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
              skill
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

export const GET_QUESTION_AUTHORS = gql`
  query GetQuestionAuthors($questionId: ID!) {
    getQuestionAuthors(questionId: $questionId) {
      id
      displayName
    }
  }
`

export const ASSIGN_QUESTION_AUTHOR = gql`
  mutation ($questionId: ID!, $userIds: [ID!]!) {
    assignAuthorship(questionId: $questionId, userIds: $userIds)
  }
`

export const UPDATE_REVIEWER_POOL = gql`
  mutation UpdateReviewerPool($questionVersionId: ID!, $reviewerIds: [ID!]!) {
    updateReviewerPool(
      questionVersionId: $questionVersionId
      reviewerIds: $reviewerIds
    ) {
      id
      reviewerPool {
        id
        user {
          id
        }
      }
    }
  }
`

export const CHANGE_AMOUNT_OF_REVIEWERS = gql`
  mutation ChangeAmountOfReviewers($questionVersionId: ID!, $amount: Int!) {
    changeAmountOfReviewers(
      questionVersionId: $questionVersionId
      amount: $amount
    ) {
      id
      amountOfReviewers
    }
  }
`

export const CHANGE_REVIEWER_AUTOMATION_STATUS = gql`
  mutation ChangeReviewerAutomationStatus(
    $questionVersionId: ID!
    $value: Boolean!
  ) {
    changeReviewerAutomationStatus(
      questionVersionId: $questionVersionId
      value: $value
    ) {
      id
      isReviewerAutomationOn
    }
  }
`

export const CHANGE_ARCHIVE_STATUS_FOR_ITEMS = gql`
  mutation ChangeArchiveStatusForItems(
    $questionIds: [ID!]!
    $isArchiving: Boolean!
    $role: String!
  ) {
    changeArchiveStatusForItems(
      questionIds: $questionIds
      isArchiving: $isArchiving
      role: $role
    )
  }
`

export const EDIT_QUESTION = gql`
  mutation EditQuestion($questionId: ID!, $questionVersionId: ID!) {
    editQuestion(
      questionId: $questionId
      questionVersionId: $questionVersionId
    ) {
      id
      editing
    }
  }
`
