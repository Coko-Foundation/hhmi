const { logger, useTransaction } = require('@coko/server')

exports.up = knex => {
  try {
    return useTransaction(async trx => {
      const problematicQuestionVersions = await knex('question_versions')
        .transacting(trx)
        .where({ published: true, editing: true })

      await Promise.all(
        problematicQuestionVersions.map(async qv => {
          await knex('question_versions')
            .transacting(trx)
            .where('id', qv.id)
            .update({
              editing: false,
            })
        }),
      )
    })
  } catch (e) {
    logger.error(
      'Question Version: migration filling up missing content_text for table question_versions failed!',
    )
    throw new Error(e)
  }
}

exports.down = () => {}
