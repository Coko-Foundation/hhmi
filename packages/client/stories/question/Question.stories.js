/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import styled from 'styled-components'
import { lorem } from 'faker'

import { th } from '@coko/client'

import { Question, metadata, resources } from 'ui'
import {
  flatAPCoursesMetadata,
  flatIBCourseMetadata,
  flatVisionAndChangeMetadata,
  flatAAMCMetadata,
} from '../../app/utilities'

const Wrapper = styled.div`
  border: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  height: 800px;
`

const options = {
  // topic: 'biochemistryMolecularBiology',
}

const initialValues = {
  topic: 'biochemistryMolecularBiology',
  subtopic: 'generalChemistry',
  framework: 'apEnvironmentalScience',
  supplementaryTopics: [
    {
      topic: 'cellBiology',
      subtopic: 'cellStructureFunction',
      unit: 'populations',
      courseTopic: 'carryingCapacity',
      learningObjective: 'ERT-3.E',
      essentialKnowledge: 'ERT-3.E.1',
    },
  ],
  keywords: ['test', 'test2'],
  biointeractiveResources: [
    'aTPSynthesis',
    'bCR-ABL',
    'bCR-ABL:ProteinStructureAndFunction',
  ],
  cognitiveLevel: 'higher-understand',
  affectiveLevel: 'responding',
  psychomotorLevel: 'perceptualAbilities',
  unit: 'theLivingWorldBiodiversity',
  courseTopic: 'ecosystemServices',
  learningObjective: 'ERT-2.C',
  essentialKnowledge: 'ERT-2.C.1',
}

const content = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: lorem.sentences(130),
        },
      ],
    },
  ],
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
  topics: metadata.topics,
  blooms: metadata.blooms,
  frameworks,
  introToBioMeta,
}

export const Base = args => {
  const [submitted, setSubmitted] = useState(false)

  const emptyNavigationFunction = e => {
    e.preventDefault()
    console.log('link clicked')
  }

  const onSubmit = data => {
    console.log(data)
    setSubmitted(true)
  }

  return (
    <Wrapper>
      <Question
        {...args}
        editorContent={content}
        initialMetadataValues={options}
        isSubmitted={submitted}
        loading={false}
        metadata={flatMeta}
        onClickBackButton={emptyNavigationFunction}
        onClickNextButton={emptyNavigationFunction}
        onClickPreviousButton={emptyNavigationFunction}
        onEditorContentAutoSave={() => console.log('editor content auto save')}
        onMetadataAutoSave={() => console.log('metadata auto save')}
        onQuestionSubmit={onSubmit}
        questionAgreedTc={false}
        resources={resources}
        submitting={false}
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

  return (
    <Question
      editorContent={content}
      editorView
      initialMetadataValues={initialValues}
      isSubmitted
      loading={false}
      metadata={flatMeta}
      onClickBackButton={() => console.log('go back to dashboard')}
      onEditorContentAutoSave={() => console.log('editor content auto save')}
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
  )
}

export default {
  component: Question,
  title: 'Question/Question',
}
