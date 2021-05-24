import React from 'react'
import { lorem } from 'faker'

import { DashboardRow } from 'ui'

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

export const Base = () => (
  <DashboardRow
    metadata={meta}
    subtitle={lorem.sentences(8)}
    title={lorem.words(6)}
  />
)

export default {
  component: DashboardRow,
  title: 'Dashboard/Dashboard Row',
}
