/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import styled from 'styled-components'
import { range } from 'lodash'
import { lorem } from 'faker'
import { uuid } from '@coko/client'
import { Discover } from 'ui'
import metadata from '../../app/utilities/question/metadataValues'
import { metadataTransformer } from '../../app/utilities/question/metadataTransformations'

import {
  generateMetadata,
  getRandomCourse,
  getRandomObjectivesForCourse,
} from '../../app/utilities/question/_utils'

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

const generateCoursesForQuestion = () => {
  const courses = []
  const nrOfCourses = Math.floor(Math.random() * 2 + 1) // 1-2

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

const makeData = n =>
  range(n).map(i => ({
    id: String(i + 1),
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
    href: `question/${uuid()}`,
  }))

const PAGE_SIZE = 5
const TOTAL_COUNT = 34

const searchFunction = (params = {}) => {
  /* eslint-disable-next-line no-unused-vars */
  const { query = '', page = 1, filters, orderBy = 'date' } = params

  /* eslint-disable-next-line no-console */
  console.log(params)

  const numResults = TOTAL_COUNT
  const data = makeData(numResults)
  return data.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page)
}

const Wrapper = styled.div`
  height: 90vh;
`

const sidebarText = lorem.sentences(7)

export const DiscoverPage = args => {
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

  const handleAddToList = () => {}

  const handleCreateList = () => {}

  const handleDuplicateQuestion = () => {}

  return (
    <Wrapper>
      <Discover
        {...args}
        loading={loading}
        onAddToList={handleAddToList}
        onCreateList={handleCreateList}
        onDuplicate={handleDuplicateQuestion}
        onSearch={handleSearch}
        pageSize={PAGE_SIZE}
        questions={searchResults}
        showSort
        sidebarMetadata={metadataTransformer(metadata)}
        sidebarText={sidebarText}
        sortOptions={sortOptions}
        totalCount={TOTAL_COUNT}
      />
    </Wrapper>
  )
}

DiscoverPage.args = {
  isUserLoggedIn: true,
}

const DiscoveryCustom = args => {
  return (
    <Wrapper>
      <Discover
        {...args}
        sidebarMetadata={metadataTransformer(metadata)}
        sortOptions={sortOptions}
      />
    </Wrapper>
  )
}

export const CustomControls = DiscoveryCustom.bind({})
CustomControls.args = {
  questions: makeData(PAGE_SIZE),
  onSearch: () => {},
  totalCount: TOTAL_COUNT,
  sidebarText,
}

export default {
  component: Discover,
  title: 'Discover/Discover',
}
