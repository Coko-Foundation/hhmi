const { logger, useTransaction } = require('@coko/server')

exports.up = knex => {
  try {
    return useTransaction(async trx => {
      const questionVersions = await knex('question_versions').transacting(trx)

      await Promise.all(
        questionVersions.map(async qv => {
          const modifiedCourseData = await Promise.all(
            qv.courses.map(async courseData => {
              const courseDataClone = structuredClone(courseData)

              const course = await knex('course')
                .transacting(trx)
                .where('id', courseData.course)
                .first()

              if (course && course.value === 'introBioForMajors') {
                const units = await Promise.all(
                  courseData.units.map(async unitData => {
                    const unitDataClone = structuredClone(unitData)

                    const coreConcept = unitDataClone.coreConcept
                      ? await knex('core_concept')
                          .transacting(trx)
                          .where({
                            value: unitDataClone.coreConcept,
                          })
                          .first()
                      : null

                    const subdiscipline = unitDataClone.subdiscipline
                      ? await knex('subdiscipline')
                          .transacting(trx)
                          .where({
                            value: unitDataClone.subdiscipline,
                            core_concept_id: coreConcept?.id,
                          })
                          .first()
                      : null

                    const subdisciplineStatement =
                      unitDataClone.subdisciplineStatement
                        ? await knex('subdiscipline_statement')
                            .transacting(trx)
                            .where({
                              value: unitDataClone.subdisciplineStatement,
                              subdiscipline_id: subdiscipline?.id,
                            })
                            .first()
                        : null

                    const coreCompetence = unitDataClone.coreCompetence
                      ? await knex('core_competence')
                          .transacting(trx)
                          .where({
                            value: unitDataClone.coreCompetence,
                          })
                          .first()
                      : null

                    const subcompetence = unitDataClone.subcompetence
                      ? await knex('subcompetence')
                          .transacting(trx)
                          .where({
                            value: unitDataClone.subcompetence,
                            core_competence_id: coreCompetence?.id,
                          })
                          .first()
                      : null

                    const subcompetenceStatement =
                      unitDataClone.subcompetenceStatement
                        ? await knex('subcompetence_statement')
                            .transacting(trx)
                            .where({
                              value: unitDataClone.subcompetenceStatement,
                              subcompetence_id: subcompetence?.id,
                            })
                            .first()
                        : null

                    const concept = unitDataClone.concept
                      ? await knex('concept')
                          .transacting(trx)
                          .where({
                            value: unitDataClone.concept,
                          })
                          .first()
                      : null

                    const category = unitDataClone.category
                      ? await knex('category')
                          .transacting(trx)
                          .where({
                            value: unitDataClone.category,
                            concept_id: concept?.id,
                          })
                          .first()
                      : null

                    return {
                      ...unitDataClone,
                      coreConcept: coreConcept?.id || null,
                      subdiscipline: subdiscipline?.id || null,
                      subdisciplineStatement:
                        subdisciplineStatement?.id || null,
                      coreCompetence: coreCompetence?.id || null,
                      subcompetence: subcompetence?.id || null,
                      subcompetenceStatement:
                        subcompetenceStatement?.id || null,
                      concept: concept?.id || null,
                      category: category?.id || null,
                    }
                  }),
                )

                courseDataClone.units = units
              }

              return courseDataClone
            }),
          )

          await knex('question_versions')
            .transacting(trx)
            .where('id', qv.id)
            .update({
              courses: JSON.stringify(modifiedCourseData),
            })
        }),
      )
    })
  } catch (error) {
    logger.error(
      'Course metadata: migration replacing Vision and Change and AAMC metadata values with ids failed!',
    )
    throw new Error(error)
  }
}

exports.down = () => {}
