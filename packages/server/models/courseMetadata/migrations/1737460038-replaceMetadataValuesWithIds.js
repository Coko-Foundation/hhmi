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
                .where('value', courseData.course)
                .first()

              if (course) {
                const units = await Promise.all(
                  courseData.units.map(async unitData => {
                    const unitDataClone = structuredClone(unitData)

                    const unit = unitData.unit
                      ? await knex('unit')
                          .transacting(trx)
                          .where({
                            value: unitDataClone.unit,
                            course_id: course.id,
                          })
                          .first()
                      : null

                    const courseTopic = unitData.courseTopic
                      ? await knex('topic')
                          .transacting(trx)
                          .where({
                            value: unitDataClone.courseTopic,
                            unit_id: unit.id,
                          })
                          .first()
                      : null

                    const learningObjective = unitData.learningObjective
                      ? await knex('learning_objective')
                          .transacting(trx)
                          .where({
                            value: unitDataClone.learningObjective,
                            topic_id: courseTopic?.id,
                          })
                          .first()
                      : null

                    const essentialKnowledge = unitData.essentialKnowledge
                      ? await knex('essential_knowledge')
                          .transacting(trx)
                          .where({
                            value: unitDataClone.essentialKnowledge,
                            learning_objective_id: learningObjective.id,
                          })
                          .first()
                      : null

                    const application = unitData.application
                      ? await knex('application')
                          .transacting(trx)
                          .where({
                            value: unitDataClone.application,
                            topic_id: courseTopic?.id,
                          })
                          .first()
                      : null

                    const skill = unitData.skill
                      ? await knex('skill')
                          .transacting(trx)
                          .where({
                            value: unitDataClone.skill,
                            topic_id: courseTopic?.id,
                          })
                          .first()
                      : null

                    const understanding = unitData.understanding
                      ? await knex('understanding')
                          .transacting(trx)
                          .where({
                            value: unitDataClone.understanding,
                            topic_id: courseTopic?.id,
                          })
                          .first()
                      : null

                    return {
                      ...unitDataClone,
                      unit: unit?.id || null,
                      courseTopic: courseTopic?.id || null,
                      learningObjective: learningObjective?.id || null,
                      essentialKnowledge: essentialKnowledge?.id || null,
                      skill: skill?.id || null,
                      application: application?.id || null,
                      understanding: understanding?.id || null,
                    }
                  }),
                )

                courseDataClone.course = course.id
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
      'Course metadata: migration replacing metadata values with ids failed!',
    )
    throw new Error(error)
  }
}

exports.down = () => {}
