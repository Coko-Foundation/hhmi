import React, { useEffect } from 'react'
import { Redirect, useHistory, useLocation } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { useCurrentUser } from '@coko/client'

import { BioInteractiveOauth } from 'ui'

import { BIOINTERACTIVE_LOGIN } from '../graphql'

const BioInteractiveLoginPage = props => {
  const { search } = useLocation()
  const history = useHistory()
  const { currentUser } = useCurrentUser()

  const authCode = new URLSearchParams(search).get('code')
  const state = new URLSearchParams(search).get('state')
  const oauthError = new URLSearchParams(search).get('error')

  const [bioInteractiveLoginMutation, { error: loginError }] =
    useMutation(BIOINTERACTIVE_LOGIN)

  const err = loginError || oauthError

  if (currentUser) return <Redirect to="/dashboard" />

  if (state !== localStorage.getItem('oauthState')) {
    // after logging in redirect to the Browse Items page
    return <Redirect to="/discover" />
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

  useEffect(() => {
    login()
  }, [])

  return <BioInteractiveOauth hasError={!!err} />
}

BioInteractiveLoginPage.propTypes = {}

BioInteractiveLoginPage.defaultProps = {}

export default BioInteractiveLoginPage
