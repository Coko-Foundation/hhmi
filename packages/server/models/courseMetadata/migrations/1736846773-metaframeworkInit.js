const { logger } = require('@coko/server')

exports.up = knex => {
  try {
    return knex.schema.createTable('meta_framework', table => {
      table.uuid('id').primary()
      table
        .timestamp('created', { useTz: true })
        .notNullable()
        .defaultTo(knex.fn.now())
      table.timestamp('updated', { useTz: true })
      table.text('label').notNullable()
      table.text('value')
      table.boolean('enabled').defaultTo(true)
      table.smallint('order').defaultTo(0)
    })
  } catch (error) {
    logger.error('Resources: initial migration failed!')
    throw new Error(error)
  }
}

exports.down = knex => knex.schema.dropTable('meta_framework')
