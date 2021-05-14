/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form as AntForm } from 'antd'

import { grid } from '@coko/client'

import BasicRibbon from './Ribbon'

const FormWrapper = styled.div``

const Ribbon = styled(BasicRibbon)`
  margin-bottom: ${grid(2)};
`

const ModifiedFormItem = props => {
  /**
   * Disable prop types as these props will be checked in the `AntForm.Item`
   * component. Enable again if you introduce custom props.
   */

  /* eslint-disable-next-line react/prop-types */
  const { children, onBlur, validateTrigger, ...rest } = props
  const [lostFocusOnce, setLostFocusOnce] = useState(false)

  /**
   * Default behaviour is that errors only appear once you have touched the
   * input and moved away from it. Once touched, validations are run on every
   * change. Submitting a form will touch all fields. Setting validateTrigger
   * in the props will override the default behaviour. All we're doing here is
   * changing the default.
   */
  const useDefaultTrigger = !validateTrigger
  const defaultTrigger = !lostFocusOnce ? 'onBlur' : 'onChange'
  const trigger = useDefaultTrigger ? defaultTrigger : validateTrigger

  const handleBlur = () => {
    if (useDefaultTrigger && !lostFocusOnce) setLostFocusOnce(true)
    onBlur && onBlur()
  }

  return (
    <AntForm.Item onBlur={handleBlur} validateTrigger={trigger} {...rest}>
      {children}
    </AntForm.Item>
  )
}

export const ModifiedForm = props => {
  const { children, submissionStatus, ribbonMessage, ...rest } = props

  const showRibbon = !!submissionStatus && !!ribbonMessage

  return (
    <FormWrapper>
      {showRibbon && <Ribbon status={submissionStatus}>{ribbonMessage}</Ribbon>}
      <AntForm {...rest}>{children}</AntForm>
    </FormWrapper>
  )
}

ModifiedForm.propTypes = {
  ribbonMessage: PropTypes.string,
  submissionStatus: PropTypes.oneOf(['success', 'error', 'danger']),
}

ModifiedForm.defaultProps = {
  ribbonMessage: null,
  submissionStatus: null,
}

const Form = {}
Object.setPrototypeOf(Form, AntForm)

Form.render = ModifiedForm
Form.Item = ModifiedFormItem

export default Form
