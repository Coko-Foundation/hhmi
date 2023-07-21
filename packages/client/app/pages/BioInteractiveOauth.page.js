import React, { useState } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { BioInteractiveOauth } from 'ui'

import { BIOINTERACTIVE_LOGIN } from '../graphql'

const BioInteractiveLoginPage = props => {
  const [started, setStarted] = useState(false)
  const { search } = useLocation()

  const authCode = new URLSearchParams(search).get('code')
  const state = new URLSearchParams(search).get('state')
  const oauthError = new URLSearchParams(search).get('error')

  const [bioInteractiveLoginMutation, { data, error: loginError }] =
    useMutation(BIOINTERACTIVE_LOGIN)

  const err = loginError || oauthError

  const existingToken = localStorage.getItem('token')
  if (existingToken) return <Redirect to="/dashboard" />

  if (state !== localStorage.getItem('oauthState')) {
    return <Redirect to="/" />
  }

  const login = () => {
    const mutationData = {
      variables: { authCode },
    }

    bioInteractiveLoginMutation(mutationData).catch(e => console.error(e))
  }

  setTimeout(() => {
    if (!started) {
      setStarted(true)
      login()
    }
  }, 2000)

  if (data) {
    const { token } = data.bioInteractiveLogin

    if (token) {
      localStorage.removeItem('oauthState')
      localStorage.setItem('token', token)
      return <Redirect to="/dashboard" />
    }

    console.error('No token returned from mutation!')
  }

  return <BioInteractiveOauth hasError={!!err} />
}

BioInteractiveLoginPage.propTypes = {}

BioInteractiveLoginPage.defaultProps = {}

export default BioInteractiveLoginPage
