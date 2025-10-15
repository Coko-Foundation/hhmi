const {
  BaseModel,
  modelTypes: { stringNotEmpty },
} = require('@coko/server')

const SubdisciplineStatement = require('./SubdisciplineStatement.model')

class Subdiscipline extends BaseModel {
  static get tableName() {
    return 'subdiscipline'
  }

  static get schema() {
    return {
      properties: {
        label: stringNotEmpty,
        value: stringNotEmpty,
      },
    }
  }

  static get relationMappings() {
    return {
      subdisciplineStatements: {
        relation: BaseModel.HasManyRelation,
        modelClass: SubdisciplineStatement,
        join: {
          from: 'subdiscipline.id',
          to: 'subdiscipline_statement.subdisciplineId',
        },
        modify: query => {
          query.orderBy('subdiscipline_statement.order', 'asc')
        },
      },
    }
  }
}

module.exports = Subdiscipline
