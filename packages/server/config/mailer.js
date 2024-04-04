const { PLATFORM_SMTP_HOST, MAILER_PORT, MAILER_USER, MAILER_PASSWORD } =
  process.env

module.exports = {
  transport: {
    host: PLATFORM_SMTP_HOST,
    port: 25,
    ...(MAILER_USER &&
      MAILER_PASSWORD && {
        auth: {
          user: MAILER_USER,
          pass: MAILER_PASSWORD,
        },
      }),
  },
}

