const config = require('config')
const { logger, useTransaction, createFile } = require('@coko/server')
const { ChatChannel, ChatMessage, File } = require('@coko/server/src/models')
const { User, TeamMember } = require('../models')
const { getFileUrl } = require('./file.controllers')
const CokoNotifier = require('../services/notify')

const ADMIN_TEAM = config.teams.global.admin
const BASE_MESSAGE = '[CHAT CONTROLLER]'

const globalTimeouts = {}

const createChatChannel = async (input = {}, options = {}) => {
  const { relatedObjectId, chatType } = input
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} createChatChannel:`
  logger.info(
    `${CONTROLLER_MESSAGE} Create chat thread for question ${relatedObjectId}`,
  )

  try {
    return useTransaction(
      async tr => {
        return ChatChannel.insert({ relatedObjectId, chatType }, { trx: tr })
      },
      { trx: options.trx, passedTrxOnly: true },
    )
  } catch (error) {
    logger.error(`${CONTROLLER_MESSAGE} createChatThread: ${error.message}`)
    throw new Error(error)
  }
}

const sendMessage = async (
  chatChannelId,
  content,
  userId,
  mentions = [],
  attachments = [],
  options = {},
) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} sendMessage:`

  try {
    const { trx, ...restOptions } = options
    const attachmentData = await Promise.all(attachments)

    const newMessage = await useTransaction(
      async tr => {
        logger.info(
          `${CONTROLLER_MESSAGE} creating a new message for chat channel with id ${chatChannelId}`,
        )

        const chatMessage = await ChatMessage.insert(
          { chatChannelId, userId, content, mentions },
          { trx: tr, ...restOptions },
        )

        return chatMessage
      },
      { trx, passedTrxOnly: true },
    )

    const notifier = new CokoNotifier()

    mentions.forEach(mention => {
      // setup a timeout to send emails with delay (and possibility of being canceled)
      globalTimeouts[`${mention}-${chatChannelId}`] = setTimeout(() => {
        notifier.notify('hhmi.chatMention', { mention, newMessage }, 'email')
      }, 10000)
    })

    const uploadedAttachments = await Promise.all(
      attachmentData.map(async attachment => {
        const stream = attachment.createReadStream()

        const storedFile = await createFile(
          stream,
          attachment.filename,
          null,
          null,
          [],
          newMessage.id,
        )

        return storedFile
      }),
    )

    const attachmentsWithUrl = await Promise.all(
      uploadedAttachments.map(async file => {
        const url = getFileUrl(file, 'medium')
        return {
          url,
          name: file.name,
        }
      }),
    )

    return { ...newMessage, attachments: attachmentsWithUrl }
  } catch (e) {
    logger.error(`${CONTROLLER_MESSAGE} ${e.message}`)
    throw new Error(e)
  }
}

const getMessage = async messageId => {
  return ChatMessage.query().findById(messageId)
}

const getMessages = async (threadId, options = {}) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} getMessages:`
  logger.info(`${CONTROLLER_MESSAGE} Getting messages for thread ${threadId}`)

  try {
    return (
      await ChatMessage.query(options.trx).where('chatChannelId', threadId)
    ).map(({ id, created, content, userId, mentions }) => ({
      id,
      content,
      created,
      userId,
      mentions,
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

const getAttachments = async ({ id }) => {
  const files = await useTransaction(trx => {
    return File.query(trx)
      .select('files.name', 'files.storedObjects')
      .where({ objectId: id })
  })

  const filesWithUrl = await Promise.all(
    files.map(async file => {
      const url = getFileUrl(file, 'medium')
      return {
        url,
        name: file.name,
      }
    }),
  )

  return filesWithUrl
}

const cancelEmailNotification = (userId, chatThreadId) => {
  clearTimeout(globalTimeouts[`${userId}-${chatThreadId}`])
  return true
}

const notifyMentionees = async (message, mentions) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} notifyMentionees:`
  logger.info(
    `${CONTROLLER_MESSAGE} notify mentioned users for message ${message.id}`,
  )

  try {
    const notifier = new CokoNotifier()

    mentions.forEach(mention => {
      notifier.notify(
        'hhmi.chatMention',
        {
          mention,
          message,
        },
        'notification',
      )
    })
  } catch (e) {
    logger.error(e)
    throw new Error(e)
  }
}

const notifyAdmins = async (message, mentionees, currentUser) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} notifyAdmins:`
  logger.info(`${CONTROLLER_MESSAGE} notify admin for message ${message.id}`)

  try {
    // get admin that are not current user or already mentioned
    const admins = await TeamMember.query()
      .leftJoin('teams', 'teams.id', 'team_members.team_id')
      .select('team_members.user_id')
      .where({
        'teams.role': ADMIN_TEAM.role,
        'teams.global': true,
      })
      .whereNot('team_members.user_id', currentUser)
      .whereNotIn('team_members.user_id', mentionees)

    if (admins.length) {
      const notifier = new CokoNotifier()

      // notify all retrieved admins
      admins.forEach(admin => {
        notifier.notify(
          'hhmi.chatMention',
          {
            mention: admin?.userId,
            message,
          },
          'notification',
        )
      })
    }
  } catch (e) {
    logger.error(e)
    throw new Error(e)
  }
}

module.exports = {
  createChatChannel,
  getAttachments,
  getMessages,
  getMessageAuthor,
  sendMessage,
  getMessage,
  cancelEmailNotification,
  notifyMentionees,
  notifyAdmins,
}
