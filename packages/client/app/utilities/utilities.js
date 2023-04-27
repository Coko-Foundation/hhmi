import { isEmpty, uniqBy } from 'lodash'

const apDictionary = [
  'unit',
  'frameworkTopic',
  'learningObjective',
  'essentialKnowledge',
]

const visionAndChangeDictionary = ['coreConcept', 'subDiscipline', 'statement']

const objectCleaner = obj =>
  Object.entries(obj)
    .map(([k, v]) => [k, v && typeof v === 'object' ? objectCleaner(v) : v])
    /* eslint-disable-next-line no-param-reassign */
    .reduce((a, [k, v]) => (v == null ? a : ((a[k] = v), a)), {})

const questionDataTransformer = ({
  framework,
  topic,
  subtopic,
  keywords,
  affectiveLevel,
  biointeractiveResources,
  cognitiveLevel,
  psychomotorLevel,
  readingLevel,
  supplementaryFields,
  ...rest
}) => {
  const result = {
    framework,
    topic,
    subtopic,
    affectiveLevel,
    biointeractiveResources,
    cognitiveLevel,
    psychomotorLevel,
    readingLevel,
    supplementaryFields: [],
    frameworkMetadata: {},
  }

  if (supplementaryFields?.length > 0) {
    const transformedSupplementaryFields = []
    supplementaryFields.forEach((item, index) => {
      const temp = {
        topic: item.topic || null,
        subtopic: item?.subtopic || null,
      }

      if (framework && framework === 'visionAndChange') {
        temp.frameworkMetadata = {}
        visionAndChangeDictionary.forEach(key => {
          temp.frameworkMetadata[`${key}`] = item[key] || null
        })
      }

      if (
        framework &&
        (framework === 'apBiology' || framework === 'apEnvironmentalScience')
      ) {
        temp.frameworkMetadata = {}
        apDictionary.forEach(key => {
          temp.frameworkMetadata[`${key}`] = item[key] || null
        })
      }

      transformedSupplementaryFields.push(temp)
    })

    if (transformedSupplementaryFields.length > 0) {
      result.supplementaryFields = transformedSupplementaryFields
    }
  }

  if (framework && framework === 'visionAndChange') {
    visionAndChangeDictionary.forEach(value => {
      if (rest[`${framework}.${value}`]) {
        result.frameworkMetadata[value] = rest[`${framework}.${value}`]
      }
    })
  }

  if (
    framework &&
    (framework === 'apBiology' || framework === 'apEnvironmentalScience')
  ) {
    apDictionary.forEach(value => {
      if (rest[`${framework}.${value}`]) {
        result.frameworkMetadata[value] = rest[`${framework}.${value}`]
      }
    })
  }

  if (isEmpty(result.frameworkMetadata)) {
    delete result.frameworkMetadata
  }

  result.keywords = keywords

  return result
}

const questionDataMapper = ({
  framework,
  keywords,
  affectiveLevel,
  biointeractiveResources,
  cognitiveLevel,
  psychomotorLevel,
  readingLevel,
  topic,
  subtopic,
  frameworkMetadata,
  supplementaryFields,
}) => {
  const result = {
    framework,
    topic,
    subtopic,
    keywords,
    affectiveLevel,
    biointeractiveResources,
    cognitiveLevel,
    psychomotorLevel,
    readingLevel,
  }

  if (supplementaryFields.length > 0) {
    const transformedSupplementaryFields = []
    supplementaryFields.forEach((item, index) => {
      const temp = { topic: item.topic, subtopic: item.subtopic }

      if (
        framework &&
        framework === 'visionAndChange' &&
        item.frameworkMetadata
      ) {
        visionAndChangeDictionary.forEach(key => {
          temp[`${key}`] = item.frameworkMetadata[key]
        })
      }

      if (
        framework &&
        item.frameworkMetadata &&
        (framework === 'apBiology' || framework === 'apEnvironmentalScience')
      ) {
        apDictionary.forEach(key => {
          temp[`${key}`] = item.frameworkMetadata[key]
        })
      }

      transformedSupplementaryFields.push(temp)
    })
    result.supplementaryFields = transformedSupplementaryFields
  }

  if (framework && framework === 'visionAndChange' && frameworkMetadata) {
    visionAndChangeDictionary.forEach(value => {
      result[`${framework}.${value}`] = frameworkMetadata[value]
    })
  }

  if (
    framework &&
    frameworkMetadata &&
    (framework === 'apBiology' || framework === 'apEnvironmentalScience')
  ) {
    apDictionary.forEach(value => {
      result[`${framework}.${value}`] = frameworkMetadata[value]
    })
  }

  return result
}

const extractDocumentText = data => {
  const extract = obj => {
    const { content } = obj
    if (!Array.isArray(content)) return

    content.forEach(item => {
      const { text, content: itemContent, type, attrs } = item

      if (type === 'image') {
        if (attrs?.alt && attrs.alt.trim().length) {
          allContent += `image with alt text "${attrs.alt}" `
        } else {
          allContent += 'image with no alt text '
        }
      }

      // do not render content from essay feedback
      if (type === 'essay_prompt') {
        return
      }

      // render an empty line for fill_the_gap answers
      if (type === 'fill_the_gap') {
        allContent += '   '
        return
      }

      if (text) allContent += `${text} `
      if (itemContent) extract(item)
    })
  }

  let allContent = ''

  if (data !== null) {
    const incoming = JSON.parse(data)
    extract(incoming)
  }

  const maxLength = 300
  allContent = allContent.substring(0, maxLength + 1).trim()
  allContent =
    allContent.length === maxLength ? `${allContent} ...` : allContent
  if (!allContent) allContent = '(empty)'
  return {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        attrs: {
          class: 'paragraph',
        },
        content: [
          {
            type: 'text',
            text: allContent,
          },
        ],
      },
    ],
  }
}

const extractTopicsAndSubtopics = (topics, topicsMetadata) =>
  topics
    .map(topic => {
      const topicObject = topicsMetadata.find(t => t.value === topic?.topic)

      const subtopicObject = topicObject?.subtopics.find(
        s => s.value === topic.subtopic,
      )

      return {
        topic: topicObject.label,
        subtopic: subtopicObject?.label,
      }
    })
    .reduce(
      (accumulator, topic, index, array) => {
        return {
          topics: `${accumulator.topics}${topic.topic}${
            index < array.length - 1 ? ', ' : ''
          }`,
          subtopics:
            topic.subtopic &&
            `${accumulator.subtopics}${topic.subtopic}${
              index < array.length - 1 ? ', ' : ''
            }`,
        }
      },
      { topics: '', subtopics: '' },
    )

const extractCourseAndObjectives = (courses, frameworksMetadata) =>
  courses.map(c => {
    const courseInValues = frameworksMetadata.find(f => f.value === c.course)

    if (!courseInValues) {
      return {
        course: null,
      }
    }

    const beginning = c.course.slice(0, 2).toLowerCase()
    // const isIB = beginning === 'ib'
    const isAP = beginning === 'ap'

    const objectives = c.units.map(unit =>
      unit.learningObjective
        ? {
            label: courseInValues?.learningObjectives?.find(
              lo => lo.value === unit.learningObjective,
            )?.label,
          }
        : null,
    )

    const understandings = c.units.map(unit =>
      unit.understanding
        ? {
            label: courseInValues?.understandings?.find(
              und => und.value === unit.understanding,
            )?.label,
          }
        : null,
    )

    return {
      course: {
        label: courseInValues.label,
      },
      label: isAP ? 'learning objectives' : 'understandings',
      objectives: isAP ? objectives : understandings,
    }
  })

const extractBloomsLevel = (cognitiveLevel, cognitiveValues) => {
  const allCognitiveOptions = [
    ...cognitiveValues[0].options,
    ...cognitiveValues[1].options,
  ]

  return allCognitiveOptions.find(o => o.value === cognitiveLevel)?.label
}

const profileOptions = {
  institutionalSetting: [
    {
      label: 'Urban',
      value: 'urban',
    },
    {
      label: 'Rural',
      value: 'rural',
    },
    {
      label: 'Online Institution',
      value: 'online',
    },
    {
      label: 'Other',
      value: 'other',
    },
  ],
  institutionLevels: [
    {
      label: 'Middle School',
      value: 'middleSchool',
    },
    {
      label: 'High School',
      value: 'highSchool',
    },
    {
      label: '2-year college',
      value: '2-year-college',
    },
    {
      label: '4-year college',
      value: '4-year-college',
    },
    {
      label: 'Other',
      value: 'other',
    },
  ],
  courses: [
    {
      label: 'Biology',
      value: 'biology',
    },
    {
      label: 'Biochemistry & Molecular Biology',
      value: 'biochemistryMolecularBiology',
    },
    {
      label: 'Genetics',
      value: 'genetics',
    },
    {
      label: 'Cell Biology',
      value: 'cellBiology',
    },
    {
      label: 'Microbiology',
      value: 'microbiology',
    },
    {
      label: 'Anatomy & Physiology',
      value: 'anatomyPhysiology',
    },
    {
      label: 'Evolutionary Biology',
      value: 'evolutionaryBiology',
    },
    {
      label: 'Ecology',
      value: 'ecology',
    },
    {
      label: 'Environmental Science',
      value: 'environmentalScience',
    },
    {
      label: 'Earth Science',
      value: 'earthScience',
    },
    {
      label: 'Other',
      value: 'other',
    },
  ],
  topics: [
    {
      label: 'Biochemistry & Molecular Biology',
      value: 'biochemistryMolecularBiology',
    },
    {
      label: 'Genetics',
      value: 'genetics',
    },
    {
      label: 'Cell biology',
      value: 'cellBiology',
    },
    {
      label: 'Diversity of life',
      value: 'diversityOfLife',
    },
    {
      label: 'Anatomy & Physiology',
      value: 'anatomyPhysiology',
    },
    {
      label: 'Evolution',
      value: 'evolution',
    },
    {
      label: 'Ecology',
      value: 'ecology',
    },
    {
      label: 'Environmental science',
      value: 'environmentalScience',
    },
    {
      label: 'Earth science',
      value: 'earthScience',
    },
    {
      label: 'Science practices',
      value: 'sciencePractices',
    },
  ],
}

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

const questionTypes = [
  {
    value: 'multipleChoice',
    label: 'Multiple choice',
  },
  {
    value: 'multipleChoiceSingleCorrect',
    label: 'Multiple choice (single correct)',
  },
  {
    value: 'trueFalse',
    label: 'True / False',
  },
  {
    value: 'trueFalseSingleCorrect',
    label: 'True / False (single correct)',
  },
  {
    value: 'fillInTheBlank',
    label: 'Fill in the blank',
  },
  {
    value: 'essay',
    label: 'Essay',
  },
  {
    value: 'matching',
    label: 'Matching',
  },
  {
    value: 'multipleDropdowns',
    label: 'Multiple dropdowns',
  },
]

export {
  extractDocumentText,
  extractTopicsAndSubtopics,
  extractCourseAndObjectives,
  extractBloomsLevel,
  flatAAMCMetadata,
  flatAPCoursesMetadata,
  flatIBCourseMetadata,
  flatVisionAndChangeMetadata,
  objectCleaner,
  profileOptions,
  questionDataMapper,
  questionDataTransformer,
  questionTypes,
}
