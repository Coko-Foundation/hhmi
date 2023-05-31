import React, { useState } from 'react'
import { uniqueId } from 'lodash'
import { lorem, date } from 'faker'
import MyLists from '../../app/ui/myList/MyLists'
import { createData } from '../../app/utilities/_helpers'
import { Empty } from '../../app/ui/common'

const TOTAL = 20
const PAGE_SIZE = 5

// eslint-disable-next-line no-promise-executor-return
const mockDelay = time => new Promise(resolve => setTimeout(resolve, time))

export const Base = () => {
  const makeData = n =>
    createData(n, () => ({
      key: uniqueId(),
      name: lorem.word(6),
      createdAt: date.future(10).toLocaleDateString('en-US'),
    }))

  const [data, setData] = useState(makeData(PAGE_SIZE))
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const handleDelete = async selectedRows => {
    setLoading(true)
    await mockDelay(500)
    setData(currentData =>
      currentData.filter(d => !selectedRows.includes(d.key)),
    )
    setLoading(false)
  }

  const handleExport = () => {}

  const handleCreateList = async listName => {
    setLoading(true)
    setData(curentData => [
      ...curentData,
      {
        key: uniqueId(),
        name: listName,
        createdAt: new Date().toLocaleDateString('en-US'),
      },
    ])

    setLoading(false)
  }

  const handlePageChange = async pageNumber => {
    setLoading(true)
    await mockDelay(500)
    setCurrentPage(pageNumber)
    setData(makeData(PAGE_SIZE))
    setLoading(false)
  }

  const handleSearch = async query => {
    setLoading(true)
    setCurrentPage(1)
    await mockDelay(1000)
    // eslint-disable-next-line no-console
    console.log('Search query', query)
    setLoading(false)
  }

  const handleSort = (orderBy, ascending) => {
    // eslint-disable-next-line no-console
    console.log(`Order by: ${orderBy}, ascending: ${ascending}`)
  }

  return (
    <MyLists
      currentPage={currentPage}
      data={data}
      loading={loading}
      onCreateNewList={handleCreateList}
      onDeleteRows={handleDelete}
      onExport={handleExport}
      onPageChange={handlePageChange}
      onSearch={handleSearch}
      onSort={handleSort}
      totalListCount={TOTAL}
    />
  )
}

export const CustomLocale = () => {
  const locale = {
    emptyText: <Empty description="custom locale text" role="status" />,
  }

  const emptyFunc = () => {}

  return (
    <MyLists
      currentPage={1}
      data={[]}
      loading={false}
      locale={locale}
      onCreateNewList={emptyFunc}
      onDeleteRows={emptyFunc}
      onExport={emptyFunc}
      onPageChange={emptyFunc}
      onSearch={emptyFunc}
      onSort={emptyFunc}
    />
  )
}

export default {
  component: MyLists,
  title: 'myList/MyLists',
}
