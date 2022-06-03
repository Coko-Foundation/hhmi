import React from 'react'
// import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
// import styled from 'styled-components'

import AuthenticationForm from './AuthenticationForm'
import AuthenticationHeader from './AuthenticationHeader'
import AuthenticationWrapper from './AuthenticationWrapper'
import SuccessSubTitle from './SuccessSubTitle'
import { Button, Form, Input, Paragraph, Result, Page } from '../common'

const RequestPasswordResetForm = props => {
  // disable prop types that will be checked in the exported component anyway
  // eslint-disable-next-line react/prop-types
  const { hasError, loading, onSubmit } = props

  return (
    <AuthenticationForm
      alternativeActionLabel="Return to login form"
      alternativeActionLink="/login"
      errorMessage="Something went wrong! Please contact the administrator."
      hasError={hasError}
      loading={loading}
      onSubmit={onSubmit}
      // submitButtonLabel="Send"
    >
      <Paragraph>
        Please enter the email address connected to your account.
      </Paragraph>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Email is required' },
          { type: 'email', message: "Doesn't look like a valid email" },
        ]}
      >
        <Input placeholder="Enter your email" />
      </Form.Item>
    </AuthenticationForm>
  )
}

const RequestPasswordReset = props => {
  const { className, hasError, hasSuccess, loading, onSubmit, userEmail } =
    props

  return (
    <Page maxWidth={600}>
      <AuthenticationWrapper className={className}>
        <AuthenticationHeader>Request password reset</AuthenticationHeader>

        {hasSuccess && (
          <Result
            extra={[
              <Button key={1} type="link">
                Return to the login form
              </Button>,
            ]}
            status="success"
            subTitle={<SuccessSubTitle userEmail={userEmail} />}
            title="Request successful!"
          />
        )}

        {!hasSuccess && (
          <RequestPasswordResetForm
            hasError={hasError}
            loading={loading}
            onSubmit={onSubmit}
          />
        )}
      </AuthenticationWrapper>
    </Page>
  )
}

RequestPasswordReset.propTypes = {
  onSubmit: PropTypes.func.isRequired,

  hasError: PropTypes.bool,
  hasSuccess: PropTypes.bool,
  loading: PropTypes.bool,
  userEmail: PropTypes.string,
}

RequestPasswordReset.defaultProps = {
  hasError: false,
  hasSuccess: false,
  loading: false,
  userEmail: null,
}

export default RequestPasswordReset
