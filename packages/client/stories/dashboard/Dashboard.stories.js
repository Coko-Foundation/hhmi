/* eslint-disable no-console */

import React, { useState } from 'react'
import { lorem } from 'faker'
import { uuid } from '@coko/client'
import { Dashboard, Button } from 'ui'
import styled from 'styled-components'
import { createData } from '../../app/utilities/_helpers'
import {
  generateMetadata,
  getRandomCourse,
  getRandomObjectivesForCourse,
  getRandomStatus,
  getRandomStatusLabel,
} from '../../app/utilities/question/_utils'

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

const makeData = (n, role = null) =>
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
    status: role === 'reviewer' ? 'Under Review' : getRandomStatus(),
    statusLabel: role === 'reviewer' && getRandomStatusLabel(),
    href: '#',
  }))

const sortOptions = [
  {
    label: 'Date (ascending)',
    value: 'date-asc',
    isDefault: true,
  },
  {
    label: 'Date (descending)',
    value: 'date-des',
    isDefault: true,
  },
]

const totalResults = 33

const Wrapper = styled.div`
  /* background: linear-gradient(97.37deg, #058d96 -34.57%, #8ac341 93.86%); */
  background-color: #a5a1a2;
  height: 90vh;
`

const searchFunction = params => {
  const data = makeData(
    totalResults - 10 * (params.page - 1) > 10
      ? 10
      : totalResults - 10 * (params.page - 1),
    params.role,
  )

  return data
}

export const AuthorDashboard = args => {
  const [loading, setLoading] = useState(true)

  const [author, setAuthorQuestions] = useState({
    questions: [],
    totalCount: 0,
  })

  const handleSearch = params => {
    const { query = '', page = 1, sortBy, role = 'author' } = params
    console.log(`${query}, ${page}, ${sortBy}, ${role}`)

    setAuthorQuestions({ questions: [], loading: true })
    setTimeout(() => {
      const data = searchFunction(params)

      if (role === 'author') {
        setAuthorQuestions({
          questions: data,
          totalCount: totalResults,
          loading: false,
        })
      }

      setLoading(false)
    }, 500)
  }

  const handleClickCreate = () => console.log('create')

  const tabs = [
    {
      label: 'Authored Questions',
      value: 'author',
      questions: author.questions,
      totalCount: author.totalCount,
      loading: author.loading,
    },
  ]

  return (
    <Wrapper>
      <Dashboard
        initialTabKey="author"
        loading={loading}
        onClickCreate={handleClickCreate}
        onSearch={handleSearch}
        tabsContent={tabs}
        {...args}
        showSort
        sortOptions={sortOptions}
      />
    </Wrapper>
  )
}

export const EditorDashboard = args => {
  const [loading, setLoading] = useState(true)
  const [initialTabKey, setInitialTabKey] = useState('author')
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

    setInitialTabKey(role)

    if (role === 'author') {
      setAuthorQuestions({ questions: [], loading: true })
    } else if (role === 'editor') {
      setEditorQuestions({ questions: [], loading: true })
    }

    setTimeout(() => {
      const data = searchFunction(params)

      if (role === 'author') {
        setAuthorQuestions({
          questions: data,
          totalCount: totalResults,
          loading: false,
        })
      } else if (role === 'editor') {
        setEditorQuestions({
          questions: data,
          totalCount: totalResults,
          loading: false,
        })
      }

      setLoading(false)
    }, 500)
  }

  const handleBulkAction = () => console.log(selectedQuestions)
  const handleClickCreate = () => console.log('create')

  const BulkAction = (
    <Button
      disabled={selectedQuestions.length === 0}
      onClick={handleBulkAction}
      type="primary"
    >
      Assign handling editor
    </Button>
  )

  const tabs = [
    {
      label: 'Authored Questions',
      value: 'author',
      questions: author.questions,
      totalCount: author.totalCount,
      loading: author.loading,
    },
    {
      label: 'Editor Questions',
      value: 'editor',
      questions: editor.questions,
      totalCount: editor.totalCount,
      loading: editor.loading,
      showBulkActions: true,
    },
  ]

  return (
    <Wrapper>
      <Dashboard
        bulkActions={BulkAction}
        initialTabKey={initialTabKey}
        loading={loading}
        onClickCreate={handleClickCreate}
        onQuestionSelected={setSelectedQuestions}
        onSearch={handleSearch}
        showSort
        sortOptions={sortOptions}
        tabsContent={tabs}
        {...args}
      />
    </Wrapper>
  )
}

export const ReviewerDashboard = args => {
  const [loading, setLoading] = useState(true)
  const [initialTabKey, setInitialTabKey] = useState('author')

  const [author, setAuthorQuestions] = useState({
    questions: [],
    totalCount: 0,
  })

  const [reviewer, setReviewerQuestions] = useState({
    questions: [],
    totalCount: 0,
  })

  const handleSearch = params => {
    const { query = '', page = 1, sortBy, role = 'reviewer' } = params
    console.log(`${query}, ${page}, ${sortBy}, ${role}`)

    setInitialTabKey(role)

    if (role === 'author') {
      setAuthorQuestions({ questions: [], loading: true })
    } else if (role === 'reviewer') {
      setReviewerQuestions({ questions: [], loading: true })
    }

    setTimeout(() => {
      const data = searchFunction(params)

      if (role === 'author') {
        setAuthorQuestions({
          questions: data,
          totalCount: totalResults,
          loading: false,
        })
      } else if (role === 'reviewer') {
        setReviewerQuestions({
          questions: data,
          totalCount: totalResults,
          loading: false,
        })
      }

      setLoading(false)
    }, 500)
  }

  const handleClickCreate = () => console.log('create')

  const tabs = [
    {
      label: 'Authored Questions',
      value: 'author',
      questions: author.questions,
      totalCount: author.totalCount,
      loading: author.loading,
    },
    {
      label: 'Review Invites',
      value: 'reviewer',
      questions: reviewer.questions,
      totalCount: reviewer.totalCount,
      loading: reviewer.loading,
    },
  ]

  return (
    <Wrapper>
      <Dashboard
        initialTabKey={initialTabKey}
        loading={loading}
        onClickCreate={handleClickCreate}
        onSearch={handleSearch}
        tabsContent={tabs}
        {...args}
        showSort
        sortOptions={sortOptions}
      />
    </Wrapper>
  )
}

export default {
  component: Dashboard,
  title: 'Dashboard/Dashboard',
}
