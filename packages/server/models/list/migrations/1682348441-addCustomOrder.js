const { logger } = require('@coko/server')

exports.up = knex => {
  try {
    return knex.schema.table('lists', table => {
      table.jsonb('customOrder').nullable()
    })
  } catch (e) {
    logger.error('List: add column customOrder failed!')
    throw new Error(e)
  }
}

exports.down = knex =>
  knex.schema.table('lists', table => {
    table.dropColumn('customOrder')
  })
