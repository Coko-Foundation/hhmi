/* eslint-disable import/no-extraneous-dependencies */

const { name, internet } = require('faker')

const Identity = require('@coko/server/src/models/identity/identity.model')
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

const getUserInfo = async => {
  return {
    given_name: [{ value: name.firstName() }],
    family_name: [{ value: name.lastName() }],
    email: internet.email(),
  }
}

const createIdentity = async (user, email, isSocial) => {
  try {
    return Identity.insert({
      userId: user.id,
      email,
      isDefault: true,
      isSocial,
    })
  } catch (e) {
    throw new Error(e)
  }
}

module.exports = { createUser, getUserInfo, createIdentity }
