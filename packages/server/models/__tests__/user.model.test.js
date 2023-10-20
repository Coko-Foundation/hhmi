const Identity = require('@coko/server/src/models/identity/identity.model')
const User = require('../user/user.model')
const clearDb = require('./_clearDb')

describe('User Model', () => {
  beforeEach(() => clearDb())
  afterAll(async () => {
    await clearDb()
    const knex = User.knex()
    knex.destroy()
  })

  test('getDisplayName', async () => {
    const user = await User.insert({
      displayName: 'testuser',
    })

    await Identity.insert({
      userId: user.id,
      email: 'testuser@gmail.com',
      isDefault: true,
    })

    const result = await User.getDisplayName(user)
    expect(result).toBe('testuser')
  })
  test('filter user returns correct user with displayName', async () => {
    await User.insert({
      displayName: 'user1',
    })
    const users = await User.filter({ search: 'user1' })
    expect(users.result[0].displayName).toBe('user1')
  })
  test('filter user returns correct user with email', async () => {
    const user = await User.insert({
      username: 'user1',
    })

    await Identity.insert({
      userId: user.id,
      email: 'testuser@gmail.com',
      isDefault: true,
    })
    const users = await User.filter({ search: 'testuser@gmail.com' })
    expect(users.result[0].username).toBe('user1')
  })
  test('filter user returns correct number of users', async () => {
    await User.insert({
      displayName: 'test 1',
    })
    await User.insert({
      displayName: 'test 2',
    })

    const result = await User.filter({
      search: 'test',
    })

    expect(result.totalCount).toBe(2)
  })
  test('filters users with correct query options', async () => {
    await User.insert({
      displayName: 'test 3',
    })
    await User.insert({
      displayName: 'test 2',
    })
    await User.insert({
      displayName: 'test 1',
    })

    const users = await User.filter(
      { search: 'test' },
      { orderBy: 'displayName', ascending: true },
    )

    expect(users.result[0].displayName).toBe('test 1')
    expect(users.result[1].displayName).toBe('test 2')
    expect(users.result[2].displayName).toBe('test 3')
    expect(users.totalCount).toBe(3)
  })
})
