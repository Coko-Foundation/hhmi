import React, { useEffect, useState } from 'react'
import {
  useHistory,
  useLocation,
} from 'react-router-dom/cjs/react-router-dom.min'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { isBoolean } from 'lodash'
import { NotificationsUI } from '../ui/notifications'
import { VisuallyHiddenElement } from '../ui'
import {
  GET_UNREAD_NOTIFICATIONS_COUNT,
  GET_USER_NOTIFICATIONS,
  MARK_AS,
} from '../graphql/notification.queries'
import { boolOrNull, useNotifications } from '../utilities'

const PAGE_SIZE = 5

// if we pass a single item it will return the shaped item if we pass an array it will return the array of shaped items
const mentionsShape = arr => {
  const shapedMention = item => {
    const parsedContent = JSON.parse(item.content)

    const {
      date = '',
      content = '',
      questionId = '',
      chatType = '',
    } = parsedContent

    return {
      id: item.id,
      from: item.from?.displayName,
      date,
      content,
      links: [
        questionId ? `/question/${questionId}#${chatType}` : null,
        questionId ? `/question/${questionId}#editor` : null,
      ],
      unread: !item.read,
    }
    /* transition: transform 0.2s; */
  }

  return Array.isArray(arr) ? arr.map(shapedMention) : shapedMention(arr)
}

const NotificationPage = () => {
  const {
    tabKey,
    setTabKey,
    setUnreadMentionsCount,
    updatedMentions,
    setUpdatedMentions,
  } = useNotifications()

  const location = useLocation()
  const history = useHistory()
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(Number('0'))
  const [pageSize, setPageSize] = useState(PAGE_SIZE)
  const [readState, setReadState] = useState(null)

  const mentionsQueryVariables = size => ({
    type: 'mention',
    options: {
      pageSize: size || PAGE_SIZE,
      page: currentPage,
      read: boolOrNull(readState), // 'cause onSearch returns an empty sstring instead of null
      orderBy: 'created',
      ascending: false,
      includeFullListOfIds: true,
    },
  })

  const [
    updateMentions,
    { data: userMentions, loading: mentionsLoading, error: mentionsError },
  ] = useLazyQuery(GET_USER_NOTIFICATIONS, {
    variables: {
      type: 'mention',
      options: {
        pageSize: PAGE_SIZE,
        page: currentPage,
        read: readState,
        orderBy: 'created',
        ascending: false,
        includeFullListOfIds: true,
      },
    },
    fetchPolicy: 'network-only',
    onCompleted: ({ userNotifications: { result } }) =>
      setUpdatedMentions(mentionsShape(result)),
  })

  const { data: unread } = useQuery(GET_UNREAD_NOTIFICATIONS_COUNT)

  const [markMentionsAs] = useMutation(MARK_AS, {
    refetchQueries: [
      {
        query: GET_USER_NOTIFICATIONS,
        variables: mentionsQueryVariables(pageSize),
        onCompleted: () =>
          updateMentions({
            variables: mentionsQueryVariables(pageSize),
          }),
      },
      {
        query: GET_UNREAD_NOTIFICATIONS_COUNT,
      },
    ],
  })

  const markAs = async variables => {
    markMentionsAs({
      variables,
    })
  }

  useEffect(() => {
    document.title = 'Notifications page - HHMI Assessment Builder'
    setUpdatedMentions([])
    return setUpdatedMentions([])
  }, [])

  useEffect(() => {
    unread &&
      setUnreadMentionsCount(unread?.getUnreadNotificationsCount[0]?.count)
  }, [unread])

  useEffect(() => {
    location.pathname !== '/notifications' &&
      location.pathname.slice(location.pathname.lastIndexOf('/') + 1) !==
        tabKey &&
      setTabKey(location.pathname.slice(location.pathname.lastIndexOf('/') + 1))
  }, [location])

  useEffect(() => {
    tabKey && history.push(`/notifications/${tabKey}`)
  }, [tabKey])

  useEffect(() => {
    setUpdatedMentions([])
    updateMentions({
      variables: mentionsQueryVariables(PAGE_SIZE),
    }).then(() => {
      setPageSize(PAGE_SIZE)
    })
  }, [readState])

  const handleScrollNext = () => {
    const { totalCount } = userMentions.userNotifications

    const newSize =
      pageSize + PAGE_SIZE <= totalCount ? pageSize + PAGE_SIZE : totalCount

    updateMentions({
      variables: mentionsQueryVariables(newSize),
    }).then(() => {
      setPageSize(newSize)
    })
  }

  const handleSearch = ({ status }) => setReadState(status)

  return (
    <>
      <VisuallyHiddenElement as="h1">Notifications page</VisuallyHiddenElement>

      <NotificationsUI
        fullListOfIds={userMentions?.userNotifications?.fullListOfIds?.map(
          f => ({ id: f }),
        )}
        handleScrollNext={handleScrollNext}
        infiniteScrollMessage={
          isBoolean(readState)
            ? `You dont have any ${!readState ? 'un' : ''}read mentions`
            : `You haven't been mentioned yet`
        }
        markMentionsAs={markAs}
        mentionsError={mentionsError}
        mentionsLoading={mentionsLoading}
        onSearch={handleSearch}
        setTabKey={setTabKey}
        tabKey={tabKey}
        totalCount={userMentions?.userNotifications?.totalCount}
        updatedMentions={updatedMentions}
      />
    </>
  )
}

export default NotificationPage
