// import metadata from "./metadataValues"
import {
  flatAPCoursesMetadata,
  flatIBCourseMetadata,
} from '../../../app/utilities'

const metadataTransformer = metadata => {
  const frameworks = metadata.frameworks
    .map(framework => {
      const frameworkData = {
        label: framework.label,
        value: framework.value,
      }

      let additionalMetadata

      if (
        framework.value === 'apBiology' ||
        framework.value === 'apEnvironmentalScience'
      ) {
        additionalMetadata = flatAPCoursesMetadata(framework)
      }

      if (
        framework.value === 'biBiology' ||
        framework.value === 'biEnvironmentalScience'
      ) {
        additionalMetadata = flatIBCourseMetadata(framework)
      }

      return {
        ...frameworkData,
        ...additionalMetadata,
      }
    })
    // temporarily filter out Intro to Biology courses
    .filter(
      framework =>
        framework.value !== 'introductoryBiologyForNonMajors' &&
        framework.value !== 'introductoryBiologyForMajors',
    )

  return {
    topics: metadata.topics,
    frameworks,
    questionTypes: metadata.questionTypes,
    blooms: metadata.blooms,
  }
}

const metadataApiToUi = values => {
  const courseData = [...values.courses]

  const transformedCoursesData = []

  courseData.forEach(({ course, units }) => {
    if (units.length > 1) {
      units.forEach(unit => {
        transformedCoursesData.push({
          course,
          ...unit,
        })
      })
    } else {
      transformedCoursesData.push({
        course,
        ...units[0],
      })
    }
  })

  return {
    ...values,
    courses: transformedCoursesData,
  }
}

export { metadataTransformer, metadataApiToUi }
