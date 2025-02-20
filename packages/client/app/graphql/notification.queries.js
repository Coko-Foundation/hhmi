import { gql } from '@apollo/client'

export const GET_UNREAD_NOTIFICATIONS_COUNT = gql`
  query GetUnreadNotificationsCount {
    getUnreadNotificationsCount {
      notificationType
      count
    }
  }
`

export const GET_USER_NOTIFICATIONS = gql`
  query GetUserNotifications(
    $type: String
    $options: NotificationFilterOptions
  ) {
    userNotifications(type: $type, options: $options) {
      result {
        id
        content
        read
        from {
          id
          displayName
        }
      }
      totalCount
      fullListOfIds
    }
  }
`

export const MARK_AS = gql`
  mutation MarkAs($read: Boolean!, $notificationIds: [ID!]!) {
    markAs(read: $read, notificationIds: $notificationIds)
  }
`

export const NOTIFICATION_SUBSCRIPTION = gql`
  subscription NewNotification {
    newNotification {
      content
      from {
        displayName
      }
    }
  }
`
