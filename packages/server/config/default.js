const path = require('path')
// const winston = require('winston')

const components = require('./components')
const permissions = require('./permissions')

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
  authsome: {
    mode: path.join(__dirname, 'authsome.js'),
  },
  'password-reset': {
    path: 'password-reset',
  },
  mailer: {
    from: 'info@hhmi.com',
    path: path.join(__dirname, 'mailer'),
  },
  permissions,
  publicKeys: [
    'authsome',
    'pubsweet',
    'pubsweet-client',
    'pubsweet-server',
    'validations',
  ],
  pubsweet: {
    components,
  },
  'pubsweet-client': {
    API_ENDPOINT: '/api',
  },
  'pubsweet-server': {
    db: {},
    useGraphQLServer: true,
    useJobQueue: false,
    serveClient: false,
    graphiql: true,
    emailVerificationTokenExpiry: {
      amount: 24,
      unit: 'hours',
    },
    passwordResetTokenExpiry: {
      amount: 24,
      unit: 'hours',
    },
    externalServerURL: undefined,
    // logger,
    port: 3000,
    protocol: 'http',
    host: 'localhost',
    uploads: 'uploads',
    pool: { min: 0, max: 20, idleTimeoutMillis: 1000 },
    useFileStorage: true,
    cron: {
      path: path.join(__dirname, '..', 'services', 'cron.service.js'),
    },
  },
  teams: {
    global: {
      editor: {
        displayName: 'Managing Editor',
        role: 'editor',
      },
      handlingEditor: {
        displayName: 'Handling Editor',
        role: 'handlingEditor',
      },
      reviewer: {
        displayName: 'Reviewer',
        role: 'reviewer',
      },
      production: {
        displayName: 'Production',
        role: 'production',
      },
      admin: {
        displayName: 'Admin',
        role: 'admin',
      },
    },
    nonGlobal: {
      editor: {
        displayName: 'Managing Editor',
        role: 'editor',
      },
      handlingEditor: {
        displayName: 'Handling Editor',
        role: 'handlingEditor',
      },
      author: {
        displayName: 'Author',
        role: 'author',
      },
      reviewer: {
        displayName: 'Reviewer',
        role: 'reviewer',
      },
    },
  },
  schema: {},
  validations: path.join(__dirname, 'modules', 'validations'),
}
