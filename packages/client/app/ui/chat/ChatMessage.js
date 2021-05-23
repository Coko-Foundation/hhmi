import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { grid, th } from '@coko/client'

import { DateParser } from '../common'

const pullRight = css`
  margin-left: auto;
`

const Wrapper = styled(({ own, ...rest }) => <div {...rest} />)`
  display: flex;
`

const Message = styled(({ own, ...rest }) => <div {...rest} />)`
  background: ${props =>
    props.own ? th('colorPrimary') : th('colorSecondary')};
  border-radius: 3px;
  color: ${props => (props.own ? th('colorTextReverse') : th('colorText'))};
  display: inline-block;
  max-width: 90%;
  padding: ${grid(2)};

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${props =>
    props.own &&
    css`
      ${pullRight}

      span {
        ${pullRight}
      }
    `}
`

const Name = styled.div`
  font-size: ${th('fontSizeBaseSmall')};
  font-weight: bold;
`

const Content = styled.div``

const Date = styled.div`
  display: flex;
  font-size: ${th('fontSizeBaseSmall')};
  font-style: italic;
  margin-top: ${grid(2)};
`

const ChatMessage = props => {
  const { className, content, date, own, user } = props

  return (
    <Wrapper className={className}>
      <Message own={own}>
        {!own && <Name>{user}</Name>}

        <Content>{content}</Content>

        <Date>
          <DateParser timestamp={date}>
            {(timestamp, timeAgo) => <span>{timeAgo} ago</span>}
          </DateParser>
        </Date>
      </Message>
    </Wrapper>
  )
}

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
