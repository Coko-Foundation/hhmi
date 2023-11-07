import React, { useState, useEffect, useRef } from 'react'
import { useQuery, useLazyQuery, useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import { Dashboard, VisuallyHiddenElement } from 'ui'
import {
  ASSING_HANDLING_EDITORS,
  GET_AUTHOR_DASHBOARD,
  GET_EDITOR_DASHBOARD,
  GET_HANDLING_EDITOR_DASHBOARD,
  CREATE_QUESTION,
  CURRENT_USER,
  GET_COMPLEX_ITEM_SETS_OPTIONS,
  FILTER_GLOBAL_TEAM_MEMBERS,
} from '../graphql'
import {
  hasGlobalRole,
  dashboardDataMapper,
  useMetadata,
  callOn,
} from '../utilities'
import { dashboardEditorFilters } from '../ui/_helpers/searchFilters'

const defaultSearchOptions = {
  orderBy: 'created',
  ascending: false,
  pageSize: 10,
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

  const { data: { getAvailableSets: complexItemSetOptions } = {} } = useQuery(
    GET_COMPLEX_ITEM_SETS_OPTIONS,
  )

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
    filterGlobalTeamMembers,
    {
      loading: loadingSearchHEs,
      data: { filterGlobalTeamMembers: handlingEditors } = {},
    },
  ] = useLazyQuery(FILTER_GLOBAL_TEAM_MEMBERS)

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

  const [
    handlingEditorQuery,
    {
      data: heResponse,
      loading: heLoading,
      called: heCalled,
      // fetchMore: fetchMoreHandlingEditor,
    },
  ] = useLazyQuery(GET_HANDLING_EDITOR_DASHBOARD, {
    fetchPolicy: 'network-only',
    variables: {
      ...defaultSearchOptions,
      page: 0,
    },
    onCompleted: data => {
      // run only on update, not on first render
      if (initialRender.current) initialRender.current = false
      else {
        const nrOfQuestions = data.getHandlingEditorDashboard.result.length
        const total = data.getHandlingEditorDashboard.totalCount
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
  const handlingEditorData = heResponse && heResponse.getHandlingEditorDashboard

  const mappedDataHE =
    handlingEditorData && metadata
      ? dashboardDataMapper({
          questions: handlingEditorData.result,
          metadata,
          complexItemSetOptions: 'editor',
          showAuthor: true,
          showStatus: true,
        })
      : []

  const mappedDataAuthor =
    authorData && metadata
      ? dashboardDataMapper({
          questions: authorData.result,
          metadata,
          complexItemSetOptions,
          showStatus: true,
        })
      : []

  const mappedDataEditor =
    editorData && metadata
      ? dashboardDataMapper({
          questions: editorData.result,
          metadata,
          complexItemSetOptions,
          showStatus: true,
          showAuthor: true,
          showAssigned: true,
        })
      : []

  const queryMapper = {
    query: {
      author: authorQuery,
      editor: editorQuery,
      handlingEditor: handlingEditorQuery,
    },
    called: {
      author: authorCalled,
      editor: editorCalled,
      handlingEditor: heCalled,
    },
  }

  useEffect(() => {
    runQuery(currentSearchQuery)
  }, [currentTabKey, currentPage])

  const runQuery = query => {
    const { query: roleQuery } = queryMapper

    const queryVariables = {
      variables: {
        ...defaultSearchOptions,
        page: currentPage - 1,
        filters: query || {},
      },
    }

    callOn(currentTabKey, roleQuery, roleQuery.author)(queryVariables)
  }

  const [createQuestionMutation] = useMutation(CREATE_QUESTION, {
    refetchQueries: [{ query: CURRENT_USER }],
  })

  const [assingHandlingEditors] = useMutation(ASSING_HANDLING_EDITORS)
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

  const handleSearchHE = async query => {
    const variables = {
      role: 'handlingEditor',
      query,
      options: {
        orderBy: 'username',
        ascending: true,
      },
    }

    filterGlobalTeamMembers({ variables })
  }

  const handleAssignHE = async (users, questionIds) => {
    const mutationData = {
      variables: {
        questionIds,
        userIds: users.map(user => user.value),
      },
    }

    return assingHandlingEditors(mutationData)
  }

  // #endregion handlers

  // #region data
  const loading = !currentUserResponse?.currentUser // question list loading is inside the tab
  const isEditor = hasGlobalRole(currentUserResponse?.currentUser, 'editor')

  const isHandlingEditor = hasGlobalRole(
    currentUserResponse?.currentUser,
    'handlingEditor',
  )

  const tabs = [
    {
      label: 'Authored Items',
      value: 'author',
      questions: mappedDataAuthor,
      totalCount: authorData?.totalCount,
      showBulkActions: false,
      loading: authorLoading,
    },
    isEditor && {
      label: 'Editor Items',
      value: 'editor',
      questions: mappedDataEditor,
      totalCount: editorData?.totalCount,
      showBulkActions: true,
      loading: editorLoading,
    },
    isHandlingEditor && {
      label: 'Handling Editor Items',
      value: 'handlingEditor',
      questions: mappedDataHE,
      totalCount: handlingEditorData?.totalCount,
      showBulkActions: false,
      loading: heLoading,
    },
  ].filter(Boolean)

  // #endregion data

  return (
    <>
      <VisuallyHiddenElement as="h1">Dashboard page</VisuallyHiddenElement>
      <Dashboard
        filters={dashboardEditorFilters}
        handlingEditors={handlingEditors?.result || []}
        initialTabKey={initialTabKey}
        loading={loading}
        loadingSearchHEs={loadingSearchHEs}
        onAssignHE={handleAssignHE}
        onClickCreate={handleCreateQuestion}
        onSearch={handleSearch}
        onSearchHE={handleSearchHE}
        // showSort
        // sortOptions
        tabsContent={tabs}
        withFilters={currentTabKey === 'editor'}
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
