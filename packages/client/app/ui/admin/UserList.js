import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { uuid } from '@coko/client'

import { Button, ButtonGroup, H1, Layout, Tag, Table } from '../common'

const Wrapper = styled.div``

const PageHeader = styled(H1)`
  text-align: center;
`

// name, expertise, reviewer, sign up date
const columns = [
  { title: 'Name', dataIndex: 'displayName', key: 'displayName' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  {
    title: 'Expertise',
    dataIndex: 'expertise',
    key: 'expertise',
    render: arrayOfStrings => (
      <>
        {/* eslint-disable-next-line react/destructuring-assignment */}
        {arrayOfStrings.map(s => (
          <Tag key={uuid()}>{s}</Tag>
        ))}
      </>
    ),
  },
  {
    title: 'Reviewer',
    dataIndex: 'isReviewer',
    key: 'isReviewer',
    render: isReviewer => (isReviewer ? 'Yes' : 'No'),
  },
  { title: 'Sign up Date', dataIndex: 'signUpDate', key: 'signUpDate' },
]

const PAGE_SIZE = 10

// TO DO -- need to use DateParser from pubsweet ui here
// TO DO -- buttons should open a warning modal

// QUESTION results placement seems a bit odd here
const UserList = props => {
  const {
    className,
    currentPage,
    data,
    loading,
    onBulkDeactivate,
    onBulkDelete,
    onPageChange,
    onSearch,
    searchLoading,
    totalUserCount,
  } = props

  const dataSource = data.map(i => {
    const { id, ...rest } = i
    return { key: id, ...rest }
  })

  const [rowSelection, setRowSelection] = useState([])

  const handleSelectionChange = selectedRowKeys => {
    setRowSelection(selectedRowKeys)
  }

  const handleBulkDeactivateClick = () => {
    onBulkDeactivate(rowSelection)
  }

  const handleBulkDeleteClick = () => {
    onBulkDelete(rowSelection)
  }

  return (
    <Wrapper className={className}>
      <Layout>
        <Layout.Header>
          <PageHeader>Manage Users</PageHeader>
        </Layout.Header>

        <Layout.Content>
          <Table
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            onSearch={onSearch}
            pagination={{
              current: currentPage,
              onChange: onPageChange,
              pageSize: PAGE_SIZE,
              showSizeChanger: false,
              total: totalUserCount,
            }}
            rowSelection={{
              onChange: handleSelectionChange,
            }}
            searchLoading={searchLoading}
            searchPlaceholder="Search for users"
            showSearch
          />
        </Layout.Content>

        <Layout.Footer>
          <ButtonGroup justify="right">
            <Button onClick={handleBulkDeactivateClick} type="primary">
              Deactivate
            </Button>

            <Button onClick={handleBulkDeleteClick} type="danger">
              Delete
            </Button>
          </ButtonGroup>
        </Layout.Footer>
      </Layout>
    </Wrapper>
  )
}

UserList.propTypes = {
  currentPage: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      expertise: PropTypes.string,
      signUpDate: PropTypes.string.isRequired,
      isReviewer: PropTypes.bool.isRequired,
    }),
  ),
  loading: PropTypes.bool,
  onBulkDeactivate: PropTypes.func.isRequired,
  onBulkDelete: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  searchLoading: PropTypes.bool,
  totalUserCount: PropTypes.number.isRequired,
}

UserList.defaultProps = {
  data: [],
  loading: false,
  searchLoading: false,
}

export default UserList
