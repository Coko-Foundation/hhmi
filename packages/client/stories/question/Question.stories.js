/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import styled from 'styled-components'

import { th } from '@coko/client'

import { Question, Checkbox } from 'ui'

import metadata from '../../app/utilities/question/metadataValues'
import resources from '../../app/utilities/question/resourcesData'
import {
  metadataTransformer,
  metadataApiToUi,
} from '../../app/utilities/question/metadataTransformations'
import {
  initialContent,
  editorInitialContent,
  initialMetadataValues,
} from '../../app/utilities/question/initialValues'

const Wrapper = styled.div`
  border: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  height: 800px;
`

export const Base = args => {
  const [submitted, setSubmitted] = useState(false)
  const [editorContent, setEditorContent] = useState(initialContent)
  const [lastUpdated, setLastUpdated] = useState(new Date().toISOString())

  const [authors, setAuthors] = useState([
    {
      value: '3aa64674-5b8b-47f1-96dd-ae83455106da',
      label: 'user1',
    },
    {
      value: '6b619777-ae96-4217-9811-a40b8eccddef',
      label: 'user2',
    },
    {
      value: 'a7987191-8532-40bd-9f97-9748ab613ef3',
      label: 'user3',
    },
    {
      value: 'a91e4a93-0bf1-4bac-b884-1c084c491d81',
      label: 'user4',
    },
  ])

  const [error, setError] = useState(false)

  const emptyNavigationFunction = e => {
    e.preventDefault()
    console.log('link clicked')
  }

  const onSubmit = data => {
    console.log(data)

    const editorState = {
      type: 'doc',
      content: JSON.parse(JSON.stringify(data.editorContent)),
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!error) {
          setEditorContent(editorState)
          setSubmitted(true)
          resolve()
        } else {
          reject()
        }
      }, 1000)
    })
  }

  const handleEditorContentChanged = newContent => {
    // save content
    console.log(newContent)
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        setLastUpdated(new Date().toISOString())
        resolve()
      }, 1000)
    })
  }

  const handleMetadataAutosave = data => {
    // save content
    console.log(data)
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        setLastUpdated(new Date().toISOString())
        resolve()
      }, 2000)
    })
  }

  const handleAssginAuthor = async authorId => {
    return new Promise((resolve, reject) => {
      resolve(authorId)
    })
  }

  const handleSearch = query => {
    setAuthors(() =>
      authors.filter(handlingEditor => handlingEditor.label === query),
    )
  }

  return (
    <Wrapper>
      <Checkbox onChange={e => setError(e.target.checked)}>
        Will have error on submit
      </Checkbox>
      <Question
        authors={authors}
        autoSaveInterval={5000}
        editorContent={editorContent}
        isSubmitted={submitted}
        isUserLoggedIn
        loading={false}
        metadata={metadataTransformer(metadata)}
        onAssignAuthor={handleAssginAuthor}
        onClickBackButton={emptyNavigationFunction}
        onClickNextButton={emptyNavigationFunction}
        onClickPreviousButton={emptyNavigationFunction}
        onEditorContentAutoSave={handleEditorContentChanged}
        onMetadataAutoSave={handleMetadataAutosave}
        onQuestionSubmit={onSubmit}
        onSearchAuthor={handleSearch}
        questionAgreedTc={false}
        resources={resources}
        submitting={false}
        updated={lastUpdated}
        {...args}
      />
    </Wrapper>
  )
}

Base.args = {
  isSubmitted: false,
  isUnderReview: false,
  isPublished: false,
  isRejected: false,
  wordFileLoading: false,
}

export const EditorView = () => {
  const [reviewing, setReviewing] = useState(false)
  const [inProduction, setInProduction] = useState(false)
  const [published, setPublished] = useState(false)
  const [rejected, setRejected] = useState(false)
  const [error, setError] = useState(false)

  const rejectQuestion = () => {
    console.log('rejected')
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!error) {
          setRejected(true)
          resolve()
        } else {
          reject()
        }
      }, 1000)
    })
  }

  const publish = () => {
    console.log('publish')
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!error) {
          setInProduction(false)
          setPublished(true)
          resolve()
        } else {
          reject()
        }
      }, 1000)
    })
  }

  const moveToReview = () => {
    console.log('move to review')
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!error) {
          setReviewing(true)
          resolve()
        } else {
          reject()
        }
      }, 1000)
    })
  }

  const moveToProduction = () => {
    console.log('move to production')
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!error) {
          setReviewing(false)
          setInProduction(true)
          resolve()
        } else {
          reject()
        }
      }, 1000)
    })
  }

  const handleEditorContentChanged = newContent => {
    // save content
    console.log(newContent)
  }

  return (
    <Wrapper>
      <Checkbox onChange={e => setError(e.target.checked)}>
        Will have error on move to review/publish/reject
      </Checkbox>
      <Question
        editorContent={editorInitialContent}
        editorView
        initialMetadataValues={metadataApiToUi(initialMetadataValues)}
        isInProduction={inProduction}
        isPublished={published}
        isRejected={rejected}
        isSubmitted
        isUnderReview={reviewing}
        loading={false}
        metadata={metadataTransformer(metadata)}
        onClickBackButton={() => console.log('go back to dashboard')}
        onClickExportToWord={() => {}}
        onEditorContentAutoSave={handleEditorContentChanged}
        onMetadataAutoSave={() => console.log('metadata auto save')}
        onMoveToProduction={moveToProduction}
        onMoveToReview={moveToReview}
        onPublish={publish}
        onQuestionSubmit={data => console.log(data)}
        onReject={rejectQuestion}
        questionAgreedTc={false}
        resources={resources}
        showAssignHEButton={false}
        submitting={false}
        wordFileLoading={false}
      />
    </Wrapper>
  )
}

export const TestMode = () => {
  const [wordFileLoading, setWordFileLoading] = useState(false)

  const handleClickExportToWord = () => {
    setWordFileLoading(true)
    setTimeout(() => {
      setWordFileLoading(false)
      console.log('word file downloaded')
    }, 1000)
  }

  return (
    <Wrapper>
      <Question
        editorContent={editorInitialContent}
        facultyView
        initialMetadataValues={initialMetadataValues}
        isPublished
        isRejected={false}
        isSubmitted
        isUnderReview={false}
        loading={false}
        metadata={metadataTransformer(metadata)}
        onClickBackButton={() => console.log('go back to dashboard')}
        onClickExportToWord={handleClickExportToWord}
        onQuestionSubmit={data => console.log(data)}
        readOnly
        resources={resources}
        submitting={false}
        wordFileLoading={wordFileLoading}
      />
    </Wrapper>
  )
}

export default {
  component: Question,
  title: 'Question/Question',
}
