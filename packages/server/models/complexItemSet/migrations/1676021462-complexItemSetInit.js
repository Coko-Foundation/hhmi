const { logger } = require('@coko/server')

exports.up = knex => {
  try {
    return knex.schema.createTable('complexItemSets', table => {
      table.uuid('id').primary()
      table
        .timestamp('created', { useTz: true })
        .notNullable()
        .defaultTo(knex.fn.now())
      table.timestamp('updated', { useTz: true })
      table.text('title').notNullable()
      // temporarily nullable, should be notNullable
      table.jsonb('leadingContent').nullable()

      table.text('type')
    })
  } catch (e) {
    logger.error('ComplexItemSet : initial migration failed!')
    throw new Error(e)
  }
}

exports.down = knex => knex.schema.dropTable('complexItemSets')
