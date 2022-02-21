/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client'

const QUESTIONS = gql`
  query Questions($where: QuestionWhereInput) {
    questions(where: $where) {
      result {
        id
        versions(latestOnly: true) {
          topic
          subTopic
          content
          cognitiveLevel
          affectiveLevel
          psychomotorLevel
          framework
          frameworkMetadata {
            learningObjective
          }
          supplementaryFields {
            topic
            subTopic
            frameworkMetadata {
              learningObjective
            }
          }
          created
        }
      }
      totalCount
    }
  }
`

const QUESTION = gql`
  query Question($id: ID!) {
    question(id: $id) {
      id
      agreedTc
      versions(latestOnly: true) {
        id
        questionId
        submitted
        content
        keywords
        topic
        subTopic
        biointeractiveResources
        cognitiveLevel
        affectiveLevel
        psychomotorLevel
        readingLevel
        framework
        frameworkMetadata {
          unit
          frameworkTopic
          learningObjective
          essentialKnowledge
          coreConcept
          statement
          subDiscipline
        }
        supplementaryFields {
          topic
          subTopic
          frameworkMetadata {
            unit
            frameworkTopic
            learningObjective
            essentialKnowledge
            coreConcept
            statement
            subDiscipline
          }
        }
      }
    }
  }
`

const CREATE_QUESTION = gql`
  mutation CreateQuestion {
    createQuestion {
      id
    }
  }
`

const UPDATE_QUESTION = gql`
  mutation UpdateQuestion($id: ID!, $input: UpdateQuestionInput!) {
    updateQuestion(id: $id, input: $input) {
      id
      agreedTc
      versions(latestOnly: true) {
        id
        questionId
        submitted
        content
        topic
        subTopic
        keywords
        biointeractiveResources
        cognitiveLevel
        affectiveLevel
        psychomotorLevel
        readingLevel
        framework
        frameworkMetadata {
          unit
          frameworkTopic
          learningObjective
          essentialKnowledge
          coreConcept
          statement
          subDiscipline
        }
        supplementaryFields {
          topic
          subTopic
          frameworkMetadata {
            unit
            frameworkTopic
            learningObjective
            essentialKnowledge
            coreConcept
            statement
            subDiscipline
          }
        }
      }
    }
  }
`

const SUBMIT_QUESTION = gql`
  mutation SubmitQuestion($id: ID!, $input: SubmitQuestionInput!) {
    submitQuestion(id: $id, input: $input) {
      id
      agreedTc
      versions(latestOnly: true) {
        id
        questionId
        submitted
        content
        keywords
        topic
        subTopic
        biointeractiveResources
        cognitiveLevel
        affectiveLevel
        psychomotorLevel
        readingLevel
        framework
        frameworkMetadata {
          unit
          frameworkTopic
          learningObjective
          essentialKnowledge
          coreConcept
          statement
          subDiscipline
        }
        supplementaryFields {
          topic
          subTopic
          frameworkMetadata {
            unit
            frameworkTopic
            learningObjective
            essentialKnowledge
            coreConcept
            statement
            subDiscipline
          }
        }
      }
    }
  }
`

const AUTO_SAVE_QUESTION = gql`
  mutation AutoSaveQuestion($id: ID!, $input: AutoSaveQuestionInput!) {
    autoSaveQuestion(id: $id, input: $input) {
      id
      agreedTc
      versions(latestOnly: true) {
        id
        questionId
        submitted
        content
        keywords
        biointeractiveResources
        cognitiveLevel
        affectiveLevel
        psychomotorLevel
        readingLevel
        framework
        topic
        subTopic
        frameworkMetadata {
          unit
          frameworkTopic
          learningObjective
          essentialKnowledge
          coreConcept
          statement
          subDiscipline
        }
        supplementaryFields {
          topic
          subTopic
          frameworkMetadata {
            unit
            frameworkTopic
            learningObjective
            essentialKnowledge
            coreConcept
            statement
            subDiscipline
          }
        }
      }
    }
  }
`

export {
  QUESTIONS,
  QUESTION,
  CREATE_QUESTION,
  SUBMIT_QUESTION,
  AUTO_SAVE_QUESTION,
  UPDATE_QUESTION,
}
