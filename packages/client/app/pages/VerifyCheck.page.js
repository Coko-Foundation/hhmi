import React from 'react'
import { Redirect } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'

import { VerifyCheck } from 'ui'

import { CURRENT_USER, RESEND_VERIFICATION_EMAIL_AFTER_LOGIN } from '../graphql'

const VeriryCheckPage = props => {
  const [verifyingLoader, setVerifyingLoader] = React.useState(false)
  const loaderDelay = 2000

  const {
    data: currentUserData,
    // loading: currentUserLoading,
    error: currentUserError,
  } = useQuery(CURRENT_USER)

  const [resendMutation, { data, loading, error }] = useMutation(
    RESEND_VERIFICATION_EMAIL_AFTER_LOGIN,
  )

  if (error || currentUserError) console.error(error)

  const resend = () => {
    resendMutation().catch(e => console.error(e))
    setVerifyingLoader(true)
    setTimeout(() => setVerifyingLoader(false), loaderDelay)
  }

  const currentUser = currentUserData?.currentUser

  if (!currentUser) return null

  if (currentUser?.defaultIdentity.isVerified) {
    return <Redirect to="/" />
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
