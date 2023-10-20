const {
  createChatThread,
  getMessages,
  getMessageAuthor,
} = require('../../controllers/chat.controllers')

const createChatThreadResolver = async (_, { input }) => {
  return createChatThread(input)
}

const messagesResolver = async thread => {
  return getMessages(thread.id)
}

const userResolver = async message => {
  return getMessageAuthor(message)
}

module.exports = {
  ChatThread: {
    messages: messagesResolver,
  },
  ChatMessage: {
    user: userResolver,
  },
  Mutation: {
    createChatThread: createChatThreadResolver,
  },
}
