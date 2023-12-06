import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Button, Form, TextArea, Modal, Upload } from '../common'

const ModalHeader = Modal.header
const ModalFooter = Modal.footer
const ModalContext = React.createContext(null)

const link = ''

const ReviewerSubmitButton = props => {
  const { className, onSubmit, showDialog } = props

  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [attachments, onAttachmentsChange] = useState([])
  const [reviewForm] = Form.useForm()

  const handleSubmitReview = ({ content }) => {
    setLoading(true)
    setShowModal(false)

    onSubmit({ attachments, content })
      .then(() => {
        reviewForm.resetFields()
        onAttachmentsChange([])

        showDialog(
          'success',
          'Review submitted successfully',
          'The review was submitted successfully',
        )
      })
      .catch(() => {
        showDialog(
          'error',
          'Problem submitting review',
          'There was an error while submitting your review. Please try again!',
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleAttachmentChange = ({ fileList }) => {
    onAttachmentsChange(fileList)
  }

  const handleRemoveAttachment = file => {
    onAttachmentsChange(selectedFiles =>
      selectedFiles.filter(item => item.uid !== file.uid),
    )
  }

  const footer = (
    <ModalFooter>
      <Button onClick={() => setShowModal(false)}>Cancel</Button>
      <Button autoFocus onClick={reviewForm.submit} type="primary">
        Submit Review
      </Button>
    </ModalFooter>
  )

  return (
    <ModalContext.Provider value={null}>
      <Button
        className={className}
        id="reviewerSubmitReview"
        loading={loading}
        onClick={() => setShowModal(true)}
        type="primary"
      >
        Submit Review
      </Button>
      <Modal
        destroyOnClose
        footer={footer}
        onCancel={() => setShowModal(false)}
        open={showModal}
        title={<ModalHeader>Submit Review</ModalHeader>}
      >
        <Form
          form={reviewForm}
          layout="vertical"
          onFinish={handleSubmitReview}
          onValuesChange={() => reviewForm.validateFields(['content'])}
        >
          <Form.Item
            label={
              <span>
                Please read the{' '}
                <a href={link} rel="noreferrer" target="_blank">
                  guidelines on providing feedback
                </a>{' '}
                and provide your feedback below.
              </span>
            }
            name="content"
            rules={[
              {
                required: true,
                message: 'Please provide a review of the item',
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
              autoSize={{ minRows: 6, maxRows: 12 }}
              data-testid="review-submit"
              placeholder="Enter review here..."
            />
          </Form.Item>
          <Form.Item name="attachments">
            <Upload
              accept="image/*,.pdf,.docx,.odt"
              aria-label="upload-attachments"
              files={attachments}
              multiple
              onChange={handleAttachmentChange}
              onRemove={handleRemoveAttachment}
            />
          </Form.Item>
        </Form>
      </Modal>
    </ModalContext.Provider>
  )
}

ReviewerSubmitButton.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  showDialog: PropTypes.func.isRequired,
}

export default ReviewerSubmitButton
