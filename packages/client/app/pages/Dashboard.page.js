import React, { useState, useEffect, useRef } from 'react'
import { useQuery, useLazyQuery, useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import { Dashboard, DateParser, VisuallyHiddenElement } from 'ui'
import {
  GET_AUTHOR_DASHBOARD,
  GET_EDITOR_DASHBOARD,
  CREATE_QUESTION,
  CURRENT_USER,
} from '../graphql'
import {
  hasGlobalRole,
  // dashboardDataMapper,
  extractDocumentText,
  extractCourseAndObjectives,
  extractTopicsAndSubtopics,
  extractBloomsLevel,
  useMetadata,
} from '../utilities'

const defaultSearchOptions = {
  orderBy: 'created',
  ascending: false,
  pageSize: 10,
}

const transform = (questions, metadataValues, tab = '') => {
  if (!questions) return null

  return questions.map(question => {
    const { id, versions } = question
    const latestVersion = versions[0]
    const { content, publicationDate, cognitiveLevel } = latestVersion
    const parsedContent = extractDocumentText(content)

    const courses = extractCourseAndObjectives(
      latestVersion.courses,
      metadataValues.frameworks,
    )

    const topics = extractTopicsAndSubtopics(
      latestVersion.topics,
      metadataValues.topics,
    )

    const cognitiveDisplayValue = extractBloomsLevel(
      cognitiveLevel,
      metadataValues.blooms.cognitive,
    )

    let status = 'Not Submitted'
    if (latestVersion.submitted) status = 'Submitted'
    if (latestVersion.underReview) status = 'Under Review'
    if (latestVersion.inProduction) status = 'In Production'
    if (latestVersion.published) status = 'Published'
    if (question.rejected) status = 'Rejected'

    return {
      metadata: [
        { label: 'topic', value: topics.topics },
        { label: 'subtopic', value: topics.subtopics },
        // question type: how do we know that data ?? what if it's more than one?
        { label: "bloom's level", value: cognitiveDisplayValue },
        ...(tab === 'editor'
          ? [{ label: 'author', value: question?.author?.displayName }]
          : []),
        {
          label: 'published date',
          value: publicationDate && (
            <DateParser dateFormat="MMMM DD, YYYY" timestamp={publicationDate}>
              {timestamp => timestamp}
            </DateParser>
          ),
        },
      ],
      content: parsedContent,
      status,
      href: `/question/${id}`,
      id,
      courses,
    }
  })
}

const DashboardPage = () => {
  // #region hooks
  const history = useHistory()

  const initialTabKey = localStorage.getItem('dashboardLastUsedTab') || 'author'
  const [currentTabKey, setCurrentTabKey] = useState(initialTabKey)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentSearchQuery, setCurrentSearchQuery] = useState(null)
  const initialRender = useRef(true)

  const { metadata } = useMetadata()

  const { data: currentUserResponse } = useQuery(CURRENT_USER)

  // leave fetch policy to network until pagination is handled in the cache (with a merge function)
  const [
    authorQuery,
    {
      data: authorResponse,
      loading: authorLoading,
      called: authorCalled,
      // fetchMore: fetchMoreAuthor,
    },
  ] = useLazyQuery(GET_AUTHOR_DASHBOARD, {
    fetchPolicy: 'network-only',
    variables: {
      ...defaultSearchOptions,
      page: 0,
    },
    onCompleted: data => {
      // run only on update, not on first render
      if (initialRender.current) initialRender.current = false
      else {
        const nrOfQuestions = data.getAuthorDashboard.result.length
        const total = data.getAuthorDashboard.totalCount
        let announcement = 'Results updated.'

        if (total === 0) {
          announcement = `${announcement} No results for your search query`
        } else if (total <= 10) {
          announcement = `${announcement} ${nrOfQuestions} questions`
        } else {
          announcement = `${announcement} Page ${currentPage} of ${Math.ceil(
            total / 10,
          )} with ${nrOfQuestions} questions from a total of ${total}`
        }

        document.querySelector('#search-results-update').innerHTML =
          announcement
      }
    },
  })

  const [
    editorQuery,
    { data: editorResponse, loading: editorLoading, called: editorCalled },
  ] = useLazyQuery(GET_EDITOR_DASHBOARD, {
    fetchPolicy: 'network-only',
    onCompleted: data => {
      // run only on update, not on first render
      if (initialRender.current) initialRender.current = false
      else {
        const nrOfQuestions = data.getManagingEditorDashboard.result.length
        const total = data.getManagingEditorDashboard.totalCount
        let announcement = 'Results updated.'

        if (total === 0) {
          announcement = `${announcement} No results for your search query`
        } else if (total <= 10) {
          announcement = `${announcement} ${nrOfQuestions} questions`
        } else {
          announcement = `${announcement} Page ${currentPage} of ${Math.ceil(
            total / 10,
          )} with ${nrOfQuestions} questions from a total of ${total}`
        }

        document.querySelector('#search-results-update').innerHTML =
          announcement
      }
    },
  })

  const authorData = authorResponse && authorResponse.getAuthorDashboard
  const editorData = editorResponse && editorResponse.getManagingEditorDashboard

  const queryMapper = {
    query: {
      author: authorQuery,
      editor: editorQuery,
    },
    called: {
      author: authorCalled,
      editor: editorCalled,
    },
  }

  useEffect(() => {
    runQuery(currentSearchQuery)
  }, [currentTabKey, currentPage])

  const runQuery = query => {
    const queryVariables = {
      variables: {
        ...defaultSearchOptions,
        page: currentPage - 1,
        searchQuery: query,
      },
    }

    queryMapper.query[currentTabKey](queryVariables)
  }

  const [createQuestionMutation] = useMutation(CREATE_QUESTION, {
    refetchQueries: [{ query: CURRENT_USER }],
  })
  // #endregion hooks

  // #region handlers
  const handleCreateQuestion = () => {
    createQuestionMutation()
      .then(res => {
        const { id } = res.data.createQuestion
        history.push(`/question/${id}`)
      })
      .catch(e => console.error(e))
  }

  const handleSearch = options => {
    const { page, role, query } = options

    setCurrentTabKey(role)
    setCurrentPage(page)
    setCurrentSearchQuery(query)

    localStorage.setItem('dashboardLastUsedTab', role)
    runQuery(query)
  }
  // #endregion handlers

  // #region data
  const loading = !currentUserResponse?.currentUser // question list loading is inside the tab
  const isEditor = hasGlobalRole(currentUserResponse?.currentUser, 'editor')

  const tabs = [
    {
      label: 'Authored Questions',
      value: 'author',
      questions:
        authorData && metadata ? transform(authorData.result, metadata) : [],
      totalCount: authorData && authorData.totalCount,
      showBulkActions: false,
      loading: authorLoading,
    },
    isEditor && {
      label: 'Editor Questions',
      value: 'editor',
      questions:
        editorData && metadata
          ? transform(editorData.result, metadata, 'editor')
          : [],
      totalCount: editorData && editorData.totalCount,
      showBulkActions: false,
      loading: editorLoading,
    },
  ].filter(Boolean)

  // #endregion data

  return (
    <>
      <VisuallyHiddenElement as="h1">Dashboard page</VisuallyHiddenElement>
      <Dashboard
        // bulkActions
        initialTabKey={initialTabKey}
        loading={loading}
        // onQuestionSelected
        onClickCreate={handleCreateQuestion}
        onSearch={handleSearch}
        // showSort
        // sortOptions
        tabsContent={tabs}
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

export default DashboardPage
