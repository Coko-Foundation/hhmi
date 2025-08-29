import { gql } from '@apollo/client'

export const GET_METADATA = gql`
  query GetMetadata {
    getMetadata {
      topics {
        label
        value
        subtopics {
          label
          value
        }
      }
      questionTypes {
        label
        options {
          label
          value
        }
      }
      blooms {
        cognitive {
          label
          options {
            label
            value
          }
        }
        psychomotor {
          label
          value
        }
        affective {
          label
          value
        }
      }
      frameworks {
        label
        value: id
        textValue: value
        enabled
        units {
          label
          value: id
          enabled
        }
        topics {
          value: id
          label
          unit
          enabled
        }
        learningObjectives {
          label
          value: id
          unit
          topic
          enabled
        }
        essentialKnowledge {
          label
          value: id
          unit
          topic
          learningObjective
          enabled
        }
        applications {
          label
          value: id
          unit
          topic
          enabled
        }
        skills {
          label
          value: id
          unit
          topic
          enabled
        }
        understandings {
          label
          value: id
          unit
          topic
          enabled
        }
      }
      introToBioMeta {
        value: id
        textValue: value
        label
        coreConcepts {
          value: id
          label
          explanatoryItems
          enabled
        }
        subdisciplines {
          value: id
          label
          coreConcept
          enabled
        }
        subdisciplineStatements {
          value: id
          label
          coreConcept
          subdiscipline
          enabled
        }
        coreCompetencies {
          value: id
          label
          enabled
        }
        subcompetencies {
          value: id
          label
          coreCompetence
          explanation
          enabled
        }
        subcompetenceStatements {
          value: id
          label
          coreCompetence
          subcompetence
          enabled
        }
        concepts {
          value: id
          label
          enabled
        }
        categories {
          value: id
          label
          concept
          explanation
          enabled
        }
      }
      profileOptions {
        courses {
          value
          label
        }
        topics {
          value
          label
        }
      }
    }
  }
`

export const DISABLE_METADATA = gql`
  mutation DisableMetadata($id: ID!, $type: String!) {
    disableCourseMetadata(id: $id, type: $type)
  }
`

export const ENABLE_METADATA = gql`
  mutation EnableMetadata($id: ID!, $type: String!) {
    enableCourseMetadata(id: $id, type: $type)
  }
`

export const EDIT_METADATA = gql`
  mutation EditMetadata(
    $id: ID!
    $type: String!
    $label: String!
    $explanatoryItems: [String]
    $explanation: String
  ) {
    editCourseMetadata(
      id: $id
      type: $type
      label: $label
      explanatoryItems: $explanatoryItems
      explanation: $explanation
    )
  }
`

export const CREATE_METADATA = gql`
  mutation CreateMetadata($input: NewMetadataInput!) {
    addCourseMetadata(input: $input)
  }
`

export const SORT_METADATA = gql`
  mutation ReorderMetadata($input: SortMetadataInput!) {
    reorderCourseMetadata(input: $input)
  }
`
