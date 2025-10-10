import React, { useContext, useMemo, useState } from 'react'
import {
  useApolloClient,
  useMutation,
  useQuery,
  useSubscription,
} from '@apollo/client'
import { useCurrentUser } from '@coko/client'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  GET_USER_NOTIFICATIONS,
  NOTIFICATION_SUBSCRIPTION,
  MARK_AS,
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
  const client = useApolloClient()
  const [unreadMentionsCount, setUnreadMentionsCount] = useState(0)
  const [unreadMentions, setUnreadMentions] = useState([])

  const [messageToPreview, setMessageToPreview] = useState({})
  const [updatedMentions, setUpdatedMentions] = useState([])
  const [newNotification, setNewNotification] = useState(null)
  const { currentUser } = useCurrentUser()

  useQuery(GET_USER_NOTIFICATIONS, {
    skip: !currentUser,
    variables: {
      type: 'mention',
      options: {
        pageSize: 1000,
        page: 0,
        read: false,
        orderBy: 'created',
        ascending: false,
      },
    },
    onCompleted: ({ userNotifications }) => {
      setUnreadMentionsCount(userNotifications?.result.length)
      setUnreadMentions(userNotifications?.result)
    },
  })

  const [markMentionsAs] = useMutation(MARK_AS, {
    refetchQueries: [
      {
        query: GET_USER_NOTIFICATIONS,
        variables: {
          type: 'mention',
          options: {
            pageSize: 1000,
            page: 0,
            read: false,
            orderBy: 'created',
            ascending: false,
          },
        },
      },
    ],
  })

  useSubscription(NOTIFICATION_SUBSCRIPTION, {
    skip: !currentUser?.id,
    onData: async ({
      data: {
        data: {
          newNotification: { from, content },
        },
      },
    }) => {
      const { content: message, questionId, chatType } = JSON.parse(content)
      setNewNotification(() => {
        const href =
          chatType.indexOf('reviewerChat') > -1
            ? {
                pathname: `/question/${questionId}#reviewerChat`,
                state: {
                  reviewerId: chatType.substring(
                    chatType.indexOf('reviewerChat') + 13,
                  ),
                },
              }
            : `/question/${questionId}#${chatType}`

        return {
          message: (
            <StyledLink to={href}>
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
      await client.refetchQueries({
        include: ['GetUnreadNotificationsCount', 'GetUserNotifications'],
      })
    },
  })

  const markAsRead = async data => {
    await markMentionsAs(data)
  }

  const values = useMemo(() => {
    return {
      newNotification,
      updatedMentions,
      unreadMentionsCount,
      unreadMentions,
      tabKey,
      messageToPreview,
      setNewNotification,
      setUpdatedMentions,
      setTabKey,
      setMessageToPreview,
      setUnreadMentionsCount,
      markAsRead,
    }
  }, [
    newNotification,
    updatedMentions,
    unreadMentionsCount,
    unreadMentions,
    tabKey,
    messageToPreview,
    setNewNotification,
    setUpdatedMentions,
    setUnreadMentionsCount,
    setTabKey,
    setMessageToPreview,
  ])

  return (
    <NotificationsContext.Provider value={values}>
      {children}
    </NotificationsContext.Provider>
  )
}
