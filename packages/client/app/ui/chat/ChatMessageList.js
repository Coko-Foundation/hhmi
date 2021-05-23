import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { grid } from '@coko/client'

import ChatMessage from './ChatMessage'
import { List } from '../common'

const Wrapper = styled.div`
  li:not(:last-child) {
    margin-bottom: ${grid(2)};
  }
`

const ChatMessageList = props => {
  const { className, messages } = props

  return (
    <Wrapper className={className}>
      <List
        dataSource={messages}
        renderItem={item => (
          <li>
            <ChatMessage
              content={item.content}
              date={item.date}
              own={item.own}
              user={item.user}
            />
          </li>
        )}
      />
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
}

ChatMessageList.defaultProps = {
  messages: [],
}

export default ChatMessageList
