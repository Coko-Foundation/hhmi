import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { notification as antNotification } from 'antd'
import { th, grid } from '@coko/client'
import notificationIcon from '../../../static/notificationIcon.svg'

const NotificationHeader = styled.div`
  align-items: center;
  display: flex;
  gap: ${grid(3)};
  margin-block-end: ${grid(2)};

  > img {
    object-fit: contain;
    width: 25px;
  }

  > h4 {
    color: ${th('colorPrimary')};
    font-weight: 700;
    margin: 0;
    padding: 0;
  }
`

const AntContext = React.createContext()

const Message = (title, icon) => {
  return (
    <NotificationHeader>
      <img alt="notifications" aria-hidden="true" src={icon} />
      <h4>{title}</h4>
    </NotificationHeader>
  )
}

const ToastNotification = props => {
  const { notification = {} } = props

  const [api, contextHolder] = antNotification.useNotification()

  useEffect(() => {
    if (notification) {
      const {
        title,
        icon,
        description,
        onClick,
        duration,
        placement,
        role,
        style,
        message,
      } = notification

      api.open({
        message: message || Message(title, icon ?? notificationIcon),
        description,
        onClick,
        style,
        duration,
        placement,
        role,
      })
    }
  }, [notification])

  return <AntContext.Provider value={null}>{contextHolder}</AntContext.Provider>
}

ToastNotification.propTypes = {
  notification: PropTypes.shape({
    title: PropTypes.string,
    icon: PropTypes.element,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
    onClick: PropTypes.func,
    duration: PropTypes.number,
    placement: PropTypes.string,
    role: PropTypes.string,
    style: PropTypes.shape(),
  }),
}
ToastNotification.defaultProps = {
  notification: {
    title: 'Notification',
    icon: notificationIcon,
    description: 'New notification',
    onClick: null,
    duration: 5,
    placement: 'bottomRight',
    role: 'status',
    style: {
      display: 'flex',
      border: '1px solid #0004',
      backgroundColor: th.colorBackgroundHue,
      boxShadow: '0 0 12px #0002',
      bottom: '20px',
    },
  },
}

export default ToastNotification
