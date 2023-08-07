import React, { useEffect, useState } from 'react'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'

import { ComplexItemSet } from 'ui'
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
} from '../graphql'

const NOTIFICATION_TIMEOUT = 5000

const ComplexItemSetPage = () => {
  const { id } = useParams()
  const history = useHistory()
  const { state } = useLocation()

  const { metadata } = useMetadata()

  const { data: complexItemSetOptions } = useQuery(
    GET_COMPLEX_ITEM_SETS_OPTIONS,
  )

  const { data: { currentUser } = {} } = useQuery(CURRENT_USER)

  const [updateComplexItemSet, { loading: loadingUpdate }] = useMutation(
    UPDATE_COMPLEX_ITEM_SET,
  )

  const [createComplexItemSet, { loading: loadingCreate }] = useMutation(
    CREATE_COMPLEX_ITEM_SET,
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

  const { data, loading: loadingData } = useQuery(GET_COMPLEX_ITEM_SET, {
    variables: {
      id,
      questionsOptions: {
        page: questionsPage - 1,
        pageSize: 100, // needs discussion
        orderBy: 'publication_date',
        ascending: false,
      },
    },
    errorPolicy: 'ignore',
    skip: !id,
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    // if no compelx item set was found for given id, redirect to /sets
    if (data?.complexItemSet === null) {
      history.push('/sets')
    }

    if (data?.complexItemSet?.title) {
      const pageTitle = `${data?.complexItemSet?.title} - Complex Item Set`
      document.getElementById('page-announcement').innerHTML = pageTitle
      document.title = `${pageTitle} - HHMI Assessment Builder`
    }
  }, [data])

  useEffect(() => {
    if (state?.created) {
      setSubmissionStatus('success')
      setSubmissionMessage('Complex item set wax created successfully!')

      setTimeout(() => {
        setSubmissionStatus(null)
        setSubmissionMessage(null)
      }, [NOTIFICATION_TIMEOUT])
    }
  }, [state])

  const handleSave = newValues => {
    const { title, leadingContent } = newValues

    if (id) {
      // lazy query update
      updateComplexItemSet({
        variables: {
          id,
          title,
          leadingContent: JSON.stringify(leadingContent),
        },
      })
        .then(() => {
          setSubmissionStatus('success')
          setSubmissionMessage('Complex item set updated successfully')

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
      // lazy query create
      createComplexItemSet({
        variables: { title, leadingContent: JSON.stringify(leadingContent) },
      })
        .then(result => {
          // redirect to complex item set page: /set/:id, id is in the result
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

  const isEditor = hasGlobalRole(currentUser, 'editor')
  const isAuthor = hasRole(currentUser, 'author', id)

  const hasPublishedQuestions = data?.complexItemSet.questions.result.some(
    q => {
      const { versions: [latest] = [] } = q

      // if it contains at least one published question editor gets warning before update
      return latest.published
    },
  )

  return (
    <ComplexItemSet
      activeTab={state?.activeTab}
      canCreate={!!currentUser}
      canEdit={
        isEditor ||
        (isAuthor && !data?.complexItemSet?.containsSubmissions) ||
        state?.created
      }
      currentQuestionsPage={questionsPage}
      editWarning={hasPublishedQuestions}
      id={data?.complexItemSet?.id}
      leadingContent={
        data?.complexItemSet?.leadingContent &&
        JSON.parse(data?.complexItemSet?.leadingContent)
      }
      loadingData={loadingData}
      loadingSave={loadingUpdate || loadingCreate}
      onCreateQuestion={handleCreateQuestion}
      onImageUpload={handleImageUpload}
      onQuestionsPageChange={setQuestionsPage}
      onSave={handleSave}
      questions={
        data && metadata && complexItemSetOptions
          ? dashboardDataMapper(
              data?.complexItemSet.questions.result,
              metadata,
              complexItemSetOptions?.complexItemSets,
              !!currentUser,
              true,
              {
                filters: { complexItemSet: [id] },
                ascending: true,
                orderBy: 'publication_date',
              },
              true,
            )
          : []
      }
      submissionMessage={submissionMessage}
      submissionStatus={submissionStatus}
      title={data?.complexItemSet?.title}
      totalQuestions={data?.complexItemSet.questions.totalCount}
    />
  )
}

export default ComplexItemSetPage
