import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'
// import { questionDataTransformer, questionDataMapper } from '../utilities'

import { Question, resources } from 'ui'

import {
  CURRENT_USER,
  QUESTION,
  SUBMIT_QUESTION,
  UPDATE_QUESTION,
  REJECT_QUESTION,
  MOVE_QUESTION_VERSION_TO_REVIEW,
  PUBLISH_QUESTION_VERSION,
} from '../graphql'
import { metadataForQuestionPage, hasRole, hasGlobalRole } from '../utilities'

const AUTOSAVE_DELAY = 500

// #region transformations
const metadataApiToUi = values => {
  const courseData = [...values.courses]

  const transformedCoursesData = []

  courseData.forEach(({ course, units }) => {
    if (units.length > 1) {
      units.forEach(unit => {
        transformedCoursesData.push({
          course,
          ...unit,
        })
      })
    } else {
      transformedCoursesData.push({
        course,
        ...units[0],
      })
    }
  })

  return {
    ...values,
    courses: transformedCoursesData,
  }
}

const metadataUiToApi = values => {
  // filter empty topics
  const topicFields = t => {
    if (!t.topic) return null
    return t
  }

  const topics = values.topics.map(t => topicFields(t)).filter(Boolean)

  // transform courses structure
  const transformedCoursesData = []

  values.courses.forEach(({ course, ...units }) => {
    const prevIndex = transformedCoursesData.findIndex(c => c.course === course)

    if (prevIndex < 0) {
      transformedCoursesData.push({
        course,
        units: [units],
      })
    } else {
      transformedCoursesData[prevIndex].units.push(units)
    }
  })

  // filter empty courses
  const coursesFields = course => {
    if (!course.course) return null
    return course
  }

  const courses = transformedCoursesData
    .map(course => coursesFields(course))
    .filter(Boolean)

  const metadataToSave = {
    topics,
    courses,
    keywords: values.keywords || [],
    biointeractiveResources: values.biointeractiveResources || [],
    cognitiveLevel: values.cognitiveLevel || null,
    affectiveLevel: values.affectiveLevel || null,
    psychomotorLevel: values.psychomotorLevel || null,
    readingLevel: values.readingLevel || null,
    questionType: values.questionType || null,
  }

  return metadataToSave
}
// #endregion transformations

const QuestionPage = () => {
  // #region hooks
  const { id } = useParams()
  const history = useHistory()

  const [initialMetadata, setInitialMetadata] = useState({})

  const { data, loading, error } = useQuery(QUESTION, {
    variables: { id },
  })

  const { data: currentUserData } = useQuery(CURRENT_USER)

  const [updateQuestionMutation, { error: updateError }] =
    useMutation(UPDATE_QUESTION)

  const [submitQuestionMutation, { error: submitError }] =
    useMutation(SUBMIT_QUESTION)

  const [rejectQuestionMutation, { error: rejectError }] = useMutation(
    REJECT_QUESTION,
    { variables: { questionId: id } },
  )

  const [moveQuestionVersionToReviewMutation, { error: moveToReviewError }] =
    useMutation(MOVE_QUESTION_VERSION_TO_REVIEW, {
      refetchQueries: [{ query: QUESTION, variables: { id } }],
    })

  const [publishQuestionVersionMutation, { error: publishError }] = useMutation(
    PUBLISH_QUESTION_VERSION,
    {
      refetchQueries: [{ query: QUESTION, variables: { id } }],
    },
  )
  // #endregion hooks

  // #region data wrangling
  if (
    error ||
    updateError ||
    submitError ||
    rejectError ||
    moveToReviewError ||
    publishError ||
    !data
  ) {
    const e =
      error ||
      updateError ||
      submitError ||
      rejectError ||
      moveToReviewError ||
      publishError

    if (e) console.error(e)
    return null
  }

  const question = data?.question
  const version = question?.versions[0] // latest only requested

  const editorContent = version?.content && JSON.parse(version.content)

  const user = currentUserData?.currentUser
  const isEditor = hasGlobalRole(user, 'editor')
  const isAuthor = hasRole(user, 'author', id)

  // const isEditor = true

  if (isEmpty(initialMetadata) && version) {
    setInitialMetadata(metadataApiToUi(version))
  }
  // #endregion data wrangling

  // #region handlers
  const debouncedEditorAutoSave = debounce((content, resolve) => {
    const mutationData = {
      variables: {
        questionId: id,
        questionVersionId: version.id,
        input: {
          content: JSON.stringify(content),
          lastEdit: new Date(),
        },
      },
    }

    updateQuestionMutation(mutationData).then(() => resolve())
  }, AUTOSAVE_DELAY)

  const handleEditorContentAutoSave = content => {
    return new Promise(resolve => {
      debouncedEditorAutoSave(content, resolve)
    })
  }

  const handleMetadataAutoSave = values => {
    const metadataToSave = metadataUiToApi(values)

    const mutationData = {
      variables: {
        questionId: id,
        questionVersionId: version.id,
        input: {
          ...metadataToSave,
          lastEdit: new Date(),
        },
      },
    }

    return updateQuestionMutation(mutationData)
  }

  const handleClickBackButton = () => {
    history.goBack()
  }

  const handleQuestionSubmit = questionData => {
    const { editorContent: latestContent } = questionData

    const mutationData = {
      variables: {
        questionId: id,
        questionVersionId: version.id,
        input: {
          agreedTc: true,
          content: JSON.stringify({
            type: 'doc',
            content: latestContent,
          }),
        },
      },
    }

    submitQuestionMutation(mutationData)
  }

  const handleClickAssignHE = () => {}

  const handleClickNextButton = () => {}

  const handleClickPreviousButton = () => {}

  const handleMoveToReview = () => {
    const mutationData = {
      variables: {
        questionVersionId: version.id,
      },
    }

    moveQuestionVersionToReviewMutation(mutationData)
  }

  const handlePublish = () => {
    const mutationData = {
      variables: {
        questionVersionId: version.id,
      },
    }

    publishQuestionVersionMutation(mutationData)
  }

  const handleReject = () => {
    rejectQuestionMutation()
  }
  // #endregion handlers

  return (
    <Question
      editorContent={editorContent}
      editorView={isEditor && !isAuthor}
      facultyView={false} //
      initialMetadataValues={initialMetadata}
      isPublished={version.published}
      isSubmitted={version.submitted}
      isUnderReview={version.underReview}
      loading={loading}
      metadata={metadataForQuestionPage}
      onClickAssignHE={handleClickAssignHE}
      onClickBackButton={handleClickBackButton}
      onClickNextButton={handleClickNextButton}
      onClickPreviousButton={handleClickPreviousButton}
      onEditorContentAutoSave={handleEditorContentAutoSave}
      onMetadataAutoSave={handleMetadataAutoSave}
      onMoveToReview={handleMoveToReview}
      onPublish={handlePublish}
      onQuestionSubmit={handleQuestionSubmit}
      onReject={handleReject}
      questionAgreedTc={false} //
      resources={resources}
      showAssignHEButton={false} //
      showNextQuestionLink={false} //
      submitting={false} //
      updated={version.lastEdit}
    />
  )
}

export default QuestionPage
