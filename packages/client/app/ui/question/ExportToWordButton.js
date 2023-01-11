import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Button, Checkbox, Modal as AntModal } from 'ui'

const Modal = AntModal.default

const ExportToWordButton = props => {
  const { className, loading, onExport, showMetadataOption } = props

  const [showModal, setShowModal] = useState(false)
  const [showFeedback, setShowFeedback] = useState(true)
  const [showMetadata, setShowMetadata] = useState(false)

  const handleOk = () => {
    // force metadata to false if the option if off
    const metadataValue = showMetadataOption ? showMetadata : false

    onExport({ showFeedback, showMetadata: metadataValue })
    setShowModal(false)
  }

  return (
    <>
      <Button
        className={className}
        loading={loading}
        onClick={() => setShowModal(true)}
        type="primary"
      >
        Export to Word
      </Button>

      <Modal
        onCancel={() => setShowModal(false)}
        onOk={handleOk}
        open={showModal}
        title="Export to Word"
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
    </>
  )
}

ExportToWordButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  onExport: PropTypes.func.isRequired,
  showMetadataOption: PropTypes.bool,
}

ExportToWordButton.defaultProps = {
  showMetadataOption: false,
}

export default ExportToWordButton
