const { logger } = require('@coko/server')

exports.up = knex => {
  try {
    return knex.schema.table('question_versions', table => {
      table.string('dependsOn').nullable()
    })
  } catch (e) {
    logger.error(
      'Question Version: migration adding column `dependsOn` for table question_versions failed!',
    )
    throw new Error(e)
  }
}

exports.down = knex =>
  knex.schema.table('question_versions', table => {
    table.dropColumn('dependsOn')
  })
