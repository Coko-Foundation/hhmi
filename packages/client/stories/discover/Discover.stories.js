import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { range } from 'lodash'
import { lorem } from 'faker'
import { Discover } from '../../app/ui/discover/Discover'

const makeData = n =>
  range(n).map(i => ({
    id: String(i + 1),
    title: lorem.sentence(),
    description: lorem.sentences(6),
    metadata: [
      { label: 'unit', value: 'Lorem ipsum' },
      { label: 'section', value: 'Lorem ipsum' },
      { label: 'topic', value: 'Lorem ipsum' },
      { label: 'category', value: 'Lorem ipsum' },
      { label: 'published', value: '20 Oct 2020' },
    ],
  }))

const searchFunction = async (params = {}) => {
  const { query = '', page = 1, filters } = params
  // eslint-disable-next-line no-console
  console.log(query)
  // eslint-disable-next-line no-console
  console.log(page)
  // eslint-disable-next-line no-console
  console.log(filters)
  const numResults = 33
  // dummy api just to simulate wating for response
  let data = await fetch('https://dummyapi.io/data/v1/')
  data = makeData(numResults)
  return data.slice(10 * (page - 1), 10 * page)
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

const Wrapper = styled.div`
  height: 90vh;
`

const sidebarText = lorem.sentences(7)

export const DiscoverPage = () => {
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)

  const [filters, updateFilters] = useState({})

  useEffect(async () => {
    setLoading(true)
    setSearchResults(await searchFunction())
    setLoading(false)
  }, [])

  const handleSearch = async (query, page) => {
    setLoading(true)
    const params = { query, page, filters: { ...filters } }
    const data = await searchFunction(params)
    setSearchResults(data)
    setLoading(false)
  }

  const applyFilters = async () => {
    setLoading(true)
    const params = { filters: { ...filters } }
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
        loading={loading}
        onSearch={handleSearch}
        onSortOptionChange={handleSortOptionChange}
        questions={searchResults}
        setFilters={updateFilters}
        sidebarText={sidebarText}
        sortOptions={sortOptions}
        totalCount={33}
      />
    </Wrapper>
  )
}

export default {
  component: Discover,
  title: 'Discover/Discover',
}
