const { logger } = require('@coko/server')

exports.up = knex => {
  try {
    return knex.schema.createTable('list_members', table => {
      table.uuid('id').primary()
      table.timestamp('created').defaultTo(knex.fn.now())
      table.timestamp('updated').defaultTo(knex.fn.now())
      table
        .uuid('list_id')
        .notNullable()
        .references('id')
        .inTable('lists')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .uuid('question_id')
        .notNullable()
        .references('id')
        .inTable('questions')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.unique(['list_id', 'question_id'])

      table.text('type')
    })
  } catch (e) {
    logger.error('ListMember: initial migration failed!')
    throw new Error(e)
  }
}

exports.down = knex => knex.schema.dropTable('list_members')
