const {
  BaseModel,
  modelJsonSchemaTypes: { arrayOfStrings, stringNotEmpty },
} = require('@coko/server')

const { applyListQueryOptions } = require('../helpers')

class Resource extends BaseModel {
  static get tableName() {
    return 'resources'
  }

  constructor(properties) {
    super(properties)
    this.type = 'resource'
  }

  static get schema() {
    return {
      properties: {
        label: stringNotEmpty,
        value: stringNotEmpty,
        url: stringNotEmpty,
        topics: arrayOfStrings,
        subtopics: arrayOfStrings,
      },
    }
  }

  static async filterResources(filters = {}, options = {}) {
    try {
      const { search } = filters
      const query = Resource.query(options.trx)

      if (search) {
        query.where('label', 'ilike', `%${search}%`)
      }

      return applyListQueryOptions(query, {
        ...options,
        orderBy: 'label',
        ascending: true,
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  static async updateResource(input) {
    const { id, label, url, topics, subtopics } = input

    try {
      const udpatedResource = await Resource.patchAndFetchById(id, {
        label,
        url,
        topics,
        subtopics,
      })

      return udpatedResource
    } catch (error) {
      throw new Error(error)
    }
  }

  static async addResource(input) {
    const { label, url, topics, subtopics } = input

    try {
      const value = `${label.replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) =>
        chr.toUpperCase(),
      )}${Math.round((Math.random() + 0.1) * 10000)}`

      const newResource = await Resource.insert({
        label,
        value,
        url,
        topics,
        subtopics,
      })

      return newResource
    } catch (error) {
      throw new Error(error)
    }
  }

  static async deleteResource(id) {
    try {
      const res = await Resource.deleteById(id)

      return res > 0
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = Resource
