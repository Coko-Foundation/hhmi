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

const FooterActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const ButtonWithoutStyles = styled.button`
  background-color: transparent;
  border: none;

  &[disabled] {
    cursor: not-allowed;
  }
`

// QUESTION results placement seems a bit odd here
const UserList = props => {
  const {
    className,
    currentPage,
    data,
    loading,
    locale,
    onBulkActivate,
    onBulkDeactivate,
    onBulkDelete,
    onPageChange,
    onSearch,
    pageSize,
    searchLoading,
    totalUserCount,
    selectedRows,
    setSelectedRows,
    showDeactivated,
    onClickShowDeactivated,
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

  const renderActivationButton = deactivatedUsers =>
    deactivatedUsers ? (
      <Button
        disabled={selectedRows.length === 0}
        onClick={onBulkActivate}
        type="primary"
      >
        Activate
      </Button>
    ) : (
      <Button
        disabled={selectedRows.length === 0}
        onClick={onBulkDeactivate}
        type="primary"
      >
        Deactivate
      </Button>
    )

  const paginationItemRender = (_page, type, originalElement) => {
    if (type === 'prev') {
      return (
        <ButtonWithoutStyles aria-label="Previous page" type="button">
          Previous
        </ButtonWithoutStyles>
      )
    }

    if (type === 'next') {
      return (
        <ButtonWithoutStyles aria-label="Next page" type="button">
          Next
        </ButtonWithoutStyles>
      )
    }

    return originalElement
  }

  return (
    <Wrapper className={className}>
      <StyledSection>
        <PageHeader>User Manager</PageHeader>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          locale={locale}
          onSearch={onSearch}
          pagination={{
            current: currentPage,
            onChange: handlePageChange,
            pageSize,
            showSizeChanger: false,
            total: totalUserCount,
            itemRender: paginationItemRender,
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
        <FooterActionsWrapper>
          <Checkbox checked={showDeactivated} onChange={onClickShowDeactivated}>
            Show deactivated users
          </Checkbox>
          <ButtonGroup justify="right">
            {renderActivationButton(showDeactivated)}

            <Button
              disabled={selectedRows.length === 0}
              onClick={onBulkDelete}
              type="danger"
            >
              Delete
            </Button>
          </ButtonGroup>
        </FooterActionsWrapper>
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
  locale: PropTypes.shape(),
  onBulkActivate: PropTypes.func.isRequired,
  onBulkDeactivate: PropTypes.func.isRequired,
  onBulkDelete: PropTypes.func.isRequired,
  onClickShowDeactivated: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  pageSize: PropTypes.number,
  selectedRows: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedRows: PropTypes.func.isRequired,
  searchLoading: PropTypes.bool,
  totalUserCount: PropTypes.number,
  showDeactivated: PropTypes.bool.isRequired,
}

UserList.defaultProps = {
  data: [],
  loading: false,
  locale: {},
  pageSize: 10,
  searchLoading: false,
  totalUserCount: 0,
}

export default UserList
