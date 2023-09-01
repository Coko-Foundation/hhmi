const { uuid } = require('@coko/server')

const { Team, User } = require('../../index')

const createGlobalTeamWithUsers = async () => {
  try {
    const team = await Team.insert({
      role: 'editor',
      displayName: 'Managing Editor',
      global: true,
    })

    const user = await User.insert({})

    await Team.addMember(team.id, user.id)
    return { team, user }
  } catch (e) {
    throw new Error(e)
  }
}

const createLocalTeamWithUsers = async () => {
  try {
    const team = await Team.insert({
      role: 'editor',
      displayName: 'Managing Editor',
      global: false,
      objectId: uuid(),
      objectType: 'someObjectType',
    })

    const user = await User.insert({})

    await Team.addMember(team.id, user.id)
    return { team, user }
  } catch (e) {
    throw new Error(e)
  }
}

const createGlobalBaseTeamwithUsers = async (
  incomingRole,
  incomingDisplayName,
) => {
  try {
    const team = await Team.insert({
      role: incomingRole,
      displayName: incomingDisplayName,
      global: true,
    })

    const user = await User.insert({})

    await Team.addMember(team.id, user.id)
    return { team, user }
  } catch (e) {
    throw new Error(e)
  }
}

const createChatThreadTeamWithUsers = async chatThreadId => {
  try {
    const team = await Team.insert({
      role: 'editor',
      displayName: 'Managing Editor',
      global: false,
      objectId: chatThreadId,
      objectType: 'chatThread',
    })

    const user = await User.insert({})

    await Team.addMember(team.id, user.id)
    return { team, user }
  } catch (e) {
    throw new Error(e)
  }
}

const createGlobalReviewerTeamWithUsers = async () => {
  return createGlobalBaseTeamwithUsers('reviewer', 'Reviewer')
}

const createGlobalAuthorTeamWithUsers = async () => {
  return createGlobalBaseTeamwithUsers('author', 'Author')
}

const createGlobalEditorTeamWithUsers = async () => {
  return createGlobalBaseTeamwithUsers('editor', 'Managing Editor')
}

module.exports = {
  createChatThreadTeamWithUsers,
  createGlobalTeamWithUsers,
  createLocalTeamWithUsers,
  createGlobalAuthorTeamWithUsers,
  createGlobalReviewerTeamWithUsers,
  createGlobalEditorTeamWithUsers,
}
