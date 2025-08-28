const { logger, useTransaction } = require('@coko/server')

exports.up = knex => {
  try {
    return useTransaction(async trx => {
      const usersTeachingBiochemistryMolecularBiology = await knex('users')
        .transacting(trx)
        .whereRaw(
          `users.courses_teaching @> '["biochemistryMolecularBiology"]'::jsonb`,
        )

      await Promise.all(
        usersTeachingBiochemistryMolecularBiology.map(async user => {
          let { coursesTeaching } = user

          coursesTeaching = coursesTeaching.map(c =>
            c === 'biochemistryMolecularBiology' ? 'biochemistry' : c,
          )

          await knex('users')
            .transacting(trx)
            .where('id', user.id)
            .update('courses_teaching', JSON.stringify(coursesTeaching))
        }),
      )
    })
  } catch (error) {
    logger.error(
      'There was an error updating biochemistryMolecularBiology entry in coures_teaching field for users',
    )
    throw new Error(error)
  }
}

exports.down = knex => {
  try {
    return useTransaction(async trx => {
      const usersTeachingBiochemistryMolecularBiology = await knex('users')
        .transacting(trx)
        .whereRaw(`users.courses_teaching @> '["biochemistry"]'::jsonb`)

      await Promise.all(
        usersTeachingBiochemistryMolecularBiology.map(async user => {
          let { coursesTeaching } = user

          coursesTeaching = coursesTeaching.map(c =>
            c === 'biochemistry' ? 'biochemistryMolecularBiology' : c,
          )

          await knex('users')
            .transacting(trx)
            .where('id', user.id)
            .update('courses_teaching', JSON.stringify(coursesTeaching))
        }),
      )
    })
  } catch (error) {
    logger.error(
      'There was an error reverting the update of biochemistryMolecularBiology entry in coures_teaching field for users',
    )
    throw new Error(error)
  }
}
