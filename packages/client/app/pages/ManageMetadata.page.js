import React, { useState } from 'react'

import { useQuery, useMutation } from '@apollo/client'
import { MetadataManager } from 'ui'
import {
  GET_RESOURCES,
  UPDATE_RESOURCE,
  DELETE_RESOURCE,
  ADD_RESOURCE,
  DISABLE_METADATA,
  ENABLE_METADATA,
  EDIT_METADATA,
  CREATE_METADATA,
  SORT_METADATA,
} from '../graphql'
import { useMetadata } from '../utilities'

const resourcesApiToUi = resources => {
  if (!resources) return []

  return resources.map(resource => {
    return {
      key: resource.value,
      label: resource.label,
      url: resource.url,
      topics: resource.topics,
      subtopics: resource.subtopics,
    }
  })
}

const PAGE_SIZE = 10

const ManageMetadataPage = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [search, setSearch] = useState('')

  const { metadata, resetMetadata } = useMetadata()

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

  const [disableCourseMetadata] = useMutation(DISABLE_METADATA, {
    onCompleted() {
      resetMetadata()
    },
  })

  const [enableCourseMetadata] = useMutation(ENABLE_METADATA, {
    onCompleted() {
      resetMetadata()
    },
  })

  const [editCourseMetadata] = useMutation(EDIT_METADATA, {
    onCompleted: () => {
      resetMetadata()
    },
  })

  const [createCourseMetadata] = useMutation(CREATE_METADATA, {
    onCompleted: () => {
      resetMetadata()
    },
  })

  const [sortMetadata] = useMutation(SORT_METADATA)

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

  const handleMetadataAdd = values => {
    const { new: newKey, ...rest } = values

    const mutationData = {
      variables: {
        input: { ...rest, key: newKey },
      },
    }

    return createCourseMetadata(mutationData)
  }

  const handleMetadataDisable = (id, type) => {
    const mutationData = {
      variables: {
        id,
        type,
      },
    }

    return disableCourseMetadata(mutationData)
  }

  const handleMetadataEnable = (id, type) => {
    const mutationData = {
      variables: {
        id,
        type,
      },
    }

    return enableCourseMetadata(mutationData)
  }

  const handleMetadataUpdate = ({
    id,
    type,
    label,
    explanatoryItems,
    explanation,
  }) => {
    const mutationData = {
      variables: {
        id,
        type,
        label,
        explanatoryItems,
        explanation,
      },
    }

    return editCourseMetadata(mutationData)
  }

  const handleDataReordered = data => {
    const { type } = data[0]

    const mutationData = {
      variables: {
        input: {
          type,
          order: data.map(({ key }, index) => ({ id: key, index })),
        },
      },
    }

    return sortMetadata(mutationData)
  }

  return (
    <MetadataManager
      courses={metadata?.frameworks}
      currentPage={currentPage + 1}
      dataSource={resourcesApiToUi(result)}
      introToBioMeta={metadata?.introToBioMeta}
      onDataReordered={handleDataReordered}
      onMetadataAdd={handleMetadataAdd}
      onMetadataDisable={handleMetadataDisable}
      onMetadataEnable={handleMetadataEnable}
      onMetadataUpdate={handleMetadataUpdate}
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

export default ManageMetadataPage
