const { logger } = require('@coko/server')

exports.up = knex => {
  try {
    return knex.schema.createTable('archived_items', table => {
      table.uuid('id').primary()
      table
        .timestamp('created', { useTz: true })
        .notNullable()
        .defaultTo(knex.fn.now())
      table.timestamp('updated', { useTz: true })

      table
        .uuid('questionId')
        .notNullable()
        .references('id')
        .inTable('questions')
      table.uuid('userId').notNullable().references('id').inTable('users')
      table.text('role').notNullable()

      table.text('type')
    })
  } catch (e) {
    logger.error('ArchivedItem: initial migration failed!')
    throw new Error(e)
  }
}

exports.down = knex => knex.schema.dropTable('archived_items')
