const { logger } = require('@coko/server')

exports.up = knex => {
  try {
    return knex.schema.table('question_versions', table => {
      table
        .uuid('complex_item_set_id')
        .nullable()
        .references('id')
        .inTable('complexItemSets')
    })
  } catch (e) {
    logger.error(
      'Question Version: migration adding complex_item_set_id field for table question_versions failed!',
    )
    throw new Error(e)
  }
}

exports.down = knex =>
  knex.schema.table('question_versions', table => {
    table.dropColumn('complex_item_set_id')
  })
