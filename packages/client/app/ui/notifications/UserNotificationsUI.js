import React from 'react'
import PropTypes from 'prop-types'
// import pendingTasksIcon from '../../../static/taskIcon.svg'
import styled from 'styled-components'
import { th, grid } from '@coko/client'
import messagesIcon from '../../../static/messagesIcon.svg'
import { NotificationIcon } from './NotificationIcon'

const Wrapper = styled.span`
  align-items: center;
  border-block: 1px solid #0001;
  display: flex;
  font-size: ${th('fontSizeBaseSmall')};
  height: 40px;
  justify-content: space-between;
  padding: ${grid(2)};
  width: 100%;
`

export const UserNotificationsUI = props => {
  const { to, onClick, unreadMentionsCount, ...rest } = props

  const [mentionsLink] = to // pass an array of links in case we add Links to Task Notifications or any other userlink
  return (
    <Wrapper {...rest}>
      Notifications
      <span style={{ display: 'flex' }}>
        <NotificationIcon
          iconSrc={messagesIcon}
          pending={unreadMentionsCount}
          text="Messages"
          to={mentionsLink}
        />
        {/* <NotificationIcon
          iconSrc={pendingTasksIcon}
          pending={[]}
          text="Tasks"
          to={mentionsLink}
        /> */}
      </span>
    </Wrapper>
  )
}

UserNotificationsUI.propTypes = {
  to: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
  unreadMentionsCount: PropTypes.number,
}

UserNotificationsUI.defaultProps = {
  to: ['/notifications'],
  onClick: null,
  unreadMentionsCount: 0,
}

export default UserNotificationsUI
