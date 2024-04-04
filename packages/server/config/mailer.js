const { MAILER_HOSTNAME, MAILER_PORT, MAILER_USER, MAILER_PASSWORD } =
  process.env

module.exports = {
  transport: {
    host: MAILER_HOSTNAME,
    port: MAILER_PORT,
    auth: {
      user: MAILER_USER,
      pass: MAILER_PASSWORD,
    },
  },
}
