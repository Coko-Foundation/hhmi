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
    meta: {
      unit: 'Lorem ipsum',
      section: 'Lorem ipsum',
      topic: 'Lorem ipsum',
      category: 'Lorem ipsum',
      published: '20 Oct 2020',
    },
  }))

const searchFunction = async params => {
  console.log(params)
  const numResults = Math.floor(Math.random() * 100 + 10)
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
    label: 'Topic',
    value: 'topic',
  },
]

const Wrapper = styled.div`
  height: 90vh;
`

const Navigation = styled.nav`
  height: 50px;
  background-color: #444;
`

export const DiscoverPage = () => {
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)

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

  const handleSortOptionChange = async newValue => {
    setLoading(true)
    const params = { sortBy: newValue }
    const data = await searchFunction(params)
    setSearchResults(data)
    setLoading(false)
  }

  const handleSelectionChange = e => console.log(e)

  return (
    <Wrapper>
      <Navigation />
      <Discover
        handleSearch={handleSearch}
        handleSelectionChange={handleSelectionChange}
        handleSortOptionChange={handleSortOptionChange}
        loading={loading}
        searchFunction={searchFunction}
        searchResults={searchResults}
        sortOptions={sortOptions}
      />
    </Wrapper>
  )
}

export default {
  component: DiscoverPage,
  title: 'Pages/Discover',
}
