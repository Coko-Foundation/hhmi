/* eslint-disable no-console */

import React, { useState } from 'react'
import styled from 'styled-components'
import { lorem, image } from 'faker'
import { range } from 'lodash'

import { List, Button } from 'ui'
import { Avatar } from 'antd'
import { createData } from '../_helpers'

const Item = styled.div`
  background: ${props => props.theme.colorSecondary};
  margin-bottom: 8px;
  padding: 8px;
`

// returns the position of the item in a paginated list (as a String)
// eg. third item on page 2 will be 13
const getItemListNumber = (i, currentPage) =>
  String(i + 1 + (currentPage - 1) * 10)

const makeData = n =>
  range(n).map(i => ({
    id: String(i + 1),
    value: lorem.sentence(),
  }))

const data = makeData(33)

const Wrapper = styled.div`
  /* height: 700px; */
`

export const Base = args => (
  <Wrapper>
    <List
      dataSource={data}
      pagination={{
        pageSize: 10,
      }}
      renderItem={item => <Item>{item.value}</Item>}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...args}
    />
  </Wrapper>
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
          {getItemListNumber(i, currentPage)}
          {'. '}
          {item.value}
        </Item>
      )}
    />
  )
}

export const SelectableRows = () => {
  const PAGE_SIZE = 10
  const TOTAL = 20
  const INITIAL_PAGE = 1

  const allData = React.useMemo(() =>
    createData(TOTAL, i => ({
      id: String(i + 1),
      value: lorem.sentences(2),
    })),
  )

  const [dataSource, setDataSource] = useState(allData.slice(0, 10))
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE)
  const [loading, setLoading] = useState(false)

  const handlePageChange = (pageNumber, pageSize) => {
    setLoading(true)

    setTimeout(() => {
      const sliceFrom = (pageNumber - 1) * 10
      const sliceTo = sliceFrom + PAGE_SIZE
      const newData = allData.slice(sliceFrom, sliceTo)

      setLoading(false)
      setDataSource(newData)
      setCurrentPage(pageNumber)
    }, 1000)
  }

  const handleSelectionChange = selectedIds => {
    console.log('handled', selectedIds)
  }

  const BulkAction = (
    // eslint-disable-next-line no-console
    <Button onClick={() => console.log('bulk action')} type="primary">
      Assign handling editor
    </Button>
  )

  return (
    <List
      dataSource={dataSource}
      footerContent={BulkAction}
      itemSelection={{
        onChange: handleSelectionChange,
      }}
      loading={loading}
      pagination={{
        current: currentPage,
        onChange: handlePageChange,
        pageSize: PAGE_SIZE,
        total: TOTAL,
        showSizeChanger: false,
      }}
      renderItem={item => (
        <Item>
          {item.id}: {item.value}
        </Item>
      )}
    />
  )
}

export const DefaultAntItem = () => {
  const N = 7

  const dataSource = createData(N, i => ({
    avatar: image.avatar(),
    description: lorem.sentences(4),
    title: lorem.words(6),
  }))

  return (
    <List
      dataSource={dataSource}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            description={item.description}
            title={item.title}
          />
        </List.Item>
      )}
    />
  )
}

export const EmptyList = () => <List dataSource={[]} />

export default {
  component: List,
  title: 'Common/List',
}
