/* eslint-disable import/no-extraneous-dependencies */
const {
  ApolloServer,
  // ForbiddenError,
  // UserInputError,
  // AuthenticationError,
  // ApolloError,
} = require('apollo-server-express')

const isEmpty = require('lodash/isEmpty')
const config = require('config')

const helpers = require('@coko/server/src/authorization')
const loaders = require('@coko/server/src/graphql/loaders')
const connectors = require('@coko/server/src/connectors')
const schema = require('@coko/server/src/graphqlSchema')

const { applyMiddleware } = require('graphql-middleware')
const { shield } = require('graphql-shield')

const extraApolloConfig = config.has('pubsweet-server.apollo')
  ? config.get('pubsweet-server.apollo')
  : {}

const createGraphQLServer = testUserContext => {
  if (process.env.NODE_ENV !== 'test' && testUserContext) {
    throw new Error(
      'Do not pass a test user context unless you are running a test suite',
    )
  }

  const createdLoaders = loaders()

  const middleware = []
  const permissions = config.has('permissions') && config.get('permissions')

  if (!isEmpty(permissions)) {
    const authorizationMiddleware = shield(permissions, { debug: true })
    middleware.push(authorizationMiddleware)
  }

  const schemaWithMiddleWare = applyMiddleware(schema, ...middleware)

  return new ApolloServer({
    schema: schemaWithMiddleWare,
    context: () => ({
      helpers,
      connectors,
      user: testUserContext,
      loaders: createdLoaders,
    }),
    ...extraApolloConfig,
  })
}

module.exports = createGraphQLServer
