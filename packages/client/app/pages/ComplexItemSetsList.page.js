import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { serverUrl, useCurrentUser } from '@coko/client'
import { ComplexItemSetList } from 'ui'
import {
  GET_COMPLEX_ITEM_SETS,
  EXPORT_SETS,
  EXPORT_SETS_QTI,
  DELETE_SETS,
} from '../graphql'
import { extractDocumentText, hasGlobalRole } from '../utilities'

const transform = data => {
  if (!data) return []
  const { result } = data

  return result.map(set => {
    const leadingContent = extractDocumentText(set.leadingContent)

    const authors = set.authors
      ?.map(a =>
        a.displayName !== '[DELETED]'
          ? a.displayName
          : set.deletedAuthor || a.displayName,
      )
      .join(', ')

    const metadata = [
      {
        label: 'author',
        value: authors,
      },
      {
        label: 'created at',
        value: set.created,
        type: 'date',
      },
      {
        label: 'last update',
        value: set.updated,
        type: 'date',
      },
    ]

    return {
      ...set,
      leadingContent,
      metadata,
      href: `/set/${set.id}`,
    }
  })
}

const PAGE_SIZE = 20

const sortOptions = [
  {
    label: 'Date (descending)',
    value: 'date-desc',
    isDefault: true,
  },
  {
    label: 'Date (ascending)',
    value: 'date-asc',
    isDefault: false,
  },
]

const ComplexItemSetsListPage = () => {
  const { currentUser } = useCurrentUser()
  const isAdmin = hasGlobalRole(currentUser, 'admin')

  const [searchParams, setSearchParams] = useState({
    searchQuery: '',
    page: 1,
    ascending: false,
  })

  const { data: { complexItemSets } = {}, loading: loadingSets } = useQuery(
    GET_COMPLEX_ITEM_SETS,
    {
      variables: {
        params: { searchQuery: searchParams.searchQuery },
        options: {
          page: searchParams.page - 1,
          pageSize: PAGE_SIZE,
          ascending: searchParams.ascending,
          orderBy: 'created',
        },
      },
      fetchPolicy: 'network-only',
    },
  )

  const [exportSetsMutation] = useMutation(EXPORT_SETS)
  const [exportSetsQTIMutation] = useMutation(EXPORT_SETS_QTI)

  const [deleteSetsMutation] = useMutation(DELETE_SETS, {
    refetchQueries: [GET_COMPLEX_ITEM_SETS],
  })

  const handleSearchParamsChange = params => {
    setSearchParams({ ...searchParams, ...params })
  }

  const handleSortOptionChange = sortBy => {
    sortOptions.filter(opt => opt.isDefault)[0].isDefault = false
    sortOptions.filter(opt => opt.value === sortBy)[0].isDefault = true

    setSearchParams({ ...searchParams, ascending: sortBy === 'date-asc' })
  }

  const handleWordExport = async (setIds, showFeedback, showMetadata) => {
    const mutationData = {
      variables: {
        setIds,
        options: {
          showFeedback,
          showMetadata,
        },
      },
    }

    return exportSetsMutation(mutationData)
      .then(res => {
        const filename = res.data.exportSets
        const url = `${serverUrl}/api/download/${filename}`
        window.location.assign(url)
      })
      .catch(e => {
        console.error(e)
        return new Promise((_resolve, reject) => {
          reject(e.message)
        })
      })
  }

  const handleQTIExport = async setIds => {
    const mutationData = {
      variables: {
        setIds,
      },
    }

    return exportSetsQTIMutation(mutationData)
      .then(res => {
        const filename = res.data.exportSetsQTI
        const url = `${serverUrl}/api/download/${filename}`
        window.location.assign(url)
      })
      .catch(e => {
        console.error(e)
        return new Promise((_resolve, reject) => {
          reject(e.message)
        })
      })
  }

  const handleDeleteSets = async setIds => {
    const mutationData = {
      variables: {
        ids: setIds,
      },
    }

    return deleteSetsMutation(mutationData)
  }

  return (
    <ComplexItemSetList
      canDeleteSets={isAdmin}
      data={transform(complexItemSets)}
      loading={loadingSets}
      onDeleteSets={handleDeleteSets}
      onQTIExport={handleQTIExport}
      onSearch={handleSearchParamsChange}
      onSortOptionChange={handleSortOptionChange}
      onWordExport={handleWordExport}
      pageSize={PAGE_SIZE}
      sortOptions={sortOptions}
      total={complexItemSets?.totalCount}
    />
  )
}

export default ComplexItemSetsListPage
