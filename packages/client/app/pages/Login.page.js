import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { Login } from 'ui'
import { LOGIN } from '../graphql'

const LoginPage = props => {
  const history = useHistory()
  const { search } = useLocation()

  const [loginMutation, { data, loading, error }] = useMutation(LOGIN)

  const redirectUrl = new URLSearchParams(search).get('next') || '/'

  const login = formData => {
    const mutationData = {
      variables: {
        input: formData,
      },
    }

    loginMutation(mutationData)
  }

  const existingToken = localStorage.getItem('token')
  if (existingToken) history.push(redirectUrl)

  let errorMessage = 'Something went wrong!'

  if (error) {
    console.error(error)

    if (error.message.includes('username or password'))
      errorMessage = 'Invalid credentials'
  }

  if (data) {
    const token = data.login?.token

    if (token) {
      localStorage.setItem('token', token)
      history.push(redirectUrl)
    }

    console.error('No token returned from mutation!')
  }

  return (
    <Login
      errorMessage={errorMessage}
      hasError={!!error}
      loading={loading}
      onSubmit={login}
    />
  )
}

LoginPage.propTypes = {}

LoginPage.defaultProps = {}

export default LoginPage
