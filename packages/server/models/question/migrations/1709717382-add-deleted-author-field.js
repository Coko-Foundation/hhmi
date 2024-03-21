const { logger } = require('@coko/server')

exports.up = knex => {
  try {
    return knex.schema.table('questions', table => {
      table.string('deleted_author_name').nullable()
    })
  } catch (e) {
    logger.error(
      'Question: migration adding deleted_author_name field for table questions failed!',
    )
    throw new Error(e)
  }
}

exports.down = knex =>
  knex.schema.table('questions', table => {
    table.dropColumn('deleted_author_name')
  })
