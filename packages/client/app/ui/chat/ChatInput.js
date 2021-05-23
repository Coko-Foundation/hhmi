import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { SendOutlined } from '@ant-design/icons'

import { Input } from '../common'

// const Wrapper = styled.div``

const Send = styled(SendOutlined)`
  color: ${props => props.theme.colorPrimary};

  &:hover {
    cursor: pointer;
  }
`

// TODO -- this needs to be a wax editor with two plugins (mention & task)

const ChatInput = props => {
  const { className, onSend } = props

  const [inputValue, setInputValue] = useState('')

  const handleChange = value => {
    setInputValue(value)
  }

  const handleSend = () => onSend(inputValue)

  const SendIcon = <Send onClick={handleSend} />

  return (
    // <Wrapper className={className}>
    <Input
      className={className}
      onChange={handleChange}
      onPressEnter={handleSend}
      suffix={SendIcon}
    />
    // </Wrapper>
  )
}

ChatInput.propTypes = {
  onSend: PropTypes.func.isRequired,
}

ChatInput.defaultProps = {}

export default ChatInput
