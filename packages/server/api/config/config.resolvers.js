const {
  loginConfigController,
} = require('../../controllers/config.controllers')

const loginConfigResovler = () => {
  return loginConfigController()
}

module.exports = {
  Query: {
    getLoginConfig: loginConfigResovler,
  },
}
