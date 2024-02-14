const { logger } = require('@coko/server')

const { Notification, Question } = require('../models')
const { labels } = require('./constants')

const BASE_MESSAGE = `${labels.NOTIFICATION_CONTROLLERS}:`

const getUserNotifications = async (userId, notificationType, options) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} getUserNotifications:`

  try {
    return Notification.filterUserNotifications(
      userId,
      notificationType,
      options,
    )
  } catch (e) {
    logger.error(`${CONTROLLER_MESSAGE} ${e.message}`)
    throw new Error(e)
  }
}

const getUnreadNotificationsCountForUser = async (userId, options) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} getUnreadNotificationsCountForUser:`

  try {
    return Notification.getUserUnreadNotifications(userId, options)
  } catch (e) {
    logger.error(`${CONTROLLER_MESSAGE} ${e.message}`)
    throw new Error(e)
  }
}

const getNotification = async notificationId => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} getNotification:`

  try {
    return Notification.query().findById(notificationId)
  } catch (e) {
    logger.error(`${CONTROLLER_MESSAGE} ${e.message}`)
    throw new Error(e)
  }
}

const markNotifications = async (read, notificationIds, options) => {
  const CONTROLLER_MESSAGE = `${BASE_MESSAGE} markNotifications:`

  try {
    return Notification.markAs(
      {
        read,
        notificationIds,
      },
      options,
    )
  } catch (e) {
    logger.error(`${CONTROLLER_MESSAGE} ${e.message}`)
    throw new Error(e)
  }
}

const getNotificationRelatedQuestion = async notification => {
  const data = await Question.query()
    .leftJoin('chat_threads', 'chat_threads.related_object_id', 'questions.id')
    .leftJoin(
      'chat_messages',
      'chat_messages.chat_thread_id',
      'chat_threads.id',
    )
    .select('questions.id as questionId', 'chat_threads.chat_type')
    .where('chat_messages.id', notification.objectId)

  return data[0]
}

module.exports = {
  getUserNotifications,
  getUnreadNotificationsCountForUser,
  getNotification,
  markNotifications,
  getNotificationRelatedQuestion,
}
