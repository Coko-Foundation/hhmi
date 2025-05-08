const { logger } = require('@coko/server')

exports.up = knex => {
  try {
    return knex.schema.table('question_versions', table => {
      table.boolean('editing').defaultTo(false).nullable()
    })
  } catch (e) {
    logger.error(
      'Question Version: migration adding column `editing` for table question_versions failed!',
    )
    throw new Error(e)
  }
}

exports.down = knex =>
  knex.schema.table('question_versions', table => {
    table.dropColumn('editing')
  })
