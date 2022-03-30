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
      { label: 'unit', value: 'Lorem ipsum' },
      { label: 'section', value: 'Lorem ipsum' },
      { label: 'topic', value: 'Lorem ipsum' },
      { label: 'category', value: 'Lorem ipsum' },
      { label: 'published', value: '20 Oct 2020' },
    ],
    href: `question/${uuid()}`,
  }))

const searchFunction = (params = {}) => {
  /* eslint-disable-next-line no-unused-vars */
  const { query = '', page = 1, filters, sortBy = 'date' } = params

  /* eslint-disable-next-line no-console */
  console.log(params)

  const numResults = 33
  const data = makeData(numResults)
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

    setTimeout(() => {
      const data = searchFunction(params)
      setSearchResults(data)
      setLoading(false)
    }, 500)
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
