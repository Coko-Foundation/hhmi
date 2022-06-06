const config = require('config')

const { logger } = require('@coko/server')

const { Team } = require('../models')

const seedGlobalTeams = async () => {
  logger.info('Seeding global teams...')

  if (!config.has('teams.global')) {
    logger.info('No global teams declared in config')
  }

  const configGlobalTeams = config.get('teams.global')

  await Promise.all(
    Object.keys(configGlobalTeams).map(async k => {
      const teamData = configGlobalTeams[k]

      const exists = await Team.findOne({
        global: true,
        role: teamData.role,
      })

      if (exists) {
        logger.info(`Global team "${teamData.role}" already exists`)
        return
      }

      await Team.insert({
        ...teamData,
        global: true,
      })

      logger.info(`Added global team "${teamData.role}"`)
    }),
  )
}

seedGlobalTeams()
