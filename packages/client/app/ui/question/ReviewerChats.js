/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { grid, th } from '@coko/client'
import { ChatThread } from '../chat'
import { Select } from '../common'

const ReviewerChatHeader = styled.header`
  align-items: center;
  border-bottom: 1px solid ${th('colorBorder')};
  display: flex;
  justify-content: flex-end;
  padding: ${grid(1)} ${grid(3)};
`

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
`

const StyledSelect = styled(Select)`
  width: 200px;
`

const ReviewerSelectorWrapper = styled.div`
  align-items: center;
  display: flex;
  gap: ${grid(2)};
`

const NoReviewer = styled.div`
  display: grid;
  height: 100%;
  place-content: center;

  p {
    text-align: center;
  }
`

const ReviewerChats = props => {
  const {
    hasMore,
    isActive,
    messages,
    onFetchMore,
    onSendMessage,
    participants,

    reviewers,
    onSelectReviewer,
  } = props

  const [selectedReviewer, setSelectedReviewer] = useState()

  useEffect(() => {
    if (selectedReviewer?.id) {
      // load chat
      onSelectReviewer(selectedReviewer.id)
    }
  }, [selectedReviewer])

  const handleChangeReviewer = val => {
    setSelectedReviewer(reviewers.find(r => r.id === val))
  }

  return (
    <Wrapper>
      <ReviewerChatHeader>
        <ReviewerSelectorWrapper>
          <label htmlFor="selectReviewer">Chat with reviewer: </label>
          <StyledSelect
            id="selectReviewer"
            onChange={handleChangeReviewer}
            options={reviewers?.map(r => ({
              label: r.displayName,
              value: r.id,
            }))}
          />
        </ReviewerSelectorWrapper>
      </ReviewerChatHeader>
      {selectedReviewer ? (
        <ChatThread
          hasMore={hasMore}
          inputPlaceholder={`Write to ${selectedReviewer.displayName}`}
          isActive={isActive}
          messages={messages}
          onFetchMore={onFetchMore}
          onSendMessage={onSendMessage}
          participants={participants}
        />
      ) : (
        <NoReviewer>
          <div>
            <p>
              <strong>No reviewer selected</strong>
            </p>
            <p>Select a reviewer to chat</p>
          </div>
        </NoReviewer>
      )}
    </Wrapper>
  )
}

export default ReviewerChats
