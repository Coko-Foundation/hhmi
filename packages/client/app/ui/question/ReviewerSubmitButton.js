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

const link = ''

const ReviewerSubmitButton = props => {
  const { className, onSubmit, showDialog } = props

  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const [modal, contextHolder] = Modal.useModal()

  const handleSubmitReview = modalInstance => {
    setLoading(true)
    modalInstance.destroy()

    onSubmit({ content })
      .then(() => {
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

  const ModalContent = (
    <ModalContentWrapper>
      <span>
        Please read the{' '}
        <a href={link} rel="noreferrer" target="_blank">
          guidelines on providing feedback
        </a>{' '}
        and provide your feedback below.
      </span>
      <TextArea
        autoSize={{ minRows: 3, maxRows: 6 }}
        onChange={e => setContent(e.target.value)}
        placeholder="Enter review here..."
      />
    </ModalContentWrapper>
  )

  const handleReviewerSubmitReview = () => {
    const confirmSubmitModal = modal.info()

    confirmSubmitModal.update({
      title: <ModalHeader>Submit Review</ModalHeader>,
      content: ModalContent,
      footer: (
        <ModalFooter>
          <Button onClick={() => confirmSubmitModal.destroy()}>Cancel</Button>
          <Button
            autoFocus
            onClick={() => handleSubmitReview(confirmSubmitModal)}
            type="primary"
          >
            Submit Review
          </Button>
        </ModalFooter>
      ),
    })
  }

  return (
    <ModalContext.Provider value={null}>
      <Button
        className={className}
        id="reviewerSubmitReview"
        loading={loading}
        onClick={handleReviewerSubmitReview}
        type="primary"
      >
        Submit Review
      </Button>
      {contextHolder}
    </ModalContext.Provider>
  )
}

ReviewerSubmitButton.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  showDialog: PropTypes.func.isRequired,
}

export default ReviewerSubmitButton
