/* eslint-disable import/no-extraneous-dependencies */

const { name } = require('faker')

const User = require('../../user/user.model')

const createUser = async => {
  try {
    return User.insert({
      givenNames: name.firstName(),
      surname: name.lastName(),
    })
  } catch (e) {
    throw new Error(e)
  }
}

module.exports = { createUser }
