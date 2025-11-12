const { logger } = require('@coko/server')
const { CourseMetadata, Course, MetaFramework } = require('../models')
const metadata = require('./metadataValues')

const getMetadata = async () => {
  try {
    logger.info('Course metadata controller: getMetadata (obsolete)')
    const { frameworks, introToBioMeta } = await CourseMetadata.getMetadata()

    return {
      topics: metadata.topics,
      frameworks,
      introToBioMeta,
      questionTypes: metadata.questionTypes,
      blooms: metadata.blooms,
      profileOptions: getProfileOptions(),
    }
  } catch (error) {
    throw new Error(error)
  }
}

const getMetadataOptimized = async () => {
  logger.info('Course metadata controller: getMetadataOptimized')

  try {
    let frameworks = await Course.query()
      .withGraphFetched(
        '[units.topics.[learningObjectives.essentialKnowledges, applications, skills, understandings], practices, crosscuttingConcepts, disciplinaryCoreIdeas]',
      )
      .orderBy([{ column: 'order', order: 'asc' }])

    let introToBioMeta = await MetaFramework.query().withGraphFetched(
      '[coreConcepts.subdisciplines.subdisciplineStatements, coreCompetencies.subcompetencies.subcompetenceStatements, concepts.categories]',
    )

    frameworks = frameworks.map(framework => {
      const courseData = structuredClone(framework)
      courseData.topics = []
      courseData.learningObjectives = []
      courseData.essentialKnowledge = []
      courseData.applications = []
      courseData.skills = []
      courseData.understandings = []

      courseData.units.forEach(unit => {
        courseData.topics.push(
          ...unit.topics.map(topic => {
            switch (framework.value) {
              case 'apBiology':
              case 'apEnvironmentalScience':
                courseData.learningObjectives.push(
                  ...topic.learningObjectives.map(lo => {
                    courseData.essentialKnowledge.push(
                      ...lo.essentialKnowledges.map(ek => ({
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
                )
                break

              case 'biBiology':
                courseData.applications.push(
                  ...topic.applications.map(application => ({
                    ...application,
                    topic: topic.id,
                  })),
                )
                courseData.skills.push(
                  ...topic.skills.map(skill => ({
                    ...skill,
                    topic: topic.id,
                  })),
                )
                courseData.understandings.push(
                  ...topic.understandings.map(understanding => ({
                    ...understanding,
                    topic: topic.id,
                  })),
                )
                break

              case 'biEnvironmentalScience':
                courseData.applications.push(
                  ...topic.applications.map(application => ({
                    ...application,
                    topic: topic.id,
                  })),
                )
                courseData.understandings.push(
                  ...topic.understandings.map(understanding => ({
                    ...understanding,
                    topic: topic.id,
                  })),
                )
                break

              case 'introBioForMajors':
                courseData.learningObjectives.push(
                  ...topic.learningObjectives.map(lo => ({
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
        )
      })

      return courseData
    })

    introToBioMeta = introToBioMeta.map(metaframework => {
      const frameworkData = structuredClone(metaframework)
      frameworkData.subdisciplines = []
      frameworkData.subdisciplineStatements = []
      frameworkData.subcompetencies = []
      frameworkData.subcompetenceStatements = []
      frameworkData.categories = []

      if (frameworkData.value === 'visionAndChange') {
        frameworkData.coreConcepts.forEach(coreConcept => {
          frameworkData.subdisciplines.push(
            ...coreConcept.subdisciplines.map(subdiscipline => {
              frameworkData.subdisciplineStatements.push(
                ...subdiscipline.subdisciplineStatements.map(
                  subdisciplineStatement => ({
                    ...subdisciplineStatement,
                    coreConcept: coreConcept.id,
                    subdiscipline: subdiscipline.id,
                  }),
                ),
              )

              return {
                ...subdiscipline,
                coreConcept: coreConcept.id,
              }
            }),
          )
        })

        frameworkData.coreCompetencies.forEach(coreCompetence => {
          frameworkData.subcompetencies.push(
            ...coreCompetence.subcompetencies.map(subcompetence => {
              frameworkData.subcompetenceStatements.push(
                ...subcompetence.subcompetenceStatements.map(statement => ({
                  ...statement,
                  coreCompetence: coreCompetence.id,
                  subcompetence: subcompetence.id,
                })),
              )
              return {
                ...subcompetence,
                coreCompetence: coreCompetence.id,
              }
            }),
          )
        })
      } else if (frameworkData.value === 'aamcFuturePhysicians') {
        frameworkData.concepts.forEach(concept => {
          frameworkData.categories.push(
            ...concept.categories.map(category => ({
              ...category,
              concept: concept.id,
            })),
          )
        })
      }

      return frameworkData
    })

    return {
      topics: metadata.topics,
      frameworks,
      introToBioMeta,
      questionTypes: metadata.questionTypes,
      blooms: metadata.blooms,
      profileOptions: getProfileOptions(),
    }
  } catch (error) {
    throw new Error(error)
  }
}

const disableCourseMetadata = async (id, type) => {
  try {
    logger.info('Course metadata controller: disableCourseMetadata')
    await CourseMetadata.disableMetadata(id, type)
    return true
  } catch (error) {
    throw new Error(error)
  }
}

const enableCourseMetadata = async (id, type) => {
  try {
    logger.info('Course metadata controller: enableCourseMetadata')
    await CourseMetadata.enableMetadata(id, type)
    return true
  } catch (error) {
    throw new Error(error)
  }
}

const editCourseMetadata = async (
  id,
  type,
  label,
  explanatoryItems,
  explanation,
) => {
  try {
    logger.info('Course metadata controller: editCourseMetadata')
    await CourseMetadata.updateMetadata(
      id,
      type,
      label,
      explanatoryItems,
      explanation,
    )
    return true
  } catch (error) {
    throw new Error(error)
  }
}

const addCourseMetadata = async input => {
  try {
    logger.info('Course metadata controller: addCourseMetadata')
    await CourseMetadata.createMetadata(input)
    return true
  } catch (error) {
    throw new Error(error)
  }
}

const reorderCourseMetadata = async input => {
  try {
    logger.info('Course metadata controller: reorderCourseMetadata')
    await CourseMetadata.reorderMetadata(input)
    return true
  } catch (error) {
    throw new Error(error)
  }
}

const getProfileOptions = () => {
  return {
    courses: [
      {
        label: 'Biology',
        value: 'biology',
      },
      {
        label: 'Biochemistry',
        value: 'biochemistry',
      },
      {
        label: 'Molecular Biology',
        value: 'molecularBiology',
      },
      {
        label: 'Genetics',
        value: 'genetics',
      },
      {
        label: 'Cell Biology',
        value: 'cellBiology',
      },
      {
        label: 'Microbiology',
        value: 'microbiology',
      },
      {
        label: 'Anatomy & Physiology',
        value: 'anatomyPhysiology',
      },
      {
        label: 'Evolutionary Biology',
        value: 'evolutionaryBiology',
      },
      {
        label: 'Ecology',
        value: 'ecology',
      },
      {
        label: 'Environmental Science',
        value: 'environmentalScience',
      },
      {
        label: 'Earth Science',
        value: 'earthScience',
      },
      {
        label: 'Other',
        value: 'other',
      },
    ],
    topics: [
      {
        label: 'Biochemistry & Molecular Biology',
        value: 'biochemistryMolecularBiology',
      },
      {
        label: 'Genetics',
        value: 'genetics',
      },
      {
        label: 'Cell biology',
        value: 'cellBiology',
      },
      {
        label: 'Diversity of life',
        value: 'diversityOfLife',
      },
      {
        label: 'Anatomy & Physiology',
        value: 'anatomyPhysiology',
      },
      {
        label: 'Evolution',
        value: 'evolution',
      },
      {
        label: 'Ecology',
        value: 'ecology',
      },
      {
        label: 'Environmental science',
        value: 'environmentalScience',
      },
      {
        label: 'Earth science',
        value: 'earthScience',
      },
      {
        label: 'Science practices',
        value: 'sciencePractices',
      },
    ],
  }
}

module.exports = {
  getMetadata,
  disableCourseMetadata,
  enableCourseMetadata,
  editCourseMetadata,
  addCourseMetadata,
  reorderCourseMetadata,
  getProfileOptions,
  getMetadataOptimized,
}
