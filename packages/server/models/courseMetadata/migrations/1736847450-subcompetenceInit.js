const { logger } = require('@coko/server')

exports.up = knex => {
  try {
    return knex.schema.createTable('subcompetence', table => {
      table.uuid('id').primary()
      table
        .timestamp('created', { useTz: true })
        .notNullable()
        .defaultTo(knex.fn.now())
      table.timestamp('updated', { useTz: true })
      table.text('label').notNullable()
      table.text('value')
      table.text('explanation')
      table
        .uuid('core_competence_id')
        .notNullable()
        .references('id')
        .inTable('core_competence')
      table.boolean('enabled').defaultTo(true)
      table.smallint('order').defaultTo(0)
    })
  } catch (error) {
    logger.error('Resources: initial migration failed!')
    throw new Error(error)
  }
}

exports.down = knex => knex.schema.dropTable('subcompetence')
