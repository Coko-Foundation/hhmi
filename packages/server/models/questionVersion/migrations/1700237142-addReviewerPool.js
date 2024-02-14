const { logger } = require('@coko/server')

exports.up = knex => {
  try {
    return knex.schema.table('question_versions', table => {
      table.smallint('amountOfReviewers').notNullable().defaultTo(0)
      table.boolean('isReviewerAutomationOn').defaultTo(false)
      table.jsonb('reviewerPool').defaultTo([])
    })
  } catch (e) {
    logger.error(
      'QuestionVersion: add columns amountOfReviewers, isReviewerAutomationOn, reviewerPool failed!',
    )
    throw new Error(e)
  }
}

exports.down = knex =>
  knex.schema.table('question_versions', table => {
    table.dropColumn('amountOfReviewers')
    table.dropColumn('isReviewerAutomationOn')
    table.dropColumn('reviewerPool')
  })
