import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { MentionsInput, Mention } from 'react-mentions'
import { grid } from '@coko/client'

import { SendOutlined } from '@ant-design/icons'

import { Button, Upload } from '../common'

const MainContainer = styled('div')`
  display: flex;
  flex-direction: column;
`

const SendButton = styled(Button)`
  background: none;
  border: none;
  color: ${props => props.theme.colorPrimary};
  outline: none;
`

const InputWrapper = styled('div')`
  display: flex;
  border: 1px solid grey;
  margin-block: ${grid(1)};
  padding: ${grid(2)};
  border-radius: 20px;

  // overrding react-mentions styles
  .mentions-input {
    flex-grow: 1;
    height: 100%;
  }
  .mentions-input__input {
    outline: none;
    border: none;
  }
  .mentions-input__suggestions__list {
    border: 1px solid ${props => props.theme.colorPrimaryBorder};
    border-radius: ${grid(1)};
  }
  .mentions-input__suggestions__item {
    padding-inline: ${grid(2)};
  }
  .mentions-input__suggestions__item--focused {
    background: ${props => props.theme.colorPrimaryBorder};
    color: ${props => props.theme.colorBackground};
  }
`

const UploadWrapper = styled('div')`
  align-self: end;
`

// TODO -- this needs to be a wax editor with two plugins (mention & task)

const ChatInput = props => {
  const { className, onSend, participants, ...rest } = props

  const [inputValue, setInputValue] = useState('')
  const [mentions, setMentions] = useState([])
  const [attachments, setAttachments] = useState([])

  const handleTextChange = (_, __, newPlainTextValue, newMentions) => {
    setInputValue(newPlainTextValue)
    const mentionIDs = newMentions.map(({ id }) => id)
    setMentions(curMentions => [...curMentions, ...mentionIDs])
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
    if (inputValue.trim().length !== 0) {
      onSend(inputValue, mentions, attachments)
      setInputValue('')
      setAttachments([])
    }
  }

  return (
    <MainContainer>
      <UploadWrapper style={{ alignSelf: 'end' }}>
        <Upload
          files={attachments}
          onChange={handleAttachmentChange}
          onRemove={handleRemoveAttachment}
        />
      </UploadWrapper>
      <InputWrapper>
        <MentionsInput
          className="mentions-input"
          forceSuggestionsAboveCursor
          onChange={handleTextChange}
          value={inputValue}
          {...rest}
        >
          <Mention
            appendSpaceOnAdd
            data={participants}
            displayTransform={(_, display) => `@${display}`}
            trigger="@"
          />
        </MentionsInput>
        <SendButton data-testid="send-btn" onClick={handleSend}>
          <SendOutlined />
        </SendButton>
      </InputWrapper>
    </MainContainer>
  )
}

ChatInput.propTypes = {
  onSend: PropTypes.func.isRequired,
  participants: PropTypes.arrayOf({
    id: PropTypes.string,
    display: PropTypes.string,
  }),
}

ChatInput.defaultProps = {
  participants: [],
}

export default ChatInput
