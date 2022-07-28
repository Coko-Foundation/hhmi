const {
  createChatThreadTeamWithUsers,
  createGlobalTeamWithUsers,
  createLocalTeamWithUsers,
} = require('@coko/server/src/models/__tests__/helpers/teams')

const { Team, User } = require('../../index')

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

const createGlobalReviewerTeamWithUsers = async () => {
  return createGlobalBaseTeamwithUsers('reviewer', 'Reviewer')
}

const createGlobalAuthorTeamWithUsers = async () => {
  return createGlobalBaseTeamwithUsers('author', 'Author')
}

const createGlobalEditorTeamWithUsers = async () => {
  return createGlobalBaseTeamwithUsers('editor', 'Editor')
}

module.exports = {
  createChatThreadTeamWithUsers,
  createGlobalTeamWithUsers,
  createLocalTeamWithUsers,
  createGlobalAuthorTeamWithUsers,
  createGlobalReviewerTeamWithUsers,
  createGlobalEditorTeamWithUsers,
}
