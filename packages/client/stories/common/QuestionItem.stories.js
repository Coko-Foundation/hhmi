import React from 'react'
import { lorem } from 'faker'

import { QuestionItem } from 'ui'

const meta = [
  {
    label: 'unit',
    value: lorem.words(2),
  },
  {
    label: 'section',
    value: lorem.words(2),
  },
  {
    label: 'topic',
    value: lorem.words(2),
  },
  {
    label: 'category',
    value: lorem.words(2),
  },
  {
    label: 'published date',
    value: lorem.words(2),
  },
]

export const Base = args => (
  <QuestionItem
    {...args}
    content={lorem.sentences(8)}
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
