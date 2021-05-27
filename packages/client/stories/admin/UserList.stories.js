/* eslint-disable no-console */

import React, { useState } from 'react'
import { datatype, internet, name } from 'faker'

import { UserList } from 'ui'
import { createData, randomArray } from '../_helpers'

const PAGE_SIZE = 10
const TOTAL = 100

const makeData = n =>
  createData(n, i => {
    return {
      id: datatype.uuid(),
      displayName: name.findName(),
      email: internet.email(),
      expertise: randomArray(
        ['Biology', 'Marine Biology', 'Molecular Biology', 'Immunology'],
        2,
      ),
      signUpDate: 'May 16, 2021',
      isReviewer: datatype.boolean(),
    }
  })

export const Base = args => {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState(makeData(PAGE_SIZE))
  const [loading, setLoading] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)

  const handlePageChange = pageNumber => {
    console.log('change page', pageNumber)
    setLoading(true)
    setCurrentPage(pageNumber)

    setTimeout(() => {
      setLoading(false)
      setData(makeData(PAGE_SIZE))
    }, 1000)
  }

  const handleSearch = searchValue => {
    console.log('searching for', searchValue)
    setLoading(true)
    setSearchLoading(true)

    setTimeout(() => {
      setLoading(false)
      setSearchLoading(false)
      setCurrentPage(1)
      setData(makeData(PAGE_SIZE))
    }, 1000)
  }

  return (
    <UserList
      {...args}
      currentPage={currentPage}
      data={data}
      loading={loading}
      onPageChange={handlePageChange}
      onSearch={handleSearch}
      searchLoading={searchLoading}
      totalUserCount={TOTAL}
    />
  )
}

export default {
  component: UserList,
  title: 'Admin/UserList',
  parameters: { actions: { argTypesRegex: '^on.*' } },
  // argTypes: {
  //   currentPage: {
  //     control: {
  //       disable: true,
  //     },
  //   },
  // },
}
