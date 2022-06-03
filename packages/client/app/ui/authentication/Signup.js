import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'

import AuthenticationForm from './AuthenticationForm'
import AuthenticationHeader from './AuthenticationHeader'
import AuthenticationWrapper from './AuthenticationWrapper'
// import SuccessSubTitle from './SuccessSubTitle'
import { Form, Input, Result, Checkbox, Paragraph, Page } from '../common'

const Signup = props => {
  const {
    className,
    errorMessage,
    hasError,
    hasSuccess,
    loading,
    onSubmit,
    // userEmail,
  } = props

  return (
    <Page maxWidth={600}>
      <AuthenticationWrapper className={className}>
        <AuthenticationHeader>Sign up</AuthenticationHeader>

        {hasSuccess && (
          <Result
            className={className}
            status="success"
            subTitle={
              <Paragraph>
                We&apos;ve sent you a verification email. Click on the link in
                the email to activate your account.
              </Paragraph>
            }
            title="Sign up successful!"
          />
        )}

        {!hasSuccess && (
          <AuthenticationForm
            alternativeActionLabel="Do you want to login instead?"
            alternativeActionLink="/login"
            errorMessage={errorMessage}
            hasError={hasError}
            loading={loading}
            onSubmit={onSubmit}
            showForgotPassword={false}
            submitButtonLabel="Sign up"
            title="Sign up"
          >
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: 'First name is required' }]}
            >
              <Input placeholder="Fill in your first name" />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: 'Last name is required' }]}
            >
              <Input placeholder="Fill in your last name" />
            </Form.Item>

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
              <Input placeholder="Fill in your email" type="email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Password is required' }]}
            >
              <Input placeholder="Fill in your password" type="password" />
            </Form.Item>

            <Form.Item
              dependencies={['password']}
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }

                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!',
                      ),
                    )
                  },
                }),
              ]}
            >
              <Input
                placeholder="Fill in your password again"
                type="password"
              />
            </Form.Item>

            <Form.Item
              name="agreedTc"
              rules={[
                {
                  required: true,
                  message: 'You need to agreee to the terms and conditions',
                },
              ]}
              valuePropName="checked"
            >
              <Checkbox>I agree to the terms and conditions</Checkbox>
            </Form.Item>
          </AuthenticationForm>
        )}
      </AuthenticationWrapper>
    </Page>
  )
}

Signup.propTypes = {
  onSubmit: PropTypes.func.isRequired,

  errorMessage: PropTypes.string,
  hasError: PropTypes.bool,
  hasSuccess: PropTypes.bool,
  loading: PropTypes.bool,
  // userEmail: PropTypes.string,
}

Signup.defaultProps = {
  errorMessage: null,
  hasError: false,
  hasSuccess: false,
  loading: false,
  // userEmail: null,
}

export default Signup
