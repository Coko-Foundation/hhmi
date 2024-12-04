const path = require('path')
// const winston = require('winston')

const components = require('./components')
const permissions = require('./permissions')
const productionChatActivityNotification = require('../services/chatActivityNotifications')

// const logger = new winston.Logger({
//   transports: [
//     new winston.transports.Console({
//       colorize: true,
//       handleExceptions: true,
//       humanReadableUnhandledException: true,
//     }),
//   ],
// })

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
  // pubsweet: {
  // },
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
  // graphiql: true,
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
  ],
  schema: {},
  validations: path.join(__dirname, 'modules', 'validations'),
}
