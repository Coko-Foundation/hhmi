import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Input as AntInput } from 'antd'

const Wrapper = styled.div``

const StyledInput = styled(AntInput)``

const StyledPassword = styled(AntInput.Password)``

const Input = props => {
  const { className, onChange, type, ...rest } = props

  const handleChange = e => onChange && onChange(e.target.value)

  return (
    <Wrapper className={className}>
      {type !== 'password' && <StyledInput onChange={handleChange} {...rest} />}

      {type === 'password' && (
        <StyledPassword onChange={handleChange} {...rest} />
      )}
    </Wrapper>
  )
}

Input.propTypes = {
  /** Handle change. First argument is the incoming `value`. */
  onChange: PropTypes.func,
  /** Define type of input. For other valid html input types, we have created separate components (eg. TextArea). */
  type: PropTypes.string,
}

Input.defaultProps = {
  onChange: null,
  type: 'text',
}

export default Input
