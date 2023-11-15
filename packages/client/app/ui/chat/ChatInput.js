/* stylelint-disable string-quotes */
import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { MentionsInput, Mention } from 'react-mentions'
import { grid, th } from '@coko/client'

import { SendOutlined } from '@ant-design/icons'

import { Button, Upload } from '../common'
import { inputShadow } from '../common/_reusableStyles'

const MainContainer = styled('div')`
  display: flex;
  flex-direction: row;
  position: relative;
`

const StyledMentionsInput = styled(MentionsInput)`
  flex-grow: 1;
  margin: ${grid(1)};
  max-height: 70px;
  position: relative;

  textarea {
    border: 1px solid ${th('colorBorder')};
    max-height: 70px;
    ${inputShadow};
    overflow: auto;
    padding: ${grid(1)} ${grid(10)} ${grid(1)} ${grid(2)};
  }

  [role='option'] {
    color: none;
    padding: ${grid(1)};
  }

  [role='option']:hover,
  [role='option'][aria-selected='true'] {
    background: ${th('colorPrimaryBorder')};
    color: ${th('colorTextReverse')};
  }
`

const StyledUpload = styled(Upload)`
  position: absolute;
  right: 70px;
  top: 10px;
  transition: outline-offset 0s, outline 0s;

  [role='button'] {
    display: inline-flex;
    height: 16px;

    &:focus {
      outline: 4px solid #71ada9;
      outline-offset: 2px;
    }
  }
`

const SendButton = styled(Button)`
  background-color: ${props => props.theme.colorPrimaryBorder};
  border: none;
  color: ${props => props.theme.colorTextReverse};
  height: 32px;
  margin: ${grid(1)};

  &:hover,
  &:focus {
    background-color: ${props => props.theme.colorPrimary};
    /* stylelint-disable-next-line declaration-no-important */
    color: ${props => props.theme.colorTextReverse} !important;
  }
`

// TODO -- this needs to be a wax editor with two plugins (mention & task)

const ChatInput = props => {
  const { className, onSend, participants, ...rest } = props

  const [inputValue, setInputValue] = useState('')
  const [mentions, setMentions] = useState([])
  const [attachments, setAttachments] = useState([])

  const inputRef = useRef(null)

  const handleTextChange = (event, newValue, _, mentioned) => {
    setInputValue(newValue)
    const mentionIDs = mentioned.map(({ id }) => id)
    setMentions(mentionIDs)
  }

  const handleKeyDown = e => {
    if (
      e.key === 'Enter' &&
      !e.shiftKey &&
      inputRef.current.selectionStart === inputRef.current.value.length
    ) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleAttachmentChange = ({ fileList }) => {
    setAttachments(fileList)
  }

  const handleRemoveAttachment = file => {
    setAttachments(selectedFiles =>
      selectedFiles.filter(item => item.uid !== file.uid),
    )
  }

  const handleSend = async () => {
    if (inputValue.trim().length !== 0 || attachments.length > 0) {
      const content =
        inputRef.current.value.trim().length === 0
          ? ' '
          : inputRef.current.value.replace(/\r?\n/g, '<br />')

      onSend(content, mentions, attachments)
      setInputValue('')
      setAttachments([])
      setMentions([])
      inputRef.current.focus()
    }
  }

  return (
    <MainContainer>
      <StyledMentionsInput
        className="mentions-input"
        forceSuggestionsAboveCursor
        inputRef={inputRef}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
        value={inputValue}
        {...rest}
      >
        <Mention
          appendSpaceOnAdd
          data={participants}
          displayTransform={(_, display) => `@${display}`}
          trigger="@"
        />
      </StyledMentionsInput>
      <StyledUpload
        accept=".pdf,.jpeg,.png"
        aria-label="upload-attachments"
        files={attachments}
        multiple
        onChange={handleAttachmentChange}
        onRemove={handleRemoveAttachment}
      />
      <SendButton data-testid="send-btn" onClick={handleSend}>
        <SendOutlined />
      </SendButton>
    </MainContainer>
  )
}

ChatInput.propTypes = {
  onSend: PropTypes.func.isRequired,
  participants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      display: PropTypes.string,
    }),
  ),
}

ChatInput.defaultProps = {
  participants: [],
}

export default ChatInput
