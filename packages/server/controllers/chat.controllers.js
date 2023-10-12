const { logger, useTransaction } = require('@coko/server')
const { createFile } = require('@coko/server')
const { ChatThread, ChatMessage } = require('@coko/server/src/models')
const { User } = require('../models')
const { getFileUrl } = require('./file.controllers')

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
    const messagesWithAttachments = await ChatMessage.query(options.trx)
      .select('chat_messages.*', 'files.name ', 'files.stored_objects')
      .leftJoin('files', 'chat_messages.id', 'files.objectId')
      .where('chatThreadId', threadId)

    const messages = Array.from(
      new Set(messagesWithAttachments.map(({ id }) => id)),
    )

    const messagePromises = messages.map(async id => {
      const attachments = await Promise.all(
        messagesWithAttachments
          .filter(message => message.id === id)
          .map(async ({ name, storedObjects }) => {
            const fileUrl = await getFileUrl({ storedObjects }, 'small')
            return {
              name,
              fileUrl,
            }
          }),
      )

      const { created, content, userId } = messagesWithAttachments.find(
        message => message.id === id,
      )

      return {
        id,
        content,
        timestamp: created,
        userId,
        attachments,
      }
    })

    // eslint-disable-next-line no-unused-vars
    const newMessageArray = await Promise.all(messagePromises)

    return (
      await ChatMessage.query(options.trx).where('chatThreadId', threadId)
    ).map(({ id, created, content, userId }) => ({
      id,
      content,
      timestamp: created,
      userId,
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

const uploadAttachments = async ({ attachments, messageId }) => {
  const attachmentData = await Promise.all(attachments)
  return Promise.all(
    attachmentData.map(async attachment => {
      const stream = attachment.createReadStream()

      const storedFile = await createFile(
        stream,
        attachment.filename,
        null,
        null,
        [],
        messageId,
      )

      return storedFile
    }),
  )
}

module.exports = {
  createChatThread,
  getMessages,
  getMessageAuthor,
  uploadAttachments,
}
