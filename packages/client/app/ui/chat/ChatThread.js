import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { grid, th } from '@coko/client'
import ChatInput from './ChatInput'
import userIcon from '../../../static/user.svg'
import ChatMessageList from './ChatMessageList'
import { VisuallyHiddenElement } from '../common'
import { alpha } from '../_helpers/themeUtils'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  padding: 0;
`

const StyledChatMessageList = styled(ChatMessageList)`
  flex-grow: 1;
  overflow-y: auto;
`

const StyledChatInput = styled(ChatInput)`
  margin-top: ${grid(1)};
`

const UserIcon = styled.img`
  aspect-ratio: 1 / 1;
  background-color: #e3e8e8;
  border-radius: 50%;
  margin: 0;
  outline: 1px solid ${alpha('colorPrimary', 0.3)};
  width: 20px;
`

const StyledChatHeader = styled.div`
  align-items: center;
  background-color: #f5f5f5;
  border-bottom: 1px solid #0003;
  box-shadow: 0 0 12px #0003;
  color: ${th('colorPrimary')};
  display: flex;
  gap: 0.5rem;
  justify-content: flex-start;
  padding: 0.7rem 1rem;
  z-index: 3;

  > :first-child {
    /* color: #777; */
    margin: 0.3rem 0;
  }

  > :nth-child(2) {
    /* background-color: #fff;
    border: 1px solid #0003; */
    display: flex;
    gap: 0.5rem;
    /* padding: 0.5rem; */
    width: 100%;
  }
`

const StyledParticipants = styled.span`
  align-items: center;
  border-right: 1px solid ${alpha('colorPrimary', 0.3)};
  cursor: pointer;
  display: flex;
  font-size: ${th('fontSizeBaseSmaller')};
  gap: 0.5rem;
  padding: 0.3rem 1rem 0.3rem 0.5rem;
  user-select: none;
`

const ChatThread = props => {
  const {
    participants,
    announcementText,
    hasMore,
    isActive,
    messages,
    onFetchMore,
    onSendMessage,
    infiniteScroll,
    ...rest
  } = props

  const wrapperRef = useRef()
  const [focusableElements, setFocusableElements] = useState([])

  const moveTo = direction => {
    const currentIndex = focusableElements.indexOf(document.activeElement)

    if (direction === 'UP' && currentIndex > 0) {
      focusableElements[currentIndex - 1].focus()
    } else if (
      direction === 'DOWN' &&
      currentIndex < focusableElements.length - 1
    ) {
      focusableElements[currentIndex + 1].focus()
    }
  }

  const handleKeyDown = e => {
    const { key } = e

    switch (key) {
      case 'ArrowUp':
        e.preventDefault()
        moveTo('UP')
        break
      case 'ArrowDown':
        e.preventDefault()
        moveTo('DOWN')
        break
      default:
        break
    }
  }

  useEffect(() => {
    const messageNodeList = wrapperRef.current.querySelectorAll('.message')
    const messageArray = Array.from(messageNodeList)
    setFocusableElements(messageArray)
  }, [messages])

  useEffect(() => {
    setTimeout(() => {
      isActive && wrapperRef.current.querySelector('.ant-input')?.focus()
    }, 200)
  }, [isActive])

  return (
    <Wrapper onKeyDown={handleKeyDown} ref={wrapperRef}>
      <StyledChatHeader>
        <p>Participants:</p>
        <span>
          {participants.map((p, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <StyledParticipants key={`${p.id}-${i}`}>
              <UserIcon alt={p.display} src={userIcon} />
              {p.display} <small>({p.role})</small>
            </StyledParticipants>
          ))}
        </span>
      </StyledChatHeader>
      <StyledChatMessageList
        hasMore={hasMore}
        infiniteScroll={infiniteScroll}
        messages={messages}
        onFetchMore={onFetchMore}
        participants={participants}
        {...rest}
      />
      <StyledChatInput
        aria-label="Write a message"
        onSend={onSendMessage}
        participants={participants}
        placeholder="Write a message"
        type="text"
      />
      {announcementText && (
        <VisuallyHiddenElement aria-live="assertive" role="alert">
          {announcementText}
        </VisuallyHiddenElement>
      )}
    </Wrapper>
  )
}

ChatThread.propTypes = {
  isActive: PropTypes.bool,
  announcementText: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.shape()),
  onFetchMore: PropTypes.func,
  onSendMessage: PropTypes.func,
  hasMore: PropTypes.bool,
  infiniteScroll: PropTypes.bool,
  participants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      display: PropTypes.string,
      role: PropTypes.string,
    }),
  ),
}

ChatThread.defaultProps = {
  isActive: false,
  announcementText: '',
  messages: [],
  onFetchMore: () => {},
  hasMore: false,
  onSendMessage: () => {},
  participants: [],
  infiniteScroll: false,
}

export default ChatThread
