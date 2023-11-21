import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Button } from '../common'

const ReviewerAcceptButton = props => {
  const { className, onAccept, showDialog } = props

  const [loading, setLoading] = useState(false)

  const handleAcceptInvite = () => {
    setLoading(true)

    onAccept()
      .then(() => {
        showDialog(
          'success',
          'Invite accepted successfully',
          'The invite to review was accepted successfully',
        )
      })
      .catch(() => {
        showDialog(
          'error',
          'Problem accepting review invite',
          'There was an error while accepting your invite. Please try again!',
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Button
      className={className}
      id="reviewerRejectInvite"
      loading={loading}
      onClick={handleAcceptInvite}
      type="primary"
    >
      Accept Invite
    </Button>
  )
}

ReviewerAcceptButton.propTypes = {
  onAccept: PropTypes.func.isRequired,
  showDialog: PropTypes.func.isRequired,
}

export default ReviewerAcceptButton
