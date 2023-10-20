import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { name } from 'faker'
import { SearchFiltered } from 'ui'

// UTILS
const data = [
  {
    metadata: [
      {
        label: 'topic',
        value: 'Genetics',
      },
      {
        label: 'subtopic',
        value: 'Mutations',
      },
      {
        label: "bloom's level",
        value: 'Create',
      },
      {
        label: 'author',
        value: name.findName(),
      },
      {
        label: 'published date',
        type: 'date',
        value: '2022-05-22T22:01:58.786Z',
      },
    ],
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
              text: 'question about genetics',
            },
          ],
        },
      ],
    },
    status: null,
    href: '/question/d318715a-0f1c-4052-ba7e-a7832c118a58/test',
    id: 'd318715a-0f1c-4052-ba7e-a7832c118a58',
    courses: [
      {
        course: {
          label: 'AP Environmental Science',
        },
        label: 'learning objectives',
        objectives: [
          {
            label:
              'STB-2.C Describe thermal inversion and its relationship with pollution.',
          },
        ],
      },
    ],
    state: {
      relatedQuestionIds: [
        'd318715a-0f1c-4052-ba7e-a7832c118a58',
        '76c0dc4a-e77e-4812-9d8f-d090fb8fdf3f',
      ],
    },
    complexItemSet: null,
  },
  {
    metadata: [
      {
        label: 'topic',
        value: 'Ecology',
      },
      {
        label: 'subtopic',
        value: 'Mutations',
      },
      {
        label: "bloom's level",
        value: 'Create',
      },
      {
        label: 'author',
        value: name.findName(),
      },
      {
        label: 'published date',
        type: 'date',
        value: '2023-08-02T22:01:58.786Z',
      },
    ],
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
              text: 'this is true? 2222 aaaa',
            },
          ],
        },
      ],
    },
    status: null,
    href: '/question/d318715a-0f1c-4052-ba7e-a7832c118a58/test',
    id: 'd318715a-0f1c-4052-ba7e-a7832c118a58',
    courses: [
      {
        course: {
          label: 'AP Environmental Science',
        },
        label: 'learning objectives',
        objectives: [
          {
            label:
              'STB-2.C Describe thermal inversion and its relationship with pollution.',
          },
        ],
      },
    ],
    state: {
      relatedQuestionIds: [
        'd318715a-0f1c-4052-ba7e-a7832c118a58',
        '76c0dc4a-e77e-4812-9d8f-d090fb8fdf3f',
      ],
    },
    complexItemSet: null,
  },
  {
    metadata: [
      {
        label: 'topic',
        value: 'Evolution',
      },
      {
        label: 'subtopic',
        value: 'Mutations',
      },
      {
        label: "bloom's level",
        value: 'Create',
      },
      {
        label: 'author',
        value: name.findName(),
      },
      {
        label: 'published date',
        type: 'date',
        value: '2018-11-02T22:03:58.786Z',
      },
    ],
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
              text: 'Some random question about something interesting',
            },
          ],
        },
      ],
    },
    status: null,
    href: '/question/d318715a-0f1c-4052-ba7e-a7832c118a58/test',
    id: 'd318715a-0f1c-4052-ba7e-a7832c118a58',
    courses: [
      {
        course: {
          label: 'AP Environmental Science',
        },
        label: 'learning objectives',
        objectives: [
          {
            label:
              'STB-2.C Describe thermal inversion and its relationship with pollution.',
          },
        ],
      },
    ],
    state: {
      relatedQuestionIds: [
        'd318715a-0f1c-4052-ba7e-a7832c118a58',
        '76c0dc4a-e77e-4812-9d8f-d090fb8fdf3f',
      ],
    },
    complexItemSet: null,
  },
  {
    metadata: [
      {
        label: 'topic',
        value: 'Genetics',
      },
      {
        label: 'subtopic',
        value: 'Mutations',
      },
      {
        label: "bloom's level",
        value: 'Create',
      },
      {
        label: 'author',
        value: name.findName(),
      },
      {
        label: 'published date',
        type: 'date',
        value: '2022-03-15T22:01:58.786Z',
      },
    ],
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
              text: 'this is true? 2222 aaaa',
            },
          ],
        },
      ],
    },
    status: null,
    href: '/question/d318715a-0f1c-4052-ba7e-a7832c118a58/test',
    id: 'd318715a-0f1c-4052-ba7e-a7832c118a58',
    courses: [
      {
        course: {
          label: 'AP Environmental Science',
        },
        label: 'learning objectives',
        objectives: [
          {
            label:
              'STB-2.C Describe thermal inversion and its relationship with pollution.',
          },
        ],
      },
    ],
    state: {
      relatedQuestionIds: [
        'd318715a-0f1c-4052-ba7e-a7832c118a58',
        '76c0dc4a-e77e-4812-9d8f-d090fb8fdf3f',
      ],
    },
    complexItemSet: null,
  },
]

const formatedData = questions =>
  questions.map((_, i) => {
    return {
      author: questions[i].metadata[3].value,
      topic: questions[i].metadata[0].value,
      question: questions[i].content.content[0].content[0].text,
      date: formatedDate(questions[i].metadata[4].value),
    }
  })

const formatedDate = input => {
  const date = new Date(input)

  const options = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }

  return new Intl.DateTimeFormat('en-US', options).format(date)
}

const avaiableFilters = [
  {
    key: { label: 'status', value: 'status' },
    values: [
      {
        label: 'submitted',
        value: 'submitted',
      },
      {
        label: 'published',
        value: 'published',
      },
    ],
  },
  {
    key: { label: 'Assigned to HE', value: 'heAssigned' },
    values: [
      {
        label: 'Is',
        value: true,
      },
      {
        label: 'Is not',
        value: false,
      },
    ],
  },
]
// end UTILS

const Question = ({ question }) => (
  <div>
    <p>
      <strong>Author:</strong> {question.author}
    </p>
    <p>
      <strong>Topic:</strong> {question.topic}
    </p>
    <p>
      <strong>Question:</strong> {question.question}
    </p>
    <p>
      <strong>Date:</strong> {question.date}
    </p>
    <p>------------</p>
  </div>
)

export const Base = ({ withFilters, searchOnChange }) => {
  const [dataToRender, setDataToRender] = useState(formatedData(data))

  const handleSearch = ({ query, filter }) => {
    if (query) {
      const filteredData = filter
        ? formatedData(data).filter(item => item[filter].includes(query))
        : formatedData(data)

      setDataToRender(filteredData.length > 0 ? filteredData : [])
    } else setDataToRender(formatedData(data))
  }

  return (
    <>
      <SearchFiltered
        filters={avaiableFilters}
        onSearch={handleSearch}
        searchOnChange={searchOnChange}
        withFilters={withFilters}
      />
      {dataToRender.map((item, i) => (
        <Question key={`k${i * 34}`} question={item} />
      ))}
    </>
  )
}

Question.defaultProps = {
  question: {},
}
Question.propTypes = {
  question: PropTypes.shape({
    author: PropTypes.string,
    topic: PropTypes.string,
    question: PropTypes.string,
    date: PropTypes.string,
  }),
}
Base.defaultProps = {
  withFilters: true,
  searchOnChange: false,
}
Base.propTypes = {
  withFilters: PropTypes.bool,
  searchOnChange: PropTypes.bool,
}
export default {
  component: Base,
  title: 'Common/SearchFiltered',
}
