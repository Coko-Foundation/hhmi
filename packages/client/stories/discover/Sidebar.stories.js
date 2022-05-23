import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { uniqBy } from 'lodash'
import { Sidebar, metadata } from 'ui'
import { lorem } from 'faker'

const Wrapper = styled.section``

const sidebarText = lorem.sentences(7)

const flatAPCoursesMetadata = data => {
  const units = []
  const topics = []
  const learningObjectives = []
  const essentialKnowledge = []

  data.units.forEach(unit => {
    units.push({
      label: unit.label,
      value: unit.value,
    })

    unit.topics.forEach(topic => {
      topics.push({
        label: topic.label,
        value: topic.value,
        unit: unit.value,
      })

      topic.learningObjectives.forEach(lo => {
        learningObjectives.push({
          label: lo.label,
          value: lo.value,
          unit: unit.value,
          topic: topic.value,
        })

        lo.essentialKnowledge.forEach(ek => {
          essentialKnowledge.push({
            label: ek.label,
            value: ek.value,
            unit: unit.value,
            topic: topic.value,
            learningObjective: lo.value,
          })
        })
      })
    })
  })

  return {
    units,
    topics,
    learningObjectives, // : uniqBy(learningObjectives, 'value'),
    essentialKnowledge,
  }
}

const flatIBCourseMetadata = data => {
  const units = []
  const topics = []
  const applications = []
  const skills = []
  const understandings = []

  data.units.forEach(unit => {
    units.push({
      label: unit.label,
      value: unit.value,
    })

    unit.topics.forEach(topic => {
      topics.push({
        label: topic.label,
        value: topic.value,
        unit: unit.value,
      })

      topic.applications.forEach(application => {
        applications.push({
          label: application.label,
          value: application.value,
          unit: unit.value,
          topic: topic.value,
        })
      })

      if (topic.skills) {
        topic.skills.forEach(skill => {
          skills.push({
            label: skill.label,
            value: skill.value,
            unit: unit.value,
            topic: topic.value,
          })
        })
      }

      topic.understandings.forEach(understanding => {
        understandings.push({
          label: understanding.label,
          value: understanding.value,
          unit: unit.value,
          topic: topic.value,
        })
      })
    })
  })

  return {
    units,
    topics,
    applications,
    skills,
    understandings,
  }
}

const flatVisionAndChangeMetadata = data => {
  const coreConcepts = []
  const subdisciplines = []
  const subdisciplineStatements = []

  const coreCompetencies = []
  const subcompetencies = []
  const subcompetenceStatements = []

  data.coreConcepts.forEach(coreConcept => {
    coreConcepts.push({
      label: coreConcept.label,
      value: coreConcept.value,
      explanatoryItems: coreConcept.explanatoryItems,
    })

    coreConcept.subdisciplines.forEach(subdiscipline => {
      subdisciplines.push({
        label: subdiscipline.label,
        value: subdiscipline.value,
        // coreConcept: they all share the same subdisciplines,
      })

      subdiscipline.statements.forEach(statement => {
        subdisciplineStatements.push({
          label: statement.label,
          value: statement.value,
          coreConcept: coreConcept.value,
          subdiscipline: subdiscipline.value,
        })
      })
    })
  })

  data.coreCompetencies.forEach(coreCompetence => {
    coreCompetencies.push({
      label: coreCompetence.label,
      value: coreCompetence.value,
    })

    coreCompetence.subcompetencies.forEach(subcompetence => {
      subcompetencies.push({
        label: subcompetence.label,
        value: subcompetence.value,
        explanation: subcompetence.explanation,
        coreCompetence: coreCompetence.value,
      })

      subcompetence.statements.forEach(statement => {
        subcompetenceStatements.push({
          label: statement.label,
          value: statement.value,
          subcompetence: subcompetence.value,
          coreCompetence: coreCompetence.value,
        })
      })
    })
  })

  return {
    coreConcepts,
    subdisciplines: uniqBy(subdisciplines, 'value'),
    subdisciplineStatements,
    coreCompetencies,
    subcompetencies,
    subcompetenceStatements,
  }
}

const flatAAMCMetadata = data => {
  const concepts = []
  const categories = []

  data.concepts.forEach(concept => {
    concepts.push({
      label: concept.label,
      value: concept.value,
    })

    concept.categories.forEach(category => {
      categories.push({
        label: category.label,
        value: category.value,
        explanation: category.explanation,
        concept: concept.value,
      })
    })
  })

  return {
    concepts,
    categories,
  }
}

// works for AP and IB courses
// eslint-disable-next-line no-unused-vars
const flatten = (data, obj, tags = []) => {
  const objCopy = obj
  Object.keys(data).forEach(key => {
    if (typeof data[key] !== 'string') {
      if (!obj[key]) {
        objCopy[key] = []
      }

      data[key].forEach(u => {
        objCopy[key].push(
          Object.assign(
            {},
            {
              label: u.label,
              value: u.value,
            },
            ...tags,
          ),
        )

        const childTags = [...tags]
        childTags.push({ [key.slice(0, -1)]: u.value })

        flatten(u, objCopy, childTags)
      })
    } else if (!objCopy[key]) {
      objCopy[key] = data[key]
    }
  })

  return obj
}

export const Base = () => {
  const applyFilters = filters => {
    // eslint-disable-next-line no-console
    console.log(filters)
  }

  const [flatMetadata, setFlatMetadata] = useState(metadata)

  useEffect(() => {
    const frameworks = metadata.frameworks.map(framework => {
      const frameworkData = {
        label: framework.label,
        value: framework.value,
      }

      // const additionalMetadata = flatten(framework, {}, [])
      let additionalMetadata

      if (
        framework.value === 'apBiology' ||
        framework.value === 'apEnvironmentalScience'
      ) {
        additionalMetadata = flatAPCoursesMetadata(framework)
      }

      if (
        framework.value === 'biBiology' ||
        framework.value === 'biEnvironmentalScience'
      ) {
        additionalMetadata = flatIBCourseMetadata(framework)
      }

      return {
        ...frameworkData,
        ...additionalMetadata,
      }
    })

    const introToBioMeta = metadata.introToBioMeta.map(data => {
      const meta = {
        label: data.label,
        value: data.value,
      }

      let additionalMetadata

      if (data.value === 'visionAndChange') {
        additionalMetadata = flatVisionAndChangeMetadata(data)
      }

      if (data.value === 'aamcFuturePhysicians') {
        additionalMetadata = flatAAMCMetadata(data)
      }

      return {
        ...meta,
        ...additionalMetadata,
      }
    })

    setFlatMetadata({
      topics: metadata.topics,
      blooms: metadata.blooms,
      frameworks,
      introToBioMeta,
    })
  }, [])

  return (
    <Wrapper>
      <Sidebar
        metadata={flatMetadata}
        setFilters={applyFilters}
        text={sidebarText}
      />
    </Wrapper>
  )
}

export default {
  component: Sidebar,
  title: 'Discover/Sidebar',
}
