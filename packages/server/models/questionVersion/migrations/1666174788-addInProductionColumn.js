const { logger } = require('@coko/server')

exports.up = knex => {
  try {
    return knex.schema.table('question_versions', table => {
      table.boolean('in_production').defaultTo(false).nullable()
    })
  } catch (e) {
    logger.error(
      'Question Version: migration adding in_production field for table question_versions failed!',
    )
    throw new Error(e)
  }
}

exports.down = knex =>
  knex.schema.table('question_versions', table => {
    table.dropColumn('in_production')
  })
