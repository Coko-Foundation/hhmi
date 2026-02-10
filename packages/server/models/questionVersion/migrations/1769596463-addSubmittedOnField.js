const { logger } = require('@coko/server')

exports.up = knex => {
  try {
    return knex.schema.table('question_versions', table => {
      table.timestamp('submittedOn', { useTz: true }).nullable()
    })
  } catch (e) {
    logger.error(
      'Question Version: migration adding column `submittedOn` for table question_versions failed!',
    )
    throw new Error(e)
  }
}

exports.down = knex =>
  knex.schema.table('question_versions', table => {
    table.dropColumn('submittedOn')
  })
