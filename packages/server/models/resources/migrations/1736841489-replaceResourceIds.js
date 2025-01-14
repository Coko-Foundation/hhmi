const { logger, useTransaction } = require('@coko/server')

exports.up = knex => {
  try {
    return useTransaction(async trx => {
      const questionVersions = await knex('question_versions').transacting(trx)

      await Promise.all(
        questionVersions.map(async qv => {
          if (qv.biointeractiveResources.length) {
            const resourceIds = await Promise.all(
              qv.biointeractiveResources.map(async r => {
                const resource = await knex('resources')
                  .transacting(trx)
                  .where('value', r)
                  .first()

                return resource ? resource.id : null
              }),
            )

            await knex('question_versions')
              .transacting(trx)
              .where('id', qv.id)
              .update({
                biointeractiveResources: JSON.stringify(
                  resourceIds.filter(r => !!r),
                ),
              })
          }
        }),
      )
    })
  } catch (error) {
    logger.error('Resources: replace resources ids migration failed!')
    throw new Error(error)
  }
}

exports.down = () => {}
