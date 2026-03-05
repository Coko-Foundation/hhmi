import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import DOMPurify from 'dompurify'
import { serverUrl, useCurrentUser } from '@coko/client'
import { ListContent } from 'ui'
import {
  GET_LIST,
  REMOVE_FROM_LIST,
  EXPORT_QUESTIONS,
  EXPORT_QUESTIONS_QTI,
  REORDER_LIST,
  GET_COMPLEX_ITEM_SETS_OPTIONS,
} from '../graphql'
import { useMetadata, dashboardDataMapper, hasRole } from '../utilities'

const PAGE_SIZE = 10

const ListContentPage = () => {
  const { id } = useParams()

  const { metadata } = useMetadata()
  const { currentUser } = useCurrentUser()
  const isAuthor = hasRole(currentUser, 'author', id)

  const [searchParams, setSearchParams] = useState({
    query: '',
    page: 1,
    pageSize: 1000, // show all questions for 'custom' order, otherwise it would be PAGE_SIZE,
    orderBy: 'custom',
    ascending: false,
    key: 0,
  })

  const {
    data: {
      list: {
        title,
        questions: { result: questions, totalCount, relatedQuestionsIds } = {},
      } = {},
    } = {},
    loading,
  } = useQuery(GET_LIST, {
    variables: {
      id,
      questionsQuery: searchParams.query,
      questionsOptions: {
        page: Math.max(searchParams.page - 1, 0),
        pageSize: searchParams.pageSize,
        orderBy: searchParams.orderBy,
        ascending: searchParams.ascending,
      },
    },
    fetchPolicy: 'network-only',
    onCompleted: ({ list: { title: listTitle } = {} }) => {
      const sanitizedTitle = DOMPurify.sanitize(listTitle)
      document.title = `${sanitizedTitle}, list page - Assessment Builder`
      document.getElementById(
        'page-announcement',
      ).innerHTML = `${sanitizedTitle}, list page`
    },
  })

  const { data: { getAvailableSets: complexItemSetOptions } = {} } = useQuery(
    GET_COMPLEX_ITEM_SETS_OPTIONS,
    { variables: { publishedOnly: true } },
  )

  const [removeFromListMutation] = useMutation(REMOVE_FROM_LIST, {
    onCompleted: ({ deleteFromList }) => {
      const nrOfPages = Math.ceil(totalCount / searchParams.pageSize)
      const itemsInCurrentPage = questions.length

      if (
        searchParams.page === nrOfPages &&
        itemsInCurrentPage === deleteFromList
      ) {
        setSearchParams(currentQuery => ({
          ...currentQuery,
          page: searchParams.page - 1,
        }))
      }
    },
    refetchQueries: [
      {
        query: GET_LIST,
        variables: {
          id,
          questionsQuery: searchParams.query,
          questionsOptions: {
            page: searchParams.page - 1,
            pageSize: searchParams.pageSize,
            orderBy: searchParams.orderBy,
            ascending: searchParams.ascending,
          },
        },
      },
    ],
  })

  const [exportQuestionsMutation] = useMutation(EXPORT_QUESTIONS)

  const [exportQuestionsToQTIMutation] = useMutation(EXPORT_QUESTIONS_QTI)

  const [reorderListMutation] = useMutation(REORDER_LIST, {
    refetchQueries: [
      {
        query: GET_LIST,
        variables: {
          id,
          questionsQuery: searchParams.query,
          questionsOptions: {
            page: searchParams.page - 1,
            pageSize: searchParams.pageSize,
            orderBy: searchParams.orderBy,
            ascending: searchParams.ascending,
          },
        },
      },
    ],
  })

  const handleSearch = params => {
    setSearchParams({
      ...params,
      orderBy: params.orderBy === 'custom' ? 'custom' : 'publication_date',
      ascending: params.orderBy !== 'date-desc',
    })
  }

  const handleRemoveFromList = questionIds => {
    const mutationData = {
      variables: {
        listId: id,
        questionIds,
      },
    }

    return removeFromListMutation(mutationData)
  }

  const handleExport = async (
    questionIds,
    orderBy,
    { showFeedback, showMetadata },
  ) => {
    const mutationData = {
      variables: {
        listId: id,
        questionIds,
        orderBy: orderBy === 'custom' ? 'custom' : 'publicationDate',
        ascending: orderBy !== 'date-desc',
        options: { showFeedback, showMetadata },
      },
    }

    return exportQuestionsMutation(mutationData)
      .then(res => {
        const filename = res.data.exportQuestions
        const url = `${serverUrl}/api/download/${filename}`
        window.location.assign(url)
      })
      .catch(e => {
        console.error(e)
        return new Promise((_resolve, reject) => {
          reject()
        })
      })
  }

  const handleExportToQTI = async (questionIds, orderBy) => {
    const mutationData = {
      variables: {
        listId: id,
        questionIds,
        orderBy: orderBy === 'custom' ? 'custom' : 'publicationDate',
        ascending: orderBy !== 'date-desc',
      },
    }

    return exportQuestionsToQTIMutation(mutationData)
      .then(res => {
        const filename = res.data.exportQuestionsQTI
        const url = `${serverUrl}/api/download/${filename}`
        window.location.assign(url)
      })
      .catch(e => {
        console.error(e)
        return new Promise((_resolve, reject) => {
          reject(e.message)
        })
      })
  }

  const handleDragEnd = result => {
    const { destination, source /* draggableId */ } = result
    let hasErrors = false

    // check if no destination, or if no rearrangement happened
    // if so, just return with no errors
    if (!destination) return { hasErrors }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return { hasErrors }

    // reorder the question ids after dragging has ended
    const orderedQuestionIds = questions.map(question => question.id)
    const draggedElement = orderedQuestionIds.splice(source.index, 1)
    orderedQuestionIds.splice(destination.index, 0, ...draggedElement)

    // get a temporary copy of the new order of questions
    const sortedQuestions = [...questions].sort(
      (a, b) =>
        orderedQuestionIds.indexOf(a.id) - orderedQuestionIds.indexOf(b.id),
    )

    // check if questions belonging to a set are not back-to-back
    const complexItemSets = sortedQuestions.map(
      question => question.versions[0].complexItemSetId,
    )

    const uniqueSets = [...new Set(complexItemSets)].filter(s => !!s)

    if (uniqueSets.length) {
      // for each set, find index of first and last question of the set
      // check all questions in between if they belong the the same set
      // if not, set hasErrors = true
      uniqueSets.forEach(setId => {
        const firstItemIndex = sortedQuestions.findIndex(
          q => q.versions[0].complexItemSetId === setId,
        )

        const lastItemIndex = sortedQuestions.findLastIndex(
          q => q.versions[0].complexItemSetId === setId,
        )

        for (let i = firstItemIndex + 1; i < lastItemIndex; i += 1) {
          if (sortedQuestions[i].versions[0].complexItemSetId !== setId) {
            hasErrors = true
            return
          }
        }
      })
    }

    if (!hasErrors) {
      // sort questions so that they appear in the new order visually
      questions.sort(
        (a, b) =>
          orderedQuestionIds.indexOf(a.id) - orderedQuestionIds.indexOf(b.id),
      )

      // prepare mutation data and execute mutation to persist new order
      const mutationData = {
        variables: {
          listId: id,
          customOrder: orderedQuestionIds,
        },
      }

      reorderListMutation(mutationData)
      return { hasErrors }
    }

    return { hasErrors }
  }

  return (
    <ListContent
      isAuthor={isAuthor}
      loading={loading}
      onDragEnd={handleDragEnd}
      onExport={handleExport}
      onExportQTI={handleExportToQTI}
      onRemoveFromList={handleRemoveFromList}
      onSearch={handleSearch}
      questions={
        questions && metadata
          ? dashboardDataMapper({
              questions,
              metadata,
              complexItemSetOptions,
              showStatus: false,
              showAuthor: false,
              relatedQuestionsIds,
              testMode: true,
              includeType: true,
              showPublishedDate: true,
            })
          : []
      }
      questionsPerPage={PAGE_SIZE}
      title={DOMPurify.sanitize(title)}
      totalCount={totalCount}
    />
  )
}

ListContentPage.propTypes = {}
ListContentPage.defaultProps = {}

export default ListContentPage
