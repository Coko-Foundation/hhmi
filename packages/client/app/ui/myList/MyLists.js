import React, { createContext, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { th, grid } from '@coko/client'
import { CaretDownFilled, CaretUpFilled, EditOutlined } from '@ant-design/icons'
import {
  Button,
  Input,
  Table,
  Modal,
  Checkbox,
  Empty,
  DateParser,
  Form,
  Popup,
} from '../common'
import ExportListToWordButton from './ExportModal'

const MyListWrapper = styled.section`
  background: ${th('colorBackground')};
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${grid(4)};

  > div:nth-child(2) {
    flex-grow: 1;
  }

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

const StyledForm = styled(Form)`
  align-items: baseline;
  display: flex;
  justify-content: flex-end;
  padding-block: ${grid(5)} ${grid(2)};
`

const StyledCheckBox = styled(Checkbox)`
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

const LoadingText = styled.div`
  color: transparent;
`

const InfoButton = styled(Button)`
  background-color: transparent;
  border: none;
`

const StyledPopup = styled(Popup)`
  border-radius: 0;
  padding: ${grid(3)};
`

const PopupForm = styled(Form)`
  display: flex;
  flex-direction: row;

  /* stylelint-disable-next-line no-descending-specificity */
  > div {
    align-self: end;
    margin-bottom: 0;

    .ant-form-item-control-input + div {
      order: -1;
    }

    width: 100%;
  }
`

const ExportActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${grid(2)};
`

const ModalContext = createContext(null)

const ModalFooter = Modal.footer
const ModalHeader = Modal.header

const RenderRenameColumn = (_, record) => {
  const { key, onRenameList, titleText } = record

  const popupId = `${titleText.split(' ').join('-')}-rename`

  return (
    <StyledPopup
      alignment="end"
      id={`${popupId}-popup`}
      position="inline-start"
      toggle={
        <InfoButton
          aria-label={`Rename list ${titleText}`}
          icon={<EditOutlined />}
          shape="circle"
        />
      }
    >
      <PopupForm onFinish={({ renameList }) => onRenameList(key, renameList)}>
        <Form.Item
          initialValue={titleText}
          name="renameList"
          rules={[
            {
              validator(__, value) {
                return new Promise((resolve, reject) => {
                  if (!value || value === titleText) {
                    reject(new Error('Enter a new name'))
                  } else {
                    resolve()
                  }
                })
              },
            },
          ]}
          validateTrigger="onSubmit"
        >
          <Input
            // defaultValue={titleText}
            id={`${popupId}-input`}
            name="renameList"
            placeholder="List name"
            style={{ width: '140px' }}
          />
        </Form.Item>
        <Form.Item>
          <Button data-testid="rename-btn" htmlType="submit" type="primary">
            Rename
          </Button>
        </Form.Item>
      </PopupForm>
    </StyledPopup>
  )
}

const columns = [
  {
    title: ({ sortColumns }) => {
      const sortedColumn = sortColumns?.find(
        ({ column }) => column.key === 'title',
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
    dataIndex: 'title',
    key: 'title',
    width: '60%',
    style: {
      border: 0,
    },
    sorter: true,
  },
  {
    title: ({ sortColumns }) => {
      const sortedColumn = sortColumns?.find(
        ({ column }) => column.key === 'created',
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
    dataIndex: 'created',
    key: 'created',
    render: date => (
      <DateParser dateFormat="MMMM DD, YYYY" timestamp={date}>
        {timestamp => timestamp}
      </DateParser>
    ),
    style: {
      border: 0,
    },
    sorter: true,
  },
  {
    dataIndex: 'rename',
    key: 'rename',
    render: RenderRenameColumn,
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
    onExportQTI,
    onPageChange,
    onSearch,
    onSort,
    pageSize,
    totalListCount,
  } = props

  const [selectedRows, setSelectedRows] = useState([])

  const [modal, contextHolder] = Modal.useModal()
  const { confirm, error } = modal
  const [newListForm] = Form.useForm()

  const handleSelectionChange = selectedRowKey => {
    setSelectedRows(selectedRowKey)
  }

  const handleExportList = showFeedback => {
    return onExport(selectedRows[0], showFeedback)
  }

  const handleExportListQTI = () => {
    onExportQTI(selectedRows[0])
      .then(() => {})
      .catch(e => {
        const errorModal = error()
        errorModal.update({
          title: <ModalHeader>QTI export failed</ModalHeader>,
          content: e,
          footer: [
            <ModalFooter key="footer">
              <Button
                autoFocus
                data-testid="error-export-btn"
                key="ok-error"
                onClick={() => {
                  errorModal.destroy()
                }}
              >
                Ok
              </Button>
            </ModalFooter>,
          ],
        })
      })
  }

  const handleDeleteRows = () => {
    onDeleteRows(selectedRows)
    setSelectedRows([])
  }

  const handleCreateNewList = ({ newList }) =>
    onCreateNewList(newList).then(() => newListForm.resetFields())

  const showConfirmDeleteModal = () => {
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

  const toggleSelectAll = () => {
    setSelectedRows(rows =>
      rows.length === data.length ? [] : data.map(d => d.key),
    )
  }

  const handleSearch = query => {
    onSearch(query)
  }

  const handlePageChange = pageNumber => {
    setSelectedRows([])
    onPageChange(pageNumber)
  }

  const handleSort = (_, __, { column, order }) => {
    const orderBy = column ? column.dataIndex : 'created'
    const ascending = order !== 'descend'

    onSort(orderBy, ascending)
  }

  return (
    <ModalContext.Provider value={null}>
      <MyListWrapper>
        <StyledForm
          form={newListForm}
          onFinish={handleCreateNewList}
          onValuesChange={() => newListForm.validateFields(['newList'])}
        >
          <Form.Item
            name="newList"
            rules={[
              {
                required: true,
                message: 'Please provide a name',
              },
            ]}
            validateTrigger="onSubmit"
          >
            <Input placeholder="Create a new list" type="text" />
          </Form.Item>
          <Button
            data-testid="create-btn"
            htmlType="submit"
            size="middle"
            type="primary"
          >
            Create
          </Button>
        </StyledForm>

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
                'aria-label': `Select list ${record.title}`,
              })
            },
          }}
          searchPlaceholder="Search..."
          showSearch
        />
        <ListActions>
          <Popup
            id="export-popup"
            popupPlacement="top"
            toggle={
              <Button
                data-testid="add-to-list-btn"
                disabled={selectedRows.length !== 1}
                id="export-popup-toggle"
                type="primary"
              >
                Export
              </Button>
            }
          >
            <ExportActionWrapper>
              <ExportListToWordButton
                afterClose={() =>
                  document.body.querySelector('#export-popup-toggle').focus()
                }
                disabled={selectedRows.length !== 1}
                onExport={handleExportList}
                text="All questions of the list will be exported in the user defined (custom) order"
              >
                Export to Word
              </ExportListToWordButton>
              <Button
                disabled={selectedRows.length !== 1}
                id="exportToQTI"
                onClick={handleExportListQTI}
                type="primary"
              >
                Export to QTI
              </Button>
            </ExportActionWrapper>
          </Popup>
          <Button
            data-testid="delete-btn"
            disabled={selectedRows.length === 0}
            onClick={showConfirmDeleteModal}
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
      title: PropTypes.element,
      key: PropTypes.string,
      created: PropTypes.string,
    }),
  ),
  loading: PropTypes.bool,
  locale: PropTypes.shape(),
  onCreateNewList: PropTypes.func.isRequired,
  onDeleteRows: PropTypes.func.isRequired,
  onExport: PropTypes.func.isRequired,
  onExportQTI: PropTypes.func.isRequired,
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
