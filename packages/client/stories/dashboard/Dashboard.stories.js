import React from 'react'
import { lorem } from 'faker'
import { uuid } from '@coko/client'
import { Dashboard } from 'ui'
import { createData, noop } from '../_helpers'

const makeData = n =>
  createData(n, i => ({
    title: lorem.words(6),
    content: {
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
    },
    metadata: [
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
    ],
    href: `question/${uuid()}`,
  }))

export const Base = () => (
  <Dashboard
    authorItems={makeData(5)}
    editorItems={makeData(5)}
    onClickCreateQuestion={noop}
    reviewerItems={makeData(5)}
  />
)

export default {
  component: Dashboard,
  title: 'Dashboard/Dashboard',
}
