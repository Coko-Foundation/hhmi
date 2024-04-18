const { logger, useTransaction } = require('@coko/server')

exports.up = knex => {
  try {
    return useTransaction(async trx => {
      const allQuestions = await knex('questions').transacting(trx).select('id')

      await Promise.all(
        allQuestions.map(async question => {
          const questionVersions = await knex('question_versions')
            .transacting(trx)
            .select('id', 'created', 'published', 'unpublished')
            .where('question_id', question.id)
            .orderBy([{ column: 'created', order: 'desc' }])

          await Promise.all(
            // set published: false, unpublished: true for old versions of a question
            questionVersions.slice(1).map(async questionVersion => {
              await knex('question_versions')
                .transacting(trx)
                .where('id', questionVersion.id)
                .update({
                  published: false,
                  unpublished: true,
                })
            }),
          )
        }),
      )
    })
  } catch (e) {
    logger.error(
      'Question Version: migration setting published: false and unpublished: true for old versions in table question_versions failed!',
    )
    throw new Error(e)
  }
}
