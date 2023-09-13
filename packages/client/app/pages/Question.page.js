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
  GET_PUBLISHED_QUESTIONS_IDS,
  GENERATE_WORD_FILE,
  GENERATE_QTI_ZIP,
  GET_RESOURCES,
  CREATE_NEW_VERSION,
  UPLOAD_FILES,
  FILTER_USERS_OPTIONS,
  ASSIGN_QUESTION_AUTHOR,
  GET_COMPLEX_ITEM_SETS_OPTIONS,
  FILTER_GLOBAL_TEAM_MEMBERS,
  ASSING_HANDLING_EDITORS,
  UNASSING_HANDLING_EDITOR,
  GET_QUESTION_HANDLING_EDITORS,
  GET_CHAT_THREAD,
  SEND_MESSAGE,
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
    belongsToComplexItemSet: !!values.complexItemSetId,
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

  const complexItemSetId = values.belongsToComplexItemSet
    ? values.complexItemSetId
    : null

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
    complexItemSetId,
  }

  return metadataToSave
}

const messagesApiToUi = (messages, currentUser = null) => {
  return messages
    ? messages.map(
        ({
          id,
          timestamp,
          content,
          user: { id: userId, displayName } = {},
        }) => ({
          id,
          content,
          date: timestamp,
          own: userId === currentUser,
          user: displayName,
        }),
      )
    : []
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

  const { data: { getAvailableSets: complexItemSetOptions } = {} } = useQuery(
    GET_COMPLEX_ITEM_SETS_OPTIONS,
  )

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
    onCompleted: () => {
      history.push(`/question/${id}/`)
    },
  })

  const [
    filterGlobalTeamMembers,
    {
      loading: loadingSearchHE,
      data: { filterGlobalTeamMembers: handlingEditors } = {},
    },
  ] = useLazyQuery(FILTER_GLOBAL_TEAM_MEMBERS)

  const [
    getQuestionsHandlingEditors,
    { data: { getQuestionsHandlingEditors: currentHandlingEditors } = {} },
  ] = useLazyQuery(GET_QUESTION_HANDLING_EDITORS, {
    variables: {
      questionId: id,
    },
    fetchPolicy: 'network-only',
  })

  const [getChatThread, { data: { chatThread } = {}, loading: chatLoading }] =
    useLazyQuery(GET_CHAT_THREAD, {
      fetchPolicy: 'network-only',
    })

  /* setup Prev/Next question functions */
  // read state from location to get filter values, if any
  const location = useLocation()

  const { state: { relatedQuestionIds } = {} } = location

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

  // declare lazy query to be called when no `relatedQuestionsIds` from previous state
  const [getPublishedQuestionIds] = useLazyQuery(GET_PUBLISHED_QUESTIONS_IDS)

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

  const [assignAuthorship] = useMutation(ASSIGN_QUESTION_AUTHOR)

  // need to refetch user after assigning author, but also show confirmation modal to the user
  // refetchQuery won't work, because it would delete the AssignAuthor component
  const [refetchCurrentUser] = useLazyQuery(CURRENT_USER, {
    fetchPolicy: 'network-only',
  })

  const [generateWordFileMutation, { loading: generateWordFileLoading }] =
    useMutation(GENERATE_WORD_FILE)

  const [generateQtiZipMutation, { loading: generateQtiZipLoading }] =
    useMutation(GENERATE_QTI_ZIP)

  const [upload] = useMutation(UPLOAD_FILES)

  const [assignHandlingEditor, { loading: assignHELoading }] = useMutation(
    ASSING_HANDLING_EDITORS,
    {
      refetchQueries: [
        {
          query: GET_QUESTION_HANDLING_EDITORS,
          variables: {
            questionId: id,
          },
          fetchPolicy: 'network-only',
        },
      ],
    },
  )

  const [unassignHandlingEditor] = useMutation(UNASSING_HANDLING_EDITOR, {
    refetchQueries: [
      {
        query: GET_QUESTION_HANDLING_EDITORS,
        variables: {
          questionId: id,
        },
        fetchPolicy: 'network-only',
      },
    ],
  })

  const [sendMessage] = useMutation(SEND_MESSAGE)
  // #endregion hooks

  // #region user roles
  const isEditor = hasGlobalRole(currentUser, 'editor')
  const isHandlingEditor = hasGlobalRole(currentUser, 'handlingEditor')
  const isAuthor = hasRole(currentUser, 'author', id)
  const isAdmin = hasGlobalRole(currentUser, 'admin')
  const isProduction = hasGlobalRole(currentUser, 'production')
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

  const handleClickAssignHE = users => {
    const mutationData = {
      variables: {
        questionIds: id,
        userIds: users.map(user => user.value),
      },
    }

    return assignHandlingEditor(mutationData)
  }

  const handleUnassignHE = userId => {
    const mutationData = {
      variables: {
        questionId: id,
        userId,
      },
    }

    return unassignHandlingEditor(mutationData)
  }

  const handleGetQuestionButton = which => {
    if (relatedQuestionIds) {
      const hasNextQuestion = navigateToNextQuestion(which, relatedQuestionIds)
      return new Promise((resolve, reject) => {
        if (hasNextQuestion) resolve()
        else reject()
      })
    }

    // if no `relatedQuestionIds` ask server to provide them
    return getPublishedQuestionIds().then(
      ({ data: { getPublishedQuestionsIds } = {} }) => {
        const hasNextQuestion = navigateToNextQuestion(
          which,
          getPublishedQuestionsIds,
        )

        return new Promise((resolve, reject) => {
          if (hasNextQuestion) resolve()
          else reject()
        })
      },
    )
  }

  const navigateToNextQuestion = (which, idsList) => {
    if (idsList?.length) {
      const currentIndex = relatedQuestionIds.indexOf(id)
      let newQuestionId

      if (currentIndex > 0 && which === 'PREV') {
        newQuestionId = relatedQuestionIds[currentIndex - 1]
        history.push({
          pathname: `/question/${newQuestionId}/test`,
          state: { relatedQuestionIds },
        })
      } else if (
        currentIndex < relatedQuestionIds.length - 1 &&
        which === 'NEXT'
      ) {
        newQuestionId = relatedQuestionIds[currentIndex + 1]
        history.push({
          pathname: `/question/${newQuestionId}/test`,
          state: { relatedQuestionIds },
        })
      } else {
        // no more questions in this direction
        // return new Promise((_resolve, reject) => {
        //   reject()
        // })
        return false
      }

      return true

      // return new Promise(resolve => {
      //   resolve()
      // })
    }

    return false
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

  const handleExportToQti = () => {
    const mutationVariables = {
      questionVersionId: version.id,
    }

    return generateQtiZipMutation({ variables: mutationVariables })
      .then(res => {
        const filename = res.data.generateQtiZip
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

  const handleAssignAuthor = authorId => {
    const mutationData = {
      variables: {
        questionId: id,
        userId: authorId,
      },
    }

    return assignAuthorship(mutationData)
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

  const onLoadChat = async () => {
    const variables = {
      id: question?.chatThreadId,
    }

    getChatThread({ variables })
  }

  const onSendMessage = async content => {
    const variables = {
      input: {
        content,
        chatThreadId: question?.chatThreadId,
        userId: currentUser.id,
      },
    }

    sendMessage({ variables })
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
        extra={<Link to="/discover">Visit the Browse Questions page</Link>}
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
        assignHELoading={assignHELoading}
        authors={possibleAuthors}
        canAssignAuthor={isAdmin && isAuthor}
        canCreateNewVersion={isAdmin || isEditor}
        chatLoading={chatLoading}
        complexItemSetOptions={complexItemSetOptions}
        complexSetEditLink={
          version?.inProduction ? `/set/${version?.complexItemSetId}` : ''
        }
        currentHandlingEditors={currentHandlingEditors}
        editorContent={version && JSON.parse(version.content)}
        // admins have editorial rights (publishing rights) on their own questions
        editorView={
          isEditor ||
          ((isHandlingEditor || isProduction) && !isAuthor) ||
          isAdmin
        }
        facultyView={testMode}
        handlingEditors={handlingEditors?.result || []}
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
        leadingContent={
          version?.leadingContent.length
            ? JSON.parse(version.leadingContent)
            : null
        }
        loadAssignedHEs={getQuestionsHandlingEditors}
        loadAuthors={getUsers}
        // admins can always treat their questions as if they are in produciton, meaning they can edit and publish them directly,
        // unless the question has already been published
        loading={
          loading ||
          !version ||
          !metadata ||
          !getResources ||
          !complexItemSetOptions
        }
        messages={messagesApiToUi(chatThread?.messages, currentUser?.id)}
        metadata={metadata || {}}
        onAssignAuthor={handleAssignAuthor}
        onClickAssignHE={handleClickAssignHE}
        onClickBackButton={handleClickBackButton}
        onClickExportToQti={testMode ? handleExportToQti : null}
        onClickExportToWord={handleExportToWord}
        onClickNextButton={() => handleGetQuestionButton('NEXT')}
        onClickPreviousButton={() => handleGetQuestionButton('PREV')}
        onCreateNewVersion={handleCreateNewVersion}
        onEditorContentAutoSave={handleEditorContentAutoSave}
        onImageUpload={handleImageUpload}
        onLoadChat={onLoadChat}
        onMetadataAutoSave={handleMetadataAutoSave}
        onMoveToProduction={handleMoveToProduction}
        onMoveToReview={handleMoveToReview}
        onPublish={handlePublish}
        onQuestionSubmit={handleQuestionSubmit}
        onReject={handleReject}
        onSearchHE={handleSearchHE}
        onSendMessage={onSendMessage}
        onUnassignHandlingEditor={handleUnassignHE}
        qtiZipLoading={generateQtiZipLoading}
        questionAgreedTc={false} //
        refetchUser={refetchCurrentUser}
        resources={getResources}
        searchHELoading={loadingSearchHE}
        showAssignHEButton={
          version?.submitted && !version?.published && isEditor
        }
        showNextQuestionLink={false}
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
