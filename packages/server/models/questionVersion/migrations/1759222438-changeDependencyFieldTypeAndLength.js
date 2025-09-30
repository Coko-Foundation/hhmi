const { logger } = require('@coko/server')

exports.up = knex => {
  try {
    return knex.schema.alterTable('question_versions', table => {
      table.text('dependsOn').alter()
    })
  } catch (error) {
    logger.error(
      'Question Version: migration altering column `dependsOn` for table question_versions failed!',
    )
    throw new Error(error)
  }
}

exports.down = knex =>
  knex.schema.table('question_versions', table => {
    table.string('dependsOn').alter()
  })
