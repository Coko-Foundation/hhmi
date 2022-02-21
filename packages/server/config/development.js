const { deferConfig } = require('config/defer')

module.exports = {
  'pubsweet-server': {
    baseUrl: deferConfig(
      cfg =>
        `${cfg['pubsweet-server'].protocol}://${cfg['pubsweet-server'].host}${
          cfg['pubsweet-server'].port ? `:${cfg['pubsweet-server'].port}` : ''
        }`,
    ),
  },
}
