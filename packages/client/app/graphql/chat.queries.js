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
        user {
          id
          displayName
        }
        attachments {
          name
          url
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

export const UPLOAD_ATTACHMENTS = gql`
  mutation UploadAttachments($input: UploadAttachmentsInput!) {
    uploadAttachments(input: $input) {
      id
      url(size: medium)
    }
  }
`

export const MESSAGE_CREATED_SUBSCRIPTION = gql`
  subscription MessageCreated($chatThreadId: ID!) {
    messageCreated(chatThreadId: $chatThreadId) {
      id
      chatThreadId
      content
    }
  }
`
