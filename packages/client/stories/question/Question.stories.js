/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import styled from 'styled-components'

import { th } from '@coko/client'

import { Question, metadata, resources } from 'ui'
import {
  flatAPCoursesMetadata,
  flatIBCourseMetadata,
  flatVisionAndChangeMetadata,
  flatAAMCMetadata,
  questionTypes,
} from '../../app/utilities'

const Wrapper = styled.div`
  border: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  height: 800px;
`

const initialContent = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Initial value: simple paragraph. Type your question content here. Go to Editor View story for more complex initial value',
        },
      ],
    },
  ],
}

const editorInitialContent = {
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
          text: 'test test 1234',
        },
      ],
    },
    {
      type: 'multiple_choice_container',
      attrs: {
        id: '8fbb4bf0-dc85-4d5c-b07c-78ce9ff3066b',
        class: 'multiple-choice',
      },
      content: [
        {
          type: 'question_node_multiple',
          attrs: {
            class: 'multiple-choice-question',
            id: '5a5659c1-6c0a-48c2-93f9-7588d2728083',
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
                  text: 'check the true ones',
                },
              ],
            },
          ],
        },
        {
          type: 'multiple_choice',
          attrs: {
            class: 'multiple-choice-option',
            id: 'c5a851e9-70a4-4857-bfc9-9be5e1e1fcc2',
            correct: true,
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
                  text: 'true',
                },
              ],
            },
          ],
        },
        {
          type: 'multiple_choice',
          attrs: {
            class: 'multiple-choice-option',
            id: 'a64ed837-186a-42cc-8085-a98f8a91eec5',
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
                  text: 'false',
                },
              ],
            },
          ],
        },
        {
          type: 'multiple_choice',
          attrs: {
            class: 'multiple-choice-option',
            id: '6eb402e1-76fe-4f71-84fc-cfa2f80fb957',
            correct: true,
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
                  text: 'also true',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

const initialMetadataValues = {
  topics: [
    {
      topic: 'genetics',
      subtopic: 'patternsOfInheritance',
    },
    {
      topic: 'cellBiology',
      subtopic: 'cellStructureFunction',
    },
  ],
  courses: [
    {
      course: 'apEnvironmentalScience',
      units: [
        {
          unit: 'populations',
          courseTopic: 'generalistAndSpecialistSpecies',
          learningObjective: 'ERT-3.A',
          essentialKnowledge: 'ERT-3.A.1',
        },
        {
          unit: 'theLivingWorldEcosystems',
          courseTopic: 'terrestrialBiomes',
          learningObjective: 'ERT-1.B',
          essentialKnowledge: 'ERT-1.B.2',
        },
      ],
    },
    {
      course: 'biEnvironmentalScience',
      units: [
        {
          unit: 'ecosystemsAndEcology',
          courseTopic: 'communitiesAndEcosystems',
          application: 'IBES-A2.2.3',
          understanding: 'IBES-U2.2.4',
        },
      ],
    },
  ],
  biointeractiveResources: [
    'biochemistryAndCellSignalingPathwayOfTheMc1rGene',
    'cysticFibrosisMechanismAndTreatment',
  ],
  cognitiveLevel: 'higher-understand',
}

const frameworks = metadata.frameworks.map(framework => {
  const frameworkData = {
    label: framework.label,
    value: framework.value,
  }

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

const flatMeta = {
  questionTypes,
  topics: metadata.topics,
  blooms: metadata.blooms,
  frameworks,
  introToBioMeta,
}

const metadataApiToUi = values => {
  const courseData = [...values.courses]

  const transformedCoursesData = []

  courseData.forEach(({ course, units }) => {
    if (units.length > 1) {
      units.forEach(unit => {
        transformedCoursesData.push({
          course,
          ...unit,
        })
      })
    } else {
      transformedCoursesData.push({
        course,
        ...units[0],
      })
    }
  })

  return {
    ...values,
    courses: transformedCoursesData,
  }
}

export const Base = args => {
  const [submitted, setSubmitted] = useState(false)
  const [editorContent, setEditorContent] = useState(initialContent)
  const [lastUpdated, setLastUpdated] = useState(new Date().toISOString())

  const emptyNavigationFunction = e => {
    e.preventDefault()
    console.log('link clicked')
  }

  const onSubmit = data => {
    console.log(data)

    const editorState = {
      type: 'doc',
      content: JSON.parse(JSON.stringify(data.editorContent)),
    }

    setEditorContent(editorState)
    setSubmitted(true)
  }

  const handleEditorContentChanged = newContent => {
    // save content
    console.log(newContent)
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        setLastUpdated(new Date().toISOString())
        resolve()
      }, 1000)
    })
  }

  const handleMetadataAutosave = data => {
    // save content
    console.log(data)
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        setLastUpdated(new Date().toISOString())
        resolve()
      }, 2000)
    })
  }

  return (
    <Wrapper>
      <Question
        {...args}
        autoSaveInterval={5000}
        editorContent={editorContent}
        isSubmitted={submitted}
        loading={false}
        metadata={flatMeta}
        onClickBackButton={emptyNavigationFunction}
        onClickNextButton={emptyNavigationFunction}
        onClickPreviousButton={emptyNavigationFunction}
        onEditorContentAutoSave={handleEditorContentChanged}
        onMetadataAutoSave={handleMetadataAutosave}
        onQuestionSubmit={onSubmit}
        questionAgreedTc={false}
        resources={resources}
        submitting={false}
        updated={lastUpdated}
      />
    </Wrapper>
  )
}

export const EditorView = () => {
  const [reviewing, setReviewing] = useState(false)

  const reject = () => {
    console.log('rejected')
  }

  const publish = () => {
    console.log('publish')
  }

  const moveToReview = () => {
    setReviewing(true)
  }

  const handleEditorContentChanged = newContent => {
    // save content
    console.log(newContent)
  }

  return (
    <Wrapper>
      <Question
        editorContent={editorInitialContent}
        editorView
        initialMetadataValues={metadataApiToUi(initialMetadataValues)}
        isSubmitted
        loading={false}
        metadata={flatMeta}
        onClickBackButton={() => console.log('go back to dashboard')}
        onEditorContentAutoSave={handleEditorContentChanged}
        onMetadataAutoSave={() => console.log('metadata auto save')}
        onMoveToReview={moveToReview}
        onPublish={publish}
        onQuestionSubmit={data => console.log(data)}
        onReject={reject}
        questionAgreedTc={false}
        resources={resources}
        submitting={false}
        underReview={reviewing}
      />
    </Wrapper>
  )
}

export const TestMode = () => {
  return (
    <Wrapper>
      <Question
        editorContent={editorInitialContent}
        facultyView
        initialMetadataValues={initialMetadataValues}
        isSubmitted
        loading={false}
        metadata={flatMeta}
        onClickBackButton={() => console.log('go back to dashboard')}
        onQuestionSubmit={data => console.log(data)}
        readOnly
        resources={resources}
        submitting={false}
      />
    </Wrapper>
  )
}

export default {
  component: Question,
  title: 'Question/Question',
}
