const { logger } = require('@coko/server')

exports.up = knex => {
  try {
    return knex.schema.createTable('question_versions', table => {
      table.uuid('id').primary()
      table
        .timestamp('created', { useTz: true })
        .notNullable()
        .defaultTo(knex.fn.now())
      table.timestamp('updated', { useTz: true })

      table
        .uuid('question_id')
        .notNullable()
        .references('id')
        .inTable('questions')

      table.text('content').nullable()

      table.boolean('submitted').defaultTo(false).notNullable()
      table.boolean('underReview').defaultTo(false).notNullable()
      table.boolean('published').defaultTo(false).notNullable()

      table.string('topic').nullable()
      table.string('subTopic').nullable()
      table.jsonb('keywords')
      table.string('biointeractiveResources').nullable()
      table.string('cognitiveLevel').nullable()
      table.string('affectiveLevel').nullable()
      table.string('psychomotorLevel').nullable()
      table.string('readingLevel').nullable()
      table.string('framework').nullable()
      table.jsonb('frameworkMetadata')
      table.jsonb('supplementaryFields').defaultTo([])

      table.text('type')
    })
  } catch (e) {
    logger.error('Question Version: initial migration failed!')
    throw new Error(e)
  }
}

exports.down = knex => knex.schema.dropTable('question_versions')
