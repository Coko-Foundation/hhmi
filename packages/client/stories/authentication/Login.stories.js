/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react'
// import { lorem } from 'faker'

import { Login } from 'ui'
import { Background } from '../../app/utilities/_helpers'

export const Base = args => (
  <Background>
    <Login {...args} />
  </Background>
)

export const FailingLogin = () => {
  const [hasError, setHasError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    setHasError(false)
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setHasError(true)
    }, 2000)
  }

  const dummyFunc = () => {}

  return (
    <Background>
      <Login
        emailSelected
        errorMessage="This is not a valid user / password combination"
        hasError={hasError}
        loading={loading}
        onBioInteractiveClick={dummyFunc}
        onEmailClick={dummyFunc}
        onSubmit={handleSubmit}
      />
    </Background>
  )
}

export default {
  component: Login,
  title: 'Authentication/Login',
  parameters: { actions: { argTypesRegex: '^on.*' } },
}
