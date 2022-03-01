import React, { useState } from 'react'
import { QuestionList, Button } from 'ui'
import { lorem } from 'faker'
import { uuid } from '@coko/client'
import styled from 'styled-components'
import { createData } from '../_helpers'

const makeData = n =>
  createData(n, i => ({
    id: uuid(),
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
    status: ['Published', 'Submitted', 'Under review', 'Rejected'][
      Math.floor(Math.random() * 4)
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

const Wrapper = styled.div`
  height: 70vh;
`

export const Base = args => {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState(makeData(5))

  const handlePageChange = p => {
    setData(makeData(5))
    setCurrentPage(p)
  }

  return (
    <QuestionList
      {...args}
      currentPage={currentPage}
      onPageChange={handlePageChange}
      questions={data}
      questionsPerPage={5}
      sortOptions={sortOptions}
    />
  )
}

export const SelectableRows = () => {
  const BulkAction = () => {
    return (
      // eslint-disable-next-line no-console
      <Button onClick={() => console.log('bulk action')} type="primary">
        Assign handling editor
      </Button>
    )
  }

  const [currentPage, setCurrentPage] = useState(1)

  return (
    <Wrapper>
      <QuestionList
        bulkAction={BulkAction}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        questions={makeData(11)}
        questionsPerPage={5}
        showRowCheckboxes
        sortOptions={sortOptions}
        totalCount={13}
      />
    </Wrapper>
  )
}

export default {
  component: QuestionList,
  title: 'Common/QuestionList',
}
