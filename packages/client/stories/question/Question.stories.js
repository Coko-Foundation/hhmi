/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import styled from 'styled-components'
import { lorem, name } from 'faker'
import { th, uuid } from '@coko/client'

import { Question, Checkbox, Button } from 'ui'

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
import complexItemSet from '../../app/utilities/question/complexItemSets'
import { createData, createMessages } from '../../app/utilities/_helpers'
import { REVIEWER_STATUSES } from '../../app/utilities'

const Wrapper = styled.div`
  border: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  height: 800px;
`

const makeUser = n =>
  createData(n, i => ({
    value: uuid(),
    label: name.findName(),
  }))

export const Author = args => {
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
        complexItemSetOptions={complexItemSet}
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

Author.args = {
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
  const [messages, setMessages] = useState(createMessages(20))
  const [announcementText, setAnnouncementText] = useState(null)

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

  const [handlingEditors, setHandlingEditors] = useState([])
  const [searchHELoading, setSearchHELoading] = useState(false)
  const [assignHELoading, setAssignHELoading] = useState(false)

  const handleSearchHE = query => {
    console.log(`searching editors by query ${query}`)
    setSearchHELoading(true)
    setTimeout(() => {
      setHandlingEditors(makeUser(5))
      setSearchHELoading(false)
    }, 2000)
  }

  const handleAssignHE = () => {
    console.log(`assigning HE`)
    setAssignHELoading(true)
    setTimeout(() => {
      setAssignHELoading(false)
    }, 2000)
  }

  const mockSubscription = msg => {
    setAnnouncementText(
      msg.own
        ? `you said ${msg.content}`
        : `new message: ${msg.user} said ${msg.content}`,
    )
  }

  const handleSendMessage = async content => {
    setAnnouncementText(null)

    const msg = {
      content,
      date: new Date().toISOString(),
      own: true,
      user: name.findName(),
    }

    setMessages(curMessages => [...curMessages, msg])
    mockSubscription(msg)
  }

  const handleFetchMoreMessage = async () => {
    setAnnouncementText(null)
    // eslint-disable-next-line no-promise-executor-return
    const mockDelay = time => new Promise(resolve => setTimeout(resolve, time))
    await mockDelay(1000)
    const prevMessages = createMessages(10)
    setMessages(curMessages => [...prevMessages, ...curMessages])

    setAnnouncementText(`Loaded ${prevMessages.length}  previous messages`)
  }

  const handleMetadataAutoSave = () =>
    new Promise(resolve => {
      setTimeout(() => {
        console.log('metadata auto save')
        resolve()
      }, 1000)
    })

  const mockAuthorMessage = () => {
    const msg = {
      content: lorem.sentences(2),
      date: new Date().toISOString(),
      own: false,
      user: name.findName(),
    }

    setMessages(curMessages => [...curMessages, msg])
    mockSubscription(msg)
  }

  return (
    <Wrapper>
      <Checkbox onChange={e => setError(e.target.checked)}>
        Will have error on move to review/publish/reject
      </Checkbox>
      <Button onClick={mockAuthorMessage}>Recieve author message</Button>

      <Question
        announcementText={announcementText}
        assignHELoading={assignHELoading}
        complexItemSetOptions={complexItemSet}
        editorContent={editorInitialContent}
        editorView
        handlingEditors={handlingEditors}
        hasMoreMessages={messages.length > 0}
        initialMetadataValues={metadataApiToUi(initialMetadataValues)}
        isInProduction={inProduction}
        isPublished={published}
        isRejected={rejected}
        isSubmitted
        isUnderReview={reviewing}
        loading={false}
        messages={messages}
        metadata={metadataTransformer(metadata)}
        onClickAssignHE={handleAssignHE}
        onClickBackButton={() => console.log('go back to dashboard')}
        onClickExportToWord={() => {}}
        onEditorContentAutoSave={handleEditorContentChanged}
        onFetchMoreMessages={handleFetchMoreMessage}
        onMetadataAutoSave={handleMetadataAutoSave}
        onMoveToProduction={moveToProduction}
        onMoveToReview={moveToReview}
        onPublish={publish}
        onQuestionSubmit={data => console.log(data)}
        onReject={rejectQuestion}
        onSearchHE={handleSearchHE}
        onSendMessage={handleSendMessage}
        questionAgreedTc={false}
        resources={resources}
        searchHELoading={searchHELoading}
        showAssignHEButton
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
        complexItemSetOptions={complexItemSet}
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

export const ReviewerView = () => {
  const [inviteStatus, setInviteStatus] = useState(REVIEWER_STATUSES.invited)
  const [reviewSubmitted, setReviewSubmitted] = useState(false)
  const [messages, setMessages] = useState(createMessages(20))

  const handleAccept = () =>
    new Promise(resolve => {
      setTimeout(() => {
        console.log('reviewer accepted invite')
        setInviteStatus(REVIEWER_STATUSES.accepted)
        resolve()
      }, 1000)
    })

  const handleReject = reason =>
    new Promise(resolve => {
      setTimeout(() => {
        console.log('reviewer rejected invite:', reason)
        setInviteStatus(REVIEWER_STATUSES.rejected)
        resolve()
      }, 1000)
    })

  const handleSubmit = reason =>
    new Promise(resolve => {
      setTimeout(() => {
        console.log('reviewer submitted review:', reason)
        setReviewSubmitted(true)
        resolve()
      }, 1000)
    })

  const handleSendMessage = content => {
    const msg = {
      content,
      date: new Date().toISOString(),
      own: true,
      user: name.findName(),
    }

    setMessages([...messages, msg])
  }

  return (
    <Wrapper>
      <Question
        complexItemSetOptions={complexItemSet}
        editorContent={editorInitialContent}
        // facultyView
        initialMetadataValues={initialMetadataValues}
        isPublished
        isRejected={false}
        isSubmitted
        isUnderReview={false}
        loading={false}
        metadata={metadataTransformer(metadata)}
        onClickBackButton={() => console.log('go back to dashboard')}
        onQuestionSubmit={data => console.log(data)}
        onReviewerAcceptInvite={handleAccept}
        onReviewerRejectInvite={handleReject}
        onSendReviewerChatMessage={handleSendMessage}
        onSubmitReview={handleSubmit}
        readOnly
        resources={resources}
        reviewerChatMessages={messages}
        reviewerView
        reviewInviteStatus={inviteStatus}
        reviewSubmitted={reviewSubmitted}
        showReviewerChatTab={inviteStatus === REVIEWER_STATUSES.accepted}
        submitting={false}
      />
    </Wrapper>
  )
}

export default {
  component: Question,
  title: 'Question/Question',
}
