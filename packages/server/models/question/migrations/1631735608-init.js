const { logger } = require('@coko/server')

exports.up = knex => {
  try {
    return knex.schema.createTable('questions', table => {
      table.uuid('id').primary()
      table
        .timestamp('created', { useTz: true })
        .notNullable()
        .defaultTo(knex.fn.now())
      table.timestamp('updated', { useTz: true })
      table.boolean('agreedTc').defaultTo(false).notNullable()
      table.text('type')
    })
  } catch (e) {
    logger.error('Question: initial migration failed!')
    throw new Error(e)
  }
}

exports.down = knex => knex.schema.dropTable('questions')
