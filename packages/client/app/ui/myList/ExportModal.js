import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Button, Checkbox, Modal } from '../common'

const ModalHeader = Modal.header
const ModalFooter = Modal.footer
const ModalContext = React.createContext(null)

const ExportListToWordButton = props => {
  const { className, children, customOrder, disabled, text, onExport } = props

  const [showModal, setShowModal] = useState(false)
  const [showFeedback, setShowFeedback] = useState(true)
  const [modal, contextHolder] = Modal.useModal()

  const handleOk = () => {
    setShowModal(false)
    onExport(showFeedback)
      .then()
      .catch(error => {
        const conversionErrorModal = modal.error()
        conversionErrorModal.update({
          title: <ModalHeader>Conversion error</ModalHeader>,
          content:
            error ||
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
      <Button
        className={className}
        disabled={disabled}
        id="exportToWord"
        onClick={() => setShowModal(true)}
        type="primary"
      >
        {children}
      </Button>

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
          <p>
            {customOrder
              ? text
              : 'Questions belonging to one complex item set will be grouped together in the exported word doc. Otherwise, the order will be same as currently specified'}
          </p>
          <Checkbox
            checked={showFeedback}
            onClick={() => setShowFeedback(!showFeedback)}
          >
            Include solutions & feedback
          </Checkbox>
        </div>
      </Modal>
      {contextHolder}
    </ModalContext.Provider>
  )
}

ExportListToWordButton.propTypes = {
  customOrder: PropTypes.bool,
  disabled: PropTypes.bool,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onExport: PropTypes.func,
}
ExportListToWordButton.defaultProps = {
  customOrder: true,
  disabled: false,
  text: '',
  onExport: () => {},
}

export default ExportListToWordButton
