import React from 'react'

import { BrowserRouter } from 'react-router-dom'
import { render, screen, axe, renderer } from '../../../testUtils'

import QuestionItem from '../QuestionItem'

const questionData = {
  content: {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        attrs: {
          class: 'paragraph',
        },
        content: [
          {
            type: 'text',
            text: 'Energy: carbohydrates :: structural materials: water nucleotides lipids proteins',
          },
        ],
      },
    ],
  },
  courses: [
    {
      course: {
        label: 'AP Biology',
      },
      label: 'learning objectives',
      objectives: [
        {
          label:
            'SYI-1.A Explain how the properties of water that result from its polarity and hydrogen bonding affect its biological function.',
        },
      ],
    },
  ],
  metadata: [
    {
      label: 'topic',
      value: 'Biochemistry & Molecular Biology',
    },
    {
      label: 'subtopic',
      value: 'General Chemistry',
    },
    {
      label: "bloom's level",
      value: 'Create',
    },
    {
      label: 'published date',
      value: 'December 21, 2022',
    },
  ],
  href: '/question/5d2c5fde-16cd-401d-9743-8c4311c84138/test',
  id: '5d2c5fde-16cd-401d-9743-8c4311c84138',
  status: 'Submitted',
}

const emptyQuestionData = {
  content: {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        attrs: {
          class: 'paragraph',
        },
        content: [
          {
            type: 'text',
            text: '(empty)',
          },
        ],
      },
    ],
  },
  metadata: [
    {
      label: 'topic',
      value: '',
    },
    {
      label: 'subtopic',
      value: '',
    },
    {
      label: "bloom's level",
      value: '',
    },
    {
      label: 'published date',
      value: '',
    },
  ],
  courses: [],
}

const MockQuestionItem = props => (
  <BrowserRouter>
    <QuestionItem id="1" {...props} />
  </BrowserRouter>
)

describe('QuestionItem', () => {
  it('matches snapshot', () => {
    const questionItemComponent = renderer.create(<MockQuestionItem />).toJSON()
    expect(questionItemComponent).toMatchSnapshot()
  })
  it('renders question metadata and course', () => {
    const { metadata, courses } = questionData

    render(<MockQuestionItem courses={courses} metadata={metadata} />)
    const topicValue = screen.getByTestId('topic-value').textContent
    const subtopicValue = screen.getByTestId('subtopic-value').textContent
    const bloomsLevel = screen.getByTestId("bloom's level-value").textContent
    const coursesValue = screen.getByTestId('courses')
    const expectedCourseContent = `${courses[0].course.label}: ${courses[0].label}${courses[0].objectives[0].label}`

    const publishedValue = screen.getByTestId(
      'published date-value',
    ).textContent

    expect(topicValue).toBe(metadata[0].value)
    expect(subtopicValue).toBe(metadata[1].value)
    expect(bloomsLevel).toBe(metadata[2].value)
    expect(publishedValue).toBe(metadata[3].value)
    expect(coursesValue.textContent).toBe(expectedCourseContent)
  })
  it('displays correct question status', () => {
    const { metadata, status } = questionData
    render(<MockQuestionItem metadata={metadata} status={status} />)
    const QuestionStatus = screen.getByTestId('question-status').textContent
    expect(QuestionStatus).toBe(status)
  })
  it('handles empty metadata and courses', () => {
    const { metadata } = emptyQuestionData
    render(<MockQuestionItem metadata={metadata} />)
    const topicValue = screen.getByTestId('topic-value').textContent
    const subtopicValue = screen.getByTestId('subtopic-value').textContent
    const bloomsLevel = screen.getByTestId("bloom's level-value").textContent
    const coursesValue = screen.getByTestId('courses')

    // const publishedValue = screen.getByTestId(
    //   'published date-value',
    // ).textContent

    expect(topicValue).toBe('-')
    expect(subtopicValue).toBe('-')
    expect(bloomsLevel).toBe('-')
    // expect(publishedValue).toBe('-')
    expect(coursesValue.textContent).toBe('')
  })
  it('renders with no accessibility errors', async () => {
    const { metadata, content } = questionData

    const { container } = render(
      <MockQuestionItem content={content} metadata={metadata} />,
    )

    const result = await axe(container)
    expect(result).toHaveNoViolations()
  })
})
