import React, { useState } from 'react'

import { Discover, DateParser } from 'ui'
import { useQuery } from '@apollo/client'

import {
  metadataForQuestionPage as metadata,
  extractDocumentText,
  extractCourseAndObjectives,
  extractTopicsAndSubtopics,
  extractBloomsLevel,
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

const transform = (questions, searchParams) => {
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
  })

  const handleSearch = params => {
    if (params.orderBy === 'date-desc') {
      setSearchParams({
        ...params,
        orderBy: 'publication_date',
        ascending: false,
      })
    } else if (params.orderBy === 'date-asc') {
      setSearchParams({
        ...params,
        orderBy: 'publication_date',
        ascending: true,
      })
    }
  }

  return (
    <Discover
      loading={loading}
      onSearch={handleSearch}
      pageSize={PAGE_SIZE}
      questions={
        questionsData &&
        transform(questionsData.getPublishedQuestions.result, searchParams)
      }
      showSort
      sidebarMetadata={metadata}
      sidebarText={sidebarText}
      sortOptions={sortOptions}
      totalCount={questionsData?.getPublishedQuestions.totalCount}
    />
  )
}

export default DiscoverPage
