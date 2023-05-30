import React, { useState, useRef } from 'react'

import { Discover, VisuallyHiddenElement } from 'ui'
import { useQuery, useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import { useCurrentUser } from '@coko/client'

import { useMetadata, dashboardDataMapper } from '../utilities'

import {
  GET_PUBLISHED_QUESTIONS,
  DUPLICATE_QUESTION,
  GET_LISTS_OPTIONS,
  ADD_TO_LIST,
  CREATE_LIST,
  GET_LISTS,
  CURRENT_USER,
} from '../graphql'

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

  const { currentUser } = useCurrentUser()

  const { metadata } = useMetadata()
  const initialRender = useRef(true)
  const history = useHistory()

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

  const [duplicateQuestionMutation, { loading: loadingDuplicateQuestion }] =
    useMutation(DUPLICATE_QUESTION, {
      refetchQueries: [CURRENT_USER],
      onCompleted: ({ duplicateQuestion }) => {
        history.push(`/question/${duplicateQuestion.id}`)
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

  const handleSearch = params => {
    setSearchParams({
      ...params,
      orderBy: 'publication_date',
      ascending: params.orderBy !== 'date-desc',
    })
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

  const handleDuplicateQuestion = question => {
    const mutationData = {
      variables: {
        questionId: question,
      },
    }

    duplicateQuestionMutation(mutationData).catch(err => console.error(err))
  }

  return (
    <>
      <VisuallyHiddenElement as="h1">Discover page</VisuallyHiddenElement>
      <Discover
        existingListsOptions={existingLists}
        isUserLoggedIn={!!currentUser}
        loading={loading}
        loadingAddToList={loadingAddToList}
        loadingCreateList={loadingCreateList}
        loadingDuplicateQuestion={loadingDuplicateQuestion}
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
