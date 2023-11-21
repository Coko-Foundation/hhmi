import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { grid } from '@coko/client'

import { Button, TextArea, Modal } from '../common'

const ModalHeader = Modal.header
const ModalFooter = Modal.footer
const ModalContext = React.createContext(null)

const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${grid(2)};
`

const ReviewerRejectButton = props => {
  const { className, onReject, showDialog } = props

  const [loading, setLoading] = useState(false)
  const [reason, setReason] = useState('')

  const [modal, contextHolder] = Modal.useModal()

  const handleRejectInvite = modalInstance => {
    setLoading(true)
    modalInstance.destroy()

    onReject({ reason })
      .then(() => {
        showDialog(
          'success',
          'Invite rejected successfully',
          'The invite to review was rejected successfully',
        )
      })
      .catch(() => {
        showDialog(
          'error',
          'Problem rejecting review invite',
          'There was an error while rejecting your invite. Please try again!',
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const ModalContent = (
    <ModalContentWrapper>
      <span>Can you provide a reason for rejection?</span>
      <TextArea
        autoSize={{ minRows: 3, maxRows: 6 }}
        onChange={e => setReason(e.target.value)}
        placeholder="Enter reason here..."
      />
    </ModalContentWrapper>
  )

  const handleReviewerRejectInvite = () => {
    const confirmRejectModal = modal.confirm()

    confirmRejectModal.update({
      title: <ModalHeader>Reject Invitation</ModalHeader>,
      content: ModalContent,
      footer: (
        <ModalFooter>
          <Button onClick={() => confirmRejectModal.destroy()}>Cancel</Button>
          <Button
            autoFocus
            onClick={() => handleRejectInvite(confirmRejectModal)}
            type="primary"
          >
            Reject Invite
          </Button>
        </ModalFooter>
      ),
    })
  }

  return (
    <ModalContext.Provider value={null}>
      <Button
        className={className}
        id="reviewerRejectInvite"
        loading={loading}
        onClick={handleReviewerRejectInvite}
        status="danger"
        type="primary"
      >
        Reject Invite
      </Button>
      {contextHolder}
    </ModalContext.Provider>
  )
}

ReviewerRejectButton.propTypes = {
  onReject: PropTypes.func.isRequired,
  showDialog: PropTypes.func.isRequired,
}

export default ReviewerRejectButton
