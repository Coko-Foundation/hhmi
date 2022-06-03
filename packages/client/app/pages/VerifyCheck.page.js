import React from 'react'
import { useMutation } from '@apollo/client'

import { VerifyCheck } from 'ui'

import { RESEND_VERIFICATION_EMAIL_AFTER_LOGIN } from '../graphql'

const VeriryCheckPage = props => {
  const [verifyingLoader, setVerifyingLoader] = React.useState(false)
  const loaderDelay = 2000

  const [resendMutation, { data, loading, error }] = useMutation(
    RESEND_VERIFICATION_EMAIL_AFTER_LOGIN,
  )

  if (error) console.error(error)

  const resend = () => {
    resendMutation()
    setVerifyingLoader(true)
    setTimeout(() => setVerifyingLoader(false), loaderDelay)
  }

  return (
    <VerifyCheck
      resend={resend}
      resending={loading || verifyingLoader}
      resent={!verifyingLoader && !!data}
    />
  )
}

VeriryCheckPage.propTypes = {}

VeriryCheckPage.defaultProps = {}

export default VeriryCheckPage
