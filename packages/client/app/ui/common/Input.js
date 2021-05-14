import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Input as AntInput } from 'antd'
// import { FormItem, Input as AntInput } from 'formik-antd'

const Wrapper = styled.div``

const StyledInput = styled(AntInput)``

const StyledPassword = styled(AntInput.Password)``

const Input = props => {
  const {
    className,
    // name,
    onChange,
    type,
    ...rest
  } = props

  const handleChange = e => onChange(e.target.value)

  return (
    <Wrapper className={className}>
      {/* <FormItem label="hello" name={name}> */}
      {type !== 'password' && (
        <StyledInput
          // name={name}
          onChange={handleChange}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
        />
      )}

      {type === 'password' && (
        <StyledPassword
          // name={name}
          onChange={handleChange}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
        />
      )}
      {/* </FormItem> */}
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
