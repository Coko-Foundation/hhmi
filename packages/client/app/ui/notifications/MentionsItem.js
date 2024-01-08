import React from 'react'
import styled from 'styled-components'
import { th, grid } from '@coko/client'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
import userIcon from '../../../static/user.svg'
import { alpha } from '../_helpers/themeUtils'
import { ellipsis } from '../../utilities'
import useWindowSize from '../_helpers/useWindowSize'
import { ChatBox } from '../common'

const ListItemContent = styled.span`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  outline: 1px solid #0000;
  transition: all 0.2s;
  user-select: none;
  width: 95%;

  &::before {
    background-color: ${alpha('#dddddd', 0.6)};
    /* stylelint-disable-next-line string-quotes */
    content: '';
    inset: ${p => (p.$unread ? '0' : '100%')};
    position: absolute;
    z-index: -1;
  }
`

const Chatbox = styled(ChatBox)`
  --border: #0002;
  --background: #fff;
  --triangle-width: 12px;
  --triangle-height: 15px;
  --triangle-x: 35px;
  border-radius: 25px;
  filter: drop-shadow(0 0 5px #0001);
  outline: 1px solid #0000;
  padding: 0 0 0.4rem;
  transition: border 0.3s;

  &::before,
  &::after {
    transition: border 0.3s;
  }

  &:hover {
    --border: ${th('colorPrimary')};
  }
`

const MessageFromHeader = styled.span`
  align-items: center;
  background-color: ${th('colorPrimary')};
  box-shadow: inset 0 0 12px #fff4, 0 0 5px #0004;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem 0.6rem 0.2rem 0.3rem;
  position: relative;
  width: 100%;

  > :nth-child(1) {
    align-items: center;
    display: flex;
    gap: 0.5rem;
    padding: 0.3rem 0.2rem;
  }
`

const MessageSender = styled.span`
  color: #fff;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  height: 100%;
  line-height: 1;
  margin: 0 0 0 0.1rem;
  width: 100%;

  > small {
    font-size: ${th('fontSizeBaseSmallest')};
  }
`

const UserIcon = styled.img`
  aspect-ratio: 1 / 1;
  background-color: #e3e8e8;
  border: 1px solid #0001;
  border-radius: 50%;
  box-shadow: inset 0 0 5px #0003, 0 0 3px #fff;
  margin: 0;
  width: 40px;
`

const MessageContent = styled.div`
  align-items: center;
  background-color: #fff;
  /* border: 1px solid #ddd; */
  border-radius: 0 0 1rem 1rem;

  display: flex;
  max-height: 80px;
  overflow: hidden;
  text-align: left;
  width: 100%;

  // the message content wrapper
  > :nth-child(1) {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: space-between;
    overflow-y: auto;
    text-align: left;
    width: 100%;

    // the message
    > :first-child {
      padding: 0.7rem 1.7rem;
      width: 100%;
    }
  }

  @media screen and (max-width: 800px) {
    min-height: 80px;
  }
`

const ListItemContentDate = styled.span`
  > * {
    color: #fff;
    margin: 0;
  }
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: ${grid(0.6)} ${grid(2)};

  > p {
    font-size: ${th('fontSizeBaseSmaller')};
    font-weight: 700;
  }
`

const ActionsWrapper = styled.span`
  border-left: 1px solid ${alpha('colorPrimary', 0.2)};
  /* background-color: #e3e8e8; */
  display: flex;
  flex-direction: column;
  font-size: ${th('fontSizeBaseSmall')};
  font-weight: lighter;
  padding: 0 0.8rem;
  white-space: nowrap;

  > * {
    align-items: center;
    background-color: unset;
    border: none;
    color: ${th('colorSecondary')};
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
    min-width: 120px; // to avoid size change when read state changes
    padding-inline: ${grid(1)};
    text-align: right;

    &:focus {
      outline: 1px solid currentColor;
      text-decoration: underline;
    }

    &::after {
      aspect-ratio: 1 / 1;
      background-color: ${th('colorPrimary')};
      /* stylelint-disable-next-line string-quotes */
      content: '';
      display: flex;
      margin-left: 0.4rem;
      width: 8px;
    }

    &:hover {
      text-decoration: underline;
    }
  }

  @media screen and (max-width: 800px) {
    padding: 0.4rem 0.3rem;
  }
`

const formatDate = dateString => {
  const date = new Date(dateString)

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }

  return date
    .toLocaleString('en-US', options)
    .replace(/,/g, '')
    .replace(/\//g, '-')
    .replace(/-/g, '/')
}

const MentionsItem = ({ item, markAs }) => {
  const { from, content, date, id, unread, links } = item
  const [chatLink, itemLink] = links
  const senderName = from?.split(' ')
  const [day, hours] = formatDate(date).split(' ')
  const { width } = useWindowSize()

  return (
    <ListItemContent $unread={unread}>
      <Chatbox
        data-testid="chatbox"
        content={
          <MessageContent data-testid="message-content">
            <span>
              <p>
                {/* eslint-disable-next-line no-nested-ternary */}
                {ellipsis(content, width < 400 ? 20 : width < 800 ? 60 : 140)}
              </p>
            </span>
            <ActionsWrapper>
              <Link to={itemLink}>Go to Item</Link>
              <Link to={chatLink}>Go to Chat</Link>
              <button onClick={() => markAs(unread, [id])} type="button">
                Mark as {unread ? 'read' : 'unread'}
              </button>
            </ActionsWrapper>
          </MessageContent>
        }
        header={
          <MessageFromHeader>
            <span>
              <UserIcon alt={`user-${senderName[0]}`} src={userIcon} />
              <MessageSender data-testid="sender-name">
                <small>from:</small>@{senderName[0]}
              </MessageSender>
            </span>
            <ListItemContentDate>
              <small>sent:</small>
              <p>{`${day} ${hours}`}</p>
            </ListItemContentDate>
          </MessageFromHeader>
        }
      />
    </ListItemContent>
  )
}

MentionsItem.propTypes = {
  item: PropTypes.shape({
    from: PropTypes.string,
    content: PropTypes.string,
    date: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    unread: PropTypes.bool,
    links: PropTypes.arrayOf(PropTypes.string),
  }),
  markAs: PropTypes.func,
}

MentionsItem.defaultProps = {
  item: {
    from: '',
    content: '',
    date: '',
    id: '',
    unread: false,
    links: ['', ''],
  },
  markAs: () => {},
}

export default MentionsItem
