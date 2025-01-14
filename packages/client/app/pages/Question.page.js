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

import { serverUrl, uuid } from '@coko/client'
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
  GET_REVIEWER_CHAT_PARTICIPANTS,
  MESSAGE_CREATED_SUBSCRIPTION,
  CANCEL_EMAIL_NOTIFICATION,
  UNPUBLISH_QUESTION_VERSION,
  ACCEPT_OR_REJECT_REVIEW_INVITATION,
  SUBMIT_REVIEW,
  INVITE_REVIEWER,
  UPDATE_REVIEWER_POOL,
  REVOKE_REVIEWER_INVITATION,
  SEARCH_FOR_REVIEWERS,
  CHANGE_AMOUNT_OF_REVIEWERS,
  CHANGE_REVIEWER_AUTOMATION_STATUS,
  SUBMIT_REPORT,
  FILTER_CHAT_THREADS,
} from '../graphql'
import {
  useMetadata,
  hasRole,
  hasGlobalRole,
  questionTypes,
  REVIEWER_STATUSES,
  flattenReviewerPool,
  flattenReviewerSearchResults,
} from '../utilities'

const AUTOSAVE_DELAY = 500
const REVIEWER_SEARCH_DELAY = 500

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
    if (!t?.topic) return null
    return t
  }

  const topics = values.topics?.map(t => topicFields(t)).filter(Boolean)

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
  const [selectedReviewerId, setSelectedReviewerId] = useState(uuid())
  const [reviewerChatThread, setReviewerChatThread] = useState()

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
      skip: !question?.versions[0]?.submitted,
      variables: {
        id,
      },
    })

  const {
    data: { getProductionChatParticipants: productionChatParticipants } = {},
  } = useQuery(GET_PRODUCTION_CHAT_PARTICIPANTS, {
    skip: !question?.versions[0]?.inProduction,
    variables: {
      id,
    },
  })

  const {
    data: { getReviewerChatParticipants: reviewerChatParticipants } = {},
  } = useQuery(GET_REVIEWER_CHAT_PARTICIPANTS, {
    skip: !question?.versions[0]?.underReview || !selectedReviewerId,
    variables: {
      questionId: id,
      reviewerId: selectedReviewerId,
    },
  })

  const { data: { getAvailableSets: complexItemSetOptions } = {} } = useQuery(
    GET_COMPLEX_ITEM_SETS_OPTIONS,
  )

  const { data: { getResources } = {} } = useQuery(GET_RESOURCES)

  const [updateQuestionMutation] = useMutation(UPDATE_QUESTION)

  const [submitQuestionMutation] = useMutation(SUBMIT_QUESTION, {
    refetchQueries: [{ query: QUESTION, variables: { id } }],
  })

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

  const [searchForReviewers] = useLazyQuery(SEARCH_FOR_REVIEWERS)

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

  useQuery(GET_CHAT_THREAD, {
    skip: !question?.reviewerChatThreadId || question?.versions[0].underReview,
    variables: {
      id: question?.reviewerChatThreadId,
    },
    onCompleted: ({ chatThread: reviewerChat }) => {
      setSelectedReviewerId(currentUser.id)
      setReviewerChatMessages(reviewerChat?.messages)
      setReviewerChatThread(reviewerChat)
    },
  })

  const [getReviewerChatThread] = useLazyQuery(FILTER_CHAT_THREADS)

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
            chatThreadId: productionChatThread?.id,
          },
        })
      }
    },
  })

  useSubscription(MESSAGE_CREATED_SUBSCRIPTION, {
    skip: !reviewerChatThread?.id,
    variables: { chatThreadId: reviewerChatThread?.id },
    onData: ({
      data: {
        data: { messageCreated },
      },
    }) => {
      if (messageCreated) {
        setReviewerChatMessages(previousMessages => [
          ...previousMessages,
          messageCreated,
        ])
      }

      if (
        messageCreated.mentions.includes(currentUser.id) &&
        localStorage.getItem(question?.id) === 'reviewerChat'
      ) {
        cancelEmailNotification({
          variables: {
            chatThreadId: reviewerChatThread?.id,
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
  const [reviewerChatMessages, setReviewerChatMessages] = useState([])

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
  // useEffect(() => {
  //   if (reviewerChatThread?.messages) {
  //     setReviewerChatMessages(reviewerChatThread.messages)
  //   }
  // }, [reviewerChatThread])

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

    // if (version?.underReview && !question?.reviewerChatThreadId) {
    //   createChat('reviewerChat')
    // }
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

  const [assignAuthorship] = useMutation(ASSIGN_QUESTION_AUTHOR, {
    refetchQueries: [{ query: QUESTION, variables: { id } }],
  })

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

  const refetchQuestionVariables = [
    {
      query: QUESTION,
      variables: {
        id,
      },
    },
  ]

  const [acceptOrRejectInvitation] = useMutation(
    ACCEPT_OR_REJECT_REVIEW_INVITATION,
    {
      refetchQueries: [
        {
          query: QUESTION,
          variables: {
            id,
          },
        },
        {
          query: GET_REVIEWER_CHAT_PARTICIPANTS,
          skip: !question?.versions[0]?.underReview || !selectedReviewerId,
          variables: {
            questionId: id,
            reviewerId: selectedReviewerId,
          },
        },
      ],
    },
  )

  const [submitReview] = useMutation(SUBMIT_REVIEW, {
    refetchQueries: refetchQuestionVariables,
  })

  const [inviteReviewer] = useMutation(INVITE_REVIEWER, {
    refetchQueries: refetchQuestionVariables,
  })

  const [updateReviewerPool] = useMutation(UPDATE_REVIEWER_POOL, {
    refetchQueries: refetchQuestionVariables,
  })

  const [revokeReviewerInvitation] = useMutation(REVOKE_REVIEWER_INVITATION, {
    refetchQueries: refetchQuestionVariables,
  })

  const [changeAmountOfReviewers] = useMutation(CHANGE_AMOUNT_OF_REVIEWERS, {
    refetchQueries: refetchQuestionVariables,
  })

  const [changeReviewerAutomationStatus] = useMutation(
    CHANGE_REVIEWER_AUTOMATION_STATUS,
    {
      refetchQueries: refetchQuestionVariables,
    },
  )

  const [submitReport] = useMutation(SUBMIT_REPORT)
  // #endregion hooks

  // #region user roles
  const isEditor = hasGlobalRole(currentUser, 'editor')
  const isHandlingEditor = hasGlobalRole(currentUser, 'handlingEditor')
  const isProductionMember = hasGlobalRole(currentUser, 'production')
  const isAuthor = hasRole(currentUser, 'author', id)
  const isAdmin = hasGlobalRole(currentUser, 'admin')
  const isReviewer = hasRole(currentUser, 'reviewer', version?.id)

  const canViewUnpublished =
    isEditor ||
    isHandlingEditor ||
    isProductionMember ||
    isAuthor ||
    isReviewer ||
    isAdmin

  const isSubmitted = version?.submitted || (isAdmin && isAuthor)
  const isUnderReview = version?.underReview
  const isInProduction = version?.inProduction
  const isPublished = version?.published

  const isArchived = question?.isArchived && !testMode

  const reviewerInviteStatus = isReviewer ? version?.reviewerStatus : null

  let initialTabKey = localStorage.getItem(id) || 'editor'

  if (requestedTab && requestedTab !== initialTabKey) {
    initialTabKey = requestedTab
  }

  const showAuthorChatTab =
    version?.submitted &&
    !version?.published &&
    !version?.unpublished &&
    !question?.rejected &&
    (isEditor || isHandlingEditor || isAuthor || isAdmin)

  const showProductionChatTab =
    isInProduction &&
    (isEditor || isHandlingEditor || isProductionMember || isAdmin)

  const showReviewerChatTab =
    version?.underReview &&
    !isAuthor &&
    (isEditor ||
      isHandlingEditor ||
      (isReviewer && reviewerInviteStatus === REVIEWER_STATUSES.accepted) ||
      isAdmin)

  const reviews = version?.reviews || []
  const amountOfReviewers = version?.amountOfReviewers || 100 // practically as many as you want
  const automateReviewerInvites = version?.isReviewerAutomationOn

  const reviewSubmitted = !!reviews.find(
    review => review.reviewerId === currentUser?.id && review.status.submitted,
  )

  const reviewerPool = flattenReviewerPool(version?.reviewerPool || [])

  const showAssignReviewersTab =
    isUnderReview && !isAuthor && (isEditor || isHandlingEditor)
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

    updateQuestionMutation(mutationData).then(
      ({ data: { updateQuestion } = {} }) => {
        let update = false

        const inputFigureCount = (
          JSON.stringify(content).match(/figure/g) || []
        ).length

        if (inputFigureCount > 0) {
          const updatedFigureCount = (
            updateQuestion.versions[0].content.match(/figure/g) || []
          ).length

          if (updatedFigureCount !== inputFigureCount) {
            update = true
          }
        }

        resolve({ update })
      },
    )
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
      case 'reviewerChat':
        reviewerChatThread?.id &&
          cancelEmailNotification({
            variables: { chatThreadId: reviewerChatThread?.id },
          })
        break
      default:
        break
    }

    localStorage.setItem(id, activeTab)
  }

  const handleSendChatMessage = async (
    content,
    mentions,
    attachments,
    chatThreadId,
  ) => {
    const fileObjects = attachments.map(attachment => attachment.originFileObj)

    const mutationData = {
      variables: {
        input: {
          content,
          chatThreadId,
          userId: currentUser.id,
          mentions,
          attachments: fileObjects,
        },
      },
    }

    return sendMessage(mutationData)
  }

  const handleSelectReviewer = async reviewerId => {
    setSelectedReviewerId(reviewerId)

    const variables = {
      where: {
        relatedObjectId: question?.id,
        chatType: `reviewerChat-${reviewerId}`,
      },
    }

    // this query doesn't work as expected, needs to be fixed in coko server
    const threads = await getReviewerChatThread({ variables })

    const reviewerChat = threads?.data.chatThreads.result[0]

    setReviewerChatMessages(reviewerChat?.messages)
    setReviewerChatThread(reviewerChat)
  }

  const onSendAuthorChatMessage = async (content, mentions, attachments) => {
    return handleSendChatMessage(
      content,
      mentions,
      attachments,
      question?.authorChatThreadId,
    )
  }

  const onSendProductionChatMessage = async (
    content,
    mentions,
    attachments,
  ) => {
    return handleSendChatMessage(
      content,
      mentions,
      attachments,
      question?.productionChatThreadId,
    )
  }

  const onSendReviewerChatMessage = async (content, mentions, attachments) => {
    return handleSendChatMessage(
      content,
      mentions,
      attachments,
      reviewerChatThread?.id,
    )
  }

  const handleAcceptReviewInvite = async () => {
    const mutationData = {
      variables: {
        questionVersionId: version?.id,
        accepted: true,
      },
    }

    return acceptOrRejectInvitation(mutationData)
  }

  const handleRejectReviewInvite = async reason => {
    const mutationData = {
      variables: {
        questionVersionId: version?.id,
        accepted: false,
        reason,
      },
    }

    return acceptOrRejectInvitation(mutationData)
  }

  const handleSubmitReview = async ({ attachments, content }) => {
    const fileObjects = attachments.map(attachment => attachment.originFileObj)

    const mutationData = {
      variables: {
        input: {
          questionVersionId: version?.id,
          attachments: fileObjects,
          content,
        },
      },
    }

    return submitReview(mutationData)
  }

  const handleSubmitReport = async ({ attachments, reportContent }) => {
    const fileObjects =
      attachments?.map(attachment => attachment.originFileObj) || []

    const mutationData = {
      variables: {
        questionId: id,
        attachments: fileObjects,
        content: reportContent,
      },
    }

    return submitReport(mutationData)
  }

  const handleInviteReviewer = async reviewerId => {
    const mutationData = {
      variables: {
        questionVersionId: version?.id,
        reviewerId,
      },
    }

    return inviteReviewer(mutationData)
  }

  const handleAddReviewers = async newReviewerIds => {
    const currentReviewerIds = reviewerPool.map(r => r.id)

    const mutationData = {
      variables: {
        questionVersionId: version?.id,
        reviewerIds: [...currentReviewerIds, ...newReviewerIds],
      },
    }

    return updateReviewerPool(mutationData)
  }

  const handleRemoveReviewerRow = async reviewerId => {
    const reviewerIds = reviewerPool
      .filter(r => r.id !== reviewerId)
      .map(i => i.id)

    const mutationData = {
      variables: {
        questionVersionId: version?.id,
        reviewerIds,
      },
    }

    return updateReviewerPool(mutationData)
  }

  const debouncedReviewerSearch = debounce(
    (searchTerm, questionVersionId, resolve) => {
      const queryData = {
        variables: {
          searchTerm,
          questionVersionId,
        },
      }

      searchForReviewers(queryData).then(({ data }) => {
        resolve(flattenReviewerSearchResults(data.searchForReviewers))
      })
    },
    REVIEWER_SEARCH_DELAY,
  )

  const handleReviewerSearch = async searchTerm => {
    if (!searchTerm) {
      debouncedReviewerSearch.cancel()
      return Promise.resolve([])
    }

    return new Promise(resolve => {
      debouncedReviewerSearch(searchTerm, version?.id, resolve)
    })
  }

  const handleReviewerTableChange = async tableData => {
    const reviewerIds = tableData.map(d => d.id)

    const mutationData = {
      variables: {
        questionVersionId: version?.id,
        reviewerIds,
      },
    }

    return updateReviewerPool(mutationData)
  }

  const handleRevokeReviewerInvitation = async reviewerId => {
    const mutationData = {
      variables: {
        questionVersionId: version?.id,
        reviewerId,
      },
    }

    return revokeReviewerInvitation(mutationData)
  }

  const handleChangeAmountOfReviewers = async amount => {
    const mutationData = {
      variables: {
        questionVersionId: version?.id,
        amount,
      },
    }

    return changeAmountOfReviewers(mutationData)
  }

  const handleReviewerInviteAutomationChange = async value => {
    const mutationData = {
      variables: {
        questionVersionId: version?.id,
        value,
      },
    }

    return changeReviewerAutomationStatus(mutationData)
  }
  // #endregion handlers

  useEffect(() => {
    if (
      question &&
      (!question?.reviewerChatThreadId || isUnderReview) &&
      isReviewer &&
      isUnderReview &&
      version?.reviewerStatus === REVIEWER_STATUSES.accepted
    ) {
      handleSelectReviewer(currentUser.id)
    }
  }, [isReviewer, isUnderReview, question, version?.reviewerStatus])

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
  if (
    (testMode || !canViewUnpublished) &&
    question &&
    question.versions[0].published === false
  ) {
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
        amountOfReviewers={amountOfReviewers}
        assignHELoading={assignHELoading}
        authorChatMessages={messagesApiToUi(
          authorChatMessages,
          currentUser?.id,
        )}
        authorChatParticipants={authorChatParticipants}
        authors={possibleAuthors}
        automateReviewerInvites={automateReviewerInvites}
        canAssignAuthor={isAdmin && isAuthor}
        canCreateNewVersion={isAdmin || isEditor}
        canPublish={isEditor || isHandlingEditor || isAdmin}
        canUnpublish={isAdmin || isEditor}
        chatLoading={chatLoading}
        complexItemSetId={version?.complexItemSetId}
        complexItemSetOptions={complexItemSetOptions}
        complexSetEditLink={
          isInProduction ? `/set/${version?.complexItemSetId}` : ''
        }
        currentHandlingEditors={currentHandlingEditors}
        defaultActiveKey={initialTabKey}
        editorContent={version && JSON.parse(version.content)}
        // admins have editorial rights (publishing rights) on their own questions
        editorView={
          (isEditor && !isAuthor) ||
          ((isHandlingEditor || (isProductionMember && isInProduction)) &&
            !isAuthor) ||
          isAdmin
        }
        facultyView={testMode || (isReviewer && isUnderReview)}
        handlingEditors={handlingEditors?.result || []}
        hasDeletedAuthor={!!question?.deletedAuthorName}
        hasGeneralReviewerChatId={
          !!question?.reviewerChatThreadId && !isUnderReview
        }
        initialMetadataValues={metadataApiToUi(
          version,
          testMode || (isReviewer && isUnderReview),
        )}
        isArchived={isArchived}
        // admins can always treat their questions as if they are in produciton, meaning they can edit and publish them directly,
        // unless the question has already been published
        isInProduction={
          isInProduction ||
          (isAdmin && isAuthor && !version?.published && !version?.unpublished)
        }
        isPublished={isPublished}
        // admins have editorial rights (publishing rights) on their own questions
        isRejected={question?.rejected}
        isSubmitted={isSubmitted}
        // if user is admin and author, assume the question has been submitted to get the UI as if it's "in production"
        isUnderReview={isUnderReview}
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
        onAddReviewers={handleAddReviewers}
        onAssignAuthor={handleAssignAuthor}
        onAutomateReviewerChange={handleReviewerInviteAutomationChange}
        onChangeAmountOfReviewers={handleChangeAmountOfReviewers}
        onChangeTab={persistQuestionTab}
        onClickAssignHE={handleClickAssignHE}
        onClickBackButton={handleClickBackButton}
        onClickExportToQti={testMode ? handleExportToQti : null}
        onClickExportToWord={handleExportToWord}
        onClickNextButton={() => handleGetQuestionButton('NEXT')}
        onClickPreviousButton={() => handleGetQuestionButton('PREV')}
        onCreateNewVersion={handleCreateNewVersion}
        onEditorContentAutoSave={!testMode ? handleEditorContentAutoSave : null}
        onImageUpload={handleImageUpload}
        onInviteReviewer={handleInviteReviewer}
        onMetadataAutoSave={handleMetadataAutoSave}
        onMoveToProduction={handleMoveToProduction}
        onMoveToReview={handleMoveToReview}
        onPublish={handlePublish}
        onQuestionSubmit={handleQuestionSubmit}
        onReject={handleReject}
        onRemoveReviewerRow={handleRemoveReviewerRow}
        onReviewerAcceptInvite={handleAcceptReviewInvite}
        onReviewerRejectInvite={handleRejectReviewInvite}
        onReviewerSearch={handleReviewerSearch}
        onReviewerTableChange={handleReviewerTableChange}
        onRevokeReviewerInvitation={handleRevokeReviewerInvitation}
        onSearchHE={handleSearchHE}
        onSelectReviewer={handleSelectReviewer}
        onSendAuthorChatMessage={onSendAuthorChatMessage}
        onSendProductionChatMessage={onSendProductionChatMessage}
        onSendReviewerChatMessage={onSendReviewerChatMessage}
        onSubmitReport={handleSubmitReport}
        onSubmitReview={handleSubmitReview}
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
        resources={getResources?.result}
        reviewerChatMessages={messagesApiToUi(
          reviewerChatMessages,
          currentUser?.id,
        )}
        reviewerChatParticipants={reviewerChatParticipants}
        reviewerPool={reviewerPool}
        reviewerView={isReviewer && isUnderReview}
        reviewInviteStatus={reviewerInviteStatus}
        reviewSubmitted={reviewSubmitted}
        searchHELoading={loadingSearchHE}
        selectedQuestionType={selectedQuestionType}
        showAssignHEButton={
          version?.submitted &&
          !version?.published &&
          !version?.unpublished &&
          isEditor
        }
        showAssignReviewers={showAssignReviewersTab}
        showAuthorChatTab={showAuthorChatTab}
        showNextQuestionLink={false}
        showPreviewButton={isAuthor && !version?.submitted}
        showProductionChatTab={showProductionChatTab}
        showReviewerChatTab={showReviewerChatTab}
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
