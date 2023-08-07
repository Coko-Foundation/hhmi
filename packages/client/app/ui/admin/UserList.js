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
} from '../common'
import { profileOptions } from '../../utilities'

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

const ModalContext = React.createContext(null)

const ModalFooter = Modal.footer
const ModalHeader = Modal.header

const DELETE_ACTION = 'delete'
const DEACTIVATE_ACTION = 'deactivate'
const ACTIVATE_ACTION = 'activate'

// QUESTION results placement seems a bit odd here
const UserList = props => {
  const {
    className,
    currentPage,
    currentUserId,
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

  const [modal, contextHolder] = Modal.useModal()
  const { confirm, error } = modal

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
        data-testid="activate-btn"
        disabled={selectedRows.length === 0}
        onClick={() => bulkAction(ACTIVATE_ACTION)}
        type="primary"
      >
        Activate
      </Button>
    ) : (
      <Button
        data-testid="deactivate-btn"
        disabled={selectedRows.length === 0}
        onClick={() => bulkAction(DEACTIVATE_ACTION)}
        type="primary"
      >
        Deactivate
      </Button>
    )

  const bulkAction = action => {
    if (selectedRows.indexOf(currentUserId) !== -1) {
      showErrorModal(
        'Cannot delete or deactivate current user',
        'You cannot delete or deactivate the user you are currently logged in as. Please deselect your current user and try again',
      )
    } else if (action === DEACTIVATE_ACTION) {
      confirmDeactivate()
    } else if (action === DELETE_ACTION) {
      confirmDelete()
    } else if (action === ACTIVATE_ACTION) {
      confirmActivate()
    }
  }

  useEffect(() => {
    if (dataSource.length) {
      document.getElementById('action-status').innerHTML = showDeactivated
        ? `Loaded inactive users`
        : `Loaded active users`
      setTimeout(() => {
        document.getElementById('action-status').innerHTML = ''
      }, 3000)
    }
  }, [JSON.stringify(dataSource)])

  // #region modals
  const confirmActivate = () => {
    const confirmDialog = confirm()
    confirmDialog.update({
      title: (
        <ModalHeader>
          Activate User{selectedRows.length > 1 ? 's' : ''}
        </ModalHeader>
      ),
      content: `Are you sure you want to activate the selected user${
        selectedRows.length > 1 ? 's' : ''
      }?`,
      footer: [
        <ModalFooter key="footer">
          <Button key="cancel" onClick={() => confirmDialog.destroy()}>
            Cancel
          </Button>
          <Button
            autoFocus
            key="activate"
            onClick={() => {
              return onBulkActivate({
                variables: { ids: selectedRows },
              })
                .then(() => {
                  document.getElementById('action-status').innerHTML = `User${
                    selectedRows.length > 1 ? 's' : ''
                  } activated`
                  setTimeout(() => {
                    if (document.getElementById('action-status')) {
                      document.getElementById('action-status').innerHTML = ''
                    }
                  }, 3000)
                  setSelectedRows([])
                  confirmDialog.destroy()
                })
                .catch(() => {
                  confirmDialog.destroy()
                  showErrorModal(
                    'Activation error',
                    'There was an error trying to activate the user(s)',
                  )
                })
            }}
            type="primary"
          >
            Activate
          </Button>
        </ModalFooter>,
      ],
    })
  }

  const confirmDeactivate = () => {
    const confirmDialog = confirm()
    confirmDialog.update({
      title: (
        <ModalHeader>
          Deactivate User{selectedRows.length > 1 ? 's' : ''}
        </ModalHeader>
      ),
      content: `Are you sure you want to deactivate the selected user${
        selectedRows.length > 1 ? 's' : ''
      }?`,
      footer: [
        <ModalFooter key="footer">
          <Button key="cancel" onClick={() => confirmDialog.destroy()}>
            Cancel
          </Button>
          <Button
            autoFocus
            key="deactivate"
            onClick={() => {
              return onBulkDeactivate({
                variables: { ids: selectedRows },
              })
                .then(() => {
                  document.getElementById('action-status').innerHTML = `User${
                    selectedRows.length > 1 ? 's' : ''
                  } deactivated`
                  setTimeout(() => {
                    document.getElementById('action-status').innerHTML = ''
                  }, 3000)
                  setSelectedRows([])
                  confirmDialog.destroy()
                })
                .catch(() => {
                  confirmDialog.destroy()
                  showErrorModal(
                    'Deactivate error',
                    'There was an error trying to deactivate the user(s)',
                  )
                })
            }}
            status="danger"
          >
            Deactivate
          </Button>
        </ModalFooter>,
      ],
    })
  }

  const confirmDelete = () => {
    const confirmDialog = confirm()
    confirmDialog.update({
      title: (
        <ModalHeader>
          Delete User{selectedRows.length > 1 ? 's' : ''}
        </ModalHeader>
      ),
      content: `Are you sure you want to delete the selected user${
        selectedRows.length > 1 ? 's' : ''
      }?`,
      footer: [
        <ModalFooter key="footer">
          <Button key="cancel" onClick={() => confirmDialog.destroy()}>
            Cancel
          </Button>
          <Button
            autoFocus
            key="delete"
            onClick={() => {
              return onBulkDelete({
                variables: { ids: selectedRows },
              })
                .then(() => {
                  document.getElementById('action-status').innerHTML = `User${
                    selectedRows.length > 1 ? 's' : ''
                  } deleted`
                  setTimeout(() => {
                    document.getElementById('action-status').innerHTML = ''
                  }, 3000)
                  setSelectedRows([])
                  confirmDialog.destroy()
                })
                .catch(() => {
                  confirmDialog.destroy()
                  showErrorModal(
                    'Delete error',
                    'There was an error trying to delete the user(s)',
                  )
                })
            }}
            status="danger"
          >
            Delete
          </Button>
        </ModalFooter>,
      ],
    })
  }

  const showErrorModal = (title, content) => {
    const errorModal = error()
    errorModal.update({
      title: <ModalHeader>{title}</ModalHeader>,
      content,
      footer: [
        <ModalFooter key="footer">
          <Button
            key="close"
            onClick={() => errorModal.destroy()}
            type="primary"
          >
            Close
          </Button>
        </ModalFooter>,
      ],
    })
  }
  // #endregion modals

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

  return (
    <ModalContext.Provider value={null}>
      <Wrapper className={className}>
        <StyledSection>
          <PageHeader>User Manager</PageHeader>
          <StyledTable
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            locale={mergedLocale}
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
                <StyledCheckbox
                  aria-checked={isCheckboxChecked()}
                  checked={
                    selectedRows.length === data.length &&
                    selectedRows.length > 0
                  }
                  indeterminate={
                    selectedRows.length > 0 && selectedRows.length < data.length
                    // or typeof isCheckboxChecked() === string
                  }
                  onChange={toggleSelectAll}
                >
                  Select all
                </StyledCheckbox>
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
            <Checkbox
              checked={showDeactivated}
              data-testid="show-inactive-users"
              onChange={onClickShowDeactivated}
            >
              Show inactive users
            </Checkbox>
            <ButtonGroup justify="right">
              {renderActivationButton(showDeactivated)}

              <Button
                data-testid="delete-btn"
                disabled={selectedRows.length === 0}
                onClick={() => bulkAction(DELETE_ACTION)}
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
  locale: null,
  pageSize: 10,
  searchLoading: false,
  totalUserCount: 0,
}

export default UserList
