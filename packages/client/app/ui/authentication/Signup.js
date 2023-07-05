import React from 'react'
import PropTypes from 'prop-types'

import AuthenticationForm from './AuthenticationForm'
import AuthenticationHeader from './AuthenticationHeader'
import AuthenticationWrapper from './AuthenticationWrapper'
// import SuccessSubTitle from './SuccessSubTitle'
import {
  Button,
  Form,
  Input,
  Link,
  Modal,
  Result,
  Checkbox,
  Paragraph,
  Page,
} from '../common'

const ModalContext = React.createContext(null)
const ModalHeader = Modal.header
const ModalFooter = Modal.footer

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

  const [modal, contextHolder] = Modal.useModal()

  const showTermsAndConditions = e => {
    e.preventDefault()
    const termsAndConditionsModal = modal.info()
    termsAndConditionsModal.update({
      title: <ModalHeader>Agreeing to Terms and Conditions</ModalHeader>,
      content: (
        <Paragraph>
          By checking “I agree” and selecting “Sign up” below, I accept the{' '}
          <Link
            as="a"
            href="https://www.biointeractive.org/hhmi-biointeractive-online-community-terms-use"
            rel="noreferrer"
            target="_blank"
          >
            HHMI BioInteractive Online Community Terms of Use
          </Link>
          ,{' '}
          <Link
            as="a"
            href="https://www.hhmi.org/terms-of-use"
            rel="noreferrer"
            target="_blank"
          >
            HHMI Terms of Use
          </Link>
          , and{' '}
          <Link
            as="a"
            href="https://www.hhmi.org/privacy-policy"
            rel="noreferrer"
            target="_blank"
          >
            HHMI Privacy Policy and Cookie Notice
          </Link>
          .
        </Paragraph>
      ),
      footer: [
        <ModalFooter key="footer">
          <Button
            autoFocus
            onClick={termsAndConditionsModal.destroy}
            type="primary"
          >
            Ok
          </Button>
        </ModalFooter>,
      ],
      maskClosable: true,
      width: 570,
      bodyStyle: {
        marginRight: 38,
        textAlign: 'justify',
      },
    })
  }

  return (
    <Page maxWidth={600}>
      <AuthenticationWrapper className={className}>
        <AuthenticationHeader>Sign up</AuthenticationHeader>

        {hasSuccess && (
          <div role="alert">
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
          </div>
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
              <Input
                autoComplete="given-name"
                placeholder="Fill in your first name"
              />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: 'Last name is required' }]}
            >
              <Input
                autoComplete="family-name"
                placeholder="Fill in your last name"
              />
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
              <Input
                autoComplete="email"
                placeholder="Fill in your email"
                type="email"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Password is required' }]}
            >
              <Input
                autoComplete="new-password"
                placeholder="Fill in your password"
                type="password"
              />
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
                autoComplete="new-password"
                placeholder="Fill in your password again"
                type="password"
              />
            </Form.Item>
            <ModalContext.Provider value={null}>
              <Form.Item
                name="agreedTc"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(
                              'You need to agree to the terms and conditions',
                            ),
                          ),
                  },
                ]}
                valuePropName="checked"
              >
                <Checkbox aria-label="I agree to the terms and conditions">
                  I agree to the{' '}
                  <Link
                    as="a"
                    href="#termsAndCondition"
                    id="termsAndConditions"
                    onClick={showTermsAndConditions}
                  >
                    terms and conditions
                  </Link>
                </Checkbox>
              </Form.Item>
              {contextHolder}
            </ModalContext.Provider>
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
