import React, { useState } from 'react'
import { ComplexItemSet } from 'ui'
import { lorem } from 'faker'
import styled from 'styled-components'
import { uuid } from '@coko/client'
import { createData } from '../../app/utilities/_helpers'
import { complexItemLeadingContent } from '../../app/utilities/question/initialValues'
import {
  generateMetadata,
  getRandomCourse,
  getRandomObjectivesForCourse,
} from '../../app/utilities/question/_utils'

const Wrapper = styled.div`
  height: 70vh;
`

const generateCoursesForQuestion = () => {
  const courses = []
  const nrOfCourses = Math.floor(Math.random() * 3 + 1) // 1-2

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
    metadata: generateMetadata(),
    courses: generateCoursesForQuestion(),
    href: '#',
  }))

export const Base = args => {
  const [submissionMessage, setSubmissionMessage] = useState(null)
  const [submissionStatus, setSubmissionStatus] = useState(null)

  const handleSave = data => {
    // eslint-disable-next-line no-console
    console.log(data)
    setTimeout(() => {
      setSubmissionMessage('Saved')
      setSubmissionStatus('success')
    }, [1000])
  }

  return (
    <Wrapper>
      <ComplexItemSet
        canEdit
        id={uuid()}
        leadingContent={complexItemLeadingContent}
        onSave={handleSave}
        questions={makeData(5)}
        submissionMessage={submissionMessage}
        submissionStatus={submissionStatus}
        title="Complex item set 1"
        {...args}
      />
    </Wrapper>
  )
}

export default {
  title: 'Question/ComplexItemSet',
  component: ComplexItemSet,
}
