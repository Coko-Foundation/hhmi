const { MAILER_HOSTNAME, MAILER_USER, MAILER_PASSWORD } = process.env
module.exports = {
  transport: {
    host: MAILER_HOSTNAME,
    auth: {
      user: MAILER_USER,
      pass: MAILER_PASSWORD,
    },
  },
}
