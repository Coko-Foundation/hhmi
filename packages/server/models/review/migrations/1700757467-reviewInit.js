const { logger } = require('@coko/server')

exports.up = knex => {
  try {
    return knex.schema.createTable('reviews', table => {
      table.uuid('id').primary()
      table
        .timestamp('created', { useTz: true })
        .notNullable()
        .defaultTo(knex.fn.now())
      table.timestamp('updated', { useTz: true })

      table.uuid('questionVersionId').notNullable()
      table.uuid('reviewerId').notNullable()
      table.text('content').nullable()
      table.jsonb('status').notNullable()

      table.text('type')
    })
  } catch (e) {
    logger.error('Review: initial migration failed!')
    throw new Error(e)
  }
}

exports.down = knex => knex.schema.dropTable('reviews')
