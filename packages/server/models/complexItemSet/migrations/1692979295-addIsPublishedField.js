const { logger } = require('@coko/server')

exports.up = async knex => {
  try {
    const newField = await knex.schema.table('complexItemSets', table => {
      table.boolean('isPublished').defaultTo(false)
    })

    // update isPublished to true for sets that already contain published questions
    await knex('complexItemSets')
      .update('isPublished', true)
      // eslint-disable-next-line func-names
      .whereExists(function () {
        this.select('*')
          .from('question_versions')
          .whereRaw(
            'complex_item_sets.id = question_versions.complex_item_set_id AND question_versions.published = true',
          )
      })

    return newField
  } catch (e) {
    logger.error('Complex Item Set: add column isPublished failed!')
    throw new Error(e)
  }
}

exports.down = knex =>
  knex.schema.table('complexItemSets', table => {
    table.dropColumn('isPublished')
  })
