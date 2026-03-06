import { gql } from '@apollo/client'

export const CREATE_LIST = gql`
  mutation CreateList($title: String!, $questions: [ID!]) {
    createList(title: $title, questions: $questions) {
      id
      title
      created
    }
  }
`

export const GET_LISTS_OPTIONS = gql`
  query GetUserLists {
    myLists(page: 0, pageSize: 1000) {
      result {
        value: id
        label: title
      }
    }
  }
`

export const GET_LISTS = gql`
  query GetUserLists(
    $page: Int
    $pageSize: Int
    $searchQuery: String
    $orderBy: String
    $ascending: Boolean
  ) {
    myLists(
      page: $page
      pageSize: $pageSize
      searchQuery: $searchQuery
      orderBy: $orderBy
      ascending: $ascending
    ) {
      result {
        id
        title
        created
        questions {
          result {
            versions(latestOnly: true) {
              questionType
            }
          }
        }
      }
      totalCount
    }
  }
`

export const DELETE_LISTS = gql`
  mutation DeleteLists($ids: [ID!]!) {
    deleteLists(ids: $ids)
  }
`

export const EDIT_LIST = gql`
  mutation RenameList($id: ID!, $title: String!) {
    editList(id: $id, title: $title) {
      id
    }
  }
`

export const GET_LIST = gql`
  query GetList(
    $id: ID!
    $questionsQuery: String
    $questionsOptions: QuestionPageInput
  ) {
    list(
      id: $id
      questionsQuery: $questionsQuery
      questionsOptions: $questionsOptions
    ) {
      title
      questions {
        result {
          id
          rejected
          versions(latestOnly: true) {
            id
            content
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
            complexItemSetId
            questionType
            dependsOn
          }
        }
        totalCount
        relatedQuestionsIds
      }
    }
  }
`

export const ADD_TO_LIST = gql`
  mutation AddToList($listId: ID!, $questionIds: [ID!]!) {
    addToList(listId: $listId, questionIds: $questionIds) {
      listId
      questionId
    }
  }
`

export const REMOVE_FROM_LIST = gql`
  mutation RemoveFromList($listId: ID!, $questionIds: [ID!]!) {
    deleteFromList(listId: $listId, questionIds: $questionIds)
  }
`

export const COPY_LIST = gql`
  mutation CopyList($id: ID!, $title: String!) {
    copyList(id: $id, title: $title) {
      id
    }
  }
`

export const EXPORT_QUESTIONS = gql`
  mutation ExportQuestions(
    $listId: ID!
    $questionIds: [ID!]!
    $orderBy: String
    $ascending: Boolean
    $options: GenerateWordFileOptionsInput
  ) {
    exportQuestions(
      listId: $listId
      questionIds: $questionIds
      orderBy: $orderBy
      ascending: $ascending
      options: $options
    )
  }
`

export const EXPORT_LIST = gql`
  mutation ExportList(
    $listId: ID!
    $orderBy: String
    $ascending: Boolean
    $options: GenerateWordFileOptionsInput
  ) {
    exportList(
      listId: $listId
      orderBy: $orderBy
      ascending: $ascending
      options: $options
    )
  }
`

export const EXPORT_QUESTIONS_QTI = gql`
  mutation exportQuestionsQTI(
    $listId: ID!
    $questionIds: [ID!]!
    $orderBy: String
    $ascending: Boolean
  ) {
    exportQuestionsQTI(
      listId: $listId
      questionIds: $questionIds
      orderBy: $orderBy
      ascending: $ascending
    )
  }
`

export const EXPORT_LIST_QTI = gql`
  mutation exportListQTI($listId: ID!, $orderBy: String, $ascending: Boolean) {
    exportListQTI(listId: $listId, orderBy: $orderBy, ascending: $ascending)
  }
`

export const REORDER_LIST = gql`
  mutation reorderList($listId: ID!, $customOrder: [ID!]!) {
    reorderList(listId: $listId, customOrder: $customOrder) {
      customOrder
    }
  }
`
