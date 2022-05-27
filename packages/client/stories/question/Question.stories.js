/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { lorem } from 'faker'

import { th } from '@coko/client'

import { Question, metadata } from 'ui'
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
  topic: 'biochemistryMolecularBiology',
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

export const Base = args => {
  const [flatMetadata, setFlatMetadata] = useState(metadata)

  useEffect(() => {
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

    setFlatMetadata({
      topics: metadata.topics,
      blooms: metadata.blooms,
      frameworks,
      introToBioMeta,
    })
  }, [])

  const emptyNavigationFunction = e => {
    e.preventDefault()
    console.log('link clicked')
  }

  return (
    <Wrapper>
      <Question
        {...args}
        editorContent={content}
        initialMetadataValues={options}
        loading={false}
        metadata={flatMetadata}
        onClickBackButton={emptyNavigationFunction}
        onClickNextButton={emptyNavigationFunction}
        onClickPreviousButton={emptyNavigationFunction}
        onEditorContentAutoSave={() => console.log('editor auto save')}
        onQuestionSubmit={console.log('submit question')}
        questionAgreedTc={false}
        submitting={false}
      />
    </Wrapper>
  )
}

export default {
  component: Question,
  title: 'Question/Question',
}
