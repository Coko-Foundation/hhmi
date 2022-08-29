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
    pool: { min: 0, max: 10, idleTimeoutMillis: 1000 },
  },
  teams: {
    global: {
      editor: {
        displayName: 'Editor',
        role: 'editor',
      },
      reviewer: {
        displayName: 'Reviewer',
        role: 'reviewer',
      },
      admin: {
        displayName: 'Admin',
        role: 'admin',
      },
    },
    nonGlobal: {
      editor: {
        displayName: 'Editor',
        role: 'editor',
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
