import React, { useState } from 'react'
import { lorem } from 'faker'
import { uuid } from '@coko/client'
import { Dashboard, Button } from 'ui'
import styled from 'styled-components'
import { createData, noop } from '../_helpers'

const makeData = n =>
  createData(n, i => ({
    id: uuid(),
    title: lorem.words(6),
    content: lorem.sentences(8),
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

const searchFunction = async (params = {}) => {
  const { query = '', page = 1 } = params
  // eslint-disable-next-line no-console
  console.log(query)
  // eslint-disable-next-line no-console
  console.log(page)
  const numResults = 33
  // dummy api just to simulate wating for response
  let data = await fetch('https://dummyapi.io/data/v1/')
  data = makeData(numResults)
  return data.slice(10 * (page - 1), 10 * page)
}

const Wraper = styled.div`
  height: 90vh;
  background: linear-gradient(97.37deg, #058d96 -34.57%, #8ac341 93.86%);
`

export const Base = () => (
  <Wraper>
    <Dashboard
      authorItems={makeData(5)}
      editorItems={makeData(5)}
      onClickCreateQuestion={noop}
      reviewerItems={makeData(5)}
    />
  </Wraper>
)

export const AuthorDashboard = () => {
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async params => {
    setLoading(true)
    const data = await searchFunction(params)
    setSearchResults(data)
    setLoading(false)
  }

  return (
    <Wraper>
      <Dashboard
        loading={loading}
        onClickCreateQuestion={noop}
        onSearch={handleSearch}
        questions={searchResults}
        totalCount={33}
        userRole="author"
      />
    </Wraper>
  )
}

export const EditorDashboard = () => {
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedQuestions, setSelectedQuestions] = useState([])

  const handleSearch = async params => {
    setLoading(true)
    const data = await searchFunction(params)
    setSearchResults(data)
    setLoading(false)
  }

  const BulkAction = () => (
    <Button disabled={selectedQuestions.length === 0} type="primary">
      Assign handling editor
    </Button>
  )

  return (
    <Wraper>
      <Dashboard
        activePage="/editor"
        bulkAction={BulkAction}
        loading={loading}
        onClickCreateQuestion={noop}
        onQuestionSelected={setSelectedQuestions}
        onSearch={handleSearch}
        questions={searchResults}
        totalCount={33}
        userRole="editor"
      />
    </Wraper>
  )
}

export default {
  component: Dashboard,
  title: 'Dashboard/Dashboard',
}
