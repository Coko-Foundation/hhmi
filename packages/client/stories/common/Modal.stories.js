import React, { useState } from 'react'
import { Modal, Button } from 'ui'

export const Base = () => {
  const [showModal, setShowModal] = useState(false)

  const handleOk = () => {
    alert('Clicked ok!')
    setShowModal(false)
  }

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Open Modal</Button>
      <Modal
        onCancel={() => setShowModal(false)}
        onOk={handleOk}
        visible={showModal}
      >
        <p>This is a modal</p>
      </Modal>
    </>
  )
}

export default {
  component: Modal,
  title: 'Common/Modal',
}
