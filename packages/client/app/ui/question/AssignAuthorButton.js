import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Button, Form, Modal, Select } from '../common'

const ModalHeader = Modal.header
const ModalFooter = Modal.footer
const ModalContext = React.createContext(null)

const Note = styled.p`
  span {
    font-weight: bold;
  }
`

const StyledForm = styled(Form)`
  display: ${props => (props.hidden ? 'none' : 'block')};
`

const ConfirmationScreen = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
`

const AssignAuthorButton = props => {
  const { className, onAssignAuthor, authors, loadAuthors, refetchUser } = props

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

  const handleAssign = ({ author }) => {
    setShowModal(false)
    onAssignAuthor(author)
      .then(() => {
        const successModal = modal.success()
        successModal.update({
          afterClose: refetchUser,
          title: 'Author assigned',
          content: `User ${
            authors.find(
              a => a.value === assignAuthorForm.getFieldValue('author'),
            )?.label
          } has been assgined as the author of this question`,
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

  const confirmAuthorship = () => {
    if (assignAuthorForm.getFieldValue('author')) {
      setShowConfirm(true)
    } else {
      assignAuthorForm.validateFields(['author'])
    }
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
            {showConfirm ? (
              <>
                <Button onClick={() => setShowConfirm(false)}>Back</Button>
                <Button
                  autoFocus
                  onClick={assignAuthorForm.submit}
                  type="primary"
                >
                  Assign
                </Button>
              </>
            ) : (
              <Button autoFocus onClick={confirmAuthorship} type="primary">
                Yes, assign author
              </Button>
            )}
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
          hidden={showConfirm}
          layout="vertical"
          onFinish={handleAssign}
          onValuesChange={() => assignAuthorForm.validateFields(['author'])}
        >
          <Form.Item
            label="Select the author of this question"
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
              optionFilterProp="label"
              options={authors}
              placeholder="Search authors"
              showSearch
            />
          </Form.Item>
          <Note>
            <span>Note: </span>Make sure you select the correct user. The author
            can only be assigned once.
          </Note>
        </StyledForm>
        <ConfirmationScreen visible={showConfirm}>
          This action is irreversible. You will not be able to change the author
          of this question again.
        </ConfirmationScreen>
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
  onAssignAuthor: PropTypes.func,
  loadAuthors: PropTypes.func,
  refetchUser: PropTypes.func,
}

AssignAuthorButton.defaultProps = {
  authors: [],
  onAssignAuthor: () => {},
  loadAuthors: () => {},
  refetchUser: () => {},
}

export default AssignAuthorButton
