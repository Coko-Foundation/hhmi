const { logger } = require('@coko/server')

exports.up = knex => {
  try {
    return knex.schema.alterTable('question_versions', table => {
      table.text('literatureAttribution').alter()
    })
  } catch (error) {
    logger.error(
      'Question Version: migration altering column `literatureAttribution` for table question_versions failed!',
    )
    throw new Error(error)
  }
}

exports.down = knex =>
  knex.schema.table('question_versions', table => {
    table.string('literatureAttribution').alter()
  })
