import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { CopyOutlined, PaperClipOutlined } from '@ant-design/icons'

import { grid, th, uuid } from '@coko/client'

import { Tooltip } from 'antd'
import { ChatBox, DateParser, VisuallyHiddenElement } from '../common'
import { alpha } from '../_helpers/themeUtils'

const MessageWrapper = styled.div`
  display: flex;

  // thinking in options for the message to be displayed on the opposite side of the Chatbox
  flex-direction: ${props => (props.own ? 'row-reverse' : 'row')};
  justify-content: space-between;
  padding: 1rem 1.5rem;
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
  box-shadow: inset 0 0 12px ${p => (!p.own ? '#0884' : '#ddd4')};
  color: ${props => (props.own ? '#555' : th('colorTextReverse'))};
  display: inline-block;
  filter: drop-shadow(0 0 5px #0222);
  max-width: 80%;
  min-width: 300px;
  padding: ${grid(3)};
  padding-top: 0.3rem;
  user-select: none;

  @media screen and (max-width: 800px) {
    max-width: 90%;
  }

  @media screen and (max-width: 400px) {
    max-width: 90%;
    min-width: 90%;
  }
`

const StyledMention = styled.span`
  cursor: pointer;
  font-weight: 900;
`

const Name = styled.span`
  font-size: ${th('fontSizeBase')};
  font-weight: bold;
  padding-top: 0.1rem;
`

const Content = styled.div`
  border-bottom: 1px solid ${p => (!p.own ? '#fff2' : '#0001')};
  border-top: 1px solid ${p => (!p.own ? '#fff2' : '#0001')};
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem 0.5rem 0.5rem;

  > span {
    margin: 0;
  }
`

const StyledCopy = styled(CopyOutlined)``

const MessageLine = styled.span`
  overflow: hidden;
  overflow-wrap: break-word;
`

const Date = styled.div`
  display: flex;
  font-size: ${th('fontSizeBaseSmall')};
  font-style: italic;
  justify-content: flex-end;
  padding-top: ${grid(1)};
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

const MessageHeader = styled.span`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 0.3rem 0;
`

const MessageContent = ({ content, participants, ...rest }) => {
  const lines = content
    .split('<br />')
    .join('\n') // to show properly the messages that were sent before this change
    .split('\n')
    .map((line, i) => {
      const parts = line.split(/(@\w+)/g)

      const output = parts.map(part =>
        part.startsWith('@') && participants.includes(part.slice(1)) ? (
          <StyledMention data-testid="user-mention" key={uuid()}>
            {part}
          </StyledMention>
        ) : (
          part || (i !== 0 && <br key={uuid()} />) /// if line is empty and is not the first, retrun a linebreak (means user intentionally made it)
        ),
      )

      return <MessageLine key={uuid()}>{output}</MessageLine>
    })

  return <Content {...rest}>{lines}</Content>
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content.split('<br />').join('\n')) // to show copy the messages that were sent before this change
    } catch (err) {
      throw ('Failed to copy', err)
    }
  }

  return (
    <MessageWrapper data-testid="msg-container" own={own} tabIndex={0}>
      <Message
        className={className}
        content={
          <>
            <MessageContent
              content={content}
              own={own}
              participants={participants}
            />
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
          </>
        }
        data-testid={own ? 'author-message' : 'participant-message'}
        footer={
          <Date data-testid="time-indicator">
            <DateParser timestamp={date}>
              {(_, timeAgo) => <span>{timeAgo} ago</span>}
            </DateParser>
          </Date>
        }
        header={
          <MessageHeader>
            <Name>{!own ? user : 'You'}:</Name>
            <VisuallyHiddenElement as="p">
              {own ? 'you said' : `${user} said`}
            </VisuallyHiddenElement>
            <Tooltip title="Copy message content">
              <StyledCopy onClick={handleCopy} />
            </Tooltip>
          </MessageHeader>
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
