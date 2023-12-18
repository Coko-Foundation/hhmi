/* stylelint-disable string-quotes */
import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { MentionsInput, Mention } from 'react-mentions'
import { grid, th, useCurrentUser } from '@coko/client'

import { SendOutlined } from '@ant-design/icons'

import { Button, Upload } from '../common'
import { inputShadow } from '../common/_reusableStyles'

const MainContainer = styled('div')`
  align-items: center;
  background-color: #f5f5f5;
  border-top: 1px solid #0004;
  box-shadow: 0 0 12px #0002;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.3rem 1rem;
  z-index: 3;
`

const InputWrapper = styled.span`
  align-items: center;
  background-color: #fff;
  border: 1px solid #767676;
  display: flex;
  height: fit-content;
  padding: 0;
  position: relative;
  transition: all 0.2ms;
  width: 100%;

  &:focus-within {
    box-shadow: 0 0 2px ${th('colorPrimary')};
    outline: solid 2px ${th('colorPrimaryBorder')};
    outline-offset: 1px;
  }
`

const StyledMentionsInput = styled(MentionsInput)`
  flex-grow: 1;
  max-height: 70px;
  min-height: 30px;
  position: relative;

  textarea {
    border: none;
    max-height: 70px;
    ${inputShadow};
    overflow: auto;
    padding: ${grid(1.5)} ${grid(10)} ${grid(1)} ${grid(3)};

    &:focus {
      box-shadow: none;
      outline: none;
    }
  }

  [role='listbox'] {
    border: 1px solid ${th('colorBorder')};
    box-shadow: ${th('boxShadow')};
  }

  [role='option'] {
    color: ${th('colorText')};
    padding: ${grid(1)} ${grid(3)};
  }

  [role='option']:hover,
  [role='option'][aria-selected='true'] {
    background: ${th('colorPrimary')};
    color: ${th('colorTextReverse')};
  }
`

const StyledUpload = styled(Upload)`
  cursor: pointer;
  padding-right: 0.5rem;
  transition: outline-offset 0s, outline 0s;

  > div.ant-upload.ant-upload-select {
    align-items: center;
    display: flex;
  }

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
  border: none;
  height: 32px;
  margin: ${grid(1)} 0 ${grid(1)} 1rem;
  ${props =>
    props.$inactive &&
    `color:rgba(63, 63, 63, 0.25); 
     cursor: default;
     background: rgba(63, 63, 63, 0.04);
     &:hover, &:active, &:focus {
      color:rgba(63, 63, 63, 0.25)!important; 
      background: rgba(63, 63, 63, 0.04)!important;
     }
    `}
`

const rolesText = {
  author: '(Author)',
  handlingEditor: '(HE)',
  editor: '(Editor)',
}
// TODO -- this needs to be a wax editor with two plugins (mention & task)

const ChatInput = props => {
  const { className, onSend, participants, ...rest } = props
  const { currentUser } = useCurrentUser()
  const [inputValue, setInputValue] = useState('')
  const [mentions, setMentions] = useState([])
  const [attachments, setAttachments] = useState([])

  const inputRef = useRef(null)

  useEffect(() => {
    inputRef?.current && (inputRef.current.style.overflow = 'visible')
  }, [inputRef])

  const handleTextChange = (_, newValue, __, mentioned) => {
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
          : inputRef.current.value

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
          data={participants.filter(p => p.id !== currentUser.id)}
          displayTransform={(_, display) => `@${display}`}
          renderSuggestion={entry => {
            if (entry.role === 'author') {
              return <span>{`${entry.display} (Author)`}</span>
            }
      <InputWrapper>
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
            data={participants.filter(p => p.id !== currentUser.id)}
            displayTransform={(_, display) => `@${display}`}
            renderSuggestion={entry => (
              <span>{`${entry.display} ${rolesText[entry.role] || ''}`}</span>
            )}
            trigger="@"
          />
        </StyledMentionsInput>
        <StyledUpload
          accept="image/*,.pdf,.docx,.odt"
          aria-label="upload-attachments"
          files={attachments}
          multiple
          onChange={handleAttachmentChange}
          onRemove={handleRemoveAttachment}
        />
      </InputWrapper>
      <SendButton
        $inactive={inputValue.length === 0 && attachments.length === 0}
        data-testid="send-btn"
        onClick={handleSend}
        type="primary"
      >
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
      role: PropTypes.string,
    }),
  ),
}

ChatInput.defaultProps = {
  participants: [],
}

export default ChatInput
