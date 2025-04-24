import { gql } from '@apollo/client'

export const GET_COMPLEX_ITEM_SETS_OPTIONS = gql`
  query GetAvailableSets($publishedOnly: Boolean) {
    getAvailableSets(publishedOnly: $publishedOnly) {
      value: id
      label: title
    }
  }
`

export const GET_COMPLEX_ITEM_SETS = gql`
  query GetComplexItemSets($params: SetFilters, $options: QuestionPageInput) {
    complexItemSets(params: $params, options: $options) {
      result {
        id
        title
        leadingContent
        authors {
          displayName
        }
        created
        updated
      }
      totalCount
    }
  }
`

export const CREATE_COMPLEX_ITEM_SET = gql`
  mutation CreateComplexItemSet($title: String!, $leadingContent: String) {
    createComplexItemSet(title: $title, leadingContent: $leadingContent) {
      id
      title
      leadingContent
    }
  }
`

export const GET_COMPLEX_ITEM_SET = gql`
  query GetComplexItemSet(
    $id: ID!
    # $onlyPublishedQuestions: Boolean
    $questionsOptions: QuestionPageInput
  ) {
    complexItemSet(
      id: $id
      # onlyPublishedQuestions: $onlyPublishedQuestions
      questionsOptions: $questionsOptions
    ) {
      id
      title
      leadingContent
      containsSubmissions
      authors {
        id
        displayName
      }
      questions {
        result {
          id
          authors {
            displayName
          }
          versions(latestOnly: true, publishedOnly: false) {
            id
            content
            publicationDate

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
          }
        }
        totalCount
        relatedQuestionsIds
      }
    }
  }
`

export const UPDATE_COMPLEX_ITEM_SET = gql`
  mutation UpdateComplexItemSet(
    $id: ID!
    $title: String!
    $leadingContent: String!
  ) {
    editComplexItemSet(
      id: $id
      title: $title
      leadingContent: $leadingContent
    ) {
      id
      title
      leadingContent
    }
  }
`

export const ASSIGN_SET_AUTHOR = gql`
  mutation AssingSetAuthor($setId: ID!, $userIds: [ID!]!) {
    assignSetAuthor(setId: $setId, userIds: $userIds)
  }
`

export const EXPORT_SETS = gql`
  mutation ExportSets($setIds: [ID!]!, $options: GenerateWordFileOptionsInput) {
    exportSets(setIds: $setIds, options: $options)
  }
`

export const EXPORT_SET_QUESTIONS = gql`
  mutation ExportSetQuestions(
    $setId: ID!
    $questionIds: [ID!]!
    $orderBy: String
    $ascending: Boolean
    $options: GenerateWordFileOptionsInput
  ) {
    exportSetQuestions(
      setId: $setId
      questionIds: $questionIds
      orderBy: $orderBy
      ascending: $ascending
      options: $options
    )
  }
`

export const EXPORT_SETS_QTI = gql`
  mutation ExportSetsQTI($setIds: [ID!]!) {
    exportSetsQTI(setIds: $setIds)
  }
`

export const EXPORT_SET_QUESTIONS_QTI = gql`
  mutation ExportSetQuestionsQTI($setId: ID!, $questionIds: [ID!]!) {
    exportSetQuestionsQTI(setId: $setId, questionIds: $questionIds)
  }
`
