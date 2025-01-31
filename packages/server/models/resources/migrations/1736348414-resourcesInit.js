const { logger } = require('@coko/server')

exports.up = knex => {
  try {
    return knex.schema.createTable('resources', table => {
      table.uuid('id').primary()
      table
        .timestamp('created', { useTz: true })
        .notNullable()
        .defaultTo(knex.fn.now())
      table.timestamp('updated', { useTz: true })
      table.text('type')
      table.text('label').notNullable()
      table.text('value')
      table.text('url').notNullable()
      table.jsonb('topics').defaultTo([])
      table.jsonb('subtopics').defaultTo([])
    })
  } catch (error) {
    logger.error('Resources: initial migration failed!')
    throw new Error(error)
  }
}

exports.down = knex => knex.schema.dropTable('resources')
