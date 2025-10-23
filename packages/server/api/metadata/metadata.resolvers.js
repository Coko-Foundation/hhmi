const {
  getMetadata,
  disableCourseMetadata,
  enableCourseMetadata,
  editCourseMetadata,
  addCourseMetadata,
  reorderCourseMetadata,
  getMetadataOptimized,
} = require('../../controllers/courseMetadata.controller')

const { metadataResolver } = require('../../controllers/question.controllers')

const getMetadataResolver = async () => {
  return getMetadata()
}

const getMetadataOptimizedResolver = async () => {
  return getMetadataOptimized()
}

const disableCourseMetadataResolver = async (_, { id, type }) => {
  return disableCourseMetadata(id, type)
}

const enableCourseMetadataResolver = async (_, { id, type }) => {
  return enableCourseMetadata(id, type)
}

const editCourseMetadataResolver = async (
  _,
  { id, type, label, explanatoryItems, explanation },
) => {
  return editCourseMetadata(id, type, label, explanatoryItems, explanation)
}

const addCourseMetadataResolver = async (_, { input }) => {
  return addCourseMetadata(input)
}

const reorderCourseMetadataResolver = async (_, { input }) => {
  return reorderCourseMetadata(input)
}

module.exports = {
  Query: {
    getMetadataOld: metadataResolver,
    getMetadata: getMetadataResolver,
    getMetadataOptimized: getMetadataOptimizedResolver,
  },
  Mutation: {
    disableCourseMetadata: disableCourseMetadataResolver,
    enableCourseMetadata: enableCourseMetadataResolver,
    editCourseMetadata: editCourseMetadataResolver,
    addCourseMetadata: addCourseMetadataResolver,
    reorderCourseMetadata: reorderCourseMetadataResolver,
  },
}
