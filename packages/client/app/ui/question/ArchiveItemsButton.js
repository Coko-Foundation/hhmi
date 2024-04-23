import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Button, Modal } from '../common'

const ModalHeader = Modal.header
const ModalFooter = Modal.footer
const ModalContext = React.createContext(null)

const ArchiveItemsButton = props => {
  const { className, isArchived, onChangeArchiveStatus } = props

  const [showModal, setShowModal] = useState(false)

  const handleChangeArchiveStatus = async () => {
    setShowModal(false)

    onChangeArchiveStatus(!isArchived)
  }

  const footer = (
    <ModalFooter>
      <Button onClick={() => setShowModal(false)}>Cancel</Button>
      <Button autoFocus onClick={handleChangeArchiveStatus} type="primary">
        {isArchived ? 'Unarchive' : 'Archive'}
      </Button>
    </ModalFooter>
  )

  return (
    <ModalContext.Provider value={null}>
      <Button
        aria-label="Archive Items"
        className={className}
        id="archiveItems"
        onClick={() => setShowModal(true)}
        type="primary"
      >
        {isArchived ? 'Unarchive' : 'Archive'}
      </Button>

      <Modal
        destroyOnClose
        footer={footer}
        onCancel={() => setShowModal(false)}
        open={showModal}
        title={
          <ModalHeader>
            {isArchived ? 'Unarchive' : 'Archive'} items
          </ModalHeader>
        }
      >
        {isArchived ? (
          <p>Unarchived items will be shown on your Dashboard.</p>
        ) : (
          <p>
            Archived items will be hidden on your Dashboard. You can show your
            archived items, or unarchive items at any stage.
          </p>
        )}
      </Modal>
    </ModalContext.Provider>
  )
}

ArchiveItemsButton.propTypes = {
  isArchived: PropTypes.bool.isRequired,
  onChangeArchiveStatus: PropTypes.func.isRequired,
}

export default ArchiveItemsButton
