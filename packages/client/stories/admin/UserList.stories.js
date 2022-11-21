/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */

import React, { useState } from 'react'
import { datatype, internet, name } from 'faker'
import { UserList, Modal } from 'ui'
import styled from 'styled-components'
import { createData, randomArray } from '../_helpers'

const { confirm } = Modal

const PAGE_SIZE = 10
const TOTAL = 100

const makeData = n =>
  createData(n, i => {
    return {
      id: datatype.uuid(),
      displayName: name.findName(),
      email: internet.email(),
      expertise: randomArray(
        [
          'biology',
          'biochemistryMolecularBiology',
          'genetics',
          'cellBiology',
          'microbiology',
          'anatomyPhysiology',
          'evolutionaryBiology',
          'ecology',
          'environmentalScience',
          'earthScience',
        ],
        4,
      ),
      signUpDate: 'May 16, 2021',
      isReviewer: datatype.boolean(),
    }
  })

// icon: <ExclamationCircleOutlined />,
const showPromiseConfirm = action => {
  confirm({
    title:
      action === 'delete'
        ? 'Delete Users'
        : action === 'activate'
        ? 'Activate Users'
        : 'Deactivate Users',
    content:
      action === 'delete'
        ? 'Do you want to delete the selected users?'
        : action === 'activate'
        ? 'Do you want to activate the selected users?'
        : 'Do you want to deactivate the selected users?',

    okText:
      action === 'delete'
        ? 'Delete'
        : action === 'activate'
        ? 'Activate'
        : 'Deactivate',
    okType: 'danger',
    onOk() {
      return new Promise((resolve, _reject) => {
        setTimeout(resolve, 1000)
      }).catch(() => console.log('Oops errors!'))
    },

    onCancel() {},
  })
}

const Wrapper = styled.div`
  height: 400px;
`

export const Base = args => {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState(makeData(PAGE_SIZE))
  const [loading, setLoading] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const [showDeactivated, setShowDeactivated] = useState(false)

  const [selectedRows, setSelectedRows] = useState([])

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

  const handleDeactivate = () => {
    console.log('deactivate users: ')
    console.log(selectedRows)
    showPromiseConfirm('deactivate')
  }

  const handleDelete = () => {
    console.log('delete users: ')
    console.log(selectedRows)
    showPromiseConfirm('delete')
  }

  const handleActivate = () => {
    console.log('activate users: ')
    console.log(selectedRows)
    showPromiseConfirm('activate')
  }

  const handleShowDeactivatedUsersChange = () => {
    setShowDeactivated(!showDeactivated)
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setData(makeData(PAGE_SIZE))
    }, 1000)
  }

  return (
    <UserList
      {...args}
      currentPage={currentPage}
      data={data}
      loading={loading}
      onBulkActivate={handleActivate}
      onBulkDeactivate={handleDeactivate}
      onBulkDelete={handleDelete}
      onClickShowDeactivated={handleShowDeactivatedUsersChange}
      onPageChange={handlePageChange}
      onSearch={handleSearch}
      searchLoading={searchLoading}
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
      showDeactivated={showDeactivated}
      totalUserCount={TOTAL}
    />
  )
}

export const EmptyList = args => (
  <Wrapper>
    <UserList
      currentPage={1}
      data={[]}
      loading={false}
      onBulkActivate={() => {}}
      onBulkDeactivate={() => {}}
      onBulkDelete={() => {}}
      onClickShowDeactivated={() => {}}
      onPageChange={() => {}}
      onSearch={() => {}}
      searchLoading={false}
      selectedRows={[]}
      setSelectedRows={() => {}}
      totalUserCount={0}
      {...args}
    />
  </Wrapper>
)

EmptyList.args = {
  locale: {
    emptyText: 'Empty list: No Users Found (customizable text)',
  },
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
