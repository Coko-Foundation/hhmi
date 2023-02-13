import { name } from 'faker'
import {
  topics as topicsMetadata,
  frameworks as frameworksMeta,
} from './question/_helpers/metadataValues'
import flatMetadataValues from './question/_helpers/flatMetadataValues'
import { flatAPCoursesMetadata, flatIBCourseMetadata } from '../app/utilities'

const generateMetadata = () => {
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

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const randomTopic =
    topicsMetadata[Math.floor(Math.random() * topicsMetadata.length)]

  const randomSubtopic =
    randomTopic.subtopics[
      Math.floor(Math.random() * randomTopic.subtopics.length)
    ]

  const randomTopic2 =
    topicsMetadata[Math.floor(Math.random() * topicsMetadata.length)]

  const randomSubtopic2 =
    randomTopic2.subtopics[
      Math.floor(Math.random() * randomTopic2.subtopics.length)
    ]

  const randomQuestionType =
    questionTypes[Math.floor(Math.random() * questionTypes.length)]

  const randomBloomLevel =
    flatMetadataValues.blooms.cognitive[
      Math.floor(Math.random() * flatMetadataValues.blooms.cognitive.length)
    ]

  const randomDate = () => {
    const start = new Date(2022, 4, 1)
    const end = new Date()
    const date = new Date(+start + Math.random() * (end - start))

    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }

  return [
    {
      label: 'topic',
      value: `${randomTopic.label}, ${randomTopic2.label}`,
    },
    {
      label: 'subtopic',
      value: `${randomSubtopic.label}, ${randomSubtopic2.label}`,
    },
    {
      label: 'question type',
      value: randomQuestionType.label,
    },
    {
      label: "bloom's level",
      value: randomBloomLevel.label,
    },
    {
      label: 'author',
      value: name.findName(),
    },
    {
      label: 'published date',
      value: randomDate(),
    },
  ]
}

const getRandomLearningObjective = () => {
  const randomAPCourse = frameworksMeta[Math.floor(Math.random() * 2)]
  const flatMetadata = flatAPCoursesMetadata(randomAPCourse)
  return flatMetadata.learningObjectives[
    Math.floor(Math.random() * flatMetadata.learningObjectives.length)
  ]
}

const getRandomUnderstanding = () => {
  const randomIBCourse = frameworksMeta[Math.floor(2 + Math.random() * 2)]
  const flatMetadata = flatIBCourseMetadata(randomIBCourse)
  return flatMetadata.understandings[
    Math.floor(Math.random() * flatMetadata.understandings.length)
  ]
}

const learningObjectivesAndUnderstandings = () => {
  const total = Math.floor(Math.random() * 4) + 1
  const numberOfLOs = Math.floor(Math.random() * total)
  const numberOfUs = total - numberOfLOs

  const learningObjectives = []
  const understandings = []

  for (let i = 0; i < numberOfLOs; i += 1) {
    learningObjectives.push(getRandomLearningObjective().label)
  }

  for (let i = 0; i < numberOfUs; i += 1) {
    understandings.push(getRandomUnderstanding().label)
  }

  return {
    learningObjectives,
    understandings,
  }
}

const getRandomCourseWithLearningObjectives = () => {
  let flatMetadata
  return flatMetadata.understandings[
    Math.floor(Math.random() * flatMetadata.understandings.length)
  ]
}

const getRandomCourse = except => {
  return frameworksMeta.filter(f => !except.find(e => e.value === f.value))[
    Math.floor(Math.random() * (4 - except.length))
  ]
}

const getRandomObjectivesForCourse = course => {
  let flatMetadata

  if (
    course.value === 'apBiology' ||
    course.value === 'apEnvironmentalScience'
  ) {
    flatMetadata = flatAPCoursesMetadata(course)
    const objectives = []
    const nrOfObjectives = Math.floor(Math.random() * 2 + 1)

    for (let i = 0; i < nrOfObjectives; i += 1) {
      objectives.push(
        flatMetadata.learningObjectives[
          Math.floor(Math.random() * flatMetadata.learningObjectives.length)
        ],
      )
    }

    return { list: objectives, label: 'Learning Objectives' }
  }

  if (
    course.value === 'biBiology' ||
    course.value === 'biEnvironmentalScience'
  ) {
    flatMetadata = flatIBCourseMetadata(course)
    const objectives = []
    const nrOfObjectives = Math.floor(Math.random() * 2 + 1)

    for (let i = 0; i < nrOfObjectives; i += 1) {
      objectives.push(
        flatMetadata.understandings[
          Math.floor(Math.random() * flatMetadata.understandings.length)
        ],
      )
    }

    return { list: objectives, label: 'Understandings' }
  }

  return null
}

const getRandomStatus = () =>
  [
    'Not Submitted',
    'Submitted',
    'Under Review',
    'In Production',
    'Rejected',
    'Published',
  ][Math.floor(Math.random() * 4)]

const questionContentExample = {
  type: 'true_false_container',
  attrs: {
    id: 'd2c7e30d-5467-43c9-bff7-d65d8dec1974',
    class: 'true-false',
  },
  content: [
    {
      type: 'question_node_true_false',
      attrs: {
        id: '3396aa04-acb6-450d-99ec-a1ec06bd7a61',
        class: 'true-false-question',
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
              text: 'Does the question look good in the dashboard? (adding some more text here, since we don’t know yet which text will be displayed in the dashboard/discover page, the one in the question body, or the context the we gave above it. I hope this much text is enough for the test we want to make.)',
            },
          ],
        },
      ],
    },
    {
      type: 'true_false',
      attrs: {
        class: 'true-false-option',
        id: '3fec656e-7880-43c5-a532-7dc05531a128',
        correct: false,
        answer: false,
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
              text: 'Question looks great, don’t need to worry about it',
            },
          ],
        },
      ],
    },
    {
      type: 'true_false',
      attrs: {
        class: 'true-false-option',
        id: '9884b720-dd0b-4804-8e10-3a8b392f52fc',
        correct: false,
        answer: false,
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
              text: 'Question looks terrible, go back and style it differently',
            },
          ],
        },
      ],
    },
    {
      type: 'true_false',
      attrs: {
        class: 'true-false-option',
        id: '60806815-bdc1-4e1e-8878-63185847bb5d',
        correct: true,
        answer: false,
        feedback:
          'Since we are setting the correct answers before actually testing how it looks, this is the only reasonable answer to mark as true. Maybe the user will disagree with us, but this is not up to them to decide.',
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
              text: 'Beauty is in the eyes of the beholder',
            },
          ],
        },
      ],
    },
  ],
}

const questionContentExample2 = {
  type: 'multiple_choice_single_correct_container',
  attrs: {
    id: 'a3c2fe97-4a16-4dd7-b924-ac7614323f78',
    class: 'multiple-choice-single-correct',
    correctId: '',
  },
  content: [
    {
      type: 'question_node_multiple_single',
      attrs: {
        id: '50d77ca0-87b9-49b7-b1db-5eea23e00206',
        class: 'multiple-choice-question-single',
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
              text: 'Under what circumstances does coral bleaching occur?',
            },
          ],
        },
      ],
    },
    {
      type: 'multiple_choice_single_correct',
      attrs: {
        class: 'multiple-choice-option-single-correct',
        id: '842fa93b-3679-4671-8a42-b604c245a7ea',
        correct: false,
        answer: false,
        feedback:
          'Stressful environmental conditions — such as sudden or prolonged changes in temperature, sunlight, or oxygen — can disrupt the symbiosis between the corals and their algae. Corals may then force the algae out of their cells in a process called coral bleaching. Since the algae give corals their color, corals turn white after bleaching.',
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
              text: 'Stressful environmental conditions',
            },
          ],
        },
      ],
    },
    {
      type: 'multiple_choice_single_correct',
      attrs: {
        class: 'multiple-choice-option-single-correct',
        id: '89ce42d0-f370-403c-836c-ef1da9d335b7',
        correct: false,
        answer: false,
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
              text: 'Presence of underwater predators',
            },
          ],
        },
      ],
    },
    {
      type: 'multiple_choice_single_correct',
      attrs: {
        class: 'multiple-choice-option-single-correct',
        id: 'e1311759-16cd-4a18-a48b-927721f8414f',
        correct: false,
        answer: false,
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
              text: 'Mercury in retrograde',
            },
          ],
        },
      ],
    },
  ],
}

const questionContentExample3 = {
  type: 'paragraph',
  attrs: {
    class: 'paragraph',
  },
  content: [
    {
      type: 'text',
      text: 'Figures a and c show two different species of corals from a reef off the Caribbean coast of Panama. Parts of both corals have undergone bleaching, which is indicated by the arrows pointing to the white areas.',
    },
  ],
}

export {
  generateMetadata,
  getRandomLearningObjective,
  getRandomUnderstanding,
  learningObjectivesAndUnderstandings,
  getRandomCourseWithLearningObjectives,
  getRandomCourse,
  getRandomObjectivesForCourse,
  getRandomStatus,
  questionContentExample,
  questionContentExample2,
  questionContentExample3,
}
