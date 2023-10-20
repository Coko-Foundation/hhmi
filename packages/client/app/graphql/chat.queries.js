import { gql } from '@apollo/client'

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
        user {
          id
          displayName
        }
      }
    }
  }
`

export const SEND_MESSAGE = gql`
  mutation sendMessage($input: SendChatMessageInput!) {
    sendMessage(input: $input) {
      id
      chatThreadId
      content
      #   timestamp
      isDeleted
      mentions
      #   user {
      #     id
      #     displayName
      #   }
    }
  }
`
