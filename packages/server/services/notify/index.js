/* eslint-disable class-methods-use-this */
const clone = require('lodash/clone')

const email = require('./email')

const validNotifications = ['email']

/*
  Creates a notifier service to send (for now only email) notifications 
  By default it registers all types in the mapper object and that have handlers in './email'

  New types of notifications can be added on the fly when initializing the service by passing an arg:

  {
    'notification_key': {
      notifyBy: Array<string>, e.g. ['email']
      email: (Async)Function, must return object with following fields { from, html, subject, text, to }
    }
  }

  to fire the notification call the .notify(notification_key, context) method of the instance
*/

class CokoNotifier {
  constructor(additionalNotificationTypes) {
    Object.keys(this.mapper).forEach(type => {
      this.mapper[type].notifyBy.forEach(notificationType => {
        switch (notificationType) {
          case 'email':
            this.mapper[type].email = email.handlers[type]
            break
          // case 'notification':
          //   this.mapper[type].notification = notification.handlers[type]
          //   break
          default:
            break
        }
      })
    })

    this.mapper = {
      ...this.mapper,
      ...additionalNotificationTypes,
    }
  }

  // register known types of notifications with field notifyBy as array with notification types (email, in-app notification, etc)
  mapper = {
    'hhmi.questionRejected': {
      notifyBy: ['email'],
    },
    'hhmi.questionUnpublished': {
      notifyBy: ['email'],
    },
    'hhmi.chatMention': {
      notifyBy: ['email'],
    },
    'hhmi.productionChatActivityDigest': {
      notifyBy: ['email'],
    },
    // ...
  }

  runType = (type, context) => {
    if (!this.mapper[type] || !Array.isArray(this.mapper[type].notifyBy))
      throw new Error(`Notification type ${type} not recognized`)

    this.mapper[type].notifyBy.forEach(async notification => {
      if (!validNotifications.includes(notification))
        throw new Error(`${notification} is not a valid notification`)

      let emailData

      switch (notification) {
        case 'email':
          emailData = await this.mapper[type].email(context)
          email.sendEmail(emailData)
          break
        default:
          throw Error('Notification type not defined')
      }
    })
  }

  notify = (notifyTypes, context) => {
    let types = clone(notifyTypes)

    if (!Array.isArray(notifyTypes)) {
      if (typeof notifyTypes === 'string') {
        types = [notifyTypes]
      } else {
        throw new Error('Invalid types format provided to notify')
      }
    }

    types.forEach(type => this.runType(type, context))
  }
}

module.exports = CokoNotifier
