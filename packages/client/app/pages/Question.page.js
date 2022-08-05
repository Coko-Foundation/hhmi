import React from 'react'
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
const metadataApiToUi = v => {
  if (!v) return {}

  const [firstTopic, ...otherTopics] = v.topics
  const [firstCourse /* ..otherCourses */] = v.courses

  const course = firstCourse?.course
  const units = firstCourse?.units

  const firstUnit = units && units[0]
  const otherUnits = units && units.slice(1)

  const values = {
    ...firstTopic,
    supplementaryTopics: otherTopics,

    framework: course,
    ...firstUnit,
    supplementaryFields: otherUnits,

    keywords: v.keywords,
    biointeractiveResources: v.biointeractiveResources,

    cognitiveLevel: v.cognitiveLevel,
    affectiveLevel: v.affectiveLevel,
    psychomotorLevel: v.psychomotorLevel,
    readingLevel: v.readingLevel,
  }

  return values
}

const metadataUiToApi = values => {
  const topicFields = t => {
    if (!t.topic) return null

    return {
      topic: t.topic,
      subtopic: t.subtopic || null,
    }
  }

  const topics = [
    values.topic && {
      topic: values.topic,
      subtopic: values.subtopic || null,
    },
    ...(values.supplementaryTopics || [])
      .map(t => topicFields(t))
      .filter(Boolean),
  ].filter(Boolean)

  const coursesFields = course => {
    if (!course) return null

    return {
      unit: course.unit,
      courseTopic: course.courseTopic,
      learningObjective: course.learningObjective || null,
      essentialKnowledge: course.essentialKnowledge || null,
      application: course.application || null,
      skill: course.skill || null,
      understanding: course.understanding || null,
    }
  }

  const courses = [
    values.framework && {
      course: values.framework,
      units: [
        coursesFields(values),
        ...(values.supplementaryFields || []).map(f => coursesFields(f)),
      ],
    },
  ].filter(Boolean)

  const metadataToSave = {
    topics,
    courses,
    keywords: values.keywords || [],
    biointeractiveResources: values.biointeractiveResources || [],
    cognitiveLevel: values.cognitiveLevel || null,
    affectiveLevel: values.affectiveLevel || null,
    psychomotorLevel: values.psychomotorLevel || null,
    readingLevel: values.readingLevel || null,
  }

  return metadataToSave
}
// #endregion transformations

const QuestionPage = () => {
  // #region hooks
  const { id } = useParams()
  const history = useHistory()

  const [initialMetadata, setInitialMetadata] = React.useState({})

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

  // #region functions
  const handleEditorContentAutoSave = debounce(content => {
    const mutationData = {
      variables: {
        questionId: id,
        questionVersionId: version.id,
        input: {
          content: JSON.stringify(content),
        },
      },
    }

    updateQuestionMutation(mutationData)
  }, AUTOSAVE_DELAY)

  const handleMetadataAutoSave = values => {
    const metadataToSave = metadataUiToApi(values)

    const mutationData = {
      variables: {
        questionId: id,
        questionVersionId: version.id,
        input: metadataToSave,
      },
    }

    updateQuestionMutation(mutationData)
  }

  const handleClickBackButton = () => {
    history.goBack()
  }

  const handleQuestionSubmit = () => {
    const mutationData = {
      variables: {
        questionId: id,
        questionVersionId: version.id,
        input: {
          agreedTc: true,
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
  // #endregion functions

  return (
    <Question
      editorContent={editorContent}
      editorView={isEditor && !isAuthor}
      facultyView={false} //
      initialMetadataValues={initialMetadata}
      isSubmitted={version.submitted}
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
      underReview={version.underReview}
    />
  )
}

export default QuestionPage
