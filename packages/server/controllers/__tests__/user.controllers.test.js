const { uuid } = require('@coko/server')
const axios = require('axios')
const { internet } = require('faker')
const qs = require('node:querystring')

const { User, Identity } = require('../../models/index')

const {
  createUser,
  getUserInfo,
  createIdentity,
} = require('../../models/__tests__/__helpers__/users')

const { bioInteractiveLogin } = require('../user.controllers')

const clearDb = require('../../models/__tests__/_clearDb')

const {
  BIOINTERACTIVE_OAUTH_TOKEN_URI,
  BIOINTERACTIVE_OAUTH_API_USER_URI,
  BIOINTERACTIVE_OAUTH_CLIENT_SECRET,
  BIOINTERACTIVE_OAUTH_REDIRECT_URI,
  BIOINTERACTIVE_OAUTH_CLIENT_ID,
  BIOINTERACTIVE_OAUTH_AUTH_SERVER_URI,
} = process.env

jest.mock('axios')

describe('User Controller', () => {
  beforeEach(() => clearDb())

  afterAll(() => {
    const knex = User.knex()
    knex.destroy()
  })

  it('bioInteractiveLogin gets valid env vars from the process', async () => {
    expect(BIOINTERACTIVE_OAUTH_CLIENT_ID).toBe('123')
    expect(BIOINTERACTIVE_OAUTH_CLIENT_SECRET).toBe('321')
    expect(BIOINTERACTIVE_OAUTH_REDIRECT_URI).toBe(
      'hhmi.co/biointeractive-oauth',
    )
    expect(BIOINTERACTIVE_OAUTH_API_USER_URI).toBe('bio.int/api')
    expect(BIOINTERACTIVE_OAUTH_TOKEN_URI).toBe('bio.int/token')
  })

  it('bioInteractiveLogin retrieves an access token', async () => {
    const user = await getUserInfo()

    const tokenResponse = {
      data: {
        access_token: uuid(),
      },
    }

    const userResponse = {
      data: user,
    }

    const authCode = uuid()

    axios.request.mockResolvedValueOnce(tokenResponse)
    axios.get.mockResolvedValueOnce(userResponse)

    const result = await bioInteractiveLogin(authCode)

    expect(axios.request).toHaveBeenCalledWith({
      url: BIOINTERACTIVE_OAUTH_TOKEN_URI,
      method: 'post',
      data: expect.stringContaining(
        qs.stringify({
          grant_type: 'authorization_code',
          code: authCode,
          callback_url: BIOINTERACTIVE_OAUTH_REDIRECT_URI,
          auth_url: BIOINTERACTIVE_OAUTH_AUTH_SERVER_URI,
          access_token_url: BIOINTERACTIVE_OAUTH_TOKEN_URI,
          client_id: BIOINTERACTIVE_OAUTH_CLIENT_ID,
          client_secret: BIOINTERACTIVE_OAUTH_CLIENT_SECRET,
          redirect_uri: BIOINTERACTIVE_OAUTH_REDIRECT_URI,
          scope: 'openid',
        }),
      ),
    })
    expect(result).toBeTruthy()
  })

  it('bioInteractiveLogin retrieves user info and generates token', async () => {
    const user = await getUserInfo()

    const tokenResponse = {
      data: {
        access_token: uuid(),
      },
    }

    const userResponse = {
      data: user,
    }

    const authCode = uuid()

    axios.request.mockResolvedValueOnce(tokenResponse)
    axios.get.mockResolvedValueOnce(userResponse)

    const result = await bioInteractiveLogin(authCode)

    expect(axios.get).toHaveBeenCalledWith(
      BIOINTERACTIVE_OAUTH_API_USER_URI,
      expect.objectContaining({
        headers: { Authorization: `Bearer ${tokenResponse.data.access_token}` },
      }),
    )
    expect(result.token).toBeTruthy()
    expect(result.user).toBeInstanceOf(User)
  })

  it('bioInteractiveLogin creates a new user', async () => {
    const usersBefore = await User.find({})
    const newUser = await getUserInfo()

    const tokenResponse = {
      data: {
        access_token: uuid(),
      },
    }

    const userResponse = {
      data: newUser,
    }

    const authCode = uuid()

    axios.request.mockResolvedValueOnce(tokenResponse)
    axios.get.mockResolvedValueOnce(userResponse)

    const results = await bioInteractiveLogin(authCode)

    const usersAfter = await User.find({})

    const userIdsAfter = usersAfter.result.map(u => u.id)
    const userIdsBefore = usersBefore.result.map(u => u.id)

    expect(userIdsAfter.includes(results.user.id)).toBe(true)
    expect(userIdsBefore.includes(results.user.id)).toBe(false)
  })

  it('bioInteractiveLogin creates a new identity', async () => {
    const identitiesBefore = await Identity.find({})
    const newUser = await getUserInfo()

    const tokenResponse = {
      data: {
        access_token: uuid(),
      },
    }

    const userResponse = {
      data: newUser,
    }

    const authCode = uuid()

    axios.request.mockResolvedValueOnce(tokenResponse)
    axios.get.mockResolvedValueOnce(userResponse)

    const results = await bioInteractiveLogin(authCode)

    const identitiesAfter = await Identity.find({})

    const userIdsAfter = identitiesAfter.result.map(i => i.userId)
    const userIdsBefore = identitiesBefore.result.map(i => i.userId)

    expect(userIdsAfter.includes(results.user.id)).toBe(true)
    expect(userIdsBefore.includes(results.user.id)).toBe(false)
  })

  it('bioInteractiveLogin does not create new identity for existing email', async () => {
    const email = internet.email()
    const user = await createUser()

    await createIdentity(user, email, true)

    const identitiesBefore = await Identity.find({})

    const testId = await Identity.findOne({
      email: email.toLowerCase(),
      isSocial: true,
    })

    expect(testId).toBeTruthy()
    expect(testId).toBeInstanceOf(Identity)
    expect(testId.email).toEqual(email.toLowerCase())

    const tokenResponse = {
      data: {
        access_token: uuid(),
      },
    }

    const userResponse = {
      data: {
        given_name: [{ value: user.givenNames }],
        family_name: [{ value: user.surname }],
        email: email.toLowerCase(),
      },
    }

    const authCode = uuid()

    axios.request.mockResolvedValueOnce(tokenResponse)
    axios.get.mockResolvedValueOnce(userResponse)

    const results = await bioInteractiveLogin(authCode)

    const identitiesAfter = await Identity.find({})

    const userIdsAfter = identitiesAfter.result.map(i => i.userId)
    const userIdsBefore = identitiesBefore.result.map(i => i.userId)

    expect(userIdsBefore.length).toEqual(userIdsAfter.length)
    expect(userIdsAfter.includes(results.user.id)).toBe(true)
    expect(userIdsBefore.includes(results.user.id)).toBe(true)
  })
})
