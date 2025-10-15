const {
  BaseModel,
  modelTypes: { stringNotEmpty },
  db,
  logger,
  uuid,
  useTransaction,
} = require('@coko/server')

class CourseMetadata extends BaseModel {
  static get tableName() {
    return 'course'
  }

  //   constructor(properties) {
  //     super(properties)
  //   }

  static get schema() {
    return {
      properties: {
        label: stringNotEmpty,
        value: stringNotEmpty,
      },
    }
  }

  static async getMetadata() {
    logger.info('This method is obsolete, please use getMetadataOptimized')

    return useTransaction(async trx => {
      const coursesRaw = await CourseMetadata.query(trx).orderBy('order', 'asc')

      const frameworks = await Promise.all(
        coursesRaw.map(async course => {
          const courseData = structuredClone(course)
          courseData.units = []
          courseData.topics = []
          courseData.learningObjectives = []
          courseData.essentialKnowledge = []
          courseData.applications = []
          courseData.skills = []
          courseData.understandings = []

          const unitsRaw = await db
            .raw(
              `select * from unit where unit.course_id='${course.id}' order by unit.order asc`,
            )
            .transacting(trx)

          courseData.units = await Promise.all(
            unitsRaw.rows.map(async unit => {
              const topicsRaw = await db
                .raw(
                  `select * from topic where topic.unit_id='${unit.id}' order by topic.order asc`,
                )
                .transacting(trx)

              courseData.topics.push(
                ...(await Promise.all(
                  topicsRaw.rows.map(async topic => {
                    switch (course.value) {
                      case 'apBiology':
                      case 'apEnvironmentalScience':
                        // eslint-disable-next-line no-case-declarations
                        const learningObjectives = await db
                          .raw(
                            `select * from learning_objective where learning_objective.topic_id='${topic.id}' order by learning_objective.order asc`,
                          )
                          .transacting(trx)

                        courseData.learningObjectives.push(
                          ...(await Promise.all(
                            learningObjectives.rows.map(async lo => {
                              const eks = await db
                                .raw(
                                  `select * from essential_knowledge where essential_knowledge.learning_objective_id='${lo.id}' order by essential_knowledge.order asc`,
                                )
                                .transacting(trx)

                              courseData.essentialKnowledge.push(
                                ...eks.rows.map(ek => ({
                                  ...ek,
                                  learningObjective: lo.id,
                                  topic: topic.id,
                                  unit: unit.id,
                                })),
                              )

                              return {
                                ...lo,
                                topic: topic.id,
                                unit: unit.id,
                              }
                            }),
                          )),
                        )

                        break

                      case 'biBiology':
                        courseData.applications.push(
                          ...(
                            await db
                              .raw(
                                `select * from application where application.topic_id='${topic.id}' order by application.order asc`,
                              )
                              .transacting(trx)
                          ).rows.map(application => ({
                            ...application,
                            topic: topic.id,
                          })),
                        )
                        courseData.skills.push(
                          ...(
                            await db
                              .raw(
                                `select * from skill where skill.topic_id='${topic.id}' order by skill.order asc`,
                              )
                              .transacting(trx)
                          ).rows.map(skill => ({
                            ...skill,
                            topic: topic.id,
                          })),
                        )
                        courseData.understandings.push(
                          ...(
                            await db
                              .raw(
                                `select * from understanding where understanding.topic_id='${topic.id}' order by understanding.order asc`,
                              )
                              .transacting(trx)
                          ).rows.map(understanding => ({
                            ...understanding,
                            topic: topic.id,
                          })),
                        )
                        break

                      case 'biEnvironmentalScience':
                        courseData.applications.push(
                          ...(
                            await db
                              .raw(
                                `select * from application where application.topic_id='${topic.id}' order by application.order asc`,
                              )
                              .transacting(trx)
                          ).rows.map(application => ({
                            ...application,
                            topic: topic.id,
                          })),
                        )
                        courseData.understandings.push(
                          ...(
                            await db
                              .raw(
                                `select * from understanding where understanding.topic_id='${topic.id}' order by understanding.order asc`,
                              )
                              .transacting(trx)
                          ).rows.map(understanding => ({
                            ...understanding,
                            topic: topic.id,
                          })),
                        )
                        break

                      case 'introBioForMajors':
                        courseData.learningObjectives.push(
                          ...(
                            await db
                              .raw(
                                `select * from learning_objective where learning_objective.topic_id='${topic.id}' order by learning_objective.order asc`,
                              )
                              .transacting(trx)
                          ).rows.map(lo => ({
                            ...lo,
                            topic: topic.id,
                          })),
                        )
                        break

                      default:
                        break
                    }

                    return {
                      ...topic,
                      unit: unit.id,
                    }
                  }),
                )),
              )

              return unit
            }),
          )

          return courseData
        }),
      )

      const metaFrameworksRaw = await db
        .raw(`select * from meta_framework`)
        .transacting(trx)

      const introToBioMeta = await Promise.all(
        metaFrameworksRaw.rows.map(async meta => {
          const frameworkData = structuredClone(meta)
          frameworkData.coreConcepts = []
          frameworkData.subdisciplines = []
          frameworkData.subdisciplineStatements = []
          frameworkData.coreCompetencies = []
          frameworkData.subcompetencies = []
          frameworkData.subcompetenceStatements = []
          frameworkData.concepts = []
          frameworkData.categories = []

          if (frameworkData.value === 'visionAndChange') {
            const coreConceptsRaw = await db
              .raw(
                `select * from core_concept where core_concept.meta_framework_id='${frameworkData.id}' order by core_concept.order asc`,
              )
              .transacting(trx)

            frameworkData.coreConcepts = await Promise.all(
              coreConceptsRaw.rows.map(async coreConcept => {
                const { explanatory_items: explanatoryItems, ...rest } =
                  coreConcept

                const subdisciplinesRaw = await db
                  .raw(
                    `select * from subdiscipline where subdiscipline.core_concept_id='${coreConcept.id}' order by subdiscipline.order asc`,
                  )
                  .transacting(trx)

                frameworkData.subdisciplines.push(
                  ...(await Promise.all(
                    subdisciplinesRaw.rows.map(async subdiscipline => {
                      const statements = await db
                        .raw(
                          `select * from subdiscipline_statement where subdiscipline_statement.subdiscipline_id='${subdiscipline.id}' order by subdiscipline_statement.order asc`,
                        )
                        .transacting(trx)

                      frameworkData.subdisciplineStatements.push(
                        ...statements.rows.map(statement => ({
                          ...statement,
                          coreConcept: coreConcept.id,
                          subdiscipline: subdiscipline.id,
                        })),
                      )

                      return {
                        ...subdiscipline,
                        coreConcept: coreConcept.id,
                      }
                    }),
                  )),
                )

                return { ...rest, explanatoryItems }
              }),
            )

            const coreCompetenceRaw = await db
              .raw(
                `select * from core_competence where core_competence.meta_framework_id='${frameworkData.id}' order by core_competence.order asc`,
              )
              .transacting(trx)

            frameworkData.coreCompetencies = await Promise.all(
              coreCompetenceRaw.rows.map(async competence => {
                const subcompetencesRaw = await db
                  .raw(
                    `select * from subcompetence where subcompetence.core_competence_id='${competence.id}' order by subcompetence.order asc`,
                  )
                  .transacting(trx)

                frameworkData.subcompetencies.push(
                  ...(await Promise.all(
                    subcompetencesRaw.rows.map(async subcompetence => {
                      const statements = await db
                        .raw(
                          `select * from subcompetence_statement where subcompetence_statement.subcompetence_id='${subcompetence.id}' order by subcompetence_statement.order asc`,
                        )
                        .transacting(trx)

                      frameworkData.subcompetenceStatements.push(
                        ...statements.rows.map(statement => ({
                          ...statement,
                          coreCompetence: competence.id,
                          subcompetence: subcompetence.id,
                        })),
                      )

                      return {
                        ...subcompetence,
                        coreCompetence: competence.id,
                      }
                    }),
                  )),
                )

                return competence
              }),
            )
          } else if (frameworkData.value === 'aamcFuturePhysicians') {
            const conceptsRaw = await db
              .raw(
                `select * from concept where concept.meta_framework_id='${frameworkData.id}' order by concept.order asc`,
              )
              .transacting(trx)

            frameworkData.concepts = await Promise.all(
              conceptsRaw.rows.map(async concept => {
                const categoriesRaw = await db
                  .raw(
                    `select * from category where category.concept_id='${concept.id}' order by category.order asc`,
                  )
                  .transacting(trx)

                frameworkData.categories.push(
                  ...categoriesRaw.rows.map(category => {
                    return {
                      ...category,
                      concept: concept.id,
                    }
                  }),
                )

                return concept
              }),
            )
          }

          return frameworkData
        }),
      )

      return {
        frameworks,
        introToBioMeta,
      }
    })
  }

  static findTablenameByType = type => {
    switch (type) {
      case 'course':
      case 'unit':
      case 'topic':
      case 'concept':
      case 'category':
      case 'subdiscipline':
      case 'subcompetence':
      case 'application': // extra
      case 'skill': // extra
      case 'understanding': // extra
        return type
      case 'learningObjective':
        return 'learning_objective'
      case 'essentialKnowledge':
        return 'essential_knowledge'
      case 'applications':
        return 'application'
      case 'skills':
        return 'skill'
      case 'understandings':
        return 'understanding'
      case 'coreConcept':
        return 'core_concept'
      case 'subdisciplineStatement':
        return 'subdiscipline_statement'
      case 'coreCompetence':
        return 'core_competence'
      case 'subcompetenceStatement':
        return 'subcompetence_statement'
      case 'courseTopic': // extra
        return 'topic'
      default:
        return null
    }
  }

  static async disableMetadata(id, type) {
    const tableName = this.findTablenameByType(type)

    try {
      await db(`${tableName}`).update('enabled', false).where('id', id)

      return true
    } catch (error) {
      logger.error(error)
      return false
    }
  }

  static async enableMetadata(id, type) {
    const tableName = this.findTablenameByType(type)

    try {
      await db(`${tableName}`).update('enabled', true).where('id', id)
      return true
    } catch (error) {
      logger.error(error)
      return false
    }
  }

  static async updateMetadata(id, type, label, explanatoryItems, explanation) {
    const tableName = this.findTablenameByType(type)

    try {
      if (type === 'coreConcept') {
        await db(tableName)
          .update({ label, explanatoryItems: JSON.stringify(explanatoryItems) })
          .where('id', id)
      } else if (type === 'subcompetence' || type === 'category') {
        await db(tableName).update({ label, explanation }).where('id', id)
      } else {
        await db(tableName).update({ label }).where('id', id)
      }

      return true
    } catch (error) {
      logger.error(error)
      return false
    }
  }

  static async createMetadata(input) {
    const { label, newKey: tableName } = input

    let columnName
    let columnValue

    switch (tableName) {
      case 'unit':
        columnName = 'course_id'
        columnValue = input.course
        break
      case 'topic':
        columnName = 'unit_id'
        columnValue = input.unit
        break
      case 'learning_objective':
      case 'application':
      case 'skill':
      case 'understanding':
        columnName = 'topic_id'
        columnValue = input.topic
        break
      case 'essential_knowledge':
        columnName = 'learning_objective_id'
        columnValue = input.learningObjective
        break
      case 'coreConcept':
        columnName = 'meta_framework_id'
        columnValue = await db.raw(
          `select * from meta_framework where value='visionAndChange'`,
        )
        columnValue = columnValue.rows[0].id
        break
      case 'subdiscipline':
        columnName = 'core_concept_id'
        columnValue = input.coreConcept
        break
      case 'subdisciplineStatement':
        columnName = 'subdiscipline_id'
        columnValue = input.subdiscipline
        break
      case 'coreCompetence':
        columnName = 'meta_framework_id'
        columnValue = await db.raw(
          `select * from meta_framework where value='visionAndChange'`,
        )
        columnValue = columnValue.rows[0].id
        break
      case 'subcompetence':
        columnName = 'core_competence_id'
        columnValue = input.coreCompetence
        break
      case 'subcompetenceStatement':
        columnName = 'subcompetence_id'
        columnValue = input.subcompetence
        break
      case 'concept':
        columnName = 'meta_framework_id'
        columnValue = await db.raw(
          `select * from meta_framework where value='aamcFuturePhysicians'`,
        )
        columnValue = columnValue.rows[0].id
        break
      case 'category':
        columnName = 'concept_id'
        columnValue = input.concept
        break
      default:
        break
    }

    try {
      await db(tableName).insert({
        id: uuid(),
        label,
        [columnName]: columnValue,
      })

      return true
    } catch (error) {
      logger.error(error)
      return false
    }
  }

  static async reorderMetadata(input) {
    try {
      const { type, order } = input

      const tableName = this.findTablenameByType(type)

      await Promise.all(
        order.map(async ({ id, index }) => {
          await db(tableName).update({ order: index }).where({ id })
        }),
      )

      return true
    } catch (error) {
      logger.error(error)
      return false
    }
  }
}

module.exports = CourseMetadata
