import React, { useState } from 'react'
import styled from 'styled-components'
import { range } from 'lodash'
import { lorem } from 'faker'
import { uuid } from '@coko/client'
import { Discover } from 'ui'

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
    href: `question/${uuid()}`,
  }))

const searchFunction = async (params = {}) => {
  const { query = '', page = 1, filters, sortBy = 'date' } = params
  // eslint-disable-next-line no-console
  console.log(query)
  // eslint-disable-next-line no-console
  console.log(page)
  // eslint-disable-next-line no-console
  console.log(filters)
  // eslint-disable-next-line no-console
  console.log(sortBy)
  const numResults = 33
  // dummy api just to simulate wating for response
  let data = await fetch('https://dummyapi.io/data/v1/')
  data = makeData(numResults)
  return data.slice(10 * (page - 1), 10 * page)
}

const Wrapper = styled.div`
  height: 90vh;
`

const sidebarText = lorem.sentences(7)

export const DiscoverPage = () => {
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async params => {
    setLoading(true)
    const data = await searchFunction(params)
    setSearchResults(data)
    setLoading(false)
  }

  return (
    <Wrapper>
      <Discover
        loading={loading}
        onSearch={handleSearch}
        questions={searchResults}
        sidebarText={sidebarText}
        totalCount={33}
      />
    </Wrapper>
  )
}

const DiscoveryCustom = args => {
  return (
    <Wrapper>
      <Discover {...args} />
    </Wrapper>
  )
}

export const CustomControls = DiscoveryCustom.bind({})
CustomControls.args = {
  questions: makeData(10),
  onSearch: () => {},
  totalCount: 10,
  sidebarText,
}

export default {
  component: Discover,
  title: 'Discover/Discover',
}
