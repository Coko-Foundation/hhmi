const { logger } = require('@coko/server')
const { CourseMetadata } = require('../models')
const metadata = require('./metadataValues')

const getMetadata = async () => {
  try {
    logger.info('Course metadata controller: getMetadata')
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
}
