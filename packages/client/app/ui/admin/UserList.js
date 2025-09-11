import React, { useEffect } from 'react'
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
  Modal,
  Empty,
  VisuallyHiddenElement,
  Link,
} from '../common'
import {
  conditionalWord,
  setSafeHTML,
  capitalize,
  safeCall,
} from '../../utilities'

const Wrapper = styled.div`
  height: 100%;
`

const PageHeader = styled(H1)`
  margin: 0 auto;
  text-align: center;

  @media (min-width: ${th('mediaQueries.small')}) {
    margin: ${grid(2)} auto;
  }
`

const StyledSection = styled.section`
  background: ${th('colorBackground')};
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${grid(4)};

  > div:nth-child(2) {
    flex-grow: 1;
  }
`

const StyledTable = styled(Table)`
  .ant-table-content {
    overflow-x: auto;
  }

  ul.ant-pagination:has(.ant-pagination-total-text) {
    display: flex;

    .ant-pagination-total-text {
      color: ${th('colorPrimary')};
      margin-inline-end: auto;
    }
  }
`

const StyledCheckbox = styled(Checkbox)`
  align-items: center;
  display: flex;
  flex-direction: column-reverse;
  white-space: nowrap;

  .ant-checkbox {
    align-self: auto;
  }

  &::after {
    display: none;
  }
`

const FooterActionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 10px;

  @media (min-width: ${th('mediaQueries.small')}) {
    flex-direction: row;
  }
`

const selectAllCheckbox = (setRows, rowsData, rows) => {
  const toggle = () =>
    setRows(keys =>
      keys.length === rowsData.length ? [] : rowsData.map(r => r.key),
    )

  // posible reusable util
  const isChecked = ({ length: rowslgth = [] }, { length: datalgth = [] }) =>
    rowslgth < datalgth && rowslgth !== 0 ? 'mixed' : rowslgth > 0

  return (
    <StyledCheckbox
      aria-checked={isChecked(rows, rowsData)}
      checked={rowsData.length > 0 && rows.length === rowsData.length}
      indeterminate={isChecked(rows, rowsData) === 'mixed'}
      onChange={toggle}
    >
      Select all
    </StyledCheckbox>
  )
}

const ModalContext = React.createContext(null)
const { footer: ModalFooter, header: ModalHeader } = Modal

// QUESTION results placement seems a bit odd here
const UserList = ({
  className,
  currentPage,
  currentUserId,
  data,
  loading,
  locale,
  onBulkActivate,
  onBulkDeactivate,
  onBulkDelete,
  onBulkDownload,
  onChangePageSize,
  onPageChange,
  onSearch,
  pageSize,
  searchLoading,
  totalUserCount,
  selectedRows,
  setSelectedRows,
  showDeactivated,
  onClickShowDeactivated,
  filters,
  withFilters,
  expertiseOptions,
  onSortChange,
}) => {
  const [modal, contextHolder] = Modal.useModal()
  const { confirm, error } = modal

  // General use UTILS
  const userOrUsers = cased =>
    conditionalWord(cased, {
      condition: () => selectedRows.length === 1,
      wordOnTrue: 'user',
      wordOnFalse: 'users',
    })

  const isActivated = () => (showDeactivated ? 'activate' : 'deactivate')

  const updateActionStatus = (content, delay = 3000) => {
    setSafeHTML('#action-status', content)
    setSafeHTML('#action-status', '', delay)
  }

  // HANDLERS for TABLE

  const handleSelectionChange = selectedRowKeys => {
    setSelectedRows(selectedRowKeys)
  }

  const handlePageChange = page => {
    setSelectedRows([])
    onPageChange(page)
  }

  // TABLE
  const columns = [
    {
      title: 'Name',
      dataIndex: 'displayName',
      key: 'displayName',
      showSorterTooltip: true,
      render: (displayName, user) => (
        <Link to={`/profile/${user.key}`}>{displayName}</Link>
      ),
      sorter: (a, b) => a - b,
    },
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
                {expertiseOptions.find(c => c.value === course)?.label}
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
      key: 'created',
      showSorterTooltip: true,
      render: date => (
        <DateParser dateFormat="MMMM DD, YYYY" timestamp={date}>
          {timestamp => timestamp}
        </DateParser>
      ),
      sorter: (a, b) => a - b,
    },
  ]

  const dataSource = data.map(i => {
    const { id, ...rest } = i
    return { key: id, ...rest }
  })

  const mergedLocale = {
    emptyText: !loading ? (
      <Empty
        description="No Users Found"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        role="status"
      />
    ) : (
      <div role="status">Loading</div>
    ),
    ...locale,
  }

  const rowSelection = {
    onChange: handleSelectionChange,
    selectedRowKeys: selectedRows,
    columnTitle: selectAllCheckbox(setSelectedRows, dataSource, selectedRows),
    renderCell: (_checked, record, _index, originNode) =>
      React.cloneElement(originNode, {
        'aria-label': `Select user ${record.displayName}`,
      }),
  }

  const calculateSizeOptions = () => {
    const defaultSizes = [10, 20, 50]

    const options = defaultSizes.filter(
      threshold => totalUserCount >= threshold,
    )

    if (totalUserCount > 10 && !options.includes(totalUserCount)) {
      options.push(totalUserCount)
    }

    return options
  }

  const pageSizeOptions = calculateSizeOptions()

  const pagination = {
    current: currentPage,
    onChange: handlePageChange,
    onShowSizeChange: onChangePageSize,
    pageSize,
    pageSizeOptions,
    showSizeChanger: pageSizeOptions.length > 0,
    total: totalUserCount,
    showTotal: t => `Showing ${dataSource.length} users out of ${t}`,
  }

  // MODALS
  const actionModalTemplate = ({ dialog, action, status, type, onBulk }) => {
    const performBulkAction = async () => {
      try {
        await onBulk({ variables: { ids: selectedRows } })
        updateActionStatus(`${`${userOrUsers('capital')} ${action}`}d`)
        setSelectedRows([])
      } catch {
        modals.error(
          `${capitalize(action)} error`,
          `There was an error trying to ${action} the user(s)`,
        )
      } finally {
        dialog.destroy()
      }
    }

    return dialog.update({
      title: (
        <ModalHeader>
          {capitalize(action)} {userOrUsers('capital')}
        </ModalHeader>
      ),
      content: (
        <>
          <p>
            Are you sure you want to {action} the selected {userOrUsers()}?
          </p>
          {action === 'delete' && (
            <p>
              Deleting the selected {userOrUsers()} will delete all their items
              that are still in editorial flow. Published items will not be
              affected, and the author&apos;s name will be preserved.
            </p>
          )}
        </>
      ),
      footer: [
        <ModalFooter key="footer">
          <Button key="cancel" onClick={() => dialog.destroy()}>
            Cancel
          </Button>
          <Button
            autoFocus
            key={action}
            onClick={performBulkAction}
            status={status || null}
            type={type || null}
          >
            {capitalize(action)}
          </Button>
        </ModalFooter>,
      ],
    })
  }

  const handleBulkDownload = async () => {
    const dialog = modal.info()
    dialog.update({
      title: <ModalHeader>Download CSV</ModalHeader>,
      content: <p>Download data for selected users.</p>,
      footer: [
        <ModalFooter key="footer">
          <Button key="cancel" onClick={() => dialog.destroy()}>
            Cancel
          </Button>
          <Button
            autoFocus
            onClick={async () => {
              try {
                await onBulkDownload({ variables: { userIds: selectedRows } })
              } catch {
                modals.error(
                  `${capitalize('download')} error`,
                  `There was an error trying to download the user(s)`,
                )
              } finally {
                dialog.destroy()
              }
            }}
            type="primary"
          >
            Download
          </Button>
        </ModalFooter>,
      ],
    })
  }

  const modals = {
    activate: () =>
      actionModalTemplate({
        dialog: confirm(),
        action: 'activate',
        type: 'primary',
        onBulk: onBulkActivate,
      }),
    deactivate: () =>
      actionModalTemplate({
        dialog: confirm(),
        action: 'deactivate',
        status: 'danger',
        onBulk: onBulkDeactivate,
      }),
    delete: () =>
      actionModalTemplate({
        dialog: confirm(),
        action: 'delete',
        status: 'danger',
        onBulk: onBulkDelete,
      }),
    error: (title, content, dialog = error()) => {
      dialog.update({
        title: <ModalHeader>{title}</ModalHeader>,
        content,
        footer: [
          <ModalFooter key="footer">
            <Button key="close" onClick={() => dialog.destroy()} type="primary">
              Close
            </Button>
          </ModalFooter>,
        ],
      })
    },
    download: () => handleBulkDownload(),
  }

  const bulkAction = action =>
    action !== 'download' && selectedRows.indexOf(currentUserId) !== -1
      ? modals.error(
          'Cannot delete or deactivate current user',
          'You cannot delete or deactivate the user you are currently logged in as. Please deselect your current user and try again',
        )
      : safeCall(modals[action])

  useEffect(() => {
    dataSource.length &&
      updateActionStatus(
        `Loaded ${showDeactivated ? 'inactive' : 'active'} users`,
      )
  }, [showDeactivated])

  return (
    <ModalContext.Provider value={null}>
      <Wrapper className={className}>
        <StyledSection>
          <PageHeader>User Manager</PageHeader>
          <StyledTable
            columns={columns}
            dataSource={dataSource}
            filters={filters}
            loading={loading}
            locale={mergedLocale}
            onChange={onSortChange}
            //   (p, f, s) => {
            //   console.log(p)
            //   console.log(f)
            //   console.log(s)
            // }}
            onSearch={onSearch}
            pagination={pagination}
            rowSelection={rowSelection}
            searchLoading={searchLoading}
            searchPlaceholder="Search for users"
            showSearch
            showSorterTooltip
            withFilters={withFilters}
          />
          <FooterActionsWrapper>
            <Checkbox
              checked={showDeactivated}
              data-testid="show-inactive-users"
              onChange={onClickShowDeactivated}
            >
              Show inactive users
            </Checkbox>
            <ButtonGroup justify="right">
              <Button
                data-testid={`${isActivated()}-btn`}
                disabled={selectedRows.length === 0}
                onClick={() => bulkAction('download')}
              >
                Download csv
              </Button>
              <Button
                data-testid={`${isActivated()}-btn`}
                disabled={selectedRows.length === 0}
                onClick={() => bulkAction(isActivated())}
                type="primary"
              >
                {capitalize(isActivated())}
              </Button>
              <Button
                data-testid="delete-btn"
                disabled={selectedRows.length === 0}
                onClick={() => bulkAction('delete')}
                status="error"
                type="primary"
              >
                Delete
              </Button>
            </ButtonGroup>
          </FooterActionsWrapper>
          <VisuallyHiddenElement id="action-status" role="status" />
        </StyledSection>
      </Wrapper>
      {contextHolder}
    </ModalContext.Provider>
  )
}

UserList.propTypes = {
  currentPage: PropTypes.number.isRequired,
  currentUserId: PropTypes.string.isRequired,
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
  onBulkDownload: PropTypes.func.isRequired,
  onClickShowDeactivated: PropTypes.func.isRequired,
  onChangePageSize: PropTypes.func,
  onPageChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSortChange: PropTypes.func,
  pageSize: PropTypes.number,
  selectedRows: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedRows: PropTypes.func.isRequired,
  searchLoading: PropTypes.bool,
  totalUserCount: PropTypes.number,
  showDeactivated: PropTypes.bool.isRequired,
  filters: PropTypes.arrayOf(PropTypes.shape()),
  withFilters: PropTypes.bool,
  expertiseOptions: PropTypes.arrayOf(PropTypes.shape()),
}
UserList.defaultProps = {
  data: [],
  loading: false,
  locale: null,
  pageSize: 10,
  searchLoading: false,
  totalUserCount: 0,
  filters: [],
  withFilters: false,
  onChangePageSize: () => {},
  onSortChange: () => {},
  expertiseOptions: [],
}

export default UserList
