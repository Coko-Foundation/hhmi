/* stylelint-disable declaration-no-important */
/* stylelint-disable string-quotes */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { th } from '@coko/client'
import { TextArea } from '@coko/client/dist/ui'

import Button from '../common/Button'
import Form from '../common/Form'
import Modal from '../common/Modal'
import Upload from '../common/Upload'

const StyledReportButton = styled(Button)`
  border: none;
`

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
    }
  }
`

const ModalHeader = Modal.header
const ModalFooter = Modal.footer
const ModalContext = React.createContext(null)

const normFile = e => {
  if (Array.isArray(e)) {
    return e
  }

  return e?.fileList
}

const ReportIssueButton = props => {
  const { onSubmitReport, showDialog } = props

  const [showReportModal, setShowReportModal] = useState(false)
  const [, contextHolder] = Modal.useModal()

  const [reportForm] = Form.useForm()

  const handleReport = values => {
    setShowReportModal(false)
    onSubmitReport(values)
      .then(() => {
        reportForm.resetFields()

        showDialog(
          'success',
          'Report submitted successfully',
          'The report was submitted successfully to the administrators.',
        )
      })
      .catch(e => {
        showDialog(
          'error',
          'Problem submitting your report',
          'Something went wrong while submitting your report. Please try again!',
        )
      })
  }

  return (
    <ModalContext.Provider value={null}>
      <StyledReportButton
        icon={<ExclamationCircleOutlined />}
        id="report-issue"
        onClick={() => setShowReportModal(true)}
        title="Report an issue with this item"
      />
      <Modal
        afterClose={() => document.body.querySelector('#report-issue').focus()}
        destroyOnClose
        footer={[
          <ModalFooter key="footer">
            <Button onClick={() => setShowReportModal(false)}>Cancel</Button>
            <Button autoFocus onClick={reportForm.submit} type="primary">
              Report issue
            </Button>
          </ModalFooter>,
        ]}
        onCancel={() => setShowReportModal(false)}
        open={showReportModal}
        title={
          <ModalHeader>
            <ExclamationCircleOutlined /> Report an issue with this item
          </ModalHeader>
        }
      >
        <StyledForm
          form={reportForm}
          layout="vertical"
          onFinish={handleReport}
          onValuesChange={() => {
            reportForm.getFieldError('reportContent').length &&
              reportForm.validateFields(['reportContent'])
          }}
        >
          <Form.Item
            label="Thank you for reporting an issue to the Assessment Builder Team.
            Please provide details below, or attach a document with your
            concern."
            name="reportContent"
            rules={[
              {
                required: true,
                message: 'Please provide an explanation',
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
              autoSize={{ minRows: 4, maxRows: 10 }}
              placeholder="Fill out your report..."
            />
          </Form.Item>
          <StyledFormItem
            getValueFromEvent={normFile}
            name="attachments"
            valuePropName="fileList"
          >
            <StyledUpload
              accept="image/*,.pdf,.docx,.odt"
              aria-label="Upload attachments"
              multiple
            />
          </StyledFormItem>
        </StyledForm>
      </Modal>
      {contextHolder}
    </ModalContext.Provider>
  )
}

ReportIssueButton.propTypes = {
  onSubmitReport: PropTypes.func,
  showDialog: PropTypes.func,
}

ReportIssueButton.defaultProps = {
  onSubmitReport: () => {},
  showDialog: () => {},
}

export default ReportIssueButton
