const { Team, User, Identity } = require('../models')

const EMAIL = 'user2@gmail.com'
const GLOBAL = true
const ROLE = 'editor'

const addToTeam = async () => {
  const identity = await Identity.findOne({
    email: EMAIL,
  })

  const user = await User.findById(identity.userId)

  const team = await Team.findOne({
    role: ROLE,
    global: GLOBAL,
  })

  await Team.addMember(team.id, user.id)
}

addToTeam()
