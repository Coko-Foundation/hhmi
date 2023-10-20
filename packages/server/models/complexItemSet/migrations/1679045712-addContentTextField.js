const { logger } = require('@coko/server')

exports.up = knex => {
  try {
    return knex.schema.table('complexItemSets', table => {
      table.text('contentText').nullable()
    })
  } catch (e) {
    logger.error('Complex Item Set: add column contentText failed!')
    throw new Error(e)
  }
}

exports.down = knex =>
  knex.schema.table('complexItemSets', table => {
    table.dropColumn('contentText')
  })
