import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { SendOutlined } from '@ant-design/icons'

import { Button, Input } from '../common'

// const Wrapper = styled.div``

const SendButton = styled(Button)`
  border: none;
  color: ${props => props.theme.colorPrimary};
  outline: none;
`

// TODO -- this needs to be a wax editor with two plugins (mention & task)

const ChatInput = props => {
  const { className, onSend, ...rest } = props

  const [inputValue, setInputValue] = useState('')

  const handleChange = value => {
    setInputValue(value)
  }

  const handleSend = () => {
    if (inputValue.trim().length !== 0) {
      onSend(inputValue)
      setInputValue('')
    }
  }

  const SendIcon = (
    <SendButton data-testid="send-btn" onClick={handleSend}>
      <SendOutlined />
    </SendButton>
  )

  return (
    <Input
      className={className}
      onChange={handleChange}
      onPressEnter={handleSend}
      suffix={SendIcon}
      type="text"
      value={inputValue}
      {...rest}
    />
  )
}

ChatInput.propTypes = {
  onSend: PropTypes.func.isRequired,
}

ChatInput.defaultProps = {}

export default ChatInput
