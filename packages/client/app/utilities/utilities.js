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

    const result = {
      course: {
        label: courseInValues.label,
      },
    }

    switch (c.course) {
      case 'apBiology':
      case 'apEnvironmentalScience':
      case 'introBioForMajors':
        result.label = 'learning objectives'
        result.objectives = c.units.map(unit =>
          unit.learningObjective
            ? {
                label: courseInValues?.learningObjectives?.find(
                  lo => lo.value === unit.learningObjective,
                )?.label,
              }
            : null,
        )
        break
      case 'biBiology':
      case 'biEnvironmentalScience':
        result.label = 'understandings'
        result.objectives = c.units.map(unit =>
          unit.understanding
            ? {
                label: courseInValues?.understandings?.find(
                  und => und.value === unit.understanding,
                )?.label,
              }
            : null,
        )
        break
      default:
        break
    }

    return result
  })

const extractBloomsLevel = (cognitiveLevel, cognitiveValues) => {
  const allCognitiveOptions = [
    ...cognitiveValues[0].options,
    ...cognitiveValues[1].options,
  ]

  return allCognitiveOptions.find(o => o.value === cognitiveLevel)?.label
}

const extractComplexItemSet = (id, options) => options.find(o => o.value === id)

const extractAPCourseMetadata = (unitData, courseMetadata) => {
  const unit = courseMetadata.units.find(u => u.value === unitData.unit)?.label

  const courseTopic = courseMetadata.topics.find(
    u => u.value === unitData.courseTopic,
  )?.label

  const learningObjective = courseMetadata.learningObjectives.find(
    l => l.value === unitData.learningObjective,
  )?.label

  const essentialKnowledge = courseMetadata.essentialKnowledge.find(
    e => e.value === unitData.essentialKnowledge,
  )?.label

  return [
    { label: 'Unit', value: unit },
    { label: 'Topic', value: courseTopic },
    { label: 'Learning objective', value: learningObjective },
    { label: 'Essential knowledge', value: essentialKnowledge },
  ]
}

const extractIBCourseMetadata = (unitData, courseMetadata) => {
  const unit = courseMetadata.units.find(u => u.value === unitData.unit)?.label

  const courseTopic = courseMetadata.topics.find(
    u => u.value === unitData.courseTopic,
  )?.label

  const application = courseMetadata.applications.find(
    a => a.value === unitData.application,
  )?.label

  const skill = courseMetadata.skills.find(
    s => s.value === unitData.skill,
  )?.label

  const understanding = courseMetadata.understandings.find(
    u => u.value === unitData.understanding,
  )?.label

  return [
    { label: 'Unit', value: unit },
    { label: 'Topic', value: courseTopic },
    { label: 'Application', value: application },
    { label: 'Skill', value: skill },
    { label: 'Understanding', value: understanding },
  ]
}

const extractIntroBioCourseMetadata = (
  unitData,
  courseMetadata,
  extraFramewrok,
) => {
  const unit = courseMetadata.units.find(u => u.value === unitData.unit)?.label

  const courseTopic = courseMetadata.topics.find(
    u => u.value === unitData.courseTopic,
  )?.label

  const learningObjective = courseMetadata.learningObjectives.find(
    l => l.value === unitData.learningObjective,
  )?.label

  const visionAndChange = extraFramewrok.find(
    meta => meta.value === 'visionAndChange',
  )

  const aamc = extraFramewrok.find(
    meta => meta.value === 'aamcFuturePhysicians',
  )

  const coreConcept = visionAndChange.coreConcepts.find(
    c => c.value === unitData.coreConcept,
  )?.label

  const subdiscipline = visionAndChange.subdisciplines.find(
    c => c.value === unitData.subdiscipline,
  )?.label

  const subdisciplineStatement = visionAndChange.subdisciplineStatements.find(
    c => c.value === unitData.subdisciplineStatement,
  )?.label

  const coreCompetence = visionAndChange.coreCompetencies.find(
    c => c.value === unitData.coreCompetence,
  )?.label

  const subcompetence = visionAndChange.subcompetencies.find(
    c => c.value === unitData.subcompetence,
  )?.label

  const subcompetenceStatement = visionAndChange.subcompetenceStatements.find(
    c => c.value === unitData.subcompetenceStatement,
  )?.label

  const concept = aamc.concepts.find(c => c.value === unitData.concept)?.label

  const category = aamc.categories.find(
    c => c.value === unitData.category,
  )?.label

  return [
    { label: 'Unit', value: unit },
    { label: 'Topic', value: courseTopic },
    { label: 'Learning objective', value: learningObjective },
    // vision and change
    { label: 'Core concept', value: coreConcept },
    { label: 'Subdiscipline', value: subdiscipline },
    { label: 'Subdiscipline statement', value: subdisciplineStatement },
    { label: 'Core competence', value: coreCompetence },
    { label: 'Subcompetence', value: subcompetence },
    { label: 'Subcompetence statement', value: subcompetenceStatement },
    // aamc
    { label: 'Concept', value: concept },
    { label: 'Category', value: category },
  ]
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
      label: 'Biochemistry',
      value: 'biochemistryMolecularBiology',
    },
    {
      label: 'Molecular Biology',
      value: 'molecularBiology',
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

const flatIntroBioCourseMetadata = data => {
  const units = []
  const topics = []
  const learningObjectives = []

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
      })
    })
  })

  return {
    units,
    topics,
    learningObjectives,
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

// const questionTypes = [
//   {
//     value: 'multipleChoice',
//     label: 'Multiple choice',
//   },
//   {
//     value: 'multipleChoiceSingleCorrect',
//     label: 'Multiple choice (single correct)',
//   },
//   {
//     value: 'trueFalse',
//     label: 'True / False',
//   },
//   {
//     value: 'trueFalseSingleCorrect',
//     label: 'True / False (single correct)',
//   },
//   {
//     value: 'fillInTheBlank',
//     label: 'Fill in the blank',
//   },
//   {
//     value: 'essay',
//     label: 'Essay',
//   },
//   {
//     value: 'matching',
//     label: 'Matching',
//   },
//   {
//     value: 'multipleDropdowns',
//     label: 'Multiple dropdowns',
//   },
// ]

const questionTypes = [
  {
    waxValue: 'multiple_choice_container',
    metadataValue: 'multipleChoice',
    startingData: {
      type: 'doc',
      content: [
        {
          type: 'multiple_choice_container',
          attrs: {
            id: '3750db93-b005-48f6-93e3-e589404a0257',
            class: 'multiple-choice',
          },
          content: [
            {
              type: 'question_node_multiple',
              attrs: {
                class: 'multiple-choice-question',
                id: '8325dfb6-9bef-446d-a144-b064f796d8f3',
              },
            },
            {
              type: 'multiple_choice',
              attrs: {
                class: 'multiple-choice-option',
                id: '2fcdf010-63bb-4802-8d5e-69103acdb358',
                correct: false,
                answer: false,
                feedback: '',
              },
            },
            {
              type: 'multiple_choice',
              attrs: {
                class: 'multiple-choice-option',
                id: '5db539f3-bcf7-4c34-8959-3c2339887085',
                correct: false,
                answer: false,
                feedback: '',
              },
            },
          ],
        },
      ],
    },
  },
  {
    waxValue: 'multiple_choice_single_correct_container',
    metadataValue: 'multipleChoiceSingleCorrect',
    startingData: {
      type: 'doc',
      content: [
        {
          type: 'multiple_choice_single_correct_container',
          attrs: {
            id: '690d139c-2943-4ef1-b46c-39e60d178f5f',
            class: 'multiple-choice-single-correct',
            correctId: '',
          },
          content: [
            {
              type: 'question_node_multiple_single',
              attrs: {
                id: '78206eac-a7b8-489b-9a22-54dceb0ee5dc',
                class: 'multiple-choice-question-single',
              },
            },
            {
              type: 'multiple_choice_single_correct',
              attrs: {
                class: 'multiple-choice-option-single-correct',
                id: 'ef2ea29f-cfeb-4f32-8e1b-56fc03da22bb',
                correct: false,
                answer: false,
                feedback: '',
              },
            },
            {
              type: 'multiple_choice_single_correct',
              attrs: {
                class: 'multiple-choice-option-single-correct',
                id: '8c27c070-6162-46e4-8182-116f5750b049',
                correct: false,
                answer: false,
                feedback: '',
              },
            },
          ],
        },
      ],
    },
  },
  {
    waxValue: 'true_false_container',
    metadataValue: 'trueFalse',
    startingData: {
      type: 'doc',
      content: [
        {
          type: 'true_false_container',
          attrs: {
            id: '2f147ccd-b0d4-4ca8-906b-53149b8925aa',
            class: 'true-false',
          },
          content: [
            {
              type: 'question_node_true_false',
              attrs: {
                id: 'c316012f-4f19-4424-ad3c-a7608b5ef5eb',
                class: 'true-false-question',
              },
            },
            {
              type: 'true_false',
              attrs: {
                class: 'true-false-option',
                id: 'a17cefa1-5f97-4efc-8f94-dc6566e0f6fa',
                correct: false,
                answer: false,
                feedback: '',
              },
            },
            {
              type: 'true_false',
              attrs: {
                class: 'true-false-option',
                id: '3caf9851-fab3-4b01-bd5f-1245dacd0e30',
                correct: false,
                answer: false,
                feedback: '',
              },
            },
          ],
        },
      ],
    },
  },
  {
    waxValue: 'true_false_single_correct_container',
    metadataValue: 'trueFalseSingleCorrect',
    startingData: {
      type: 'doc',
      content: [
        {
          type: 'true_false_single_correct_container',
          attrs: {
            id: 'f1d58c09-99a3-413e-9f1e-866e927be72c',
            class: 'true-false-single-correct',
          },
          content: [
            {
              type: 'question_node_true_false_single',
              attrs: {
                id: '355e75f0-3d89-4d35-a932-7ec49f3602ce',
                class: 'true-false-question-single',
              },
            },
            {
              type: 'true_false_single_correct',
              attrs: {
                id: '96c042c6-cf58-4d7b-981e-607cb2551332',
                class: 'true-false-single-correct-option',
                correct: false,
                answer: false,
                feedback: '',
              },
            },
            {
              type: 'true_false_single_correct',
              attrs: {
                id: '8620edc5-096a-4ac0-9d7d-1015bdc16632',
                class: 'true-false-single-correct-option',
                correct: false,
                answer: false,
                feedback: '',
              },
            },
          ],
        },
      ],
    },
  },
  {
    waxValue: 'matching_container',
    metadataValue: 'matching',
    startingData: {
      type: 'doc',
      content: [
        {
          type: 'matching_container',
          attrs: {
            id: 'a3b95066-6651-4c28-b8a7-1391b3ac233b',
            class: 'matching-container',
            options: [],
            feedback: '',
          },
          content: [
            {
              type: 'paragraph',
              attrs: {
                class: 'paragraph',
              },
              content: [
                {
                  type: 'matching_option',
                  attrs: {
                    class: 'matching-option',
                    id: 'faa9a035-7b55-4478-83e0-fffaeb0af9fd',
                    isfirst: true,
                    answer: '',
                    correct: '',
                    options: [],
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    waxValue: 'essay_container',
    metadataValue: 'essay',
    startingData: {
      type: 'doc',
      content: [
        {
          type: 'essay_container',
          attrs: {
            id: '0fc63261-eeb8-4030-9d7d-ed1bb61f28e8',
            class: 'essay',
          },
          content: [
            {
              type: 'essay_question',
              attrs: {
                class: 'essay-question',
                id: '59732f1b-4d09-4669-b643-2df78b0c8cb4',
              },
              content: [
                {
                  type: 'paragraph',
                  attrs: {
                    class: 'paragraph',
                  },
                },
              ],
            },
            {
              type: 'essay_prompt',
              attrs: {
                class: 'essay-prompt',
                id: '11dd61ff-1c01-4b2d-bb54-6e6521905bde',
              },
              content: [
                {
                  type: 'paragraph',
                  attrs: {
                    class: 'paragraph',
                  },
                },
              ],
            },
            {
              type: 'essay_answer',
              attrs: {
                class: 'essay-answer',
                id: '54b0d8f2-986b-401b-a9d4-a6cfa8e2b3d3',
              },
              content: [
                {
                  type: 'paragraph',
                  attrs: {
                    class: 'paragraph',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    waxValue: 'multiple_drop_down_container',
    metadataValue: 'multipleDropdowns',
    startingData: {
      type: 'doc',
      content: [
        {
          type: 'multiple_drop_down_container',
          attrs: {
            id: 'b42e5e37-2c59-4502-b5af-dee7e0bf19c3',
            class: 'multiple-drop-down-container',
            feedback: '',
          },
          content: [
            {
              type: 'paragraph',
              attrs: {
                class: 'paragraph',
              },
              content: [
                {
                  type: 'text',
                  text: ' ',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    waxValue: 'fill_the_gap_container',
    metadataValue: 'fillInTheBlank',
    startingData: {
      type: 'doc',
      content: [
        {
          type: 'fill_the_gap_container',
          attrs: {
            id: '3e4771d8-e784-4e9e-8319-e3ee77bd297a',
            class: 'fill-the-gap',
            feedback: '',
          },
          content: [
            {
              type: 'paragraph',
              attrs: {
                class: 'paragraph',
              },
              content: [
                {
                  type: 'text',
                  text: ' ',
                },
              ],
            },
          ],
        },
      ],
    },
  },
]

const dashboardDataMapper = ({
  questions,
  metadata,
  complexItemSetOptions,
  showStatus,
  showAuthor,
  relatedQuestionIds,
  testMode,
  showAssigned,
}) => {
  if (!questions) return null

  const renderStatus = ({
    submitted,
    underReview,
    inProduction,
    published,
    rejected,
  }) => {
    if (!showStatus) return null
    let status = 'Not Submitted'
    if (submitted) status = 'Submitted'
    if (underReview) status = 'Under Review'
    if (inProduction) status = 'In Production'
    if (published) status = 'Published'
    if (rejected) status = 'Rejected'

    return status
  }

  return questions.map(question => {
    const { id, versions, rejected, heAssigned } = question
    const latestVersion = versions[0]

    const { content, publicationDate, cognitiveLevel, complexItemSetId } =
      latestVersion

    const parsedContent = extractDocumentText(content)

    const courses = extractCourseAndObjectives(
      latestVersion.courses,
      metadata.frameworks,
    )

    const topics = extractTopicsAndSubtopics(
      latestVersion.topics,
      metadata.topics,
    )

    const cognitiveDisplayValue = extractBloomsLevel(
      cognitiveLevel,
      metadata.blooms.cognitive,
    )

    const complexItemSet = complexItemSetId
      ? {
          href: `/set/${complexItemSetId}`,
          title: complexItemSetOptions?.find(c => c.value === complexItemSetId)
            ?.label,
        }
      : null

    return {
      metadata: [
        { label: 'topic', value: topics.topics },
        { label: 'subtopic', value: topics.subtopics },
        // question type: how do we know that data ?? what if it's more than one?
        { label: "bloom's level", value: cognitiveDisplayValue },
        ...(showAuthor
          ? [{ label: 'author', value: question?.author?.displayName }]
          : []),
        {
          label: 'published date',
          type: 'date', // let the ui handle the format if type === 'date'
          value: publicationDate,
        },
      ],
      content: parsedContent,
      status: renderStatus({ ...latestVersion, rejected }),
      heAssigned: showAssigned && heAssigned,
      href:
        testMode && latestVersion.published
          ? `/question/${id}/test`
          : `/question/${id}`,
      id,
      courses,
      state: { relatedQuestionIds },
      complexItemSet,
    }
  })
}

const setSafeHTML = (selector, html, timeout) => {
  const element = document.querySelector(selector)
  if (!element) return

  const writeOnElement = () =>
    element && typeof html === 'string'
      ? (element.innerHTML = html)
      : (element.innerHTML = '')

  typeof timeout !== 'number'
    ? writeOnElement()
    : setTimeout(writeOnElement, timeout)
}

const safeIndex = (index, direction, list, min = 0) => {
  let finalIndex
  const max = list.length - 1

  const options = {
    down: () => (index > max ? (finalIndex = min) : (finalIndex = index)),
    up: () => (index < min ? (finalIndex = max) : (finalIndex = index)),
    'up-stop': () => (index < min ? (finalIndex = min) : (finalIndex = index)),
    'down-stop': () =>
      index > max ? (finalIndex = max) : (finalIndex = index),
  }

  safeCall(options[direction])
  return finalIndex
}

const isFunction = cb => typeof cb === 'function'

const safeCall = (cb, fb) => (isFunction(cb) ? cb() : isFunction(fb) && fb())

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

const conditionalWord = (cased, options) => {
  const text = () =>
    options.condition() ? options.wordOnTrue : options.wordOnFalse

  if (!cased) return text()

  const caseMode = {
    capital: () => capitalize(text()),
    upper: () => text().toUpperCase(),
    lower: () => text().toLowerCase(),
  }

  return safeCall(caseMode[cased], text)
}

/* callOn() DESCRIPTION:
- uses strategy pattern to safely execute a callback (if exists) defined on the 'options' object
 and returns its reference.
 - the 'key' must be a string thst matches one of the 'options' keys
 if not, the 'fallback' wll be returned
 - in case that we not pass a value for fallback, or the value we pass is not (or not returns) a function ref,
 it will return a ref to a default function that returns null
 - USAGE: if we have a dynamic string, for example the typeof some data,
 it can be implemented like this:
    callOn(typeof data, {
       string: () =>  console.log('is string'),
       number: () =>  console.log('is number'),
       object: somefunctionReference
      }, () => console.log('not valid type of data'))(arguments)
*/

const callOn = (key = '', options = {}, fallback = () => null) => {
  // eslint-disable-next-line no-nested-ternary
  return isFunction(options[key])
    ? options[key]
    : isFunction(fallback)
    ? fallback
    : () => null
}

export {
  extractDocumentText,
  extractTopicsAndSubtopics,
  extractCourseAndObjectives,
  extractBloomsLevel,
  extractComplexItemSet,
  extractAPCourseMetadata,
  extractIBCourseMetadata,
  extractIntroBioCourseMetadata,
  flatAAMCMetadata,
  flatAPCoursesMetadata,
  flatIBCourseMetadata,
  flatIntroBioCourseMetadata,
  flatVisionAndChangeMetadata,
  objectCleaner,
  profileOptions,
  questionDataMapper,
  questionDataTransformer,
  questionTypes,
  dashboardDataMapper,
  setSafeHTML,
  isFunction,
  safeCall,
  capitalize,
  conditionalWord,
  safeIndex,
  callOn,
}
