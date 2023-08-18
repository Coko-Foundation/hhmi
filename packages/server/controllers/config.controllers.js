const loginConfigController = () => {
  return {
    showEmailLogin: process.env.CLIENT_SHOW_EMAIL_LOGIN_OPTION === 'true',
    biointeractiveOathClientId: process.env.BIOINTERACTIVE_OAUTH_CLIENT_ID,
    biointeractiveOathRedirectUri:
      process.env.BIOINTERACTIVE_OAUTH_REDIRECT_URI,
  }
}

module.exports = {
  loginConfigController,
}
