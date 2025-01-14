import React, { useState } from 'react'

import { useQuery, useMutation } from '@apollo/client'
import { ResourcesTable } from 'ui'
import {
  GET_RESOURCES,
  UPDATE_RESOURCE,
  DELETE_RESOURCE,
  ADD_RESOURCE,
} from '../graphql'
import { useMetadata } from '../utilities'

const resourcesApiToUi = resources => {
  if (!resources) return []

  return resources.map(resource => {
    return {
      key: resource.id,
      label: resource.label,
      url: resource.url,
      topics: resource.topics,
      subtopics: resource.subtopics,
    }
  })
}

const PAGE_SIZE = 20

const ManageResourcesPage = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [search, setSearch] = useState('')

  const { metadata } = useMetadata()

  const { data: { getResources: { result, totalCount } = {} } = {} } = useQuery(
    GET_RESOURCES,
    {
      variables: {
        filters: {
          search,
        },
        options: {
          page: currentPage,
          pageSize: PAGE_SIZE,
        },
      },
      fetchPolicy: 'network-only',
    },
  )

  const [updateResource] = useMutation(UPDATE_RESOURCE, {
    refetchQueries: [
      {
        query: GET_RESOURCES,
        variables: {
          filters: {
            search,
          },
          options: {
            page: currentPage,
            pageSize: PAGE_SIZE,
          },
        },
      },
    ],
  })

  const [addResource] = useMutation(ADD_RESOURCE, {
    refetchQueries: [
      {
        query: GET_RESOURCES,
        variables: {
          filters: {
            search,
          },
          options: {
            page: currentPage,
            pageSize: PAGE_SIZE,
          },
        },
      },
    ],
  })

  const [deleteResource] = useMutation(DELETE_RESOURCE, {
    refetchQueries: [
      {
        query: GET_RESOURCES,
        variables: {
          filters: {
            search,
          },
          options: {
            page: currentPage,
            pageSize: PAGE_SIZE,
          },
        },
      },
    ],
  })

  const handleResourceUpdate = data => {
    const mutationData = {
      variables: {
        input: data,
      },
    }

    return updateResource(mutationData)
  }

  const handleResourceCreate = data => {
    const mutationData = {
      variables: {
        input: data,
      },
    }

    return addResource(mutationData)
  }

  const handleResourceDelete = id => {
    const mutationData = {
      variables: {
        id,
      },
    }

    return deleteResource(mutationData)
  }

  const handlePageChange = page => {
    setCurrentPage(page - 1)
  }

  const handleSearch = query => {
    setCurrentPage(0)
    setSearch(query)
  }

  return (
    <ResourcesTable
      currentPage={currentPage + 1}
      dataSource={resourcesApiToUi(result)}
      onPageChange={handlePageChange}
      onResourceCreate={handleResourceCreate}
      onResourceDelete={handleResourceDelete}
      onResourceUpdate={handleResourceUpdate}
      onSearch={handleSearch}
      subtopics={metadata?.topics.map(t => t.subtopics).flat()}
      topics={metadata?.topics}
      totalCount={totalCount}
    />
  )
}

export default ManageResourcesPage
