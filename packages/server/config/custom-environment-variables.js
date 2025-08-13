module.exports = {
  clientUrl: 'CLIENT_URL',
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
  secret: 'SECRET',
  serveClient: 'SERVE_CLIENT',
  externalURL: 'EXTERNAL_URL',
  db: {
    user: 'POSTGRES_USER',
    password: 'POSTGRES_PASSWORD',
    host: 'POSTGRES_HOST',
    database: 'POSTGRES_DB',
    port: 'POSTGRES_PORT',
    allowSelfSignedCertificates: {
      __name: 'POSTGRES_ALLOW_SELF_SIGNED_CERTIFICATES',
      __format: 'json',
    },
  },
  fileStorage: {
    accessKeyId: 'S3_ACCESS_KEY_ID',
    secretAccessKey: 'S3_SECRET_ACCESS_KEY',
    url: 'S3_URL',
    bucket: 'S3_BUCKET',
    minioConsolePort: 'MINIO_CONSOLE_PORT',
    maximumWidthForSmallImages: 'MAXIMUM_WIDTH_FOR_SMALL_IMAGES',
    maximumWidthForMediumImages: 'MAXIMUM_WIDTH_FOR_MEDIUM_IMAGES',
  },
  passwordReset: {
    path: 'PASSWORD_RESET_PATH',
  },
  mailer: {
    from: 'MAILER_SENDER',
    transport: {
      host: 'MAILER_HOSTNAME',
      port: 'MAILER_PORT',
      auth: {
        user: 'MAILER_USER',
        pass: 'MAILER_PASSWORD',
      },
    },
  },
}
