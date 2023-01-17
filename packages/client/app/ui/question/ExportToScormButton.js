import React from 'react'
import PropTypes from 'prop-types'

import { Button, Modal } from 'ui'

const ModalHeader = Modal.header
const ModalFooter = Modal.footer
const ModalContext = React.createContext(null)

const ExportToScormButton = props => {
  const { className, loading, onExport } = props

  const [modal, contextHolder] = Modal.useModal()

  const handleExport = () => {
    onExport()
      .then()
      .catch(() => {
        const errorDialog = modal.error()
        errorDialog.update({
          title: <ModalHeader>Conversion error</ModalHeader>,
          content:
            'Something went wrong with your conversion! Please contact your system administrator.',
          footer: [
            <ModalFooter key="footer">
              <Button onClick={errorDialog.destroy} type="primary">
                Ok
              </Button>
            </ModalFooter>,
          ],
        })
      })
  }

  return (
    <ModalContext.Provider>
      <Button
        className={className}
        loading={loading}
        onClick={handleExport}
        type="primary"
      >
        Export to SCORM
      </Button>
      {contextHolder}
    </ModalContext.Provider>
  )
}

ExportToScormButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  onExport: PropTypes.func.isRequired,
}

export default ExportToScormButton
