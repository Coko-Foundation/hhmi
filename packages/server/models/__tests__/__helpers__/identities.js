/* eslint-disable import/no-extraneous-dependencies */
const { internet } = require('faker')

module.exports = {
  identityWithProfileData: {
    email: internet.email(),
    isDefault: true,
    profileData: {
      displayName: 'Test User',
      identifier: 'ojndszf098u34lasf-90i',
      email: 'user@example.com',
    },
  },
}
