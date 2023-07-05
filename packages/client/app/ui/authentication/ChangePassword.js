/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row as AntRow, Col as AntCol } from 'antd'

import { Form, FormSection, Input } from '../common'
import ProfileForm from './ProfileForm'

const Col = styled(AntCol)``

const Row = ({ children }) => (
  <AntRow align="baseline" gutter={8}>
    {children}
  </AntRow>
)

const Wrapper = styled.div``

const ChangePassword = props => {
  const {
    className,
    form,
    loading,
    message,
    onSubmit,
    submissionStatus,
    ...rest
  } = props

  return (
    <Wrapper className={className}>
      <ProfileForm
        form={form}
        loading={loading}
        message={message}
        onSubmit={onSubmit}
        submissionStatus={submissionStatus}
        {...rest}
      >
        <FormSection label="Password" last>
          <Row>
            <Col sm={12} xs={24}>
              <Form.Item
                label="Current password"
                name="currentPassword"
                rules={[
                  {
                    required: true,
                    message:
                      'Please provide current password before changing it',
                  },
                ]}
              >
                <Input
                  autoComplete="current-password"
                  data-testid="currentPassword"
                  type="password"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col sm={12} xs={24}>
              <Form.Item
                dependencies={['currentPassword']}
                label="New password"
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: 'This field is required',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (
                        (value && !!getFieldValue('currentPassword')) ||
                        !value
                      ) {
                        return Promise.resolve()
                      }

                      return Promise.reject(
                        new Error(
                          'You must first provide the current password in order to change it!',
                        ),
                      )
                    },
                  }),
                ]}
              >
                <Input
                  autoComplete="new-password"
                  data-testid="newPassword"
                  type="password"
                />
              </Form.Item>
            </Col>

            <Col sm={12} xs={24}>
              <Form.Item
                dependencies={['newPassword']}
                label="Password confirmation"
                name="newPasswordConfirmation"
                rules={[
                  {
                    required: true,
                    message: 'This field is required',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
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
                  data-testid="newPasswordConfirmation"
                  type="password"
                />
              </Form.Item>
            </Col>
          </Row>
        </FormSection>
      </ProfileForm>
    </Wrapper>
  )
}

ChangePassword.propTypes = {
  form: PropTypes.shape(),
  loading: PropTypes.bool,
  message: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  submissionStatus: PropTypes.oneOf(['success', 'error', 'danger']),
}

ChangePassword.defaultProps = {
  form: null,
  loading: false,
  message: '',
  submissionStatus: null,
}

export default ChangePassword
