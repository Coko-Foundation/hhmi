import React, { useState, useRef } from 'react'

import { Discover, DateParser, VisuallyHiddenElement } from 'ui'
import { useQuery } from '@apollo/client'

import {
  extractDocumentText,
  extractCourseAndObjectives,
  extractTopicsAndSubtopics,
  extractBloomsLevel,
  useMetadata,
} from '../utilities'

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

const transform = (questions, metadata, searchParams) => {
  if (!questions) return null

  return questions.map(question => {
    const { id, versions } = question
    const latestVersion = versions[0]
    const { content, publicationDate, cognitiveLevel } = latestVersion
    const parsedContent = extractDocumentText(content)

    const courses = extractCourseAndObjectives(
      latestVersion.courses,
      metadata.frameworks,
    )

    const topics = extractTopicsAndSubtopics(
      latestVersion.topics,
      metadata.topics,
    )

    const cognitiveDisplayValue = extractBloomsLevel(
      cognitiveLevel,
      metadata.blooms.cognitive,
    )

    return {
      metadata: [
        { label: 'topic', value: topics.topics },
        { label: 'subtopic', value: topics.subtopics },
        // question type: how do we know that data ?? what if it's more than one?
        { label: "bloom's level", value: cognitiveDisplayValue },
        { label: 'author', value: question.author },
        {
          label: 'published date',
          value: (
            <DateParser dateFormat="MMMM DD, YYYY" timestamp={publicationDate}>
              {timestamp => timestamp}
            </DateParser>
          ),
        },
      ],
      content: parsedContent,
      href: `/question/${id}/test`,
      id,
      courses,
      state: { searchParams },
    }
  })
}

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
            ? transform(
                questionsData.getPublishedQuestions.result,
                metadata,
                searchParams,
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
