import { gql } from '@apollo/client'

export default gql`
  query Metadata {
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
        value
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
        value
        units {
          label
          value
        }
        topics {
          label
          value
          unit
        }
        learningObjectives {
          label
          value
          unit
          topic
        }
        essentialKnowledge {
          label
          value
          unit
          topic
          learningObjective
        }
        applications {
          label
          value
          unit
          topic
        }
        skills {
          label
          value
          unit
          topic
        }
        understandings {
          label
          value
          unit
          topic
        }
      }
      introToBioMeta {
        value
        label
        coreConcepts {
          value
          label
          explanatoryItems
        }
        subdisciplines {
          value
          label
        }
        subdisciplineStatements {
          value
          label
          coreConcept
          subdiscipline
        }
        coreCompetencies {
          value
          label
        }
        subcompetencies {
          value
          label
          coreCompetence
          explanation
        }
        subcompetenceStatements {
          value
          label
          coreCompetence
          subcompetence
        }
        concepts {
          value
          label
        }
        categories {
          value
          label
          concept
          explanation
        }
      }
    }
  }
`
