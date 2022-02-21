module.exports = {
  'pubsweet-client': {
    protocol: 'CLIENT_PROTOCOL',
    host: 'CLIENT_HOST',
    port: 'CLIENT_PORT',
  },
  'pubsweet-server': {
    admin: {
      username: 'ADMIN_USERNAME',
      password: 'ADMIN_PASSWORD',
      givenName: 'ADMIN_GIVEN_NAME',
      surname: 'ADMIN_SURNAME',
      email: 'ADMIN_EMAIL',
    },
    host: 'SERVER_HOST',
    port: 'SERVER_PORT',
    protocol: 'SERVER_PROTOCOL',
    secret: 'PUBSWEET_SECRET',
    serveClient: 'SERVE_CLIENT',
    externalServerURL: 'EXTERNAL_SERVER_URL',
    db: {
      user: 'POSTGRES_USER',
      password: 'POSTGRES_PASSWORD',
      host: 'POSTGRES_HOST',
      database: 'POSTGRES_DB',
      port: 'POSTGRES_PORT',
    },
  },
  'file-server': {
    accessKeyId: 'S3_ACCESS_KEY_ID_USER',
    secretAccessKey: 'S3_SECRET_ACCESS_KEY_USER',
    bucket: 'S3_BUCKET',
    protocol: 'S3_PROTOCOL',
    host: 'S3_HOST',
    port: 'S3_PORT',
  },
  'password-reset': {
    path: 'PASSWORD_RESET_PATH',
  },
  mailer: {
    from: 'MAILER_SENDER',
    transport: {
      host: 'MAILER_HOSTNAME',
      auth: {
        user: 'MAILER_USER',
        pass: 'MAILER_PASSWORD',
      },
    },
  },
}
