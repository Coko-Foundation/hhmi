const { logger } = require('@coko/server')

exports.up = knex => {
  try {
    return knex.schema.table('complexItemSets', table => {
      table.text('deletedAuthor').nullable()
    })
  } catch (e) {
    logger.error('Context-Dependent Item Set: add column deletedAuthor failed!')
    throw new Error(e)
  }
}

exports.down = knex =>
  knex.schema.table('complexItemSets', table => {
    table.dropColumn('deletedAuthor')
  })
