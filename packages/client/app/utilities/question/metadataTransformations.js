// import metadata from "./metadataValues"
import {
  flatAPCoursesMetadata,
  flatIBCourseMetadata,
  flatIntroBioCourseMetadata,
  flatVisionAndChangeMetadata,
  flatAAMCMetadata,
} from '../index'

const apCourses = ['apBiology', 'apEnvironmentalScience']
const ibCourses = ['biBiology', 'biEnvironmentalScience']
const introBioCourses = ['introBioForNonMajors', 'introBioForMajors']

const metadataTransformer = metadata => {
  const frameworks = metadata.frameworks
    // temporarily filter out Intro to Biology for non majors course
    .filter(framework => framework.value !== 'introBioForNonMajors')
    .map(framework => {
      const frameworkData = {
        label: framework.label,
        value: framework.value,
      }

      let additionalMetadata

      if (apCourses.includes(framework.value)) {
        additionalMetadata = flatAPCoursesMetadata(framework)
      }

      if (ibCourses.includes(framework.value)) {
        additionalMetadata = flatIBCourseMetadata(framework)
      }

      if (introBioCourses.includes(framework.value)) {
        additionalMetadata = flatIntroBioCourseMetadata(framework)
      }

      return {
        ...frameworkData,
        ...additionalMetadata,
      }
    })

  const introToBioMeta = metadata.introToBioMeta.map(meta => {
    const frameworkData = {
      label: meta.label,
      value: meta.value,
    }

    let additionalMetadata

    switch (meta.value) {
      case 'visionAndChange':
        additionalMetadata = flatVisionAndChangeMetadata(meta)
        break
      case 'aamcFuturePhysicians':
        additionalMetadata = flatAAMCMetadata(meta)
        break
      default:
        break
    }

    return {
      ...frameworkData,
      ...additionalMetadata,
    }
  })

  return {
    topics: metadata.topics,
    frameworks,
    introToBioMeta,
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
