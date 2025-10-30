const path = require('path')
const components = require('./components')
const permissions = require('./permissions')
const productionChatActivityNotification = require('../services/chatActivityNotifications')
const emptyTempFolder = require('../services/emptyTemp')

module.exports = {
  passwordReset: {
    path: 'password-reset',
  },
  mailer: {
    from: 'info@hhmi.com',
    path: path.join(__dirname, 'mailer'),
  },
  permissions,
  components,
  db: {},
  subscriptionsDb: {},
  emailVerificationTokenExpiry: {
    amount: 24,
    unit: 'hours',
  },
  passwordResetTokenExpiry: {
    amount: 24,
    unit: 'hours',
  },
  pool: { min: 0, max: 20, idleTimeoutMillis: 1000 },
  port: 3000,
  useFileStorage: true,
  useGraphQLServer: true,
  protocol: 'http',
  externalServerURL: undefined,
  onStartup: [
    {
      label: 'Seed admin',
      execute: async () => {
        /* eslint-disable-next-line global-require */
        const seedAdmin = require('../scripts/seedAdmin0')
        await seedAdmin()
      },
    },
  ],
  teams: {
    global: [
      {
        displayName: 'Managing Editor',
        role: 'editor',
      },
      {
        displayName: 'Handling Editor',
        role: 'handlingEditor',
      },
      {
        displayName: 'Reviewer',
        role: 'reviewer',
      },
      {
        displayName: 'Production',
        role: 'production',
      },
      {
        displayName: 'Admin',
        role: 'admin',
      },
    ],
    nonGlobal: [
      {
        displayName: 'Managing Editor',
        role: 'editor',
      },
      {
        displayName: 'Handling Editor',
        role: 'handlingEditor',
      },
      {
        displayName: 'Author',
        role: 'author',
      },
      {
        displayName: 'Reviewer',
        role: 'reviewer',
      },
    ],
  },
  jobQueues: [
    {
      name: 'notify-production-chat-activity',
      handler: productionChatActivityNotification,
      teamSize: 1,
      teamConcurrency: 1,
      schedule: '0 8 * * *', // a valid cron pattern
      scheduleTimezone: 'America/New_York', // optional, what timezone should be followed
    },
    {
      name: 'empty-tmp-folder',
      handler: emptyTempFolder,
      schedule: '0 3 * * *', // a valid cron pattern
      scheduleTimezone: 'America/New_York', // optional, what timezone should be followed
    },
  ],
  schema: {},
  validations: path.join(__dirname, 'modules', 'validations'),
}
