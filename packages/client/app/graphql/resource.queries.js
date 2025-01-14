import { gql } from '@apollo/client'

const GET_RESOURCES = gql`
  query Resource($filters: ResourceFilters, $options: PaginationInput) {
    getResources(filters: $filters, options: $options) {
      result {
        label
        value: id
        url
        topics
        subtopics
      }
      totalCount
    }
  }
`

const UPDATE_RESOURCE = gql`
  mutation UpdateResource($input: ResourceInput) {
    updateResource(input: $input) {
      id
    }
  }
`

const ADD_RESOURCE = gql`
  mutation addResource($input: ResourceInput) {
    addResource(input: $input) {
      id
    }
  }
`

const DELETE_RESOURCE = gql`
  mutation DeleteResource($id: ID) {
    deleteResource(id: $id)
  }
`

export { GET_RESOURCES, UPDATE_RESOURCE, DELETE_RESOURCE, ADD_RESOURCE }
