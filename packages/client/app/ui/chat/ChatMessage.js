import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { grid, th } from '@coko/client'

import { DateParser, VisuallyHiddenElement } from '../common'

const pullRight = css`
  margin-left: auto;
  margin-right: ${grid(1)};
`

const Message = styled.div`
  align-self: baseline;
  background: ${props =>
    props.own ? th('colorPrimary') : th('colorSecondary')};
  border-radius: 3px;
  color: ${th('colorTextReverse')};
  display: inline-block;
  margin-left: ${grid(1)};
  max-inline-size: 90%;
  min-inline-size: 30%;
  ${props =>
    props.own &&
    css`
      ${pullRight}

      span {
        ${pullRight}
      }
    `};
  padding: ${grid(2)};

  &:focus {
    outline: ${props => `${props.theme.lineWidth * 4}px`} solid
      ${th('colorPrimaryBorder')};
    outline-offset: 1px;
  }
`

const Name = styled.div`
  font-size: ${th('fontSizeBaseSmall')};
  font-weight: bold;
  margin-bottom: ${grid(2)};
`

const Content = styled.div``

const Date = styled.div`
  display: flex;
  font-size: ${th('fontSizeBaseSmall')};
  font-style: italic;
  margin-top: ${grid(2)};
`

const ChatMessage = forwardRef((props, ref) => {
  const { className, content, date, own, user, ...rest } = props
  return (
    <Message className={className} own={own} ref={ref} tabIndex={0} {...rest}>
      {!own && <Name>{user}</Name>}
      <VisuallyHiddenElement as="p">
        {own ? 'you said' : 'said'}
      </VisuallyHiddenElement>

      <Content>{content}</Content>
      <Date>
        <DateParser timestamp={date}>
          {(_, timeAgo) => <span>{timeAgo} ago</span>}
        </DateParser>
      </Date>
    </Message>
  )
})

ChatMessage.propTypes = {
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  own: PropTypes.bool,
  user: PropTypes.string,
}

ChatMessage.defaultProps = {
  own: false,
  user: null,
}

export default ChatMessage
