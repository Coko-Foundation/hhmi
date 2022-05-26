/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { lorem } from 'faker'

import { QuestionItem } from 'ui'

const meta = [
  {
    label: 'topic',
    value: lorem.words(2),
  },
  {
    label: 'subtopic',
    value: lorem.words(2),
  },
  {
    label: 'question type',
    value: lorem.words(2),
  },
  {
    label: "boom's level",
    value: lorem.words(2),
  },
  {
    label: 'published date',
    value: lorem.words(2),
  },
]

const content = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: lorem.sentences(8),
        },
      ],
    },
  ],
}

export const Base = args => (
  <QuestionItem
    {...args}
    content={content}
    metadata={meta}
    title={lorem.words(6)}
  />
)

export default {
  component: QuestionItem,
  title: 'Common/QuestionItem',
  argTypes: {
    status: {
      control: 'select',
      options: ['Published', 'Submitted', 'Under review', 'Rejected'],
    },
  },
}
