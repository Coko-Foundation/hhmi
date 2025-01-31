import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { grid, th, uuid } from '@coko/client'
import {
  Button,
  Table,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Search,
} from '../common'

const StyledSection = styled.section`
  background: ${th('colorBackground')};
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${grid(4)};
`

const SearchWrapper = styled.div`
  display: flex;
  gap: ${grid(2)};
  justify-content: space-between;
  margin-bottom: ${grid(3)};

  > span {
    max-width: 1200px;
  }
`

const StyledTag = styled(Tag)`
  margin-block: ${grid(1)};
`

const ActionsWrapper = styled.div`
  display: flex;
  gap: ${grid(2)};
`

const ModalContext = React.createContext(null)

const ResourceTable = props => {
  const {
    dataSource,
    currentPage,
    onPageChange,
    onResourceCreate,
    onResourceDelete,
    onResourceUpdate,
    onSearch,
    subtopics,
    topics,
    totalCount,
  } = props

  const [modal, contextHolder] = Modal.useModal()
  const { header: ModalHeader, footer: ModalFooter } = Modal
  const { confirm } = modal

  const [newResourceForm] = Form.useForm()
  const [editResourceForm] = Form.useForm()

  const saveResource = dialog => {
    newResourceForm
      .validateFields()
      .then(values => {
        onResourceCreate(values).then(() => {
          newResourceForm.setFieldsValue({
            label: '',
            url: '',
            topics: [],
            subtopics: [],
          })

          dialog.destroy()
        })
      })
      .catch(e => console.error(e))
  }

  const createResource = () => {
    const dialog = confirm()

    dialog.update({
      width: 500,
      icon: null,
      title: <ModalHeader>Create new resource</ModalHeader>,
      content: (
        <Form form={newResourceForm} layout="vertical">
          <Form.Item
            label="Label"
            name="label"
            rules={[
              {
                required: true,
                message: 'Label is required',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="URL"
            name="url"
            rules={[
              {
                required: true,
                message: 'URL is required',
              },
            ]}
          >
            <Input type="url" />
          </Form.Item>
          <Form.Item label="Topics" name="topics">
            <Select
              mode="multiple"
              optionFilterProp="label"
              options={topics.map(t => ({
                label: t.label,
                value: t.value,
              }))}
            />
          </Form.Item>
          <Form.Item label="Subtopics" name="subtopics">
            <Select
              mode="multiple"
              optionFilterProp="label"
              options={subtopics.map(s => ({
                label: s.label,
                value: s.value,
              }))}
            />
          </Form.Item>
        </Form>
      ),
      footer: [
        <ModalFooter key="footer">
          <Button key="cancel" onClick={() => dialog.destroy()}>
            Cancel
          </Button>
          <Button
            key="save"
            onClick={() => saveResource(dialog)}
            type="primary"
          >
            Create
          </Button>
        </ModalFooter>,
      ],
    })
  }

  const updateResource = dialog => {
    editResourceForm
      .validateFields()
      .then(values => {
        onResourceUpdate(values).then(() => {
          dialog.destroy()
        })
      })
      .catch(e => console.error(e))
  }

  const editResource = id => {
    const dialog = confirm()
    const resource = dataSource.find(r => r.key === id)

    editResourceForm.setFieldsValue({
      id,
      label: resource.label,
      url: resource.url,
      topics: resource.topics,
      subtopics: resource.subtopics,
    })

    dialog.update({
      width: 500,
      icon: null,
      title: <ModalHeader>Edit resource</ModalHeader>,
      content: (
        <Form form={editResourceForm} layout="vertical">
          <Form.Item hidden name="id">
            <Input />
          </Form.Item>
          <Form.Item
            label="Label"
            name="label"
            rules={[
              {
                required: true,
                message: 'Label is required',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="URL"
            name="url"
            rules={[
              {
                required: true,
                message: 'URL is required',
              },
            ]}
          >
            <Input type="url" />
          </Form.Item>
          <Form.Item label="Topics" name="topics">
            <Select
              mode="multiple"
              optionFilterProp="label"
              options={topics.map(t => ({
                label: t.label,
                value: t.value,
              }))}
            />
          </Form.Item>
          <Form.Item label="Subtopics" name="subtopics">
            <Select
              mode="multiple"
              optionFilterProp="label"
              options={subtopics.map(s => ({
                label: s.label,
                value: s.value,
              }))}
            />
          </Form.Item>
        </Form>
      ),
      footer: [
        <ModalFooter key="footer">
          <Button key="cancel" onClick={() => dialog.destroy()}>
            Cancel
          </Button>
          <Button
            key="save"
            onClick={() => updateResource(dialog)}
            type="primary"
          >
            Save
          </Button>
        </ModalFooter>,
      ],
    })
  }

  const deleteResource = id => {
    const dialog = confirm()
    const resource = dataSource.find(r => r.key === id)

    dialog.update({
      width: 500,
      icon: null,
      title: <ModalHeader>Delete resource</ModalHeader>,
      content: (
        <p>
          Are you sure you want to delete the resource with title{' '}
          <strong>
            &ldquo;
            {resource.label}&rdquo;
          </strong>
          ?
        </p>
      ),
      footer: (
        <ModalFooter key="footer">
          <Button key="cancel" onClick={() => dialog.destroy()}>
            Cancel
          </Button>
          <Button
            key="delete"
            onClick={() => {
              onResourceDelete(id)
              dialog.destroy()
            }}
            status="danger"
            type="primary"
          >
            Delete
          </Button>
        </ModalFooter>
      ),
    })
  }

  const columns = [
    {
      title: 'Label',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      render: url => <a href={url}>{url}</a>,
    },
    {
      title: 'Topics',
      dataIndex: 'topics',
      key: 'topics',
      render: arrayOfStrings =>
        arrayOfStrings &&
        arrayOfStrings.map(topic => (
          <StyledTag key={uuid()}>
            {topics.find(t => t.value === topic)?.label}
          </StyledTag>
        )),
    },
    {
      title: 'Subtopics',
      dataIndex: 'subtopics',
      key: 'subtopics',
      render: arrayOfStrings =>
        arrayOfStrings &&
        arrayOfStrings.map(subtopic => (
          <StyledTag key={uuid()}>
            {subtopics.find(s => s.value === subtopic)?.label}
          </StyledTag>
        )),
    },
    {
      title: 'Actions',
      dataIndex: 'key',
      key: 'key',
      render: key => (
        <ActionsWrapper>
          <Button onClick={() => editResource(key)} type="primary">
            Edit
          </Button>
          <Button
            onClick={() => deleteResource(key)}
            status="danger"
            type="primary"
          >
            Delete
          </Button>
        </ActionsWrapper>
      ),
    },
  ]

  const pagination = {
    current: currentPage,
    onChange: onPageChange,
    pageSize: 20,
    showSizeChanger: false,
    total: totalCount,
  }

  return (
    <ModalContext.Provider>
      <StyledSection>
        <SearchWrapper>
          <Search onSearch={onSearch} />
          <Button onClick={createResource} type="primary">
            Add resource
          </Button>
        </SearchWrapper>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          searchPlaceholder="Search resources"
        />
      </StyledSection>
      {contextHolder}
    </ModalContext.Provider>
  )
}

ResourceTable.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.shape()),
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
  onResourceCreate: PropTypes.func,
  onResourceDelete: PropTypes.func,
  onResourceUpdate: PropTypes.func,
  onSearch: PropTypes.func,
  subtopics: PropTypes.arrayOf(PropTypes.shape()),
  topics: PropTypes.arrayOf(PropTypes.shape()),
  totalCount: PropTypes.number,
}

ResourceTable.defaultProps = {
  dataSource: [],
  currentPage: 0,
  onPageChange: null,
  onResourceCreate: null,
  onResourceDelete: null,
  onResourceUpdate: null,
  onSearch: null,
  subtopics: [],
  topics: [],
  totalCount: 0,
}

export default ResourceTable
