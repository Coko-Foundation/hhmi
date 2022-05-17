/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import styled from 'styled-components'
import { lorem } from 'faker'

import { th } from '@coko/client'

import { Question } from 'ui'

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

const emptyNavigationFunction = e => {
  e.preventDefault()
  console.log('link clicked')
}

export const Base = args => (
  <Wrapper>
    <Question
      {...args}
      editorContent={content}
      initialMetadataValues={options}
      loading={false}
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

export default {
  component: Question,
  title: 'Question/Question',
}
