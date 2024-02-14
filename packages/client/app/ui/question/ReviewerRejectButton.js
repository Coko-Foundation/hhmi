import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Button, Form, TextArea, Modal } from '../common'

const ModalHeader = Modal.header
const ModalFooter = Modal.footer
const ModalContext = React.createContext(null)

const ReviewerRejectButton = props => {
  const { className, onReject, showDialog } = props

  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [rejectForm] = Form.useForm()

  const handleRejectInvite = ({ reason }) => {
    setLoading(true)
    setShowModal(false)

    onReject(reason)
      .then(() => {
        rejectForm.resetFields()

        showDialog(
          'success',
          'Invite rejected successfully',
          'The invite to review was rejected successfully',
        )
      })
      .catch(() => {
        showDialog(
          'error',
          'Problem rejecting review invite',
          'There was an error while rejecting your invite. Please try again!',
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const footer = (
    <ModalFooter>
      <Button onClick={() => setShowModal(false)}>Cancel</Button>
      <Button autoFocus onClick={rejectForm.submit} type="primary">
        Reject Invite
      </Button>
    </ModalFooter>
  )

  return (
    <ModalContext.Provider value={null}>
      <Button
        className={className}
        id="reviewerRejectInvite"
        loading={loading}
        onClick={() => setShowModal(true)}
        status="danger"
        type="primary"
      >
        Reject Invite
      </Button>
      <Modal
        destroyOnClose
        footer={footer}
        onCancel={() => setShowModal(false)}
        open={showModal}
        title={<ModalHeader>Reject Invitation</ModalHeader>}
      >
        <Form
          form={rejectForm}
          layout="vertical"
          onFinish={handleRejectInvite}
          onValuesChange={() => rejectForm.validateFields(['reason'])}
        >
          <Form.Item
            label="Can you provide a reason for rejection?"
            name="reason"
            rules={[
              {
                required: true,
                message: 'Please provide a reason rejecting',
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
            <TextArea
              autoSize={{ minRows: 3, maxRows: 6 }}
              placeholder="Enter reason here..."
            />
          </Form.Item>
        </Form>
      </Modal>
    </ModalContext.Provider>
  )
}

ReviewerRejectButton.propTypes = {
  onReject: PropTypes.func.isRequired,
  showDialog: PropTypes.func.isRequired,
}

export default ReviewerRejectButton
