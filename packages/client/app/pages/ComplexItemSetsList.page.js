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

  const handleSortOptionChange = sortBy => {
    sortOptions.filter(opt => opt.isDefault)[0].isDefault = false
    sortOptions.filter(opt => opt.value === sortBy)[0].isDefault = true

    setSearchParams({ ...searchParams, ascending: sortBy === 'date-asc' })
  }

  return (
    <ComplexItemSetList
      data={transform(complexItemSets)}
      loading={loadingSets}
      onSearch={setSearchParams}
      onSortOptionChange={handleSortOptionChange}
      pageSize={PAGE_SIZE}
      sortOptions={sortOptions}
      total={complexItemSets?.totalCount}
    />
  )
}

export default ComplexItemSetsListPage
