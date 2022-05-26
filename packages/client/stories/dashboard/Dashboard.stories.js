/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { lorem } from 'faker'
import { uuid } from '@coko/client'
import { Dashboard, Button } from 'ui'
import styled from 'styled-components'
import { createData } from '../_helpers'

const makeData = n =>
  createData(n, i => ({
    id: uuid(),
    title: lorem.words(6),
    description: {
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
    metadata: [
      {
        label: 'topic',
        value: lorem.words(2),
      },
      {
        label: 'subtopic',
        value: lorem.words(2),
      },
      {
        label: 'question type',
        value: lorem.words(2),
      },
      {
        label: "boom's level",
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
    href: '#',
  }))

const totalResults = 33

const Wraper = styled.div`
  /* background: linear-gradient(97.37deg, #058d96 -34.57%, #8ac341 93.86%); */
  background-color: #a5a1a2;
  height: 90vh;
`

const searchFunction = params => {
  const data = makeData(
    totalResults - 10 * (params.page - 1) > 10
      ? 10
      : totalResults - 10 * (params.page - 1),
  )

  return data
}

export const AuthorDashboard = args => {
  const [loading, setLoading] = useState(false)

  const [author, setAuthorQuestions] = useState({
    questions: [],
    totalCount: 0,
  })

  const handleSearch = async params => {
    const { query = '', page = 1, sortBy, role } = params
    // eslint-disable-next-line no-console
    console.log(`${query}, ${page}, ${sortBy}, ${role}`)

    setLoading(true)
    setTimeout(() => {
      const data = searchFunction(params)

      if (role === 'author') {
        setAuthorQuestions({ questions: data, totalCount: totalResults })
      }

      setLoading(false)
    }, 500)
  }

  const CreateQuestion = <Button type="primary">Create Question</Button>

  const tabs = [
    {
      label: 'Authored Questions',
      value: 'author',
      questions: author.questions,
      totalCount: author.totalCount,
    },
  ]

  return (
    <Wraper>
      <Dashboard
        createQuestionButton={CreateQuestion}
        loading={loading}
        onSearch={handleSearch}
        tabsContent={tabs}
        {...args}
      />
    </Wraper>
  )
}

export const EditorDashboard = args => {
  const [loading, setLoading] = useState(false)
  const [selectedQuestions, setSelectedQuestions] = useState([])

  const [author, setAuthorQuestions] = useState({
    questions: [],
    totalCount: 0,
  })

  const [editor, setEditorQuestions] = useState({
    questions: [],
    totalCount: 0,
  })

  const handleSearch = async params => {
    const { query = '', page = 1, sortBy, role } = params
    // eslint-disable-next-line no-console
    console.log(`${query}, ${page}, ${sortBy}, ${role}`)

    setLoading(true)
    setTimeout(() => {
      const data = searchFunction(params)

      if (role === 'author') {
        setAuthorQuestions({ questions: data, totalCount: totalResults })
      } else if (role === 'editor') {
        setEditorQuestions({ questions: data, totalCount: totalResults })
      }

      setLoading(false)
    }, 500)
  }

  const handleBulkAction = () => {
    // eslint-disable-next-line no-console
    console.log(selectedQuestions)
  }

  const BulkAction = (
    <Button
      disabled={selectedQuestions.length === 0}
      onClick={handleBulkAction}
      type="primary"
    >
      Assign handling editor
    </Button>
  )

  const CreateQuestion = <Button type="primary">Create Question</Button>

  const tabs = [
    {
      label: 'Authored Questions',
      value: 'author',
      questions: author.questions,
      totalCount: author.totalCount,
    },
    {
      label: 'Editor Questions',
      value: 'editor',
      questions: editor.questions,
      totalCount: editor.totalCount,
      showBulkActions: true,
    },
  ]

  return (
    <Wraper>
      <Dashboard
        bulkActions={BulkAction}
        createQuestionButton={CreateQuestion}
        loading={loading}
        onQuestionSelected={setSelectedQuestions}
        onSearch={handleSearch}
        tabsContent={tabs}
        {...args}
      />
    </Wraper>
  )
}

export default {
  component: Dashboard,
  title: 'Dashboard/Dashboard',
}
