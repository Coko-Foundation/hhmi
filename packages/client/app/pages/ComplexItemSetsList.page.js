import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ComplexItemSetList } from 'ui'
import { GET_COMPLEX_ITEM_SETS } from '../graphql'
import { extractDocumentText } from '../utilities'

const transform = data => {
  if (!data) return []
  const { result } = data

  return result.map(set => {
    const leadingContent = extractDocumentText(set.leadingContent)

    const metadata = [
      {
        label: 'author',
        value: set.author?.displayName,
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

const PAGE_SIZE = 10

const ComplexItemSetsListPage = () => {
  const [searchParams, setSearchParams] = useState({
    searchQuery: '',
    page: 1,
  })

  const { data: { complexItemSets } = {}, loading: loadingSets } = useQuery(
    GET_COMPLEX_ITEM_SETS,
    {
      variables: {
        params: { searchQuery: searchParams.searchQuery },
        options: {
          page: searchParams.page - 1,
          pageSize: PAGE_SIZE,
        },
      },
      fetchPolicy: 'network-only',
    },
  )

  return (
    <ComplexItemSetList
      data={transform(complexItemSets)}
      loading={loadingSets}
      onSearch={setSearchParams}
      pageSize={PAGE_SIZE}
      total={complexItemSets?.totalCount}
    />
  )
}

export default ComplexItemSetsListPage
