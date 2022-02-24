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
  height: 80vh;
`

export const Base = args => {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState(makeData(5))

  const handlePageChange = p => {
    setData(makeData(5))
    setCurrentPage(p)
  }

  const BulkAction = (
    // eslint-disable-next-line no-console
    <Button onClick={() => console.log('bulk action')} type="primary">
      Assign handling editor
    </Button>
  )

  return (
    <Wrapper>
      <QuestionList
        {...args}
        bulkAction={BulkAction}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        questions={data}
        sortOptions={sortOptions}
      />
    </Wrapper>
  )
}

Base.args = {
  totalCount: 15,
  showRowCheckboxes: true,
  questionsPerPage: 5,
}

export const SelectableRows = () => {
  const bulkAction = items => {
    // eslint-disable-next-line no-console
    console.log(items)
  }

  return (
    <Wrapper>
      <QuestionList
        bulkAction={bulkAction}
        questions={makeData(9)}
        questionSelection
        questionsPerPage={5}
        sortOptions={sortOptions}
        totalCount={9}
      />
    </Wrapper>
  )
}

export default {
  component: QuestionList,
  title: 'Common/QuestionList',
}
