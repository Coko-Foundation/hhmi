const { pubsubManager } = require('@coko/server')
const { actions } = require('../../controllers/constants')

const { getPubsub } = pubsubManager

const {
  getUserNotifications,
  getUnreadNotificationsCountForUser,
  markNotifications,
  getNotification,
  getNotificationRelatedQuestion,
} = require('../../controllers/notification.controllers')

const { User } = require('../../models')

const userNotificationsResolver = async (_, { type, options }, ctx) => {
  return getUserNotifications(ctx.user, type, options)
}

const getUnreadNotificationsCountResolver = async (_, __, ctx) => {
  return getUnreadNotificationsCountForUser(ctx.user)
}

const notificationResolver = async notificationId => {
  return getNotification(notificationId)
}

const markAsResolver = async (_, { read, notificationIds }) => {
  return markNotifications(read, notificationIds)
}

const notificationSenderResolver = async notification => {
  const senderId = notification.content.from
  if (senderId) return User.findById(senderId)
  return null
}

const notificationContentResolver = async notification => {
  const { content, notificationType } = notification

  let data

  switch (notificationType) {
    case 'mention':
      // resolve chat mentions notifications to provide a link to the question/chat tab
      data = await getNotificationRelatedQuestion(notification)

      return JSON.stringify({
        ...content,
        questionId: data.questionId,
        chatType: data.chatType,
      })

    default:
      return JSON.stringify(notification.content)
  }
}

module.exports = {
  Notification: {
    from: notificationSenderResolver,
    content: notificationContentResolver,
  },
  Query: {
    userNotifications: userNotificationsResolver,
    getUnreadNotificationsCount: getUnreadNotificationsCountResolver,
  },
  Mutation: {
    markAs: markAsResolver,
  },
  Subscription: {
    newNotification: {
      resolve: async notificationId => {
        if (notificationId) {
          return notificationResolver(notificationId)
        }

        return null
      },
      subscribe: async (_payload, _vars, ctx) => {
        const pubsub = await getPubsub()

        return pubsub.asyncIterator(`${actions.NEW_NOTIFICATION}.${ctx.user}`)
      },
    },
  },
}
