import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { grid, th, useCurrentUser, uuid } from '@coko/client'
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

  @media screen and (min-width: 800px) {
    flex-direction: row;
  }
`

const ChatWrapper = styled.span`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: hidden;
  width: 100%;
`

const StyledChatMessageList = styled(ChatMessageList)`
  flex-grow: 1;
  overflow-y: auto;
`

const StyledChatInput = styled(ChatInput)`
  margin-top: ${grid(1)};
`

const UserIcon = styled.img`
  align-self: flex-end;
  aspect-ratio: 1 / 1;
  background-color: #e3e8e8;
  border-radius: 50%;
  margin: 0;
  outline: 1px solid ${alpha('colorPrimary', 0.3)};
  width: 20px;

  /* @media screen and (min-width: 800px) {
    width: 32px;
  } */
`

const StyledChatHeader = styled.div`
  align-items: center;
  background-color: #f5f5f5;
  border-bottom: 1px solid #0003;
  box-shadow: 0 0 12px #0003;
  color: ${th('colorPrimary')};
  display: flex;
  justify-content: flex-start;
  min-height: 40px;
  min-width: 200px;
  overflow: auto hidden;
  padding: 0.5rem;
  width: 100%;
  z-index: 5;

  ::-webkit-scrollbar {
    height: 4px;
  }

  ::-webkit-scrollbar-track {
    background: none;
  }

  > :first-child {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  @media screen and (min-width: 800px) {
    background-color: ${th('colorSecondary')};
    box-shadow: 0 0 12px #0001;
    color: #dfeded;
    flex-direction: column;
    width: 25%;

    > :first-child {
      flex-direction: column;
    }
  }
`

const StyledParticipant = styled.span`
  align-items: center;
  border-right: 1px solid ${alpha('colorPrimary', 0.3)};
  cursor: pointer;
  display: flex;
  font-size: ${th('fontSizeBaseSmall')};
  gap: 0.5rem;
  padding: 0 1rem;
  user-select: none;

  > span {
    display: flex;
    gap: 0.3rem;

    > strong {
      line-height: 1;
    }
  }

  @media screen and (min-width: 800px) {
    border: none;
    border-bottom: 1px solid ${alpha('colorPrimaryBorder', 0.6)};
    padding: 0.7rem 1rem 0.7rem 0.5rem;
  }
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
    showParticipants,
    ...rest
  } = props

  const wrapperRef = useRef()
  const [focusableElements, setFocusableElements] = useState([])
  const { currentUser } = useCurrentUser()

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
      {showParticipants && participants.length > 0 && (
        <StyledChatHeader>
          <span>
            {[...new Set(participants)].map((p, i) => (
              <StyledParticipant key={uuid()}>
                <UserIcon alt={p.display} src={userIcon} />
                <span>
                  <strong>{currentUser.id === p.id ? 'You' : p.display}</strong>{' '}
                  <small>({p.role})</small>
                </span>
              </StyledParticipant>
            ))}
          </span>
        </StyledChatHeader>
      )}
      <ChatWrapper>
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
      </ChatWrapper>
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
  showParticipants: PropTypes.bool,
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
  showParticipants: true,
}

export default ChatThread
