import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory, useParams, Link, useLocation } from 'react-router-dom'
import { useQuery, useMutation, useLazyQuery } from '@apollo/client'
import debounce from 'lodash/debounce'
// import { questionDataTransformer, questionDataMapper } from '../utilities'

import { serverUrl } from '@coko/client'

import { Question, Result, Modal as AntModal, VisuallyHiddenElement } from 'ui'

import {
  CURRENT_USER,
  QUESTION,
  SUBMIT_QUESTION,
  UPDATE_QUESTION,
  REJECT_QUESTION,
  MOVE_QUESTION_VERSION_TO_REVIEW,
  MOVE_QUESTION_VERSION_TO_PRODUCTION,
  PUBLISH_QUESTION_VERSION,
  GET_PREV_OR_NEXT_QUESTION_ID,
  GENERATE_WORD_FILE,
  GENERATE_SCORM_ZIP,
  GET_RESOURCES,
  CREATE_NEW_VERSION,
  UPLOAD_FILES,
} from '../graphql'
import { useMetadata, hasRole, hasGlobalRole } from '../utilities'

const Modal = AntModal.default
const ModalContext = React.createContext(null)

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

const QuestionPage = props => {
  const { testMode } = props

  // #region hooks
  const { id } = useParams()
  const history = useHistory()
  const { metadata } = useMetadata()

  // const [modal, contextHolder] = Modal.useModal()

  const { data, loading, error } = useQuery(QUESTION, {
    variables: {
      id,
      published: testMode, // get latest published version if in test mode
    },
  })

  const { data: currentUserData } = useQuery(CURRENT_USER)

  const { data: resourcesData } = useQuery(GET_RESOURCES)

  const [updateQuestionMutation, { error: updateError }] =
    useMutation(UPDATE_QUESTION)

  const [submitQuestionMutation, { error: submitError }] =
    useMutation(SUBMIT_QUESTION)

  const [rejectQuestionMutation, { error: rejectError }] = useMutation(
    REJECT_QUESTION,
    { variables: { questionId: id } },
  )

  const [moveQuestionVersionToReviewMutation, { error: moveToReviewError }] =
    useMutation(MOVE_QUESTION_VERSION_TO_REVIEW)

  const [
    moveQuestionVersionToProductionMutation,
    { error: moveToProductionError },
  ] = useMutation(MOVE_QUESTION_VERSION_TO_PRODUCTION)

  const [publishQuestionVersionMutation, { error: publishError }] = useMutation(
    PUBLISH_QUESTION_VERSION,
    {
      refetchQueries: [{ query: QUESTION, variables: { id, published: true } }],
    },
  )

  const [createNewQuestionVersionMutation, { error: newVersionError }] =
    useMutation(CREATE_NEW_VERSION, {
      variables: { questionId: id },
    })

  /* setup Prev/Next question functions */
  // read state from location to get filter values, if any
  const location = useLocation()
  const { state } = location

  // initialize searchParams by state.searchParams
  // if no state, default to no filters, order by publication_date in descending order
  const [searchParams] = useState(
    state?.searchParams || {
      ascending: false,
      orderBy: 'publication_date',
    },
  )

  // declare lazy query to be called when clicking the next question or previous question buttons
  const [getQuestion] = useLazyQuery(GET_PREV_OR_NEXT_QUESTION_ID)

  const [generateWordFileMutation, { loading: generateWordFileLoading }] =
    useMutation(GENERATE_WORD_FILE)

  const [generateScormZipMutation, { loading: generateScormZipLoading }] =
    useMutation(GENERATE_SCORM_ZIP)

  const [upload] = useMutation(UPLOAD_FILES)
  // #endregion hooks

  // #region data wrangling
  if (
    error ||
    updateError ||
    submitError ||
    rejectError ||
    moveToReviewError ||
    moveToProductionError ||
    publishError ||
    newVersionError ||
    !data
  ) {
    const e =
      error ||
      updateError ||
      submitError ||
      rejectError ||
      moveToReviewError ||
      moveToProductionError ||
      publishError ||
      newVersionError

    if (e) console.error(e)
    return null
  }

  const question = data?.question
  const version = question?.versions[0] // latest only requested

  const editorContent = version?.content && JSON.parse(version.content)

  const user = currentUserData?.currentUser
  const isEditor = hasGlobalRole(user, 'editor')
  const isAuthor = hasRole(user, 'author', id)

  if (testMode && !version.published) {
    return (
      <Result
        // replace link with a Button with to="/dashboard" after MR is merged
        extra={<Link to="/discover">Visit the Discover page</Link>}
        status="404"
        subTitle="Sorry, this question hasn't been published yet."
        title="Question Not Ready"
      />
    )
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
        },
      },
    }

    updateQuestionMutation(mutationData).then(() => resolve())
  }, AUTOSAVE_DELAY)

  const handleEditorContentAutoSave = content => {
    // console.log(content)
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
        },
      },
    }

    return updateQuestionMutation(mutationData)
  }

  const handleClickBackButton = () => {
    if (testMode) {
      // quetions in testMode are found in discovery, and all questions in discovery are in testMode, so back == discover page
      history.push('/discover')
    } else {
      history.push('/dashboard')
    }
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

    return submitQuestionMutation(mutationData)
  }

  const handleClickAssignHE = () => {}

  const handleGetQuestionButton = which => {
    const variables = {
      which,
      currentQuestion: id,
      params: {
        filters: searchParams.filters,
        searchQuery: searchParams.query,
      },
      options: {
        orderBy: searchParams.orderBy,
        ascending: searchParams.ascending,
      },
    }

    getQuestion({
      variables,
    }).then(response => {
      const {
        data: {
          getPreviousOrNextQuestion: { questionId },
        },
      } = response

      if (questionId === '0') {
        Modal.info({
          title: `No ${which === 'NEXT' ? 'next' : 'previous'} question`,
          content: 'There are no more questions in this direction',
        })
      } else {
        history.push({
          pathname: `/question/${questionId}/test`,
          state: searchParams,
        })
      }
    })
  }

  const handleMoveToReview = () => {
    const mutationData = {
      variables: {
        questionVersionId: version.id,
      },
    }

    return moveQuestionVersionToReviewMutation(mutationData)
  }

  const handleMoveToProduction = () => {
    const mutationData = {
      variables: {
        questionVersionId: version.id,
      },
    }

    return moveQuestionVersionToProductionMutation(mutationData)
  }

  const handlePublish = () => {
    const mutationData = {
      variables: {
        questionVersionId: version.id,
      },
    }

    return publishQuestionVersionMutation(mutationData)
  }

  const handleReject = () => {
    return rejectQuestionMutation()
  }

  const handleExportToScorm = () => {
    const mutationVariables = {
      questionVersionId: version.id,
    }

    generateScormZipMutation({ variables: mutationVariables })
      .then(res => {
        const filename = res.data.generateScormZip
        const url = `${serverUrl}/api/download/${filename}`
        window.location.assign(url)
      })
      .catch(e => {
        console.error(e)
        Modal.error({
          title: 'Conversion error',
          content:
            'Something went wrong with your conversion! Please contact your system administrator.',
        })
      })
  }

  const handleExportToWord = options => {
    const { showFeedback, showMetadata } = options

    const mutationVariables = {
      questionVersionId: version.id,
      options: {
        showFeedback,
        showMetadata,
      },
    }

    generateWordFileMutation({ variables: mutationVariables })
      .then(res => {
        const filename = res.data.generateWordFile
        const url = `${serverUrl}/api/download/${filename}`
        window.location.assign(url)
      })
      .catch(e => {
        console.error(e)
        Modal.error({
          title: 'Conversion error',
          content:
            'Something went wrong with your conversion! Please contact your system administrator.',
        })
      })
  }

  const handleCreateNewVersion = () => {
    const mutationData = {
      variables: {
        questionId: id,
      },
    }

    createNewQuestionVersionMutation(mutationData)
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
  // #endregion handlers

  return (
    <>
      {/* TODO: create more specific heading */}
      <VisuallyHiddenElement as="h1">Question Page</VisuallyHiddenElement>
      <ModalContext.Provider>
        <Question
          editorContent={editorContent}
          editorView={isEditor && !isAuthor}
          facultyView={testMode}
          initialMetadataValues={testMode ? version : metadataApiToUi(version)}
          isInProduction={version.inProduction}
          isPublished={version.published}
          isRejected={question.rejected}
          isSubmitted={version.submitted}
          isUnderReview={version.underReview}
          isUserLoggedIn={!!user}
          loading={loading}
          metadata={metadata}
          onClickAssignHE={handleClickAssignHE}
          onClickBackButton={handleClickBackButton}
          onClickExportToScorm={testMode ? handleExportToScorm : null}
          onClickExportToWord={handleExportToWord}
          onClickNextButton={() => handleGetQuestionButton('NEXT')}
          onClickPreviousButton={() => handleGetQuestionButton('PREV')}
          onCreateNewVersion={handleCreateNewVersion}
          onEditorContentAutoSave={handleEditorContentAutoSave}
          onImageUpload={handleImageUpload}
          onMetadataAutoSave={handleMetadataAutoSave}
          onMoveToProduction={handleMoveToProduction}
          onMoveToReview={handleMoveToReview}
          onPublish={handlePublish}
          onQuestionSubmit={handleQuestionSubmit}
          onReject={handleReject}
          questionAgreedTc={false} //
          resources={resourcesData?.getResources}
          scormZipLoading={generateScormZipLoading}
          showAssignHEButton={false} //
          showNextQuestionLink={false} //
          submitting={false} //
          updated={version.lastEdit}
          wordFileLoading={generateWordFileLoading}
        />
        {/* {contextHolder} */}
      </ModalContext.Provider>
    </>
  )
}

QuestionPage.propTypes = {
  testMode: PropTypes.bool,
}

QuestionPage.defaultProps = {
  testMode: false,
}

export default QuestionPage
