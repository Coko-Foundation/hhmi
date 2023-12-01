const { pubsubManager } = require('@coko/server')

const { getPubsub } = pubsubManager

// Fires immediately when the message is created
const MESSAGE_CREATED = 'MESSAGE_CREATED'
// const MESSAGE_UPDATED = 'MESSAGE_UPDATED'
// const MESSAGE_DELETED = 'MESSAGE_DELETED'

const {
  createChatThread,
  getMessages,
  getMessageAuthor,
  getAttachments,
  sendMessage,
  getMessage,
  cancelEmailNotification,
} = require('../../controllers/chat.controllers')

const createChatThreadResolver = async (_, { input }) => {
  return createChatThread(input)
}

const messagesResolver = async thread => {
  return getMessages(thread.id)
}

const messageResolver = async messageId => {
  return getMessage(messageId)
}

const userResolver = async message => {
  return getMessageAuthor(message)
}

const attachmentResolver = async message => {
  return getAttachments(message)
}

const sendMessageResolver = async (_, { input }, ctx) => {
  try {
    const { chatThreadId, content, userId, mentions, attachments } = input

    const message = await sendMessage(
      chatThreadId,
      content,
      userId,
      mentions,
      attachments,
    )

    const pubsub = await getPubsub()
    pubsub.publish(`${MESSAGE_CREATED}.${chatThreadId}`, message.id)
    return message
  } catch (e) {
    throw new Error(e)
  }
}

const cancelEmailNotificationResolver = (_, { chatThreadId }, ctx) => {
  return cancelEmailNotification(ctx.user, chatThreadId)
}

module.exports = {
  ChatThread: {
    messages: messagesResolver,
  },
  ChatMessage: {
    user: userResolver,
    attachments: attachmentResolver,
  },
  Mutation: {
    sendMessage: sendMessageResolver,
    createChatThread: createChatThreadResolver,
    cancelEmailNotification: cancelEmailNotificationResolver,
  },
  Subscription: {
    messageCreated: {
      resolve: async messageId => {
        if (messageId) {
          return messageResolver(messageId)
        }

        return null
      },
      subscribe: async (_payload, vars) => {
        const pubsub = await getPubsub()

        return pubsub.asyncIterator(`${MESSAGE_CREATED}.${vars.chatThreadId}`)
      },
    },
  },
}
