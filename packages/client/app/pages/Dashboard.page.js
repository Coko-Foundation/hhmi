import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery, useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import {
  GET_AUTHOR_DASHBOARD,
  GET_EDITOR_DASHBOARD,
  CREATE_QUESTION,
  CURRENT_USER,
} from '../graphql'
import { Dashboard } from '../ui'
import {
  hasGlobalRole,
  // dashboardDataMapper,
  metadataForQuestionPage as metadataValues,
} from '../utilities'

const defaultSearchOptions = {
  orderBy: 'created',
  ascending: false,
  pageSize: 10,
}

const transform = questions => {
  if (!questions) return null

  return questions.map(question => {
    const { id, versions } = question
    const latestVersion = versions[0]
    const { content, publicationDate, cognitiveLevel } = latestVersion
    const parsedContent = extractDocumentText(content)

    const courses = latestVersion.courses.map(c => {
      const courseInValues = metadataValues.frameworks.find(
        f => f.value === c.course,
      )

      const beginning = c.course.slice(0, 2).toLowerCase()
      // const isIB = beginning === 'ib'
      const isAP = beginning === 'ap'

      const objectives = c.units.map(unit => ({
        label: courseInValues?.learningObjectives?.find(
          lo => lo.value === unit.learningObjective,
        )?.label,
      }))

      const understandings = c.units.map(unit => ({
        label: courseInValues.understandings?.find(
          und => und.value === unit.understanding,
        ).label,
      }))

      return {
        course: {
          label: courseInValues.label,
        },
        label: isAP ? 'learning objectives' : 'understandings',
        objectives: isAP ? objectives : understandings,
      }
    })

    const firstTopic = latestVersion.topics[0]

    const topicValues = metadataValues.topics.find(
      t => t.value === firstTopic?.topic,
    )

    const subtopic = topicValues?.subtopics.find(
      s => s.value === firstTopic.subtopic,
    )?.label

    const cognitiveValues = metadataValues.blooms.cognitive

    const allCognitiveOptions = [
      ...cognitiveValues[0].options,
      ...cognitiveValues[1].options,
    ]

    const cognitiveDisplayValue = allCognitiveOptions.find(
      o => o.value === cognitiveLevel,
    )?.label

    let status = 'Not Submitted'
    if (latestVersion.submitted) status = 'Submitted'
    if (latestVersion.underReview) status = 'Under review'
    if (latestVersion.published) status = 'Published'
    if (question.rejected) status = 'Rejected'

    return {
      metadata: [
        { label: 'topic', value: topicValues?.label },
        { label: 'subtopic', value: subtopic },
        // question type: how do we know that data ?? what if it's more than one?
        { label: "bloom's level", value: cognitiveDisplayValue },
        { label: 'published date', value: publicationDate },
      ],
      content: parsedContent,
      status,
      href: `/question/${id}`,
      id,
      courses,
    }
  })
}

const extractDocumentText = data => {
  if (data === null) return null
  let allContent = ''
  const incoming = JSON.parse(data)

  const extract = obj => {
    const { content } = obj
    if (!Array.isArray(content)) return

    content.forEach(item => {
      const { text, content: itemContent } = item

      if (text) allContent += `${text} `
      if (itemContent) extract(item)
    })
  }

  extract(incoming)

  const maxLength = 300
  allContent = allContent.substring(0, maxLength + 1).trim()
  allContent =
    allContent.length === maxLength ? `${allContent} ...` : allContent

  if (!allContent) allContent = ' '

  return {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        attrs: {
          class: 'paragraph',
        },
        content: [
          {
            type: 'text',
            text: allContent,
          },
        ],
      },
    ],
  }
}

const DashboardPage = () => {
  // #region hooks
  const history = useHistory()

  const initialTabKey = localStorage.getItem('dashboardLastUsedTab') || 'author'
  const [currentTabKey, setCurrentTabKey] = useState(initialTabKey)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentSearchQuery, setCurrentSearchQuery] = useState(null)

  const { data: currentUserResponse } = useQuery(CURRENT_USER)

  // leave fetch policy to network until pagination is handled in the cache (with a merge function)
  const [
    authorQuery,
    {
      data: authorResponse,
      loading: authorLoading,
      called: authorCalled,
      // fetchMore: fetchMoreAuthor,
    },
  ] = useLazyQuery(GET_AUTHOR_DASHBOARD, {
    fetchPolicy: 'network-only',
    variables: {
      ...defaultSearchOptions,
      page: 0,
    },
  })

  const [
    editorQuery,
    { data: editorResponse, loading: editorLoading, called: editorCalled },
  ] = useLazyQuery(GET_EDITOR_DASHBOARD, { fetchPolicy: 'network-only' })

  const authorData = authorResponse && authorResponse.getAuthorDashboard
  const editorData = editorResponse && editorResponse.getManagingEditorDashboard

  const queryMapper = {
    query: {
      author: authorQuery,
      editor: editorQuery,
    },
    called: {
      author: authorCalled,
      editor: editorCalled,
    },
  }

  useEffect(() => {
    runQuery(currentSearchQuery)
  }, [currentTabKey, currentPage])

  const runQuery = query => {
    const queryVariables = {
      variables: {
        ...defaultSearchOptions,
        page: currentPage - 1,
        searchQuery: query,
      },
    }

    queryMapper.query[currentTabKey](queryVariables)
  }

  const [createQuestionMutation] = useMutation(CREATE_QUESTION, {
    refetchQueries: [{ query: CURRENT_USER }],
  })
  // #endregion hooks

  // #region handlers
  const handleCreateQuestion = () => {
    createQuestionMutation()
      .then(res => {
        const { id } = res.data.createQuestion
        history.push(`/question/${id}`)
      })
      .catch(e => console.error(e))
  }

  const handleSearch = options => {
    const { page, role, query } = options

    setCurrentTabKey(role)
    setCurrentPage(page)
    setCurrentSearchQuery(query)

    localStorage.setItem('dashboardLastUsedTab', role)
    runQuery(query)
  }
  // #endregion handlers

  // #region data
  const loading = !currentUserResponse?.currentUser // question list loading is inside the tab
  const isEditor = hasGlobalRole(currentUserResponse?.currentUser, 'editor')

  const tabs = [
    {
      label: 'Authored Questions',
      value: 'author',
      questions: authorData && transform(authorData.result),
      totalCount: authorData && authorData.totalCount,
      showBulkActions: false,
      loading: authorLoading,
    },
    isEditor && {
      label: 'Editor Questions',
      value: 'editor',
      questions: editorData && transform(editorData.result),
      totalCount: editorData && editorData.totalCount,
      showBulkActions: false,
      loading: editorLoading,
    },
  ].filter(Boolean)

  // #endregion data

  return (
    <Dashboard
      // bulkActions
      initialTabKey={initialTabKey}
      loading={loading}
      // onQuestionSelected
      onClickCreate={handleCreateQuestion}
      onSearch={handleSearch}
      // showSort
      // sortOptions
      tabsContent={tabs}
    />
  )
}

export default DashboardPage
