import React, { useEffect } from 'react'
import { Redirect, useHistory, useLocation } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { BioInteractiveOauth } from 'ui'

import { BIOINTERACTIVE_LOGIN } from '../graphql'

const BioInteractiveLoginPage = props => {
  const { search } = useLocation()
  const history = useHistory()

  const authCode = new URLSearchParams(search).get('code')
  const state = new URLSearchParams(search).get('state')
  const oauthError = new URLSearchParams(search).get('error')

  const [bioInteractiveLoginMutation, { error: loginError }] =
    useMutation(BIOINTERACTIVE_LOGIN)

  const err = loginError || oauthError

  const existingToken = localStorage.getItem('token')
  if (existingToken) return <Redirect to="/dashboard" />

  if (state !== localStorage.getItem('oauthState')) {
    return <Redirect to="/" />
  }

  const login = () => {
    bioInteractiveLoginMutation({
      variables: { authCode },
      onCompleted: data => {
        const { token } = data.bioInteractiveLogin

        if (token) {
          localStorage.removeItem('oauthState')
          localStorage.setItem('token', token)
          history.go(0)
        }

        console.error('No token returned from mutation!')
      },
    }).catch(e => console.error(e))
  }

  useEffect(login, [])

  return <BioInteractiveOauth hasError={!!err} />
}

BioInteractiveLoginPage.propTypes = {}

BioInteractiveLoginPage.defaultProps = {}

export default BioInteractiveLoginPage
