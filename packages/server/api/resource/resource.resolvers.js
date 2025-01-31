const {
  getResources,
  updateResource,
  deleteResource,
  addResource,
} = require('../../controllers/resources.controllers')

const getResourcesResolver = async (_, { filters, options }) => {
  return getResources(filters, options)
}

const updateResourceResolver = async (_, { input }) => {
  return updateResource(input)
}

const addResourceResolver = async (_, { input }) => {
  return addResource(input)
}

const deleteResourceResolver = async (_, { id }) => {
  return deleteResource(id)
}

module.exports = {
  Query: {
    getResources: getResourcesResolver,
  },
  Mutation: {
    updateResource: updateResourceResolver,
    deleteResource: deleteResourceResolver,
    addResource: addResourceResolver,
  },
}
