import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'

import AuthenticationForm from './AuthenticationForm'
import { Form, Input } from '../common'

const Login = props => {
  const { className, onSubmit } = props

  return (
    <AuthenticationForm
      alternativeActionLabel="Do you want to signup?"
      alternativeActionLink="/signup"
      className={className}
      onSubmit={onSubmit}
      showForgotPassword
      submitButtonLabel="Log in"
      title="Login"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Email is required',
          },
          {
            type: 'email',
            message: 'This is not a valid email address',
          },
        ]}
      >
        <Input placeholder="Please enter your email" type="email" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Password is required' }]}
      >
        <Input placeholder="Please enter your password" type="password" />
      </Form.Item>
    </AuthenticationForm>
  )
}

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

Login.defaultProps = {}

export default Login
