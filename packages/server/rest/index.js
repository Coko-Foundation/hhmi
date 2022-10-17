const download = require('./download')

module.exports = {
  server: () => app => download(app),
}
