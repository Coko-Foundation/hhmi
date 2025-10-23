import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Button, Form, Modal, Select } from '../common'

const ModalHeader = Modal.header
const ModalFooter = Modal.footer
const ModalContext = React.createContext(null)

const StyledForm = styled(Form)`
  display: ${props => (props.hidden ? 'none' : 'block')};
`

const AssignAuthorButton = props => {
  const {
    className,
    onAssignAuthor,
    authors,
    loadAuthors,
    refetchUser,
    usecase,
    currentAuthor,
  } = props

  const [showModal, setShowModal] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [modal, contextHolder] = Modal.useModal()
  const [assignAuthorForm] = Form.useForm()

  useEffect(() => {
    if (showModal && !authors.length) {
      // load all users when opening modal
      loadAuthors()
    } else {
      setShowConfirm(false)
    }
  }, [showModal])

  useEffect(() => {
    if (currentAuthor?.length) {
      assignAuthorForm.setFieldValue(
        'author',
        currentAuthor?.filter(a => a?.id).map(a => a.id),
      )
    }
  }, [currentAuthor])

  const handleAssign = ({ author }) => {
    setShowModal(false)
    onAssignAuthor(author)
      .then(() => {
        const successModal = modal.success()
        successModal.update({
          afterClose: refetchUser,
          title: 'Author assigned',
          content: `User${author.length > 1 ? 's' : ''} ${authors
            .filter(auth => author.findIndex(a => auth.value === a) > -1)
            .map(auth => auth.label)
            .join(', ')} ${
            author.length > 1 ? 'have' : 'has'
          } been assgined author of this ${
            usecase === 'item' ? 'item' : 'leader text'
          }.`,
          footer: [
            <ModalFooter key="footer">
              <Button onClick={successModal.destroy} type="primary">
                Ok
              </Button>
            </ModalFooter>,
          ],
        })
      })
      .catch(() => {
        const errorModal = modal.error()
        errorModal.update({
          title: 'Assignment Error',
          content:
            'Something went wrong while assigning the Author! Please try again or contact your system administrator.',

          footer: [
            <ModalFooter key="footer">
              <Button onClick={errorModal.destroy} type="primary">
                Ok
              </Button>
            </ModalFooter>,
          ],
        })
      })
  }

  return (
    <ModalContext.Provider value={null}>
      <Button
        className={className}
        id="assignAuthor"
        onClick={() => setShowModal(true)}
        type="primary"
      >
        Assign author
      </Button>
      <Modal
        afterClose={() => document.querySelector('#assignAuthor').focus()}
        destroyOnClose
        footer={
          <ModalFooter>
            <Button onClick={assignAuthorForm.submit} type="primary">
              Assign
            </Button>
          </ModalFooter>
        }
        onCancel={() => setShowModal(false)}
        open={showModal}
        title={
          <ModalHeader>
            {showConfirm
              ? `Assign ${
                  authors.find(
                    a => a.value === assignAuthorForm.getFieldValue('author'),
                  )?.label
                } as author?`
              : 'Assign author'}
          </ModalHeader>
        }
      >
        <StyledForm
          form={assignAuthorForm}
          layout="vertical"
          onFinish={handleAssign}
          onValuesChange={() => assignAuthorForm.validateFields(['author'])}
        >
          <Form.Item
            label={`Select one or more authors for this ${
              usecase === 'item' ? 'item' : 'set'
            }`}
            name="author"
            rules={[
              {
                required: true,
                message: 'Please select a user to assign',
              },
              {
                validator(_, value) {
                  if (value && value.length > 0) {
                    return Promise.resolve()
                  }

                  return Promise.reject()
                },
              },
            ]}
            validateTrigger="onSubmit"
          >
            <Select
              data-testid="author-select"
              defaultOpen={false}
              mode="multiple"
              optionFilterProp="label"
              options={authors}
              placeholder="Search authors"
              showSearch
            />
          </Form.Item>
        </StyledForm>
        <p
          style={{ padding: '1em', display: showConfirm ? 'block' : 'none' }}
        />
      </Modal>

      {contextHolder}
    </ModalContext.Provider>
  )
}

AssignAuthorButton.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  currentAuthor: PropTypes.string,
  onAssignAuthor: PropTypes.func,
  loadAuthors: PropTypes.func,
  refetchUser: PropTypes.func,
  usecase: PropTypes.string,
}

AssignAuthorButton.defaultProps = {
  authors: [],
  currentAuthor: null,
  onAssignAuthor: () => {},
  loadAuthors: () => {},
  refetchUser: () => {},
  usecase: 'item',
}

export default AssignAuthorButton
