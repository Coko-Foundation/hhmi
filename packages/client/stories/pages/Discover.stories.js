import React, { useState, useEffect, useReducer } from 'react'
import styled from 'styled-components'
import { range } from 'lodash'
import { lorem } from 'faker'
import { Discover } from '../../app/ui/discover/Discover'

const makeData = n =>
  range(n).map(i => ({
    id: String(i + 1),
    title: lorem.sentence(),
    description: lorem.sentences(6),
    meta: [
      { label: 'unit', value: 'Lorem ipsum' },
      { label: 'section', value: 'Lorem ipsum' },
      { label: 'topic', value: 'Lorem ipsum' },
      { label: 'category', value: 'Lorem ipsum' },
      { label: 'published', value: '20 Oct 2020' },
    ],
  }))

const searchFunction = async params => {
  console.log(params)
  const numResults = 33
  // dummy api just to simulate wating for response
  let data = await fetch('https://dummyapi.io/data/v1/')
  data = makeData(numResults)
  return data
}

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

const filterOptions = {
  learningObjectives: [
    { label: 'learning objective A', value: 'learning objective A' },
    { label: 'learning objective B', value: 'learning objective B' },
  ],
}

const Wrapper = styled.div`
  height: 90vh;
`

const filtersReducer = (state, action) => {
  switch (action.type) {
    case 'LEARNING_OBJECTIVES':
      return { ...state, learningObjectives: [...action.payload] }
    case 'CLEAR':
      return { learningObjectives: [], course: [] }
    default:
      return state
  }
}

export const DiscoverPage = () => {
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)

  const [filters, updateFilters] = useReducer(filtersReducer, {
    learningObjectives: [],
  })

  useEffect(async () => {
    setLoading(true)
    setSearchResults(await searchFunction())
    setLoading(false)
  }, [])

  const handleSearch = async newValue => {
    setLoading(true)
    const params = { searchQuery: newValue }
    const data = await searchFunction(params)
    setSearchResults(data)
    setLoading(false)
  }

  const applyFilters = async () => {
    setLoading(true)
    const params = { ...filters }
    const data = await searchFunction(params)
    setSearchResults(data)
    setLoading(false)
  }

  const handleSortOptionChange = async newValue => {
    setLoading(true)
    const params = { sortBy: newValue }
    const data = await searchFunction(params)
    setSearchResults(data)
    setLoading(false)
  }

  return (
    <Wrapper>
      <Discover
        applyFilters={applyFilters}
        filterOptions={filterOptions}
        filters={filters}
        handleSearch={handleSearch}
        handleSortOptionChange={handleSortOptionChange}
        loading={loading}
        searchResults={searchResults}
        setFilters={updateFilters}
        sortOptions={sortOptions}
      />
    </Wrapper>
  )
}

export default {
  component: Discover,
  title: 'Pages/Discover',
}
