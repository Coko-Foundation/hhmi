import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { CheckOutlined } from '@ant-design/icons'
import { grid, th } from '@coko/client'
import Popup from './Popup'
import Divider from './Divider'
import Form from './Form'
import Select from './Select'
import Input from './Input'
import Button from './Button'

const StyledPopup = styled(Popup)`
  border-radius: 0;
  inline-size: 300px;
  margin-block-end: ${grid(2)};
`

const PopupContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: minmax(0, 1fr) ${grid(18)};
  grid-template-rows: 1fr 1fr;

  > div {
    align-self: end;
    grid-row: span 2;
    margin-bottom: 0;
    width: 100%;

    label {
      font-weight: bold;

      &.ant-form-item-required::before {
        /* stylelint-disable-next-line declaration-no-important */
        display: none !important;
      }
    }

    .ant-form-item-control-input + div {
      order: -1;
    }
  }

  /* stylelint-disable-next-line string-quotes */
  > button[type='submit'] {
    align-self: end;
    grid-area: 2 /2;
    padding-inline: unset;
    width: unset;
  }

  > span {
    align-self: end;
    color: ${th('colorSuccess')};
    direction: rtl;
    overflow: visible;
    padding-block-end: ${grid(2)};
    text-align: end;
    white-space: nowrap;
  }
`

const StyledDivider = styled(Divider)`
  border-block-start-color: ${th('colorBorder')};
  margin-block: ${grid(4)};
`

const AddToListPopup = props => {
  const {
    selectedRows,
    onAddToList,
    onCreateList,
    loadingAddToList,
    loadingCreateList,
    existingListsOptions,
    position,
    alignment,
  } = props

  const [existingListForm] = Form.useForm()
  const [newListForm] = Form.useForm()
  const [showListUpdateSuccess, setShowListUpdateSuccess] = useState(false)
  const [showListCreatedSuccess, setShowListCreatedSuccess] = useState(false)

  useEffect(() => {
    if (!loadingAddToList) {
      setShowListUpdateSuccess(true)
      setTimeout(() => {
        setShowListUpdateSuccess(false)
      }, 3000)
    }
  }, [loadingAddToList])

  useEffect(() => {
    if (!loadingCreateList) {
      setShowListCreatedSuccess(true)
      setTimeout(() => {
        setShowListCreatedSuccess(false)
      }, 3000)
    }
  }, [loadingCreateList])

  const handleAddToList = ({ existingList }) => {
    onAddToList(existingList, selectedRows).then(() =>
      existingListForm.resetFields(),
    )
  }

  const handleCreateNewList = ({ newList }) =>
    onCreateList(newList, selectedRows).then(() => newListForm.resetFields())

  return (
    <StyledPopup
      alignment={alignment}
      id="list-popup"
      position={position}
      toggle={
        <Button
          data-testid="add-to-list-btn"
          // disabled={selectedQuestions.length === 0}
          type="primary"
        >
          Add to list
        </Button>
      }
    >
      <PopupContentWrapper>
        <StyledForm
          form={existingListForm}
          layout="vertical"
          onFinish={handleAddToList}
          onValuesChange={() =>
            existingListForm.validateFields(['existingList'])
          }
        >
          <Form.Item
            label="Existing list"
            name="existingList"
            rules={[
              {
                required: true,
                message: 'Please select a list',
              },
            ]}
            validateTrigger="onSubmit"
          >
            <Select
              data-testid="select-existing-list"
              optionFilterProp="label"
              options={existingListsOptions}
              placeholder="Find list"
              showSearch
            />
          </Form.Item>
          {showListUpdateSuccess ? (
            <span aria-live="polite" role="status">
              List updated <CheckOutlined />
            </span>
          ) : null}
          <Button
            data-testid="add-btn"
            htmlType="submit"
            loading={loadingAddToList}
            type="primary"
          >
            {loadingAddToList ? null : 'Add'}
          </Button>
        </StyledForm>
        <StyledDivider />
        <StyledForm
          form={newListForm}
          layout="vertical"
          onFinish={handleCreateNewList}
          onValuesChange={() => newListForm.validateFields(['newList'])}
        >
          <Form.Item
            label="New list"
            name="newList"
            rules={[
              {
                required: true,
                message: 'List name is required',
              },
            ]}
            validateTrigger="onSubmit"
          >
            <Input placeholder="List name" />
          </Form.Item>
          {showListCreatedSuccess ? (
            <span aria-live="polite" role="status">
              List created <CheckOutlined />
            </span>
          ) : null}
          <Button
            data-testid="create-btn"
            htmlType="submit"
            loading={loadingCreateList}
            type="primary"
          >
            {loadingCreateList ? null : 'Create'}
          </Button>
        </StyledForm>
      </PopupContentWrapper>
    </StyledPopup>
  )
}

AddToListPopup.propTypes = {
  selectedRows: PropTypes.arrayOf(PropTypes.string),
  onAddToList: PropTypes.func,
  onCreateList: PropTypes.func,
  loadingAddToList: PropTypes.bool,
  loadingCreateList: PropTypes.bool,
  existingListsOptions: PropTypes.arrayOf(PropTypes.shape()),
  position: PropTypes.string,
  alignment: PropTypes.string,
}

AddToListPopup.defaultProps = {
  selectedRows: [],
  onAddToList: () => {},
  onCreateList: () => {},
  loadingAddToList: false,
  loadingCreateList: false,
  existingListsOptions: [],
  position: 'block-start',
  alignment: 'start',
}

export default AddToListPopup
