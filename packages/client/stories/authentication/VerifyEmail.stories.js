/* eslint-disable no-console */

import React from 'react'

import { VerifyEmail } from 'ui'

const resend = () => console.log('resend')
const redirect = () => console.log('redirect')

export const Base = args => <VerifyEmail verifying />
export const Success = args => (
  <VerifyEmail redirectToLogin={redirect} successfullyVerified />
)
export const AlreadyVerified = args => (
  <VerifyEmail alreadyVerified redirectToLogin={redirect} />
)
export const Expired = args => <VerifyEmail expired resend={resend} />
export const Resending = args => <VerifyEmail resending />
export const Resent = args => <VerifyEmail resent />
export const Error = args => <VerifyEmail />

export default {
  component: VerifyEmail,
  title: 'Authentication/VerifyEmail',
}
