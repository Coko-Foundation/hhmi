import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FileWordOutlined } from '@ant-design/icons'

import { Button, Checkbox, Modal } from '../common'

const ModalHeader = Modal.header
const ModalFooter = Modal.footer
const ModalContext = React.createContext(null)

const ExportToWordButton = props => {
  const { className, loading, onExport, showMetadataOption, isIconButton } =
    props

  const [showModal, setShowModal] = useState(false)
  const [showFeedback, setShowFeedback] = useState(true)
  const [showMetadata, setShowMetadata] = useState(false)
  const [modal, contextHolder] = Modal.useModal()

  const handleOk = () => {
    // force metadata to false if the option if off
    const metadataValue = showMetadataOption ? showMetadata : false

    setShowModal(false)
    onExport({ showFeedback, showMetadata: metadataValue })
      .then()
      .catch(() => {
        const conversionErrorModal = modal.error()
        conversionErrorModal.update({
          title: <ModalHeader>Conversion error</ModalHeader>,
          content:
            'Something went wrong with your conversion! Please contact your system administrator.',
          footer: [
            <ModalFooter key="footer">
              <Button onClick={conversionErrorModal.destroy} type="primary">
                Ok
              </Button>
            </ModalFooter>,
          ],
        })
      })
  }

  return (
    <ModalContext.Provider value={null}>
      {isIconButton ? (
        <Button
          className={className}
          icon={<FileWordOutlined />}
          id="exportToWord"
          loading={loading}
          onClick={() => setShowModal(true)}
          title="Export to Word"
        />
      ) : (
        <Button
          className={className}
          id="exportToWord"
          loading={loading}
          onClick={() => setShowModal(true)}
        >
          Export to Word
        </Button>
      )}

      <Modal
        afterClose={() => document.body.querySelector('#exportToWord').focus()}
        destroyOnClose
        footer={[
          <ModalFooter key="footer">
            <Button onClick={() => setShowModal(false)}>Cancel</Button>
            <Button autoFocus onClick={handleOk} type="primary">
              Export
            </Button>
          </ModalFooter>,
        ]}
        onCancel={() => setShowModal(false)}
        open={showModal}
        title={<ModalHeader>Export to Word</ModalHeader>}
      >
        <div>
          <Checkbox
            checked={showFeedback}
            onClick={() => setShowFeedback(!showFeedback)}
          >
            Include solutions & feedback
          </Checkbox>
        </div>

        {showMetadataOption && (
          <div>
            <Checkbox
              checked={showMetadata}
              onClick={() => setShowMetadata(!showMetadata)}
            >
              Include metadata
            </Checkbox>
          </div>
        )}
      </Modal>
      {contextHolder}
    </ModalContext.Provider>
  )
}

ExportToWordButton.propTypes = {
  isIconButton: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  onExport: PropTypes.func.isRequired,
  showMetadataOption: PropTypes.bool,
}

ExportToWordButton.defaultProps = {
  isIconButton: false,
  showMetadataOption: false,
}

export default ExportToWordButton
