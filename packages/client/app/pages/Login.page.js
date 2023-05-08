import React from 'react'
import { useLocation, Redirect } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { useCurrentUser } from '@coko/client'

import { Login } from 'ui'
import { LOGIN } from '../graphql'

const LoginPage = props => {
  const { search } = useLocation()

  const { currentUser, setCurrentUser } = useCurrentUser()

  const [loginMutation, { data, loading, error }] = useMutation(LOGIN)

  const redirectUrl = new URLSearchParams(search).get('next') || '/dashboard'

  const login = formData => {
    const mutationData = {
      variables: {
        input: formData,
      },
    }

    loginMutation(mutationData).catch(e => console.error(e))
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
