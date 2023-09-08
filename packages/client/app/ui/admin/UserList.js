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
import {
  conditionalWord,
  profileOptions,
  setSafeHTML,
  capitalize,
  safeCall,
} from '../../utilities'

const Wrapper = styled.div`
  background-color: #f5f5f5;
  height: 100%;
`

const TitleWrapper = styled.div`
  align-items: center;
  background: linear-gradient(60deg, #00763a, #8ac341);
  display: flex;
  flex-direction: column;
  height: 10rem;
  justify-content: center;
  margin: 0;

  & h1 {
    color: #fff;
    margin: 0;
    text-shadow: 0 1px 5px #0006;
  }

  text-align: center;
  width: 100%;
`

const PageHeader = styled(H1)`
  color: #fff;
  margin: 0;
  text-align: center;
`

const StyledSection = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding: 0;

  > div:nth-child(2) {
    flex-grow: 1;
  }
`

const StyledTable = styled(Table)`
  background-color: #fff;
  border: 1px solid #0001;
  border-radius: 0.5rem;
  box-shadow: inset 0 0 80px #edf3f5;
  margin: 0.5rem 0;
  max-width: 95%;
  overflow: scroll;
  padding: ${grid(6)};
  position: relative;
  width: 1300px;

  .ant-table-cell {
    height: 30px;
    max-height: 50px;
  }

  .ant-table-thead .ant-table-cell {
    box-shadow: inset 0 0 15px #8da8ff1a;
    font-size: 14px;
    padding: 0.8rem;
  }

  & nav {
    box-shadow: inset 0 0 15px #8da8ff1a;
    display: flex;
    justify-content: flex-start;
    padding: 0.3rem;
  }
`

const FooterActionsWrapper = styled.div`
  background-color: #fff;
  box-shadow: inset 0 0 12px #dee5e7;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  max-width: 96%;
  padding: ${grid(4)};
  width: 1300px;

  @media (min-width: ${th('mediaQueries.small')}) {
    flex-direction: row-reverse;
  }
`

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
  onPageChange,
  onSearch,
  pageSize,
  searchLoading,
  totalUserCount,
  selectedRows,
  setSelectedRows,
  showDeactivated,
  onClickShowDeactivated,
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
    { title: 'Name', dataIndex: 'displayName', key: 'displayName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Expertise',
      dataIndex: 'expertise',
      key: 'expertise',
      render: arrayOfStrings =>
        arrayOfStrings && (
          <>
            {arrayOfStrings.map(course => (
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
    renderCell: (_checked, record, _index, originNode) =>
      React.cloneElement(originNode, {
        'aria-label': `Select user ${record.displayName}`,
      }),
  }

  const pagination = {
    current: currentPage,
    onChange: handlePageChange,
    pageSize,
    showSizeChanger: false,
    total: totalUserCount,
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
      content: `Are you sure you want to ${action} the selected ${userOrUsers()}?`,
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
  }

  const bulkAction = action =>
    selectedRows.indexOf(currentUserId) !== -1
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
          <TitleWrapper>
            <PageHeader>User Manager</PageHeader>
          </TitleWrapper>
          <StyledTable
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            locale={mergedLocale}
            onSearch={onSearch}
            pagination={pagination}
            rowSelection={rowSelection}
            // scroll={{ y: 270, x: 1300 }}
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
