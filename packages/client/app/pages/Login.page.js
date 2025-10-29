import React, { useState } from 'react'
import { useLocation, Redirect } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { useCurrentUser, uuid } from '@coko/client'

import { Login } from 'ui'
import { GET_LOGIN_CONFIG, EMAIL_LOGIN } from '../graphql'

const LoginPage = () => {
  const { search } = useLocation()

  const { currentUser, setCurrentUser } = useCurrentUser()

  const {
    data: {
      getLoginConfig: {
        showEmailLogin,
        biointeractiveOathClientId,
        biointeractiveOathRedirectUri,
      } = {},
    } = {},
    loading: loadingConfig,
  } = useQuery(GET_LOGIN_CONFIG)

  const [emailLoginMutation, { data, loading, error }] =
    useMutation(EMAIL_LOGIN)

  const [bioInteractiveLoading, setBioInteractiveLoading] = useState(false)

  const redirectUrl = new URLSearchParams(search).get('next') || '/dashboard'

  const login = formData => {
    const mutationData = {
      variables: {
        input: { ...formData, email: formData.email.toLowerCase() },
      },
    }

    emailLoginMutation(mutationData).catch(e => console.error(e))
  }

  const handleBioInteractiveClick = () => {
    if (!biointeractiveOathClientId || !biointeractiveOathRedirectUri) {
      // eslint-disable-next-line no-alert
      alert('Biointeractive SSO is disabled for this site')
      return
    }

    setBioInteractiveLoading(true)

    const oauthState = uuid()
    const clientId = biointeractiveOathClientId
    const redirectUri = biointeractiveOathRedirectUri

    if (window.location.search?.length) {
      localStorage.setItem('redirectTo', window.location.search)
    }

    localStorage.setItem('oauthState', oauthState)

    window.location.assign(
      `https://www.biointeractive.org/oauth2/authorize/?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=openid&state=${oauthState}`,
    )
  }

  if (currentUser) return <Redirect to={redirectUrl} />
  if (currentUser === null) localStorage.removeItem('profileSubmitted')

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
      loadingConfig={loadingConfig}
      onBioInteractiveClick={handleBioInteractiveClick}
      onSubmit={login}
      showEmailOption={showEmailLogin}
    />
  )
}

LoginPage.propTypes = {}

LoginPage.defaultProps = {}

export default LoginPage
