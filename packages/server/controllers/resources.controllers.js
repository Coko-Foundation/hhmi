const { logger } = require('@coko/server')
const { Resource } = require('../models')

const getResources = async (filters, options) => {
  try {
    logger.info('Resources controller: getResources')

    return Resource.filterResources(filters, options)
  } catch (error) {
    throw new Error(error)
  }
}

const updateResource = async input => {
  try {
    logger.info('Resources controller: updateResource')

    return Resource.updateResource(input)
  } catch (error) {
    throw new Error(error)
  }
}

const addResource = async input => {
  try {
    logger.info('Resources controller: addResource')

    return Resource.addResource(input)
  } catch (error) {
    throw new Error(error)
  }
}

const deleteResource = async id => {
  try {
    logger.info('Resources controller: deleteResource')

    return Resource.deleteResource(id)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  getResources,
  updateResource,
  deleteResource,
  addResource,
}
