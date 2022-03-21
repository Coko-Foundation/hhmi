import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Radio as AntRadio } from 'antd'

const StyledRadioGroup = styled(AntRadio.Group)`
  ${props =>
    props.vertical &&
    css`
      display: flex;
      flex-direction: column;
    `}

  .ant-radio-inner,
  .ant-radio-inner::after,
  .ant-radio-checked,
  .ant-radio-button-wrapper,
  .ant-radio-button-wrapper::before {
    transition-duration: 0.1s;
  }
`

/**
 * Props are the same as Ant's RadioGroup https://ant.design/components/radio/#RadioGroup
 * with the addition of `vertical` and a slightly modified `onChange`.
 */
const Radio = props => {
  const { className, onChange, vertical, ...rest } = props

  const handleChange = e => onChange(e.target.value)

  return (
    <StyledRadioGroup
      className={className}
      onChange={handleChange}
      vertical={vertical}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  )
}

Radio.propTypes = {
  /** Handle change. First argument is the incoming `value`. */
  onChange: PropTypes.func,
  /** Arrange items vertically instead of inline. */
  vertical: PropTypes.bool,
}

Radio.defaultProps = {
  onChange: null,
  vertical: false,
}

export default Radio
