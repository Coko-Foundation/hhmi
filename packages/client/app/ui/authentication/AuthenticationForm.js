import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { grid } from '@coko/client'

import { Form, H1, Button } from '../common'

const Wrapper = styled.div`
  /* border: 1px solid black; */
  padding: ${grid(12)};
`

const Title = styled(H1)`
  text-align: center;
`

const SubmitButton = styled(Button)`
  width: 100%;
`

const Footer = styled.div`
  display: flex;
  justify-content: ${props =>
    props.showForgotPassword ? 'space-between' : 'flex-end'};
  margin-top: ${grid(4)};
`

const ForgotPassword = styled.div`
  > a {
    color: ${props => props.theme.colorText};
  }
`

const AlternativeAction = styled.div`
  font-weight: bold;

  > a {
    color: ${props => props.theme.colorText};
  }
`

const AuthenticationForm = props => {
  const {
    alternativeActionLabel,
    alternativeActionLink,
    className,
    children,
    forgotPasswordUrl,
    onSubmit,
    showForgotPassword,
    submitButtonLabel,
    title,
  } = props

  return (
    <Wrapper className={className}>
      <Title>
        {/* <H1> */}
        {title}
        {/* </H1> */}
      </Title>

      <Form layout="vertical" onFinish={onSubmit}>
        {children}

        <SubmitButton htmlType="submit" type="primary">
          {submitButtonLabel}
        </SubmitButton>

        <Footer showForgotPassword={showForgotPassword}>
          {showForgotPassword && (
            <ForgotPassword>
              <a href={forgotPasswordUrl}>Forgot your password?</a>
            </ForgotPassword>
          )}

          <AlternativeAction>
            <a href={alternativeActionLink}>{alternativeActionLabel}</a>
          </AlternativeAction>
        </Footer>
      </Form>
    </Wrapper>
  )
}

AuthenticationForm.propTypes = {
  /** Text displayed at bottom right */
  alternativeActionLabel: PropTypes.string.isRequired,
  /** Link to redirect to when clicking on alternative action */
  alternativeActionLink: PropTypes.string.isRequired,
  /** Link to redirect to when clicking on "forgot password" */
  forgotPasswordUrl: PropTypes.string,
  /** Function to run on form submit */
  onSubmit: PropTypes.func.isRequired,
  /** Show / hide "forgot password" */
  showForgotPassword: PropTypes.bool,
  /** Text displayed inside submit button */
  submitButtonLabel: PropTypes.string,
  /** Title above the form */
  title: PropTypes.string.isRequired,
}

AuthenticationForm.defaultProps = {
  forgotPasswordUrl: '/password-reset',
  showForgotPassword: false,
  submitButtonLabel: 'Submit',
}

export default AuthenticationForm
