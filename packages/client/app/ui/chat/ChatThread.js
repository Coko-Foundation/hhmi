import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { grid } from '@coko/client'

import ChatInput from './ChatInput'
import ChatMessageList from './ChatMessageList'

const Wrapper = styled.div`
  > div:first-child {
    margin-bottom: ${grid(5)};
  }
`

const ChatThread = props => {
  const { className, messages, onSend } = props

  return (
    <Wrapper className={className}>
      <ChatMessageList messages={messages} />
      <ChatInput onSend={onSend} />
    </Wrapper>
  )
}

ChatThread.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
      date: PropTypes.string,
      own: PropTypes.bool,
      user: PropTypes.string,
    }),
  ),
  onSend: PropTypes.func.isRequired,
}

ChatThread.defaultProps = {
  messages: [],
}

export default ChatThread
