/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { QuestionItem } from 'ui'
import {
  generateMetadata,
  getRandomStatus,
  questionContentExample3,
  getRandomCourse,
  getRandomObjectivesForCourse,
  generateComplexItemSet,
} from '../../app/utilities/question/_utils'

const meta = generateMetadata()

const courses = []
const nrOfCourses = Math.floor(Math.random() * 2 + 1) // 1-2

const previousCourses = []

for (let i = 0; i < nrOfCourses; i += 1) {
  const course = getRandomCourse(previousCourses)
  const objectives = getRandomObjectivesForCourse(course)
  previousCourses.push(course)
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
    complexItemSet={generateComplexItemSet()}
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
      options: [
        'Not Submitted',
        'Submitted',
        'Under Review',
        'In Production',
        'Rejected',
        'Published',
      ],
    },
  },
}
