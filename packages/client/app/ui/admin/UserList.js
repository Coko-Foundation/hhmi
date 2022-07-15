import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { uuid, grid, th } from '@coko/client'

import {
  Button,
  ButtonGroup,
  Checkbox,
  H1,
  Tag,
  Table,
  DateParser,
} from '../common'
import { profileOptions } from '../../utilities'

const Wrapper = styled.div`
  height: 100%;

  > section {
    display: flex;
    flex-direction: column;
    height: 100%;

    > div:nth-child(2) {
      flex-grow: 1;
    }
  }
`

const PageHeader = styled(H1)`
  text-align: center;
`

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
        {arrayOfStrings &&
          arrayOfStrings.map(course => (
            <Tag key={uuid()}>
              {profileOptions.courses.find(c => c.value === course)?.label}
            </Tag>
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
  {
    title: 'Sign up Date',
    dataIndex: 'signUpDate',
    key: 'signUpDate',
    render: date => (
      <DateParser dateFormat="MMMM DD, YYYY" timestamp={date}>
        {timestamp => timestamp}
      </DateParser>
    ),
  },
]

const StyledSection = styled.section`
  background: ${th('colorBackground')};
  padding: ${grid(4)};
`

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
    pageSize,
    searchLoading,
    totalUserCount,
    selectedRows,
    setSelectedRows,
  } = props

  const dataSource = data.map(i => {
    const { id, ...rest } = i
    return { key: id, ...rest }
  })

  const handleSelectionChange = selectedRowKeys => {
    setSelectedRows(selectedRowKeys)
  }

  const handlePageChange = page => {
    setSelectedRows([])
    onPageChange(page)
  }

  const toggleSelectAll = () => {
    setSelectedRows(keys =>
      keys.length === dataSource.length ? [] : dataSource.map(r => r.key),
    )
  }

  const isCheckboxChecked = () => {
    if (selectedRows.length === 0) {
      return false
    }

    if (selectedRows.length < dataSource.length) {
      return 'mixed'
    }

    return true
  }

  return (
    <Wrapper className={className}>
      <StyledSection>
        <PageHeader>Manage Users</PageHeader>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          onSearch={onSearch}
          pagination={{
            current: currentPage,
            onChange: handlePageChange,
            pageSize,
            showSizeChanger: false,
            total: totalUserCount,
          }}
          rowSelection={{
            onChange: handleSelectionChange,
            selectedRowKeys: selectedRows,
            columnTitle: (
              <Checkbox
                aria-checked={isCheckboxChecked()}
                aria-label="Select all users"
                checked={selectedRows.length}
                indeterminate={
                  selectedRows.length > 0 && selectedRows.length < data.length
                  // or typeof isCheckboxChecked() === string
                }
                onChange={toggleSelectAll}
              />
            ),
            renderCell: (_checked, record, _index, originNode) => {
              return React.cloneElement(originNode, {
                'aria-label': `Select user ${record.displayName}`,
              })
            },
          }}
          searchLoading={searchLoading}
          searchPlaceholder="Search for users"
          showSearch
        />
        <div>
          <ButtonGroup justify="right">
            <Button
              disabled={selectedRows.length === 0}
              onClick={onBulkDeactivate}
              type="primary"
            >
              Deactivate
            </Button>

            <Button
              disabled={selectedRows.length === 0}
              onClick={onBulkDelete}
              type="danger"
            >
              Delete
            </Button>
          </ButtonGroup>
        </div>
      </StyledSection>
    </Wrapper>
  )
}

UserList.propTypes = {
  currentPage: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      expertise: PropTypes.arrayOf(PropTypes.string),
      signUpDate: PropTypes.string.isRequired,
      isReviewer: PropTypes.bool.isRequired,
    }),
  ),
  loading: PropTypes.bool,
  onBulkDeactivate: PropTypes.func.isRequired,
  onBulkDelete: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  pageSize: PropTypes.number,
  selectedRows: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedRows: PropTypes.func.isRequired,
  searchLoading: PropTypes.bool,
  totalUserCount: PropTypes.number,
}

UserList.defaultProps = {
  data: [],
  loading: false,
  pageSize: 10,
  searchLoading: false,
  totalUserCount: 0,
}

export default UserList
