/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import { QuestionItem } from 'ui'
import {
  generateMetadata,
  getRandomStatus,
  questionContentExample3,
  getRandomCourse,
  getRandomObjectivesForCourse,
} from '../_utilities'

const meta = generateMetadata()

const courses = []
const nrOfCourses = Math.floor(Math.random() * 2 + 1) // 1-3

for (let i = 0; i < nrOfCourses; i += 1) {
  const course = getRandomCourse()
  const objectives = getRandomObjectivesForCourse(course)
  courses.push({
    course,
    objectives: objectives.list,
    label: objectives.label,
  })
}

export const Base = args => (
  <QuestionItem
    status={getRandomStatus()}
    {...args}
    content={questionContentExample3}
    courses={courses}
    metadata={meta}
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
