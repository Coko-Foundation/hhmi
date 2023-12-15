import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory, useParams, Link, useLocation } from 'react-router-dom'
import {
  useQuery,
  useMutation,
  useLazyQuery,
  useSubscription,
} from '@apollo/client'
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
  CREATE_CHAT_THREAD,
  GET_AUTHOR_CHAT_PARTICIPANTS,
  GET_PRODUCTION_CHAT_PARTICIPANTS,
  MESSAGE_CREATED_SUBSCRIPTION,
  CANCEL_EMAIL_NOTIFICATION,
  UNPUBLISH_QUESTION_VERSION,
} from '../graphql'
import {
  useMetadata,
  hasRole,
  hasGlobalRole,
  questionTypes,
} from '../utilities'

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
    content: null,
    leadingContent: null,
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
          created,
          content,
          user: { id: userId, displayName } = {},
          attachments,
        }) => {
          return {
            id,
            content,
            date: created,
            own: userId === currentUser,
            user: displayName,
            attachments,
          }
        },
      )
    : []
}
// #endregion transformations

const scanContentForQuestionType = content => {
  return content
    ? questionTypes.find(type => content.indexOf(type.waxValue) > -1)
    : null
}

const clearPublishedQuestionsCache = cache => {
  const cachedPublishedQuestionsQueries = Object.keys(
    cache.data.data.ROOT_QUERY,
  )
    .filter(key => key.startsWith('getPublishedQuestions'))
    .reduce(
      (cur, key) =>
        Object.assign(cur, { [key]: cache.data.data.ROOT_QUERY[key] }),
      {},
    )

  Object.keys(cachedPublishedQuestionsQueries).forEach(cachedField => {
    cache.modify({
      fields: {
        [cachedField](_, { DELETE }) {
          return DELETE
        },
      },
    })
  })
}

const QuestionPage = props => {
  const { testMode } = props

  // #region hooks
  const { id } = useParams()
  const history = useHistory()
  const { metadata } = useMetadata()

  const requestedTab = window.location.hash.substring(1)
  let initialTabKey = localStorage.getItem(id) || 'editor'

  if (requestedTab && requestedTab !== initialTabKey) {
    initialTabKey = requestedTab
  }

  const {
    data: { question } = {},
    refetch: refetchQuestion,
    loading,
    error,
  } = useQuery(QUESTION, {
    variables: {
      id,
    },
  })

  const { data: { currentUser } = {} } = useQuery(CURRENT_USER)

  const { data: { getAuthorChatParticipants: authorChatParticipants } = {} } =
    useQuery(GET_AUTHOR_CHAT_PARTICIPANTS, {
      variables: {
        id,
      },
    })

  const {
    data: { getProductionChatParticipants: productionChatParticipants } = {},
  } = useQuery(GET_PRODUCTION_CHAT_PARTICIPANTS, {
    variables: {
      id,
    },
  })

  const { data: { getAvailableSets: complexItemSetOptions } = {} } = useQuery(
    GET_COMPLEX_ITEM_SETS_OPTIONS,
  )

  const { data: { getResources } = {} } = useQuery(GET_RESOURCES)

  const [updateQuestionMutation] = useMutation(UPDATE_QUESTION)

  const [submitQuestionMutation] = useMutation(SUBMIT_QUESTION)

  const [createChatThreadMutation] = useMutation(CREATE_CHAT_THREAD)

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
      update: clearPublishedQuestionsCache,
    },
  )

  const [unpublishQuestionVersionMutation] = useMutation(
    UNPUBLISH_QUESTION_VERSION,
    {
      onCompleted: () => {
        history.push(`/question/${id}/`)
      },
      update: clearPublishedQuestionsCache,
    },
  )

  const [createNewQuestionVersionMutation] = useMutation(CREATE_NEW_VERSION, {
    variables: { questionId: id },
    refetchQueries: [{ query: QUESTION, variables: { id } }],
  })

  const [cancelEmailNotification] = useMutation(CANCEL_EMAIL_NOTIFICATION)

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

  const { data: { chatThread: authorChatThread } = {}, loading: chatLoading } =
    useQuery(GET_CHAT_THREAD, {
      skip: !question?.authorChatThreadId,
      variables: {
        id: question?.authorChatThreadId,
      },
    })

  const { data: { chatThread: productionChatThread } = {} } = useQuery(
    GET_CHAT_THREAD,
    {
      skip: !question?.productionChatThreadId,
      variables: {
        id: question?.productionChatThreadId,
      },
    },
  )

  useSubscription(MESSAGE_CREATED_SUBSCRIPTION, {
    skip: !authorChatThread?.id,
    variables: { chatThreadId: authorChatThread?.id },
    onData: ({
      data: {
        data: { messageCreated },
      },
    }) => {
      if (messageCreated) {
        setAuthorChatMessages(previousMessages => [
          ...previousMessages,
          messageCreated,
        ])

        if (
          messageCreated.mentions.includes(currentUser.id) &&
          localStorage.getItem(question?.id) === 'authorChat'
        ) {
          cancelEmailNotification({
            variables: {
              chatThreadId: authorChatThread?.id,
            },
          })
        }
      }
    },
  })

  useSubscription(MESSAGE_CREATED_SUBSCRIPTION, {
    skip: !productionChatThread?.id,
    variables: { chatThreadId: productionChatThread?.id },
    onData: ({
      data: {
        data: { messageCreated },
      },
    }) => {
      if (messageCreated) {
        setProductionChatMessages(previousMessages => [
          ...previousMessages,
          messageCreated,
        ])
      }

      if (
        messageCreated.mentions.includes(currentUser.id) &&
        localStorage.getItem(question?.id) === 'productionChat'
      ) {
        cancelEmailNotification({
          variables: {
            chatThreadId: authorChatThread?.id,
          },
        })
      }
    },
  })

  /**
   *
   * @param {string} chatType - type of the chat thread
   * @returns
   */
  const createChat = chatType => {
    const chatThreadMutationData = {
      variables: {
        input: {
          chatType,
          relatedObjectId: id,
        },
      },
    }

    return new Promise((resolve, reject) => {
      createChatThreadMutation(chatThreadMutationData)
        .then(data => {
          refetchQuestion()
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  // maintaining messages in a state
  const [authorChatMessages, setAuthorChatMessages] = useState([])
  const [productionChatMessages, setProductionChatMessages] = useState([])

  useEffect(() => {
    if (authorChatThread?.messages) {
      setAuthorChatMessages(authorChatThread.messages)
    }
  }, [authorChatThread])
  useEffect(() => {
    if (productionChatThread?.messages) {
      setProductionChatMessages(productionChatThread.messages)
    }
  }, [productionChatThread])

  /* setup Prev/Next question functions */
  // read state from location to get filter values, if any
  const location = useLocation()

  const { state: { relatedQuestionIds } = {} } = location

  // keep a reactive copy of page title have an updated h1
  const [pageTitle, setPageTitle] = useState('')

  const version = question?.versions[0]
  const selectedQuestionType = scanContentForQuestionType(version?.content)

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
        } else if (version.unpublished) {
          title = 'Unpublished - Question editor page'
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

  useEffect(() => {
    if (version?.submitted && !question?.authorChatThreadId) {
      createChat('authorChat')
    }

    if (version?.inProduction && !question?.productionChatThreadId) {
      createChat('productionChat')
    }
  }, [question, version])

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
  const isProductionMember = hasGlobalRole(currentUser, 'production')
  const isAuthor = hasRole(currentUser, 'author', id)
  const isAdmin = hasGlobalRole(currentUser, 'admin')

  const showAuthorChatTab =
    version?.submitted &&
    !version?.published &&
    !version?.unpublished &&
    !question?.rejected &&
    (isEditor || isHandlingEditor || isAuthor || isAdmin)

  const showProductionChatTab =
    version?.inProduction &&
    (isEditor || isHandlingEditor || isProductionMember || isAdmin)
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

  const handleEditorContentAutoSave = (content, updateMetadata = true) => {
    return new Promise(resolve => {
      debouncedEditorAutoSave(content, resolve)
    })
  }

  const handleMetadataAutoSave = values => {
    if (values) {
      const metadataToSave = metadataUiToApi(values)

      if (
        values.questionType &&
        version?.questionType !== values.questionType
      ) {
        // warn that current content will be deleted
        // apply new question type starting data
        const selectedType = questionTypes.find(
          t => t.metadataValue === values.questionType,
        )

        handleEditorContentAutoSave(selectedType.startingData, false)
      }

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

    return new Promise()
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

  const handleUnpublish = () => {
    const mutationData = {
      variables: {
        questionVersionId: version.id,
      },
    }

    return unpublishQuestionVersionMutation(mutationData)
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

    return createNewQuestionVersionMutation(mutationData)
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

  const persistQuestionTab = activeTab => {
    switch (activeTab) {
      case 'authorChat':
        cancelEmailNotification({
          variables: {
            chatThreadId: authorChatThread?.id,
          },
        })
        break
      case 'productionChat':
        cancelEmailNotification({
          variables: {
            chatThreadId: productionChatThread?.id,
          },
        })
        break
      default:
        break
    }

    localStorage.setItem(id, activeTab)
  }

  const onSendAuthorChatMessage = async (content, mentions, attachments) => {
    const fileObjects = attachments.map(attachment => attachment.originFileObj)

    const mutationData = {
      variables: {
        input: {
          content,
          chatThreadId: question?.authorChatThreadId,
          userId: currentUser.id,
          mentions,
          attachments: fileObjects,
        },
      },
    }

    return sendMessage(mutationData)
  }

  const onSendProductionChatMessage = async (
    content,
    mentions,
    attachments,
  ) => {
    const fileObjects = attachments.map(attachment => attachment.originFileObj)

    const mutationData = {
      variables: {
        input: {
          content,
          chatThreadId: question?.productionChatThreadId,
          userId: currentUser.id,
          mentions,
          attachments: fileObjects,
        },
      },
    }

    return sendMessage(mutationData)
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
  if (testMode && question && question.versions[0].published === false) {
    return (
      <Result
        // replace link with a Button with to="/dashboard" after MR is merged
        extra={<Link to="/discover">Visit the Browse Items page</Link>}
        status="404"
        subTitle="Sorry, this item hasn't been published yet."
        title="Question Not Ready"
      />
    )
  }

  return (
    <>
      <VisuallyHiddenElement as="h1">{pageTitle}</VisuallyHiddenElement>
      <Question
        assignHELoading={assignHELoading}
        authorChatMessages={messagesApiToUi(
          authorChatMessages,
          currentUser?.id,
        )}
        authorChatParticipants={authorChatParticipants}
        authors={possibleAuthors}
        canAssignAuthor={isAdmin && isAuthor}
        canCreateNewVersion={isAdmin || isEditor}
        canPublish={isEditor || isHandlingEditor || isAdmin}
        canUnpublish={isAdmin || isEditor}
        chatLoading={chatLoading}
        complexItemSetId={version?.complexItemSetId}
        complexItemSetOptions={complexItemSetOptions}
        complexSetEditLink={
          version?.inProduction ? `/set/${version?.complexItemSetId}` : ''
        }
        currentHandlingEditors={currentHandlingEditors}
        defaultActiveKey={initialTabKey}
        editorContent={version && JSON.parse(version.content)}
        // admins have editorial rights (publishing rights) on their own questions
        editorView={
          isEditor ||
          ((isHandlingEditor ||
            (isProductionMember && version?.inProduction)) &&
            !isAuthor) ||
          isAdmin
        }
        facultyView={testMode}
        handlingEditors={handlingEditors?.result || []}
        initialMetadataValues={metadataApiToUi(version, testMode)}
        // admins can always treat their questions as if they are in produciton, meaning they can edit and publish them directly,
        // unless the question has already been published
        isInProduction={
          version?.inProduction ||
          (isAdmin && isAuthor && !version?.published && !version?.unpublished)
        }
        isPublished={version?.published}
        // admins have editorial rights (publishing rights) on their own questions
        isRejected={question?.rejected}
        isSubmitted={version?.submitted || (isAdmin && isAuthor)}
        // if user is admin and author, assume the question has been submitted to get the UI as if it's "in production"
        isUnderReview={version?.underReview}
        isUnpublished={version?.unpublished}
        isUserLoggedIn={!!currentUser}
        leadingContent={
          version?.leadingContent.length
            ? JSON.parse(version.leadingContent)
            : null
        }
        loadAssignedHEs={getQuestionsHandlingEditors}
        loadAuthors={getUsers}
        loading={
          loading ||
          !version ||
          !metadata ||
          !getResources ||
          !complexItemSetOptions
        }
        metadata={metadata || {}}
        onAssignAuthor={handleAssignAuthor}
        onChangeTab={persistQuestionTab}
        onClickAssignHE={handleClickAssignHE}
        onClickBackButton={handleClickBackButton}
        onClickExportToQti={testMode ? handleExportToQti : null}
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
        onSearchHE={handleSearchHE}
        onSendAuthorChatMessage={onSendAuthorChatMessage}
        onSendProductionChatMessage={onSendProductionChatMessage}
        onUnassignHandlingEditor={handleUnassignHE}
        onUnpublish={handleUnpublish}
        productionChatMessages={messagesApiToUi(
          productionChatMessages,
          currentUser?.id,
        )}
        productionChatParticipants={productionChatParticipants}
        qtiZipLoading={generateQtiZipLoading}
        questionAgreedTc={false} //
        refetchUser={refetchCurrentUser}
        resources={getResources}
        searchHELoading={loadingSearchHE}
        selectedQuestionType={selectedQuestionType}
        showAssignHEButton={
          version?.submitted &&
          !version?.published &&
          !version?.unpublished &&
          isEditor
        }
        showAuthorChatTab={showAuthorChatTab}
        showNextQuestionLink={false}
        showPreviewButton={isAuthor && !version?.submitted}
        showProductionChatTab={showProductionChatTab}
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
