import React, { useState } from 'react'
import styled from 'styled-components'
import { lorem } from 'faker'
import { range } from 'lodash'

import { List } from 'ui'

const Item = styled.div`
  background: ${props => props.theme.colorSecondary};
  margin: 8px 0;
  padding: 8px;
`

const makeData = n =>
  range(n).map(i => ({
    value: lorem.sentence(),
  }))

const data = makeData(38)

export const Base = args => (
  <List
    dataSource={data}
    pagination={{
      pageSize: 10,
    }}
    renderItem={item => <Item>{item.value}</Item>}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...args}
  />
)

Base.args = {
  loading: false,
  onSearch: null,
  onSortOptionChange: null,
  searchLoading: false,
  searchPlaceholder: null,
  showSearch: false,
  showSort: false,
  showTotalCount: false,
  sortOptions: [],
  totalCount: null,
}

export const Loading = () => (
  <List
    dataSource={makeData(5)}
    loading
    renderItem={item => <Item>{item.value}</Item>}
  />
)

export const Search = () => {
  const N = 27

  const [dataSource, setDataSource] = useState(makeData(N))
  const [searchLoading, setSearchLoading] = useState(false)

  const handleSearch = () => {
    setSearchLoading(true)
    setTimeout(() => {
      setSearchLoading(false)
      setDataSource(makeData(N))
    }, 2000)
  }

  return (
    <List
      dataSource={dataSource}
      loading={searchLoading}
      onSearch={handleSearch}
      pagination={{
        pageSize: 10,
      }}
      renderItem={item => <Item>{item.value}</Item>}
      searchLoading={searchLoading}
      searchPlaceholder={lorem.words(5)}
      showSearch
    />
  )
}

export const TotalCount = () => {
  const N = 97

  return (
    <List
      dataSource={makeData(N)}
      pagination={{
        pageSize: 10,
        showSizeChanger: false,
      }}
      renderItem={item => <Item>{item.value}</Item>}
      showTotalCount
      totalCount={N}
    />
  )
}

export const Sort = () => {
  const N = 27

  const [dataSource, setDataSource] = useState(makeData(N))
  const [loading, setLoading] = useState(false)

  const sortOptions = [
    {
      label: 'One way',
      value: 'oneWay',
      isDefault: true,
    },
    {
      label: 'Or another',
      value: 'orAnother',
    },
  ]

  const handleSortOptionChange = newValue => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setDataSource(makeData(N))
    }, 1000)
  }

  return (
    <List
      dataSource={dataSource}
      loading={loading}
      onSortOptionChange={handleSortOptionChange}
      pagination={{
        pageSize: 10,
      }}
      renderItem={item => <Item>{item.value}</Item>}
      showSort
      sortOptions={sortOptions}
    />
  )
}

export const AsyncPagination = () => {
  const PAGE_SIZE = 10
  const TOTAL = 62
  const INITIAL_PAGE = 1

  const [dataSource, setDataSource] = useState(makeData(PAGE_SIZE))
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE)
  const [loading, setLoading] = useState(false)

  const handlePageChange = (pageNumber, pageSize) => {
    setLoading(true)

    setTimeout(() => {
      const isLastPage = TOTAL - PAGE_SIZE * pageNumber <= 0

      const howMany = isLastPage
        ? TOTAL - PAGE_SIZE * (pageNumber - 1)
        : PAGE_SIZE

      setLoading(false)
      setDataSource(makeData(howMany))
      setCurrentPage(pageNumber)
    }, 1000)
  }

  return (
    <List
      dataSource={dataSource}
      loading={loading}
      pagination={{
        current: currentPage,
        onChange: handlePageChange,
        pageSize: PAGE_SIZE,
        total: TOTAL,
        showSizeChanger: false,
      }}
      renderItem={(item, i) => (
        <Item>
          {i + 1 + (currentPage - 1) * 10}
          {'. '}
          {item.value}
        </Item>
      )}
    />
  )
}

export default {
  component: List,
  title: 'Common/List',
}
