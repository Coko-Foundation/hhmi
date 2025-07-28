import React, { useEffect, useState } from 'react'
import { Link, useParams, useHistory, useLocation } from 'react-router-dom'
import { useQuery, useMutation, useLazyQuery } from '@apollo/client'
import { serverUrl } from '@coko/client'
import { ComplexItemSet, Result, Spin } from 'ui'
import {
  dashboardDataMapper,
  useMetadata,
  hasRole,
  hasGlobalRole,
} from '../utilities'

import {
  CURRENT_USER,
  GET_COMPLEX_ITEM_SET,
  GET_COMPLEX_ITEM_SETS_OPTIONS,
  UPDATE_COMPLEX_ITEM_SET,
  CREATE_COMPLEX_ITEM_SET,
  UPLOAD_FILES,
  CREATE_QUESTION,
  FILTER_USERS_OPTIONS,
  ASSIGN_SET_AUTHOR,
  EXPORT_SET_QUESTIONS,
  EXPORT_SET_QUESTIONS_QTI,
  ADD_TO_LIST,
  CREATE_LIST,
  GET_LISTS_OPTIONS,
  GET_LISTS,
} from '../graphql'

const NOTIFICATION_TIMEOUT = 5000

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

const ComplexItemSetPage = () => {
  const { id } = useParams()
  const history = useHistory()
  const { state } = useLocation()

  const { metadata } = useMetadata()

  const { data: { getAvailableSets: complexItemSetOptions } = {} } = useQuery(
    GET_COMPLEX_ITEM_SETS_OPTIONS,
  )

  const { data: { currentUser } = {}, loading: loadingCurrentUser } =
    useQuery(CURRENT_USER)

  const [updateComplexItemSet, { loading: loadingUpdate }] = useMutation(
    UPDATE_COMPLEX_ITEM_SET,
  )

  const [createComplexItemSet, { loading: loadingCreate }] = useMutation(
    CREATE_COMPLEX_ITEM_SET,
    {
      refetchQueries: [{ query: CURRENT_USER }],
    },
  )

  const [upload] = useMutation(UPLOAD_FILES)

  const [createQuestionMutation] = useMutation(CREATE_QUESTION, {
    refetchQueries: [
      { query: CURRENT_USER },
      { query: GET_COMPLEX_ITEM_SETS_OPTIONS },
    ],
  })

  const [submissionMessage, setSubmissionMessage] = useState(null)
  const [submissionStatus, setSubmissionStatus] = useState(null)
  const [questionsPage, setQuestionsPage] = useState(1)
  const [sortAscending, setSortAscending] = useState(false)

  const { data, loading: loadingData } = useQuery(GET_COMPLEX_ITEM_SET, {
    variables: {
      id,
      questionsOptions: {
        page: questionsPage - 1,
        pageSize: 100, // needs discussion
        orderBy: 'publication_date',
        ascending: sortAscending,
      },
    },
    errorPolicy: 'ignore',
    skip: !id,
    fetchPolicy: 'network-only',
  })

  const [assignAuthor] = useMutation(ASSIGN_SET_AUTHOR, {
    refetchQueries: [
      {
        query: GET_COMPLEX_ITEM_SET,
        variables: {
          id,
          questionsOptions: {
            page: questionsPage - 1,
            pageSize: 100, // needs discussion
            orderBy: 'publication_date',
            ascending: sortAscending,
          },
        },
      },
    ],
  })

  const [
    getUsers,
    { data: { filterUsers: { result: possibleAuthors } = {} } = {} },
  ] = useLazyQuery(FILTER_USERS_OPTIONS, {
    variables: {
      params: {
        isActive: true,
        search: '',
      },
    },
  })

  const { data: { myLists: { result: existingLists } = {} } = {} } = useQuery(
    GET_LISTS_OPTIONS,
    {
      fetchPolicy: 'network-only',
    },
  )

  const [exportQuestionsMutation] = useMutation(EXPORT_SET_QUESTIONS)
  const [exportQuestionsQTIMutation] = useMutation(EXPORT_SET_QUESTIONS_QTI)

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

  const handleSortOptionChange = sortBy => {
    sortOptions.filter(opt => opt.isDefault)[0].isDefault = false
    sortOptions.filter(opt => opt.value === sortBy)[0].isDefault = true

    setSortAscending(sortBy === 'date-asc')
  }

  useEffect(() => {
    // if no compelx item set was found for given id, redirect to /sets
    if (data?.complexItemSet === null) {
      history.push('/sets')
    }

    if (data?.complexItemSet?.title) {
      const pageTitle = `${data?.complexItemSet?.title} - Context-Dependent Item Set`
      document.getElementById('page-announcement').innerHTML = pageTitle
      document.title = `${pageTitle} - HHMI Assessment Builder`
    }
  }, [data])

  useEffect(() => {
    if (state?.created) {
      setSubmissionStatus('success')
      setSubmissionMessage(
        'Context-dependent item set was created successfully!',
      )

      setTimeout(() => {
        setSubmissionStatus(null)
        setSubmissionMessage(null)
      }, [NOTIFICATION_TIMEOUT])
    }
  }, [state])

  const handleSave = newValues => {
    const { title, leadingContent } = newValues

    // if we have an id, it means we're updating an existing set
    if (id) {
      updateComplexItemSet({
        variables: {
          id,
          title,
          leadingContent: JSON.stringify(leadingContent),
        },
      })
        .then(() => {
          setSubmissionStatus('success')
          setSubmissionMessage(
            'Context-dependent item set updated successfully',
          )

          setTimeout(() => {
            setSubmissionStatus(null)
            setSubmissionMessage(null)
          }, NOTIFICATION_TIMEOUT)
        })
        .catch(error => {
          setSubmissionStatus('error')
          setSubmissionMessage(error.message)

          setTimeout(() => {
            setSubmissionStatus(null)
            setSubmissionMessage(null)
          }, NOTIFICATION_TIMEOUT)
        })
    } else {
      // otherwise create a new set
      createComplexItemSet({
        variables: { title, leadingContent: JSON.stringify(leadingContent) },
      })
        .then(result => {
          // redirect to context-dependent item set page: /set/:id, id is in the result
          history.push({
            pathname: `/set/${result.data.createComplexItemSet.id}`,
            state: { created: true },
          })
        })
        .catch(error => {
          setSubmissionStatus('error')
          setSubmissionMessage(error.message)

          setTimeout(() => {
            setSubmissionStatus(null)
            setSubmissionMessage(null)
          }, NOTIFICATION_TIMEOUT)
        })
    }
  }

  const handleImageUpload = async file => {
    const mutationVariables = {
      variables: {
        files: [file],
      },
    }

    let uploadedFile

    await upload(mutationVariables)
      .then(res => {
        /* eslint-disable-next-line prefer-destructuring */
        uploadedFile = res.data.uploadFiles[0]
      })
      .catch(e => console.error(e))

    // wax expects a promise here
    return new Promise((resolve, reject) => {
      if (uploadedFile) {
        const { id: fileId, url } = uploadedFile

        resolve({
          url,
          extraData: {
            fileId,
          },
        })
      } else {
        reject()
      }
    })
  }

  const handleCreateQuestion = () => {
    createQuestionMutation({
      variables: {
        input: {
          complexItemSetId: id,
        },
      },
    })
      .then(res => {
        const { id: questionId } = res.data.createQuestion
        history.push(`/question/${questionId}`)
      })
      .catch(e => console.error(e))
  }

  const handleAssignAuthor = authorIds => {
    const mutationData = {
      variables: {
        setId: id,
        userIds: authorIds,
      },
    }

    return assignAuthor(mutationData)
  }

  const handleWordExport = async (questionIds, showFeedback) => {
    const mutationData = {
      variables: {
        setId: id,
        questionIds,
        orderBy: 'publication_date',
        ascending: sortAscending,
        options: { showFeedback },
      },
    }

    return exportQuestionsMutation(mutationData)
      .then(res => {
        const filename = res.data.exportSetQuestions
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

  const handleQTIExport = async questionIds => {
    const mutationData = {
      variables: {
        setId: id,
        questionIds,
        // orderBy: 'publication_date',
        // ascending: sortAscending,
      },
    }

    return exportQuestionsQTIMutation(mutationData)
      .then(res => {
        const filename = res.data.exportSetQuestionsQTI
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

  const handleAddToList = async (existingList, questionIds) => {
    const mutationData = {
      variables: {
        listId: existingList,
        questionIds,
      },
    }

    return addToExistingListMutation(mutationData).then(response => {
      return new Promise((resolve, reject) => {
        if (response?.data?.addToList) resolve()
        else reject()
      })
    })
  }

  const handleCreateList = async (title, questions) => {
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

  const isAdmin = hasGlobalRole(currentUser, 'admin')
  const isEditor = hasGlobalRole(currentUser, 'editor')
  const isAuthor = hasRole(currentUser, 'author', id)
  const isHandlingEditor = hasGlobalRole(currentUser, 'handlingEditor')

  const hasPublishedQuestions = data?.complexItemSet.questions.result.some(
    q => {
      const { versions: [latest] = [] } = q

      // if it contains at least one published question editor gets warning before update
      return latest.published
    },
  )

  if (loadingCurrentUser) {
    return <Result icon={<Spin size={18} spinning />} />
  }

  if (
    id &&
    !(isAuthor || isEditor || isHandlingEditor) &&
    !hasPublishedQuestions
  ) {
    return (
      <Result
        extra={<Link to="/sets">Visit the Sets page</Link>}
        status="404"
        subTitle="Sorry, this set hasn't been published yet."
        title="Set Not Ready"
      />
    )
  }

  return (
    <ComplexItemSet
      activeTab={state?.activeTab}
      authors={possibleAuthors}
      canAssignAuthor={isAdmin}
      canCreate={!!currentUser}
      canEdit={
        isEditor ||
        (isAuthor && !data?.complexItemSet?.containsSubmissions) ||
        state?.created
      }
      currentAuthor={data?.complexItemSet?.authors}
      currentQuestionsPage={questionsPage}
      editWarning={hasPublishedQuestions}
      existingLists={existingLists}
      id={data?.complexItemSet?.id}
      leadingContent={
        data?.complexItemSet?.leadingContent &&
        JSON.parse(data?.complexItemSet?.leadingContent)
      }
      loadAuthors={getUsers}
      loadingAddToList={loadingAddToList}
      loadingCreateList={loadingCreateList}
      loadingData={loadingData}
      loadingSave={loadingUpdate || loadingCreate}
      onAddToList={handleAddToList}
      onAddToNewList={handleCreateList}
      onAssignAuthor={handleAssignAuthor}
      onCreateQuestion={handleCreateQuestion}
      onImageUpload={handleImageUpload}
      onQTIExport={handleQTIExport}
      onQuestionsPageChange={setQuestionsPage}
      onSave={handleSave}
      onSortOptionChange={handleSortOptionChange}
      onWordExport={handleWordExport}
      questions={
        data && metadata && complexItemSetOptions
          ? dashboardDataMapper({
              questions: data?.complexItemSet.questions.result,
              metadata,
              complexItemSetOptions: complexItemSetOptions?.complexItemSets,
              showStatus: !!currentUser,
              showAuthor: true,
              relatedQuestionIds:
                data?.complexItemSet.questions.relatedQuestionsIds,
              testMode: true,
            })
          : []
      }
      sortOptions={sortOptions}
      submissionMessage={submissionMessage}
      submissionStatus={submissionStatus}
      title={data?.complexItemSet?.title}
      totalQuestions={data?.complexItemSet.questions.totalCount}
    />
  )
}

export default ComplexItemSetPage
