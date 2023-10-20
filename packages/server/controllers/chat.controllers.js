const { logger, useTransaction } = require('@coko/server')

const { ChatThread, ChatMessage } = require('@coko/server/src/models')
const { User } = require('../models')

const BASE_MESSAGE = '[CHAT CONTROLLER]'

const createChatThread = async (input = {}, options = {}) => {
  const { relatedObjectId, chatType } = input
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} createChatThread:`
  logger.info(
    `${CONTROLLER_MESSAGE} Create chat thread for question ${relatedObjectId}`,
  )

  try {
    return useTransaction(
      async tr => {
        return ChatThread.insert({ relatedObjectId, chatType }, { trx: tr })
      },
      { trx: options.trx, passedTrxOnly: true },
    )
  } catch (error) {
    logger.error(`${CONTROLLER_MESSAGE} createChatThread: ${error.message}`)
    throw new Error(error)
  }
}

const getMessages = async (threadId, options = {}) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} getMessages:`
  logger.info(`${CONTROLLER_MESSAGE} Getting messages for thread ${threadId}`)

  try {
    return (
      await ChatMessage.query(options.trx).where('chatThreadId', threadId)
    ).map(({ id, created, content, user }) => ({
      id,
      content,
      timestamp: created,
      user,
    }))
  } catch (error) {
    logger.error(`${CONTROLLER_MESSAGE} getMessages: ${error.message}`)
    throw new Error(error)
  }
}

const getMessageAuthor = async ({ id, userId }, options = {}) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} getMessageAuthor:`
  logger.info(`${CONTROLLER_MESSAGE} Getting author for message ${id}`)

  try {
    return User.findById(userId)
  } catch (error) {
    logger.error(`${CONTROLLER_MESSAGE} getMessageAuthor: ${error.message}`)
    throw new Error(error)
  }
}

module.exports = {
  createChatThread,
  getMessages,
  getMessageAuthor,
}
