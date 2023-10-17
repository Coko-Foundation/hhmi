import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import DOMPurify from 'dompurify'
import { PaperClipOutlined } from '@ant-design/icons'

import { grid, th } from '@coko/client'

import { DateParser, VisuallyHiddenElement } from '../common'

const pullRight = css`
  margin-left: auto;
  margin-right: ${grid(1)};
`

const Message = styled.div`
  align-self: baseline;
  background: ${props =>
    props.own ? th('colorBackgroundHue') : th('colorPrimaryBorder')};
  border-radius: ${props =>
    props.own ? '15px 0 15px 15px' : '0 15px 15px 15px'};
  box-shadow: rgb(50 50 93 / 25%) 0 6px 12px -2px,
    rgb(0 0 0 / 30%) 0 3px 7px -3px;
  color: ${props => (props.own ? th('colorTextDark') : th('colorTextReverse'))};
  display: inline-block;
  margin-block: 10px;
  margin-left: ${grid(1)};
  max-inline-size: 50%;
  min-inline-size: 30%;
  ${props =>
    props.own &&
    css`
      ${pullRight}

      span {
        ${pullRight}
      }
    `};
  padding: ${grid(1)};

  &:focus {
    outline: ${props => `${props.theme.lineWidth * 4}px`} solid
      ${th('colorPrimaryBorder')};
    outline-offset: 1px;
  }

  & .mention {
    cursor: pointer;
    font-weight: 900;
  }
`

const Name = styled.div`
  font-size: ${th('fontSizeBaseSmall')};
  font-weight: bold;
  margin-bottom: ${grid(2)};
`

const Content = styled.div`
  padding-inline: ${grid(2)};
`

const Date = styled.div`
  display: flex;
  font-size: ${th('fontSizeBaseSmall')};
  font-style: italic;
  justify-content: flex-end;
  margin-right: ${grid(2)};
  margin-top: ${grid(2)};
`

const Attachments = styled.div`
  background: rgba(0, 0, 0, 10%);
  border-radius: 8px;
  box-shadow: inset rgb(0 0 0 / 18%) 0 1px 2px;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(2, 0.2fr);
  margin-block: ${grid(2)};
  padding: ${grid(3)};
`

const AttachmentItem = styled.span`
  border: 1px solid white;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  padding: ${grid(1)};
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 130px;
`

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

  const parts = content.split(/(@\w+)/g)
  let output = ''

  parts.forEach(part => {
    // checking if the mentioned user is a part of participants in the cat
    if (part.startsWith('@') && participants.includes(part.slice(1))) {
      output += `<span class="mention">${part}</span>`
      return
    }

    output += part
  })
  const sanitizedHTML = DOMPurify.sanitize(output)

  return (
    <Message className={className} own={own} ref={ref} tabIndex={0} {...rest}>
      {!own && <Name>{user}</Name>}
      <VisuallyHiddenElement as="p">
        {own ? 'you said' : 'said'}
      </VisuallyHiddenElement>

      <Content>
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        />
      </Content>
      {attachments.length > 0 && (
        <Attachments>
          {attachments.map(attachment => (
            <AttachmentItem>
              <PaperClipOutlined />
              {attachment.name}
            </AttachmentItem>
          ))}
        </Attachments>
      )}
      <Date>
        <DateParser timestamp={date}>
          {(_, timeAgo) => <span>{timeAgo} ago</span>}
        </DateParser>
      </Date>
    </Message>
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

export default ChatMessage
