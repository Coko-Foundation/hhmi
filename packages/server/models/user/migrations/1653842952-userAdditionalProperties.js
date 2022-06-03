exports.up = knex => {
  try {
    return knex.schema.table('users', table => {
      table.string('middleName').nullable()
      table.string('displayName').nullable()
      table.string('pronouns').nullable()

      table.string('phone').nullable()

      table.string('country').nullable()
      table.string('state').nullable()
      table.string('city').nullable()
      table.string('address').nullable()
      table.string('zipCode').nullable()

      table.string('position').nullable()
      table.string('organization').nullable()
      table.string('institutionalSetting').nullable()
      table.string('teachingExperience').nullable()
      table.string('typeOfInstitution').nullable()

      // TO DO -- make these not nullable when the coko server user model issue is solved
      // table.jsonb('coursesTeaching').notNullable()
      // table.jsonb('topicsReviewing').notNullable()
      table.jsonb('coursesTeaching').nullable()
      table.jsonb('topicsReviewing').nullable()

      table.boolean('receivedTraining')
      // .defaultTo(false).notNullable()
      table.boolean('receivedInclusiveLanguageTraining')
      // .defaultTo(false)
      // .notNullable()

      table.string('source').nullable()

      table.boolean('profileSubmitted').defaultTo(false).notNullable()
    })
  } catch (e) {
    throw new Error(e)
  }
}

exports.down = knex => knex.schema.dropTable('question_versions')
