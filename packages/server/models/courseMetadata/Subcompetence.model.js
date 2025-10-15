const {
  BaseModel,
  modelTypes: { stringNotEmpty },
} = require('@coko/server')

const SubcompetenceStatement = require('./SubcompetenceStatement.model')

class Subcompetence extends BaseModel {
  static get tableName() {
    return 'subcompetence'
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
      subcompetenceStatements: {
        relation: BaseModel.HasManyRelation,
        modelClass: SubcompetenceStatement,
        join: {
          from: 'subcompetence.id',
          to: 'subcompetence_statement.subcompetenceId',
        },
        modify: query => {
          query.orderBy('subcompetence_statement.order', 'asc')
        },
      },
    }
  }
}

module.exports = Subcompetence
