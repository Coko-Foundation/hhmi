import React, { createContext, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons'
import { Button, Input, Table, Modal, Checkbox, Empty } from '../common'

const MyListWrapper = styled.div`
  .ant-table-cell {
    border: 0;
  }

  .ant-table-column-sorter {
    display: none;
  }
`

const ListActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  width: 100%;
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 20px 0;
`

const HeaderActions = styled.div`
  display: flex;
  flex-direction: row;
`

const StyledCheckBox = styled(Checkbox)`
  align-items: center;
  display: flex;
  flex-direction: column-reverse;
  white-space: nowrap;

  &::after {
    display: none;
  }
`

const LoadingText = styled.div`
  color: transparent;
`

const ModalContext = createContext(null)

const ModalFooter = Modal.footer
const ModalHeader = Modal.header

const columns = [
  {
    title: ({ sortColumns }) => {
      const sortedColumn = sortColumns?.find(
        ({ column }) => column.key === 'name',
      )

      let icon

      if (sortedColumn) {
        icon =
          sortedColumn.order === 'ascend'
            ? (icon = <CaretUpFilled aria-hidden="true" />)
            : (icon = <CaretDownFilled aria-hidden="true" />)
      } else {
        icon = <CaretUpFilled aria-hidden="true" />
      }

      return (
        <div>
          Name
          {icon}
        </div>
      )
    },
    dataIndex: 'name',
    key: 'name',
    width: '60%',
    style: {
      border: 0,
    },
    sorter: true,
  },
  {
    title: ({ sortColumns }) => {
      const sortedColumn = sortColumns?.find(
        ({ column }) => column.key === 'createdAt',
      )

      let icon

      if (sortedColumn) {
        icon =
          sortedColumn.order === 'ascend'
            ? (icon = <CaretUpFilled aria-hidden="true" />)
            : (icon = <CaretDownFilled aria-hidden="true" />)
      } else {
        icon = <CaretDownFilled aria-hidden="true" />
      }

      return (
        <div>
          Creation Date
          {icon}
        </div>
      )
    },
    dataIndex: 'createdAt',
    key: 'createdAt',
    style: {
      border: 0,
    },
    sorter: true,
  },
]

const MyLists = props => {
  const {
    currentPage,
    data,
    loading,
    locale,
    onCreateNewList,
    onDeleteRows,
    onExport,
    onPageChange,
    onSearch,
    onSort,
    pageSize,
    totalListCount,
  } = props

  const [newListName, setNewListName] = useState('')
  const [selectedRows, setSelectedRows] = useState([])

  const [modal, contextHolder] = Modal.useModal()
  const { confirm } = modal

  const handleSelectionChange = selectedRowKey => {
    setSelectedRows(selectedRowKey)
  }

  const handleDeleteRows = () => {
    onDeleteRows(selectedRows)
  }

  const handleCreateNewList = () => {
    onCreateNewList(newListName)
    setNewListName('')
  }

  const showConfirmModal = () => {
    const confirmModal = confirm()
    confirmModal.update({
      title: (
        <ModalHeader>
          Delete list{selectedRows.length > 1 ? 's' : ''}
        </ModalHeader>
      ),
      content: `Are you sure you want to delete the selected list${
        selectedRows.length > 1 ? 's' : ''
      }?`,
      footer: [
        <ModalFooter key="footer">
          <Button key="cancel" onClick={() => confirmModal.destroy()}>
            Cancel
          </Button>
          <Button
            autoFocus
            data-testid="confirm-delete-btn"
            key="delete"
            onClick={() => {
              handleDeleteRows()
              confirmModal.destroy()
            }}
            status="danger"
          >
            Delete
          </Button>
        </ModalFooter>,
      ],
    })
  }

  const tableLocale = {
    emptyText: !loading ? (
      <Empty
        description="No lists found"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        role="status"
      />
    ) : (
      <LoadingText role="status">Loading</LoadingText>
    ),
    ...locale,
  }

  const handleKeyPress = e => {
    if (e.code === 'Enter') {
      onCreateNewList(newListName)
      setNewListName('')
    }
  }

  const toggleSelectAll = () => {
    setSelectedRows(rows =>
      rows.length === data.length ? [] : data.map(d => d.key),
    )
  }

  const onNewListNameChange = value => {
    setNewListName(value)
  }

  const handleSearch = query => {
    onSearch(query)
  }

  const handlePageChange = pageNumber => {
    setSelectedRows([])
    onPageChange(pageNumber)
  }

  const handleSort = (_, __, { column, order }) => {
    const orderBy = column ? column.dataIndex : 'createdAt'
    onSort(orderBy, order === 'ascend')
  }

  return (
    <ModalContext.Provider value={null}>
      <MyListWrapper>
        <Header>
          <HeaderActions>
            <Input
              onChange={onNewListNameChange}
              onKeyPress={handleKeyPress}
              placeholder="create your list"
              type="text"
              value={newListName}
            />
            <Button
              data-testid="create-btn"
              onClick={handleCreateNewList}
              size="middle"
              type="primary"
            >
              Create
            </Button>
          </HeaderActions>
        </Header>

        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          locale={tableLocale}
          onChange={handleSort}
          onSearch={handleSearch}
          pagination={{
            current: currentPage,
            onChange: handlePageChange,
            pageSize,
            showSizeChange: false,
            total: totalListCount,
          }}
          rowSelection={{
            columnWidth: '10%',
            onChange: handleSelectionChange,
            selectedRowKeys: selectedRows,
            columnTitle: (
              <StyledCheckBox
                checked={
                  selectedRows.length === data.length && selectedRows.length > 0
                }
                indeterminate={
                  selectedRows.length > 0 && selectedRows.length < data.length
                }
                onChange={toggleSelectAll}
              >
                Select all
              </StyledCheckBox>
            ),
            renderCell: (_, record, __, originNode) => {
              return React.cloneElement(originNode, {
                'aria-label': `Select list ${record.name}`,
              })
            },
          }}
          searchPlaceholder="Search for list"
          showSearch
        />
        <ListActions>
          <Button
            disabled={selectedRows.length === 0}
            onClick={onExport}
            type="primary"
          >
            Export
          </Button>
          <Button
            data-testid="delete-btn"
            disabled={selectedRows.length === 0}
            onClick={showConfirmModal}
            status="danger"
            type="primary"
          >
            Delete
          </Button>
        </ListActions>
      </MyListWrapper>
      {contextHolder}
    </ModalContext.Provider>
  )
}

MyLists.propTypes = {
  currentPage: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      key: PropTypes.string,
      createdAt: PropTypes.string,
    }),
  ),
  loading: PropTypes.bool,
  locale: PropTypes.shape(),
  onCreateNewList: PropTypes.func.isRequired,
  onDeleteRows: PropTypes.func.isRequired,
  onExport: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  pageSize: PropTypes.number,
  totalListCount: PropTypes.number,
}

MyLists.defaultProps = {
  data: [],
  loading: false,
  pageSize: 10,
  totalListCount: 0,
  locale: {},
}

export default MyLists
