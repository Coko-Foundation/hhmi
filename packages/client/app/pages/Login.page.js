import React, { useState } from 'react'
import { useLocation, Redirect } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { useCurrentUser, uuid } from '@coko/client'

import { Login } from 'ui'
import { EMAIL_LOGIN } from '../graphql'

const LoginPage = () => {
  const { search } = useLocation()

  const { currentUser, setCurrentUser } = useCurrentUser()

  const [emailLoginMutation, { data, loading, error }] =
    useMutation(EMAIL_LOGIN)

  const [bioInteractiveLoading, setBioInteractiveLoading] = useState(false)

  const {
    CLIENT_BIOINTERACTIVE_OAUTH_CLIENT_ID,
    CLIENT_BIOINTERACTIVE_OAUTH_REDIRECT_URI,
    CLIENT_SHOW_EMAIL_LOGIN_OPTION,
  } = process.env

  const redirectUrl = new URLSearchParams(search).get('next') || '/dashboard'

  const login = formData => {
    const mutationData = {
      variables: {
        input: formData,
      },
    }

    emailLoginMutation(mutationData).catch(e => console.error(e))
  }

  const handleBioInteractiveClick = () => {
    setBioInteractiveLoading(true)

    const oauthState = uuid()
    const clientId = CLIENT_BIOINTERACTIVE_OAUTH_CLIENT_ID
    const redirectUri = CLIENT_BIOINTERACTIVE_OAUTH_REDIRECT_URI

    localStorage.setItem('oauthState', oauthState)

    window.location.assign(
      `https://www.biointeractive.org/oauth2/authorize/?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=openid&state=${oauthState}`,
    )
  }

  if (currentUser) return <Redirect to={redirectUrl} />

  let errorMessage = 'Something went wrong!'

  if (error?.message.includes('username or password'))
    errorMessage = 'Invalid credentials'

  if (data) {
    const token = data.login?.token

    setCurrentUser(data.login?.user)

    if (token) {
      localStorage.setItem('token', token)
      return <Redirect to={redirectUrl} />
    }

    console.error('No token returned from mutation!')
  }

  return (
    <Login
      bioInteractiveLoading={bioInteractiveLoading}
      errorMessage={errorMessage}
      hasError={!!error}
      loading={loading}
      onBioInteractiveClick={handleBioInteractiveClick}
      onSubmit={login}
      showEmailOption={CLIENT_SHOW_EMAIL_LOGIN_OPTION === 'true'}
    />
  )
}

LoginPage.propTypes = {}

LoginPage.defaultProps = {}

export default LoginPage
