import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory, useParams, Link, useLocation } from 'react-router-dom'
import { useQuery, useMutation, useLazyQuery } from '@apollo/client'
import debounce from 'lodash/debounce'
// import { questionDataTransformer, questionDataMapper } from '../utilities'

import { serverUrl } from '@coko/client'

import { Question, Result, VisuallyHiddenElement } from 'ui'

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

const AUTOSAVE_DELAY = 500

// #region transformations
const metadataApiToUi = (values, testMode) => {
  if (!values) return {}

  if (testMode) return values

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

  const {
    data: { question } = {},
    loading,
    error,
  } = useQuery(QUESTION, {
    variables: {
      id,
      published: testMode, // get latest published version if in test mode
    },
  })

  const { data: { currentUser } = {} } = useQuery(CURRENT_USER)

  const { data: { getResources } = {} } = useQuery(GET_RESOURCES)

  const [updateQuestionMutation] = useMutation(UPDATE_QUESTION)

  const [submitQuestionMutation] = useMutation(SUBMIT_QUESTION)

  const [rejectQuestionMutation] = useMutation(REJECT_QUESTION, {
    variables: { questionId: id },
  })

  const [moveQuestionVersionToReviewMutation] = useMutation(
    MOVE_QUESTION_VERSION_TO_REVIEW,
  )

  const [moveQuestionVersionToProductionMutation] = useMutation(
    MOVE_QUESTION_VERSION_TO_PRODUCTION,
  )

  const [publishQuestionVersionMutation] = useMutation(
    PUBLISH_QUESTION_VERSION,
    {
      refetchQueries: [{ query: QUESTION, variables: { id, published: true } }],
    },
  )

  const [createNewQuestionVersionMutation] = useMutation(CREATE_NEW_VERSION, {
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

  // keep a reactive copy of page title have an updated h1
  const [pageTitle, setPageTitle] = useState('')

  const version = question?.versions[0]

  useEffect(() => {
    if (version && metadata) {
      // udpate title for published questions
      if (testMode) {
        const questionType = metadata?.questionTypes.find(
          type => type.value === version.questionType,
        )

        const courses = version.courses.map(c => c.course)

        const courseNames = metadata?.frameworks
          .filter(framework => courses.indexOf(framework.value) !== -1)
          .map(c => c.label)

        const title = `${courseNames.join(', ')} question, ${
          questionType?.label
        }`

        setPageTitle(title)
        document.title = title
        document.getElementById('page-announcement').innerHTML = title
      }

      // update title dashboard questions
      if (!testMode) {
        let title

        if (question.rejected) {
          title = 'Rejected - Question editor page'
        } else if (version.published) {
          title = 'Published - Question editor page'
        } else if (version.inProduction) {
          title = 'In production - Question editor page'
        } else if (version.underReview) {
          title = 'Under review - Question editor page'
        } else if (version.submitted) {
          title = 'Submitted - Question editor page'
        } else {
          title = 'Not submitted - Question editor page'
        }

        setPageTitle(title)
        document.title = title
        document.getElementById('page-announcement').innerHTML = title
      }
    }
  }, [version, metadata])

  // declare lazy query to be called when clicking the next question or previous question buttons
  const [getQuestion] = useLazyQuery(GET_PREV_OR_NEXT_QUESTION_ID)

  const [generateWordFileMutation, { loading: generateWordFileLoading }] =
    useMutation(GENERATE_WORD_FILE)

  const [generateScormZipMutation, { loading: generateScormZipLoading }] =
    useMutation(GENERATE_SCORM_ZIP)

  const [upload] = useMutation(UPLOAD_FILES)
  // #endregion hooks

  // #region user roles
  const isEditor = hasGlobalRole(currentUser, 'editor')
  const isAuthor = hasRole(currentUser, 'author', id)
  const isAdmin = hasGlobalRole(currentUser, 'admin')
  // #endregion user roles

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
          content: JSON.stringify(latestContent),
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

    return getQuestion({
      variables,
    }).then(response => {
      const {
        data: {
          getPreviousOrNextQuestion: { questionId },
        },
      } = response

      return new Promise((resolve, reject) => {
        if (questionId !== '0') {
          history.push({
            pathname: `/question/${questionId}/test`,
            state: searchParams,
          })
          resolve()
        } else {
          reject()
        }
      })
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

    return generateScormZipMutation({ variables: mutationVariables })
      .then(res => {
        const filename = res.data.generateScormZip
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

  const handleExportToWord = options => {
    const { showFeedback, showMetadata } = options

    const mutationVariables = {
      questionVersionId: version.id,
      options: {
        showFeedback,
        showMetadata,
      },
    }

    return generateWordFileMutation({ variables: mutationVariables })
      .then(res => {
        const filename = res.data.generateWordFile
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

  if (error) {
    return (
      <Result
        // replace link with a Button with to="/dashboard" after MR is merged
        extra={
          testMode ? (
            <Link to="/discover">Back to Browse Questions</Link>
          ) : (
            <Link to="/dashboard">Back to Dashboard</Link>
          )
        }
        status="500"
        subTitle="There was an error on our server. Please try again later or contact the administrators"
        title="Sorry, something went wrong"
      />
    )
  }

  // when no published version was found
  if (testMode && question && question.versions.length === 0) {
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

  return (
    <>
      <VisuallyHiddenElement as="h1">{pageTitle}</VisuallyHiddenElement>
      <Question
        editorContent={version && JSON.parse(version.content)}
        // admins have editorial rights (publishing rights) on their own questions
        editorView={(isEditor && !isAuthor) || (isAdmin && isAuthor)}
        facultyView={testMode}
        initialMetadataValues={metadataApiToUi(version, testMode)}
        // admins can always treat their questions as if they are in produciton, meaning they can edit and publish them directly,
        // unless the question has already been published
        isInProduction={
          version?.inProduction || (isAdmin && isAuthor && !version?.published)
        }
        isPublished={version?.published}
        isRejected={question?.rejected}
        // if user is admin and author, assume the question has been submitted to get the UI as if it's "in production"
        isSubmitted={version?.submitted || (isAdmin && isAuthor)}
        isUnderReview={version?.underReview}
        isUserLoggedIn={!!currentUser}
        loading={loading || !version || !metadata || !getResources}
        metadata={metadata || {}}
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
        resources={getResources}
        scormZipLoading={generateScormZipLoading}
        showAssignHEButton={false} //
        showNextQuestionLink={false} //
        updated={version?.lastEdit}
        wordFileLoading={generateWordFileLoading}
      />
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
