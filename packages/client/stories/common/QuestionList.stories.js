/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { QuestionList, Button } from 'ui'
import { lorem } from 'faker'
import { uuid } from '@coko/client'
import styled from 'styled-components'
import { createData } from '../_helpers'
import {
  generateMetadata,
  getRandomCourse,
  getRandomObjectivesForCourse,
  getRandomStatus,
} from '../_utilities'

const courseData = () => {
  const courses = []
  const nrOfCourses = Math.floor(Math.random() * 2 + 1) // 1-2
  const previousCourses = []

  for (let i = 0; i < nrOfCourses; i += 1) {
    const course = getRandomCourse(previousCourses)
    previousCourses.push(course)
    const objectives = getRandomObjectivesForCourse(course)
    courses.push({
      course,
      objectives: objectives.list,
      label: objectives.label,
    })
  }

  return courses
}

const makeData = n =>
  createData(n, i => ({
    id: uuid(),
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
    metadata: generateMetadata(),
    courses: courseData(),
    status: getRandomStatus(),
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

  const { showRowCheckboxes } = args

  return (
    <Wrapper>
      <QuestionList
        {...args}
        bulkAction={showRowCheckboxes ? BulkAction : undefined}
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

export default {
  component: QuestionList,
  title: 'Common/QuestionList',
}
