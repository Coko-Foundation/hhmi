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
} from '../../app/utilities'

import { editorInitialContent, initialMetadataValues } from '../_utilities'

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
  const [editorContent, setEditorContent] = useState(initialContent)

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

  const handleEditorContentChanged = newContent => {
    // save content
    console.log(newContent)
  }

  return (
    <Question
      editorContent={editorInitialContent}
      editorView
      initialMetadataValues={initialMetadataValues}
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
  )
}

export default {
  component: Question,
  title: 'Question/Question',
}
