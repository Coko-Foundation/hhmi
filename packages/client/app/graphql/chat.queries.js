import { gql } from '@apollo/client'

export const CREATE_CHAT_THREAD = gql`
  mutation CreateChatThread($input: CreateChatThreadInput!) {
    createChatThread(input: $input) {
      id
    }
  }
`

export const GET_CHAT_THREAD = gql`
  query chatThread($id: ID!) {
    chatThread(id: $id) {
      id
      created
      updated
      chatType
      relatedObjectId
      messages {
        id
        content
        created
        user {
          id
          displayName
        }
        mentions
        attachments {
          name
          url
        }
      }
    }
  }
`

export const FILTER_CHAT_THREADS = gql`
  query ChatThreads($where: CreateChatThreadInput) {
    chatThreads(where: $where) {
      result {
        id
        created
        updated
        chatType
        relatedObjectId
        messages {
          id
          content
          created
          user {
            id
            displayName
          }
          mentions
          attachments {
            name
            url
          }
        }
      }
    }
  }
`

export const SEND_MESSAGE = gql`
  mutation SendMessage($input: SendChatMessageInput!) {
    sendMessage(input: $input) {
      id
      chatThreadId
      content
      isDeleted
      mentions
      attachments {
        name
        url
      }
    }
  }
`

export const MESSAGE_CREATED_SUBSCRIPTION = gql`
  subscription MessageCreated($chatThreadId: ID!) {
    messageCreated(chatThreadId: $chatThreadId) {
      id
      chatThreadId
      content
      created
      user {
        id
        displayName
      }
      mentions
      attachments {
        name
        url
      }
    }
  }
`

export const CANCEL_EMAIL_NOTIFICATION = gql`
  mutation cancelEmailNotification($chatThreadId: ID!) {
    cancelEmailNotification(chatThreadId: $chatThreadId)
  }
`
