import React, { useState, useEffect, useRef } from 'react'
import {
  useQuery,
  useLazyQuery,
  useMutation,
  useSubscription,
} from '@apollo/client'
import { useHistory } from 'react-router-dom'

import { Dashboard, VisuallyHiddenElement } from 'ui'
import { useCurrentUser } from '@coko/client'
import {
  ASSING_HANDLING_EDITORS,
  GET_AUTHOR_DASHBOARD,
  GET_EDITOR_DASHBOARD,
  GET_HANDLING_EDITOR_DASHBOARD,
  GET_REVIEWER_DASHBOARD,
  CREATE_QUESTION,
  CURRENT_USER,
  GET_COMPLEX_ITEM_SETS_OPTIONS,
  FILTER_GLOBAL_TEAM_MEMBERS,
  GET_PRODUCTION_DASHBOARD,
  DASHBOARD_SUBSCRIPTION,
  CHANGE_ARCHIVE_STATUS_FOR_ITEMS,
  GET_LISTS_OPTIONS,
  ADD_TO_LIST,
  CREATE_LIST,
  GET_LISTS,
} from '../graphql'
import {
  hasGlobalRole,
  dashboardDataMapper,
  useMetadata,
  callOn,
} from '../utilities'
import {
  editorStatusFilters,
  createHeAssignedFilters,
  authorStatusFilters,
} from '../ui/_helpers/searchFilters'

const defaultSearchOptions = {
  orderBy: 'created',
  ascending: false,
  pageSize: 10,
  archived: false,
}

const DashboardPage = () => {
  // #region hooks
  const history = useHistory()
  const { setCurrentUser } = useCurrentUser()
  const initialTabKey = localStorage.getItem('dashboardLastUsedTab') || 'author'
  const [currentTabKey, setCurrentTabKey] = useState(initialTabKey)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentShowArchived, setCurrentShowArchived] = useState(false)
  const [currentSearchQuery, setCurrentSearchQuery] = useState(null)

  const [searchParams, setSearchParams] = useState({
    query: '',
    page: 1,
    sortBy: 'date',
    role: initialTabKey,
    archived: false,
  })

  const [heFilterOptions, setHeFilterOptions] = useState(
    createHeAssignedFilters([]),
  )

  const initialRender = useRef(true)

  const { metadata } = useMetadata()

  const updateSearchResultAnnounce = (data, query) => {
    if (initialRender.current) initialRender.current = false
    else {
      const nrOfQuestions = data[query].result.length
      const total = data[query].totalCount
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

      document.querySelector('#search-results-update').innerHTML = announcement
    }
  }

  const { data: currentUserResponse } = useQuery(CURRENT_USER, {})
  const [getUser] = useLazyQuery(CURRENT_USER)

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
    onCompleted: data => updateSearchResultAnnounce(data, 'getAuthorDashboard'),
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
    onCompleted: data =>
      updateSearchResultAnnounce(data, 'getManagingEditorDashboard'),
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
    onCompleted: data =>
      updateSearchResultAnnounce(data, 'getHandlingEditorDashboard'),
  })

  const [
    productionQuery,
    {
      data: productionResponse,
      loading: productionLoading,
      called: productionCalled,
    },
  ] = useLazyQuery(GET_PRODUCTION_DASHBOARD, {
    fetchPolicy: 'network-only',
    onCompleted: data =>
      updateSearchResultAnnounce(data, 'getInProductionDashboard'),
  })

  const [
    reviewerQuery,
    {
      data: reviewerResponse,
      loading: reviewerLoading,
      called: reviewerCalled,
    },
  ] = useLazyQuery(GET_REVIEWER_DASHBOARD, {
    fetchPolicy: 'network-only',
    variables: {
      ...defaultSearchOptions,
      page: 0,
    },
    onCompleted: data => {
      updateSearchResultAnnounce(data, 'getReviewerDashboard')

      if (currentTabKey === 'reviewer') {
        getUser().then(({ data: { currentUser } = {} }) => {
          setCurrentUser(currentUser)
        })
      }
    },
  })

  useSubscription(DASHBOARD_SUBSCRIPTION, {
    onData: ({
      data: {
        data: { dashboardUpdate },
      },
    }) => {
      // compare currentTabKey with dashboardId
      // if they match, refetch current tab's dashboard query
      if (dashboardUpdate && dashboardUpdate === currentTabKey) {
        runQuery()
      }
    },
  })

  const { data: { myLists: { result: existingLists } = {} } = {} } = useQuery(
    GET_LISTS_OPTIONS,
    {
      fetchPolicy: 'network-only',
    },
  )

  const [addToExistingListMutation, { loading: loadingAddToList }] =
    useMutation(ADD_TO_LIST)

  const [addToNewListMutation, { loading: loadingCreateList }] = useMutation(
    CREATE_LIST,
    {
      refetchQueries: [
        {
          query: GET_LISTS,
          variables: {
            page: 0,
            pageSize: 10,
            searchQuery: '',
            orderBy: 'created',
            ascending: true,
          },
        },
        {
          query: GET_LISTS_OPTIONS,
        },
      ],
    },
  )

  const authorData = authorResponse && authorResponse.getAuthorDashboard
  const editorData = editorResponse && editorResponse.getManagingEditorDashboard
  const handlingEditorData = heResponse && heResponse.getHandlingEditorDashboard
  const reviewerData = reviewerResponse && reviewerResponse.getReviewerDashboard

  const productionData =
    productionResponse && productionResponse.getInProductionDashboard

  const userId = currentUserResponse?.currentUser.id

  const mappedDataHE =
    handlingEditorData && metadata
      ? dashboardDataMapper({
          questions: handlingEditorData.result,
          metadata,
          complexItemSetOptions,
          showAuthor: true,
          showStatus: true,
          showStatusLabel: true,
          userId,
          isArchived: currentShowArchived,
        })
      : []

  const mappedDataAuthor =
    authorData && metadata
      ? dashboardDataMapper({
          questions: authorData.result,
          metadata,
          complexItemSetOptions,
          showStatus: true,
          userId,
          isArchived: currentShowArchived,
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
          showStatusLabel: true,
          userId,
          isArchived: currentShowArchived,
        })
      : []

  const mappedDataProduction =
    productionData && metadata
      ? dashboardDataMapper({
          questions: productionData.result,
          metadata,
          complexItemSetOptions,
          showAuthor: true,
          userId,
        })
      : []

  const mappedDataReviewer =
    reviewerData && metadata
      ? dashboardDataMapper({
          questions: reviewerData.result,
          metadata,
          complexItemSetOptions,
          showStatus: true,
          showStatusLabel: true,
          userId,
        })
      : []

  useEffect(() => {
    if (currentUserResponse) {
      runQuery(currentSearchQuery)
    }
  }, [
    currentTabKey,
    currentPage,
    currentShowArchived,
    currentSearchQuery,
    currentUserResponse,
  ])

  useEffect(() => {
    !handlingEditors &&
      filterGlobalTeamMembers({
        variables: {
          role: 'handlingEditor',
          options: {
            orderBy: 'username',
            ascending: true,
          },
        },
      })
    setHeFilterOptions(createHeAssignedFilters(handlingEditors?.result))
  }, [handlingEditors])

  const runQuery = query => {
    const { query: roleQuery } = queryMapper

    if (!roleQuery[currentTabKey]) {
      // reset dashboardLastUsedTab if it doesn't match user role
      localStorage.setItem('dashboardLastUsedTab', 'author')
    }

    const queryVariables = {
      variables: {
        ...defaultSearchOptions,
        page: currentPage - 1,
        filters: query || {},
        archived: currentShowArchived,
      },
    }

    callOn(currentTabKey, roleQuery, roleQuery.author)(queryVariables)
  }

  const [createQuestionMutation] = useMutation(CREATE_QUESTION, {
    refetchQueries: [{ query: CURRENT_USER }],
  })

  const [assingHandlingEditors] = useMutation(ASSING_HANDLING_EDITORS)

  const [changeArchiveStatusForItems] = useMutation(
    CHANGE_ARCHIVE_STATUS_FOR_ITEMS,
    {
      onCompleted: ({ changeArchiveStatusForItems: itemsAffected }) => {
        const currentData =
          authorData ||
          editorData ||
          handlingEditorData ||
          reviewerData ||
          productionData

        if (currentData.result.length === itemsAffected && currentPage > 1) {
          setCurrentPage(currentPage - 1)
          setSearchParams({
            ...searchParams,
            page: currentPage - 1,
            filters: queryMapper.query || {},
            archived: currentShowArchived,
          })
        }

        runQuery(currentSearchQuery)
      },
    },
  )
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
    const { page, role, query, archived } = options

    setCurrentTabKey(role)
    setCurrentPage(page)
    setCurrentShowArchived(archived)
    setCurrentSearchQuery(
      typeof query === 'object' ? query : { searchQuery: query },
    )

    localStorage.setItem('dashboardLastUsedTab', role)
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

  const handleChangeArchiveStatus = async (questionIds, isArchiving, role) => {
    const mutationData = {
      variables: {
        questionIds,
        isArchiving,
        role,
      },
    }

    return changeArchiveStatusForItems(mutationData)
  }

  const handleAddToList = (existingList, questions) => {
    const mutationData = {
      variables: {
        listId: existingList,
        questionIds: questions,
      },
    }

    return addToExistingListMutation(mutationData).then(response => {
      return new Promise((resolve, reject) => {
        if (response?.data?.addToList) resolve()
        else reject()
      })
    })
  }

  const handleCreateList = (title, questions) => {
    const mutationData = {
      variables: {
        title,
        questions,
      },
    }

    return addToNewListMutation(mutationData).then(response => {
      return new Promise((resolve, reject) => {
        if (response?.data?.createList?.id) resolve()
        else reject()
      })
    })
  }

  // #endregion handlers

  // #region data
  const loading = !currentUserResponse?.currentUser // question list loading is inside the tab
  const isEditor = hasGlobalRole(currentUserResponse?.currentUser, 'editor')
  const isReviewer = hasGlobalRole(currentUserResponse?.currentUser, 'reviewer')

  const isHandlingEditor = hasGlobalRole(
    currentUserResponse?.currentUser,
    'handlingEditor',
  )

  const isProduction = hasGlobalRole(
    currentUserResponse?.currentUser,
    'production',
  )

  const queryMapper = {
    query: {
      author: authorQuery,
      editor: isEditor && editorQuery,
      handlingEditor: isHandlingEditor && handlingEditorQuery,
      production: isProduction && productionQuery,
      reviewer: isReviewer && reviewerQuery,
    },
    called: {
      author: authorCalled,
      editor: editorCalled,
      handlingEditor: heCalled,
      production: productionCalled,
      reviewer: reviewerCalled,
    },
  }

  const tabs = [
    {
      label: 'Authored Items',
      value: 'author',
      questions: mappedDataAuthor,
      totalCount: authorData?.totalCount,
      showBulkActions: true,
      loading: authorLoading,
      filters: authorStatusFilters,
    },
    isEditor && {
      label: 'Editor Items',
      value: 'editor',
      questions: mappedDataEditor,
      totalCount: editorData?.totalCount,
      showBulkActions: true,
      loading: editorLoading,
      filters: [...editorStatusFilters, heFilterOptions],
    },
    isHandlingEditor && {
      label: 'Handling Editor Items',
      value: 'handlingEditor',
      questions: mappedDataHE,
      totalCount: handlingEditorData?.totalCount,
      showBulkActions: true,
      loading: heLoading,
      filters: editorStatusFilters,
    },
    isProduction && {
      label: 'Production Items',
      value: 'production',
      questions: mappedDataProduction,
      totalCount: productionData && productionData.totalCount,
      showBulkActions: false,
      loading: productionLoading,
    },
    isReviewer && {
      label: 'Reviewer Items',
      value: 'reviewer',
      questions: mappedDataReviewer,
      totalCount: reviewerData?.totalCount,
      showBulkActions: false,
      loading: reviewerLoading,
    },
  ].filter(Boolean)

  // #endregion data

  return (
    <>
      <VisuallyHiddenElement as="h1">Dashboard page</VisuallyHiddenElement>
      <Dashboard
        controlledSearchParams={searchParams}
        existingListsOptions={existingLists}
        handlingEditors={handlingEditors?.result || []}
        initialTabKey={initialTabKey}
        loading={loading}
        loadingAddToList={loadingAddToList}
        loadingCreateList={loadingCreateList}
        loadingSearchHEs={loadingSearchHEs}
        onAddToList={handleAddToList}
        onAssignHE={handleAssignHE}
        onChangeArchiveStatus={handleChangeArchiveStatus}
        onClickCreate={handleCreateQuestion}
        onCreateList={handleCreateList}
        onSearch={handleSearch}
        onSearchHE={handleSearchHE}
        // showSort
        // sortOptions
        tabsContent={tabs}
        withFilters={['editor', 'handlingEditor', 'author'].includes(
          currentTabKey,
        )}
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
