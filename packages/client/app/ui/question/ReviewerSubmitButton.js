/* stylelint-disable declaration-no-important */
/* stylelint-disable string-quotes */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { th } from '@coko/client'

import { Button, Form, Link, TextArea, Modal, Upload } from '../common'

const StyledForm = styled(Form)`
  .ant-form-item-required::before {
    content: '' !important;
  }
`

const StyledFormItem = styled(Form.Item)`
  bottom: 40px;
  margin-bottom: -30px;
  position: relative;
`

const StyledUpload = styled(Upload)`
  align-items: end;
  color: ${th('colorPrimary')};
  display: flex;
  flex-direction: column;
  inset-block-end: 15px;
  padding-inline: 10px;
  position: relative;

  .ant-upload {
    /* inset-block-end: 15px; */
    position: relative;

    [role='button']:focus {
      outline: 4px solid #71ada9;
      outline-offset: 2px;
    }
  }

  .ant-upload-list.ant-upload-list-text {
    direction: rtl;
    display: grid;
    position: relative;
    top: 5px;

    button[title='Remove file'] {
      opacity: 1 !important;
    }

    > * {
      direction: ltr;
      max-inline-size: 200px;
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
        <StyledForm
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
                message: 'Please provide a review',
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
          <StyledFormItem name="attachments">
            <StyledUpload
              accept="image/*,.pdf,.docx,.odt"
              aria-label="Upload attachments"
              files={attachments}
              multiple
              onChange={handleAttachmentChange}
              onRemove={handleRemoveAttachment}
            />
          </StyledFormItem>
        </StyledForm>
      </Modal>
    </ModalContext.Provider>
  )
}

ReviewerSubmitButton.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  showDialog: PropTypes.func.isRequired,
}

export default ReviewerSubmitButton
