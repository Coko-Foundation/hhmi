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
  query GetComplexItemSets($params: SetFilters, $options: PageInput) {
    complexItemSets(params: $params, options: $options) {
      result {
        id
        title
        leadingContent
        author {
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
      questions {
        result {
          id
          author {
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
