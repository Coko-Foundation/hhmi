import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { debounce } from 'lodash'
import { questionDataTransformer, questionDataMapper } from '../utilities'

import { QUESTION, AUTO_SAVE_QUESTION, SUBMIT_QUESTION } from '../graphql'
import { Question } from '../ui'

const QuestionPage = () => {
  const { id } = useParams()
  const history = useHistory()

  const { data, loading, error } = useQuery(QUESTION, { variables: { id } })

  const [submitQuestion, { loading: submitting, error: mutationError }] =
    useMutation(SUBMIT_QUESTION)

  const [autoSaveQuestion] = useMutation(AUTO_SAVE_QUESTION)

  const handleClickBackButton = () => {
    history.push('/')
  }

  const handleMetadataAutoSave = values => {
    autoSaveQuestion({
      variables: {
        id,
        input: {
          ...questionDataTransformer(values),
          questionVersionId: data.question.versions[0].id,
        },
      },
    })
  }

  const handleEditorContentAutoSave = debounce(content => {
    autoSaveQuestion({
      variables: {
        id,
        input: {
          content,
          questionVersionId: data.question.versions[0].id,
        },
      },
    })
  }, 2000)

  const handleQuestionSubmit = values => {
    const { agreedTc, editorContent: content, metadata } = values
    submitQuestion({
      variables: {
        id,
        input: {
          agreedTc,
          ...questionDataTransformer(metadata),
          content,
          submitted: true,
          questionVersionId: data.question.versions[0].id,
        },
      },
    })
  }

  if (mutationError) {
    console.error(error)
  }

  if (error) {
    console.error(error)
    return null
  }

  if (!data) return null
  const initialMetadataValues = questionDataMapper(data.question.versions[0])
  const editorContent = data.question.versions[0].content
  const { agreedTc } = data.question

  return (
    <Question
      editorContent={editorContent}
      initialMetadataValues={initialMetadataValues}
      isSubmitted={data.question.versions[0].submitted}
      loading={loading}
      onClickBackButton={handleClickBackButton}
      onEditorContentAutoSave={handleEditorContentAutoSave}
      onMetadataAutoSave={handleMetadataAutoSave}
      onQuestionSubmit={handleQuestionSubmit}
      questionAgreedTc={agreedTc}
      submitting={submitting}
    />
  )
}

export default QuestionPage
