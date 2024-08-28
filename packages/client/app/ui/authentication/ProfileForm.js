/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { grid } from '@coko/client'
import { Form, Button, VisuallyHiddenElement } from '../common'

const Wrapper = styled.div``

const FormButtonsContainer = styled.div`
  display: flex;
  gap: ${grid(1)};
  justify-content: right;
  padding: 0 ${grid(4)};
`

const ProfileForm = props => {
  const {
    children,
    className,
    message,
    form,
    loading,
    onSubmit,
    showSecondaryButton,
    secondaryButtonAction,
    secondaryButtonLabel,
    submitButtonLabel,
    submissionStatus,
    userId,
    ...rest
  } = props

  return (
    <Wrapper className={className}>
      <Form
        disabled={!!userId}
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        ribbonMessage={message}
        ribbonPosition="bottom"
        submissionStatus={submissionStatus}
        {...rest}
      >
        {children}

        <FormButtonsContainer>
          {showSecondaryButton && (
            <Button disabled={loading} onClick={secondaryButtonAction}>
              {secondaryButtonLabel}
            </Button>
          )}

          <Button
            data-testid="profile-form-submit-button"
            htmlType="submit"
            loading={loading}
            type="primary"
          >
            {submitButtonLabel}
          </Button>
        </FormButtonsContainer>

        {loading && (
          <VisuallyHiddenElement role="status">
            Saving profile
          </VisuallyHiddenElement>
        )}
      </Form>
    </Wrapper>
  )
}

ProfileForm.propTypes = {
  /** optional form instance to control the form from the parent */
  form: PropTypes.shape(),
  loading: PropTypes.bool,
  message: PropTypes.string,
  /** Function that receives the values as parameter */
  onSubmit: PropTypes.func.isRequired,
  showSecondaryButton: PropTypes.bool,
  secondaryButtonAction: PropTypes.func,
  secondaryButtonLabel: PropTypes.string,
  submitButtonLabel: PropTypes.string,
  submissionStatus: PropTypes.oneOf(['success', 'error', 'danger']),
  userId: PropTypes.string,
}

ProfileForm.defaultProps = {
  form: null,
  loading: false,
  message: '',
  showSecondaryButton: false,
  secondaryButtonAction: () => {},
  secondaryButtonLabel: 'Cancel',
  submitButtonLabel: 'Save',
  submissionStatus: null,
  userId: null,
}

export default ProfileForm
