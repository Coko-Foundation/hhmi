/* stylelint-disable declaration-no-important */
/* stylelint-disable string-quotes */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { th } from '@coko/client'
import { Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Form, Modal } from '../common'

const StyledForm = styled(Form)`
  .ant-form-item-required::before {
    content: '' !important;
  }

  label::before {
    margin: 0 !important;
  }
`

const StyledUpload = styled(Upload)`
  color: ${th('colorPrimary')};
  display: flex;
  flex-direction: column;
  margin-block: 15px;
  position: relative;

  .ant-upload {
    position: relative;

    [role='button']:focus {
      outline: 4px solid #71ada9;
      outline-offset: 2px;
    }
  }

  .ant-upload-list.ant-upload-list-text {
    display: grid;
    position: relative;
    top: 5px;

    button[title='Remove file'] {
      opacity: 1 !important;
    }
  }
`

const ModalHeader = Modal.header
const ModalFooter = Modal.footer
const ModalContext = React.createContext(null)

const ReviewerEditorUploadButton = props => {
  const { className, onSubmit, showDialog, reviewerId } = props

  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [attachments, onAttachmentsChange] = useState([])
  const [reviewForm] = Form.useForm()

  const handleSubmitReview = ({ content }) => {
    setLoading(true)
    setShowModal(false)

    onSubmit({ attachments, content, reviewerId })
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
        icon={<UploadOutlined />}
        id="reviewerEditorUploadReview"
        loading={loading}
        onClick={() => setShowModal(true)}
      >
        Upload review
      </Button>
      <Modal
        afterClose={() =>
          document.getElementById('reviewerEditorUploadReview').focus()
        }
        destroyOnClose
        footer={footer}
        onCancel={() => setShowModal(false)}
        open={showModal}
        title={<ModalHeader>Upload Review</ModalHeader>}
      >
        <StyledForm
          form={reviewForm}
          layout="vertical"
          onFinish={handleSubmitReview}
          onValuesChange={() => reviewForm.validateFields(['content'])}
        >
          <Form.Item
            label="You can upload the files that the reviewer has sent to you. Files need to be in PDF format."
            name="attachments"
            rules={[
              {
                required: true,
                message: 'Please provide a review.',
              },
            ]}
          >
            <StyledUpload
              accept=".pdf"
              aria-label="Upload attachments"
              beforeUpload={() => false}
              files={attachments}
              multiple
              onChange={handleAttachmentChange}
              onRemove={handleRemoveAttachment}
            >
              <Button>Upload files</Button>
            </StyledUpload>
          </Form.Item>
        </StyledForm>
      </Modal>
    </ModalContext.Provider>
  )
}

ReviewerEditorUploadButton.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  showDialog: PropTypes.func.isRequired,
  reviewerId: PropTypes.string.isRequired,
}

export default ReviewerEditorUploadButton
