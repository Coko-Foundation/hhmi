import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useQuery, useSubscription } from '@apollo/client'
import { useCurrentUser } from '@coko/client'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  GET_UNREAD_NOTIFICATIONS_COUNT,
  NOTIFICATION_SUBSCRIPTION,
} from '../graphql'
import theme from '../theme'
import { ellipsis } from './utilities'
import messagesIcon from '../../static/messagesIcon.svg'

const StyledLink = styled(Link)`
  display: flex;
  height: 100%;
  margin: 0;
  padding: 0.5rem;
  width: 100%;
`

const StyledSpan = styled.span`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const StyledMessage = styled.span`
  align-items: center;
  display: flex;
  gap: 2rem;
`

const StyledText = styled.span`
  color: #777;
  display: flex;
  padding: 0.5rem 1.5rem;
`

const StyledImage = styled.img`
  height: 40px;
  object-fit: contain;
  width: 40px;
`

export const NotificationsContext = React.createContext()

export const useNotifications = () => useContext(NotificationsContext)

export const NotificationsProvider = ({ children }) => {
  const [tabKey, setTabKey] = useState('messages')

  const [unreadMentions, setUnreadMentions] = useState(0)

  const [messageToPreview, setMessageToPreview] = useState({})
  const [updatedMentions, setUpdatedMentions] = useState([])
  const [newNotification, setNewNotification] = useState(null)
  const { currentUser } = useCurrentUser()

  const { data: unreadCount, loading: unreadCountLoading } = useQuery(
    GET_UNREAD_NOTIFICATIONS_COUNT,
  )

  useSubscription(NOTIFICATION_SUBSCRIPTION, {
    skip: !currentUser?.id,
    onData: ({
      data: {
        data: {
          newNotification: { from, content },
        },
      },
    }) => {
      const { content: message, questionId, chatType } = JSON.parse(content)
      setNewNotification(() => {
        return {
          message: (
            <StyledLink to={`/question/${questionId}#${chatType}`}>
              <StyledSpan>
                <StyledMessage>
                  <StyledImage
                    alt="new message"
                    aria-hidden="true"
                    src={messagesIcon}
                  />
                  <strong>New message</strong>
                </StyledMessage>
                <StyledText>
                  {`${from.displayName}: ${ellipsis(message, 30)}`}
                </StyledText>
              </StyledSpan>
            </StyledLink>
          ),
          duration: 5,
          placement: 'bottomRight',
          style: {
            border: '1px solid #0004',
            backgroundColor: theme.colorBackgroundHue,
            boxShadow: '0 0 12px #0002',
            bottom: '20px',
            padding: '0',
            margin: '0',
          },
        }
      })
    },
  })

  const values = useMemo(() => {
    return {
      newNotification,
      updatedMentions,
      unreadMentions,
      tabKey,
      messageToPreview,
      setNewNotification,
      setUpdatedMentions,
      setTabKey,
      setMessageToPreview,
      setUnreadMentions,
    }
  }, [
    newNotification,
    updatedMentions,
    unreadMentions,
    tabKey,
    messageToPreview,
    setNewNotification,
    setUpdatedMentions,
    setUnreadMentions,
    setTabKey,
    setMessageToPreview,
  ])

  useEffect(() => {
    !unreadCountLoading &&
      unreadCount &&
      unreadCount.getUnreadNotificationsCount[0] !== undefined &&
      setUnreadMentions(unreadCount.getUnreadNotificationsCount[0]?.count)
  }, [unreadCountLoading])

  return (
    <NotificationsContext.Provider value={values}>
      {children}
    </NotificationsContext.Provider>
  )
}
