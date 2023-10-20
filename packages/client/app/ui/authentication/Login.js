import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { grid } from '@coko/client'

import { Form, Input, Page, Button } from '../common'
import AuthenticationForm from './AuthenticationForm'
import AuthenticationHeader from './AuthenticationHeader'
import AuthenticationMethod from './AuthenticationMethod'
import AuthenticationWrapper from './AuthenticationWrapper'

const StyledButton = styled(Button)`
  inline-size: 100%;
  margin-block-start: ${grid(4)};
`

const Login = props => {
  const {
    bioInteractiveLoading,
    className,
    errorMessage,
    hasError,
    loading,
    loadingConfig,
    onBioInteractiveClick,
    onSubmit,
    showEmailOption,
  } = props

  const [emailSelected, setEmailSelected] = useState(false)

  return (
    <Page maxWidth={600}>
      <AuthenticationWrapper className={className}>
        <AuthenticationHeader>Login</AuthenticationHeader>

        {!emailSelected && (
          <AuthenticationMethod
            bioInteractiveLoading={bioInteractiveLoading}
            loadingConfig={loadingConfig}
            onBioInteractiveClick={onBioInteractiveClick}
            onEmailClick={() => setEmailSelected(true)}
            showEmailOption={showEmailOption}
          />
        )}

        {emailSelected && (
          <>
            <AuthenticationForm
              alternativeActionLabel="Do you want to signup instead?"
              alternativeActionLink="/signup"
              errorMessage={errorMessage}
              hasError={hasError}
              loading={loading}
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
                <Input
                  autoComplete="email"
                  placeholder="Please enter your email"
                  type="email"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Password is required' }]}
              >
                <Input
                  autoComplete="current-password"
                  placeholder="Please enter your password"
                  type="password"
                />
              </Form.Item>
            </AuthenticationForm>
            <StyledButton
              onClick={() => {
                setEmailSelected(false)
              }}
            >
              Choose another login method
            </StyledButton>
          </>
        )}
      </AuthenticationWrapper>
    </Page>
  )
}

Login.propTypes = {
  bioInteractiveLoading: PropTypes.bool,
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool,
  loading: PropTypes.bool,
  loadingConfig: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onBioInteractiveClick: PropTypes.func.isRequired,
  showEmailOption: PropTypes.bool,
}

Login.defaultProps = {
  bioInteractiveLoading: false,
  errorMessage: null,
  hasError: false,
  loading: false,
  loadingConfig: false,
  showEmailOption: false,
}

export default Login
