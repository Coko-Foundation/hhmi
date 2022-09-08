const { logger } = require('@coko/server')

exports.up = knex => {
  try {
    return knex.schema.table('question_versions', table => {
      table.timestamp('last_edit', { useTz: true }).nullable()
    })
  } catch (e) {
    logger.error(
      'Question Version: migration adding last_edit field for table question_versions failed!',
    )
    throw new Error(e)
  }
}

exports.down = knex =>
  knex.schema.table('question_versions', table => {
    table.dropColumn('last_edit')
  })
