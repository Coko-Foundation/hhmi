const { logger } = require('@coko/server')

exports.up = knex => {
  try {
    return knex.schema.createTable('reports', table => {
      table.uuid('id').primary()
      table
        .timestamp('created', { useTz: true })
        .notNullable()
        .defaultTo(knex.fn.now())
      table.timestamp('updated', { useTz: true })

      table.uuid('questionId').notNullable()
      table.uuid('userId').notNullable()
      table.text('content').notNullable()
      table.jsonb('attachmentIds').defaultTo([])

      table.text('type')
    })
  } catch (e) {
    logger.error('Report: initial migration failed!')
    throw new Error(e)
  }
}

exports.down = knex => knex.schema.dropTable('reports')
