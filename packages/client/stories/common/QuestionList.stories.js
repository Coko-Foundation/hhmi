/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { QuestionList, Button } from 'ui'
import { lorem } from 'faker'
import { uuid } from '@coko/client'
import styled from 'styled-components'
import { createData } from '../../app/utilities/_helpers'
import {
  generateMetadata,
  getRandomCourse,
  getRandomObjectivesForCourse,
  getRandomStatus,
} from '../../app/utilities/question/_utils'

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

  const handleDragEnd = result => {
    const { destination, source /* draggableId */ } = result

    // check if no destination, or if no rearrangement happened
    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return

    // reorder the elements (depends on how we want to persist data, this is just a demo)
    const newDataSource = [...data]
    const draggedElement = newDataSource.splice(source.index, 1)
    newDataSource.splice(destination.index, 0, ...draggedElement)

    setData(newDataSource)
  }

  const { showRowCheckboxes, draggable } = args

  return (
    <Wrapper>
      <QuestionList
        {...args}
        bulkAction={showRowCheckboxes ? BulkAction : undefined}
        currentPage={currentPage}
        onDragEnd={draggable ? handleDragEnd : null}
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
