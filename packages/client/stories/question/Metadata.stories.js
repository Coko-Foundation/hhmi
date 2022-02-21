/* eslint-disable no-console */

import React from 'react'
// import { lorem } from 'faker'

import { Metadata } from 'ui'

const options = [
  {
    label: 'Topic',
    value: 'Hello',
  },
  {
    label: 'Subtopic',
    value: 'Wordl',
  },
]

export const Base = () => (
  <Metadata
    initialValues={options}
    onFormFinish={console.log('on form finish')}
  />
)

export default {
  component: Metadata,
  title: 'Question/Metadata',
}
