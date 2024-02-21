import React, { useState } from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Button, Form, Link, TextArea, Modal, Upload } from '../common'

const StyledUpload = styled(Upload)`
  /* stylelint-disable-next-line string-quotes */
  [role='button'] {
    display: inline-flex;
    height: 16px;

    &:focus {
      outline: 4px solid #71ada9;
      outline-offset: 2px;
    }
  }
`

const ModalHeader = Modal.header
const ModalFooter = Modal.footer
const ModalContext = React.createContext(null)

const link =
  'https://docs.google.com/document/d/11ouizynaBlamTANf-crPdlKL91eXhDioHdiy6rL2ArA/edit?usp=sharing'

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
        afterClose={() =>
          document.getElementById('reviewerSubmitReview').focus()
        }
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
                <Link
                  rel="noreferrer noopener"
                  target="_blank"
                  to={{ pathname: link }}
                >
                  guidelines on providing feedback
                </Link>{' '}
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
            <StyledUpload
              accept="image/*,.pdf,.docx,.odt"
              aria-label="Upload attachments"
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
