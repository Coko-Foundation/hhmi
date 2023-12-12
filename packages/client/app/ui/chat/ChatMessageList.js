import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroll-component'
import { grid } from '@coko/client'

import ChatMessage from './ChatMessage'
import { Button, Empty, Spin, VisuallyHiddenElement } from '../common'

const Wrapper = styled.div`
  background: linear-gradient(60deg, #f2fdfd, #d0e1e1);
  /* background-color: #061616; */
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
  overflow: auto;
  overflow-anchor: none;
  overscroll-behavior: contain;
  z-index: 1;

  ::-webkit-scrollbar-track {
    background-color: #fff5;
  }

  * + * {
    margin-top: ${grid(1)};
  }
`

const MessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledInfiniteScroll = styled(InfiniteScroll)`
  display: flex;
  flex-direction: column;
`

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-block: ${grid(6)} ${grid(3)};

  // put the loader on top even now that order of messages is not reversed
  order: -1;
`

const TopMessageWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  order: ${props => (props.infiniteScroll ? '-1' : '0')};
  padding: 0.8rem 1.5rem;

  text-align: center;
  width: 100%;

  & > p {
    background-color: #fff;
    border-radius: 1rem;
    box-shadow: 0 0 12px #0001;
    margin: 0;
    padding: 0.2rem 1rem;
  }
`

const ChatMessageList = props => {
  const {
    className,
    hasMore,
    messages,
    onFetchMore,
    infiniteScroll,
    participants,
  } = props

  const participantUsernames = participants.map(
    participant => participant.display,
  )

  const messageList = () =>
    infiniteScroll ? (
      <StyledInfiniteScroll
        dataLength={messages.length}
        endMessage={
          <TopMessageWrapper infiniteScroll>
            <p>Start of the conversation</p>
          </TopMessageWrapper>
        }
        hasMore={hasMore}
        inverse
        loader={
          <SpinnerWrapper id="chat-loading">
            <VisuallyHiddenElement aria-live="assertive" role="status">
              loading previous messages
            </VisuallyHiddenElement>
            <Spin />
          </SpinnerWrapper>
        }
        next={onFetchMore}
        scrollableTarget="scrollableDiv"
        scrollThreshold="50px"
      >
        {messages.map(({ content, date, own, user, attachments, id }) => {
          return (
            <ChatMessage
              attachments={attachments}
              className="message"
              content={content}
              date={date}
              key={id}
              own={own}
              participants={participantUsernames}
              user={user}
            />
          )
        })}
      </StyledInfiniteScroll>
    ) : (
      <>
        <MessagesWrapper>
          {messages.map(({ content, date, own, user, id, attachments }) => (
            <ChatMessage
              attachments={attachments}
              className="message"
              content={content}
              date={date}
              key={id}
              own={own}
              participants={participantUsernames}
              user={user}
            />
          ))}
        </MessagesWrapper>
        <TopMessageWrapper>
          {hasMore ? (
            <Button onClick={onFetchMore}>Load older</Button>
          ) : (
            <p>Start of the conversation</p>
          )}
        </TopMessageWrapper>
      </>
    )

  return (
    <Wrapper className={className} id="scrollableDiv">
      {messages.length === 0 ? (
        <Empty
          description="No conversations yet"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          role="status"
        />
      ) : (
        messageList()
      )}
    </Wrapper>
  )
}

ChatMessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
      date: PropTypes.string,
      own: PropTypes.bool,
      user: PropTypes.string,
    }),
  ),
  participants: PropTypes.arrayOf(PropTypes.shape()),
  hasMore: PropTypes.bool,
  infiniteScroll: PropTypes.bool,
  onFetchMore: PropTypes.func,
}

ChatMessageList.defaultProps = {
  messages: [],
  hasMore: false,
  infiniteScroll: false,
  onFetchMore: () => {},
  participants: [],
}

export default ChatMessageList
