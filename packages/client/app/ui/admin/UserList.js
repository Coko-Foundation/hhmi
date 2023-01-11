import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ExclamationCircleFilled, CloseCircleFilled } from '@ant-design/icons'

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

const ModalGrid = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr;
`

const WarningIcon = styled(ExclamationCircleFilled)`
  color: ${th('colorWarning')};
`

const ErrorIcon = styled(CloseCircleFilled)`
  color: ${th('colorError')};
`

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

  const [openModal, setOpenModal] = useState(false)
  const [modalContent, setModalContent] = useState(null)

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
        onClick={() => bulkAction(ACTIVATE_ACTION)}
        type="primary"
      >
        Activate
      </Button>
    ) : (
      <Button
        disabled={selectedRows.length === 0}
        onClick={() => bulkAction(DEACTIVATE_ACTION)}
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

  // #region modals
  const confirmActivate = () => {
    setOpenModal(true)
    setModalContent({
      title: (
        <ModalGrid>
          <WarningIcon />
          Activate User{selectedRows.length > 1 ? 's' : ''}
        </ModalGrid>
      ),
      content: `Are you sure you want to activate the selected user${
        selectedRows.length > 1 ? 's' : ''
      }?`,
      footer: [
        <Button key="cancel" onClick={() => setOpenModal(false)}>
          Cancel
        </Button>,
        <Button
          key="activate"
          onClick={() => {
            return onBulkActivate({
              variables: { ids: selectedRows },
            })
              .then(() => {
                setSelectedRows([])
                setOpenModal(false)
              })
              .catch(() => {
                setOpenModal(false)
                showErrorModal(
                  'Activation error',
                  'There was an error trying to activate the user(s)',
                )
              })
          }}
          type="primary"
        >
          Activate
        </Button>,
      ],
    })
  }

  const confirmDeactivate = () => {
    setOpenModal(true)
    setModalContent({
      title: (
        <ModalGrid>
          <WarningIcon />
          Deactivate User{selectedRows.length > 1 ? 's' : ''}
        </ModalGrid>
      ),
      content: `Are you sure you want to deactivate the selected user${
        selectedRows.length > 1 ? 's' : ''
      }?`,
      footer: [
        <Button key="cancel" onClick={() => setOpenModal(false)}>
          Cancel
        </Button>,
        <Button
          key="deactivate"
          onClick={() => {
            return onBulkDeactivate({
              variables: { ids: selectedRows },
            })
              .then(() => {
                setSelectedRows([])
                setOpenModal(false)
              })
              .catch(() => {
                setOpenModal(false)
                showErrorModal(
                  'Deactivate error',
                  'There was an error trying to deactivate the user(s)',
                )
              })
          }}
          status="danger"
        >
          Deactivate
        </Button>,
      ],
    })
  }

  const confirmDelete = () => {
    setOpenModal(true)
    setModalContent({
      title: (
        <ModalGrid>
          <WarningIcon />
          Delete User{selectedRows.length > 1 ? 's' : ''}
        </ModalGrid>
      ),
      content: `Are you sure you want to delete the selected user${
        selectedRows.length > 1 ? 's' : ''
      }?`,
      footer: [
        <Button key="cancel" onClick={() => setOpenModal(false)}>
          Cancel
        </Button>,
        <Button
          key="delete"
          onClick={() => {
            return onBulkDelete({
              variables: { ids: selectedRows },
            })
              .then(() => {
                setSelectedRows([])
                setOpenModal(false)
              })
              .catch(() => {
                setOpenModal(false)
                showErrorModal(
                  'Delete error',
                  'There was an error trying to delete the user(s)',
                )
              })
          }}
          status="danger"
        >
          Delete
        </Button>,
      ],
    })
  }

  const showErrorModal = (title, content) => {
    setOpenModal(true)
    setModalContent({
      title: (
        <ModalGrid>
          <ErrorIcon /> {title}
        </ModalGrid>
      ),
      content,
      footer: [
        <Button key="close" onClick={() => setOpenModal(false)} type="primary">
          Close
        </Button>,
      ],
    })
  }
  // #endregion modals

  return (
    <>
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
            <Checkbox
              checked={showDeactivated}
              onChange={onClickShowDeactivated}
            >
              Show inactive users
            </Checkbox>
            <ButtonGroup justify="right">
              {renderActivationButton(showDeactivated)}

              <Button
                disabled={selectedRows.length === 0}
                onClick={() => bulkAction(DELETE_ACTION)}
                status="error"
                type="primary"
              >
                Delete
              </Button>
            </ButtonGroup>
          </FooterActionsWrapper>
        </StyledSection>
      </Wrapper>
      <Modal
        footer={modalContent?.footer}
        onCancel={() => setOpenModal(null)}
        open={openModal}
        title={modalContent?.title}
      >
        <ModalGrid>
          <span />
          {modalContent?.content}
        </ModalGrid>
      </Modal>
    </>
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
  locale: {},
  pageSize: 10,
  searchLoading: false,
  totalUserCount: 0,
}

export default UserList
