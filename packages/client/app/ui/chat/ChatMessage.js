import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { PaperClipOutlined } from '@ant-design/icons'

import { grid, th } from '@coko/client'

import { ChatBox, DateParser, VisuallyHiddenElement } from '../common'
import { alpha } from '../_helpers/themeUtils'

// const pullRight = css`
//   margin-left: auto;
// `

const MessageWrapper = styled.div`
  display: flex;

  // thinking in options for the message displayed on the opposite side of the Chatbox
  flex-direction: ${props => (props.own ? 'row-reverse' : 'row')};
  padding: 1rem;
  transition: background-color 0.2s;
  width: 100%;

  &:focus,
  &:active {
    background-color: ${alpha('colorSelection', 0.2)};
    border: none;
    outline: none;
  }
`

const Message = styled(ChatBox)`
  --background: ${props =>
    props.own ? th('colorBackgroundHue') : th('colorPrimary')};
  --triangle-x: ${props => (props.own ? '35px' : 'calc(100% - 35px)')};
  --skew: ${props => (props.own ? '25deg' : '-25deg')};
  --border: #0000;
  align-self: baseline;
  border-radius: 1rem;
  color: ${props => (props.own ? '#555' : th('colorTextReverse'))};
  display: inline-block;
  filter: drop-shadow(0 0 5px #0002);
  max-width: 400px;
  min-width: 300px;
  padding: ${grid(3)};
  user-select: none;

  > * + * {
    margin-block-start: ${grid(3)};
  }
`

const StyledMention = styled.span`
  cursor: pointer;
  font-weight: 900;
`

const Name = styled.div`
  font-size: ${th('fontSizeBaseSmall')};
  font-weight: bold;
`

const Content = styled.div`
  padding: 0 0.5rem;
`

const Date = styled.div`
  display: flex;
  font-size: ${th('fontSizeBaseSmall')};
  font-style: italic;
  justify-content: flex-end;
`

const Attachments = styled.div`
  background-color: rgb(0 0 0 / 10%);
  border-radius: 8px;
  box-shadow: inset rgb(0 0 0 / 18%) 0 1px 2px;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(2, 0.2fr);
  margin-block: ${grid(2)};
  padding: ${grid(3)};
`

const AttachmentItem = styled.a`
  border: 1px solid white;
  border-radius: 5px;
  color: inherit;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  padding: ${grid(1)};
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 130px;

  &:focus {
    outline: 2px solid ${th('colorPrimaryBorder')};
    outline-offset: 1px;
  }
`

const MessageContent = ({ content, participants }) => {
  const parts = content.split(/(@\w+)/g)

  const output = parts.map((part, index) => {
    // checking if the mentioned user is a part of participants in the chat
    return part.startsWith('@') && participants.includes(part.slice(1)) ? (
      // eslint-disable-next-line react/no-array-index-key
      <StyledMention data-testid="user-mention" key={`${part}-${index}`}>
        {part}
      </StyledMention>
    ) : (
      part
    )
  })

  return <Content>{output}</Content>
}

const ChatMessage = forwardRef((props, ref) => {
  const {
    attachments,
    className,
    content,
    date,
    own,
    user,
    participants,
    ...rest
  } = props

  return (
    <MessageWrapper own={own} tabIndex={0}>
      <Message
        className={className}
        content={
          <>
            <MessageContent content={content} participants={participants} />
            {attachments.length > 0 && (
              <Attachments>
                {attachments.map(attachment => (
                  <AttachmentItem
                    data-testid="message-attachment"
                    href={attachment.url}
                    key={attachment.name}
                    target="_blank"
                  >
                    <PaperClipOutlined />
                    {attachment.name}
                  </AttachmentItem>
                ))}
              </Attachments>
            )}
            <Date data-testid="time-indicator">
              <DateParser timestamp={date}>
                {(_, timeAgo) => <span>{timeAgo} ago</span>}
              </DateParser>
            </Date>
          </>
        }
        data-testid={own ? 'author-message' : 'participant-message'}
        header={
          <>
            <Name>{!own ? user : 'You'} said:</Name>
            <VisuallyHiddenElement as="p">
              {own ? 'you said' : 'said'}
            </VisuallyHiddenElement>
          </>
        }
        own={own}
        ref={ref}
        {...rest}
      />
    </MessageWrapper>
  )
})

ChatMessage.propTypes = {
  attachments: PropTypes.arrayOf(PropTypes.shape()),
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  own: PropTypes.bool,
  user: PropTypes.string,
  participants: PropTypes.arrayOf(PropTypes.string),
}

ChatMessage.defaultProps = {
  attachments: [],
  own: false,
  user: null,
  participants: [],
}
MessageContent.propTypes = {
  content: PropTypes.string,
  participants: PropTypes.arrayOf(PropTypes.string),
}
MessageContent.defaultProps = {
  content: '',
  participants: [],
}

export default ChatMessage
