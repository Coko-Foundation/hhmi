import React from 'react'
import { QuestionList } from 'ui'
import { lorem } from 'faker'
import { createData } from '../_helpers'

const makeData = n =>
  createData(n, i => ({
    title: lorem.words(6),
    description: lorem.sentences(8),
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
  }))

const sortOptions = [
  {
    label: 'Date',
    value: 'date',
    isDefault: true,
  },
  {
    label: 'Unit',
    value: 'unit',
  },
  {
    label: 'Section',
    value: 'section',
  },
  {
    label: 'Topic',
    value: 'topic',
  },
  {
    label: 'Category',
    value: 'category',
  },
]

export const Base = () => {
  return <QuestionList questions={makeData(7)} sortOptions={sortOptions} />
}

export const WithPagination = () => {
  return (
    <QuestionList
      questions={makeData(13)}
      questionsPerPage={5}
      sortOptions={sortOptions}
    />
  )
}

export const NoSearch = () => {
  return (
    <QuestionList
      questions={makeData(13)}
      questionsPerPage={5}
      showSearch={false}
      sortOptions={sortOptions}
    />
  )
}

export const JustTheList = () => {
  return (
    <QuestionList
      questions={makeData(5)}
      showSearch={false}
      showSort={false}
      showTotalCount={false}
    />
  )
}

export default {
  component: QuestionList,
  title: 'Common/QuestionList',
}
