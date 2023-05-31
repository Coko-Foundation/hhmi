import React, { useState, useRef } from 'react'

import { Discover, VisuallyHiddenElement } from 'ui'
import { useQuery } from '@apollo/client'

import { useMetadata, dashboardDataMapper } from '../utilities'

import { GET_PUBLISHED_QUESTIONS } from '../graphql'

const sortOptions = [
  {
    label: 'Date (descending)',
    value: 'date-desc',
    isDefault: true,
  },
  {
    label: 'Date (ascending)',
    value: 'date-asc',
    isDefault: false,
  },
]

const sidebarText =
  'Explore questions by applying one or more of the filters below'

const PAGE_SIZE = 10

const DiscoverPage = () => {
  const [searchParams, setSearchParams] = useState({
    query: '',
    page: 1,
    filters: {},
    orderBy: 'publication_date',
    ascending: false,
  })

  const { metadata } = useMetadata()
  const initialRender = useRef(true)

  const { data: questionsData, loading } = useQuery(GET_PUBLISHED_QUESTIONS, {
    variables: {
      params: {
        filters: searchParams.filters,
        searchQuery: searchParams.query,
      },
      options: {
        orderBy: searchParams.orderBy,
        ascending: searchParams.ascending,
        page: searchParams.page - 1,
        pageSize: PAGE_SIZE,
      },
    },
    onCompleted: data => {
      // run only on update, not on first render
      if (initialRender.current) initialRender.current = false
      else {
        const nrOfQuestions = data.getPublishedQuestions.result.length
        const total = data.getPublishedQuestions.totalCount
        let announcement = 'Results updated.'

        if (total === 0) {
          announcement = `${announcement} No results for the selected filters`
        } else if (total <= 10) {
          announcement = `${announcement} ${nrOfQuestions} questions`
        } else {
          announcement = `${announcement} Page ${
            searchParams.page
          } of ${Math.ceil(
            total / 10,
          )} with ${nrOfQuestions} questions from a total of ${total}`
        }

        document.querySelector('#search-results-update').innerHTML =
          announcement
      }
    },
  })

  const handleSearch = params => {
    setSearchParams({
      ...params,
      orderBy: 'publication_date',
      ascending: params.orderBy !== 'date-desc',
    })
  }

  const handleAddToList = () => {}

  const handleCreateList = () => {}

  const handleDuplicateQuestion = () => {}

  return (
    <>
      <VisuallyHiddenElement as="h1">Discover page</VisuallyHiddenElement>
      <Discover
        loading={loading}
        onAddToList={handleAddToList}
        onCreateList={handleCreateList}
        onDuplicate={handleDuplicateQuestion}
        onSearch={handleSearch}
        pageSize={PAGE_SIZE}
        questions={
          questionsData && metadata
            ? dashboardDataMapper(
                questionsData.getPublishedQuestions.result,
                metadata,
                [],
                false,
                true,
                searchParams,
                true,
              )
            : []
        }
        showSort
        sidebarMetadata={metadata}
        sidebarText={sidebarText}
        sortOptions={sortOptions}
        totalCount={questionsData?.getPublishedQuestions.totalCount}
      />
      <VisuallyHiddenElement
        aria-live="polite"
        as="div"
        id="search-results-update"
        role="status"
      />
    </>
  )
}

export default DiscoverPage
