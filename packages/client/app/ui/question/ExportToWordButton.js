import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { th } from '@coko/client'
import { FileWordOutlined, WarningFilled } from '@ant-design/icons'

import { Button, Checkbox, Modal } from '../common'

const StyledWarningFilled = styled(WarningFilled)`
  svg {
    fill: ${th('colorWarning')};
  }
`

const ModalHeader = Modal.header
const ModalFooter = Modal.footer
const ModalContext = React.createContext(null)

const ExportToWordButton = props => {
  const {
    className,
    loading,
    onExport,
    showMetadataOption,
    isIconButton,
    hasUnmetDependencies,
  } = props

  const [showModal, setShowModal] = useState(false)
  const [showDependenciesModal, setShowDependenciesModal] = useState(false)
  const [showFeedback, setShowFeedback] = useState(true)
  const [showMetadata, setShowMetadata] = useState(false)
  const [modal, contextHolder] = Modal.useModal()

  const handleShowModal = () => {
    if (hasUnmetDependencies) {
      setShowDependenciesModal(true)
    } else {
      setShowModal(true)
    }
  }

  const handleIgnoreDependencies = () => {
    setShowDependenciesModal(false)
    setShowModal(true)
  }

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
          onClick={handleShowModal}
          title="Export to Word"
        />
      ) : (
        <Button
          className={className}
          id="exportToWord"
          loading={loading}
          onClick={handleShowModal}
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

      <Modal
        destroyOnClose
        footer={[
          <ModalFooter key="footer">
            <Button onClick={() => setShowDependenciesModal(false)}>
              Cancel
            </Button>
            <Button autoFocus onClick={handleIgnoreDependencies} type="primary">
              Continue
            </Button>
          </ModalFooter>,
        ]}
        onCancel={() => setShowDependenciesModal(false)}
        open={showDependenciesModal}
        title={
          <ModalHeader>
            <StyledWarningFilled /> Export to Word
          </ModalHeader>
        }
      >
        <div>
          <p>
            This item is part of a set and depends on other items for context.
            Are you sure you want to continue with the export?
          </p>
        </div>
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
  hasUnmetDependencies: PropTypes.number,
}

ExportToWordButton.defaultProps = {
  isIconButton: false,
  showMetadataOption: false,
  hasUnmetDependencies: false,
}

export default ExportToWordButton
