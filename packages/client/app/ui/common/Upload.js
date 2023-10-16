import React from 'react'
import PropTypes from 'prop-types'
import { Upload as AntUpload, Tooltip } from 'antd'
import { grid } from '@coko/client'
import { PaperClipOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import Button from './Button'

const UploadButton = styled(Button)`
  outline: none;
  border: none;
  margin-inline: ${grid(1)};
  color: ${props => props.theme.colorPrimary};
`

const StyledAntUpload = styled(AntUpload)`
  display: flex;
  flex-direction: row-reverse;
  & .ant-upload-list {
    display: flex;
    flex-direction: row;
  }
  & .ant-upload-list-item {
    border: 1px solid grey;
    padding: ${grid(2)};
    margin: ${grid(1)};
    border-radius: 10px;
  }
`

const Upload = ({ files, onChange, onRemove, ...rest }) => {
  return (
    <StyledAntUpload
      beforeUpload={() => false}
      fileList={files}
      onChange={onChange}
      onRemove={onRemove}
      {...rest}
    >
      <Tooltip placement="leftBottom" title="Upload files">
        <UploadButton icon={<PaperClipOutlined />} shape="round" />
      </Tooltip>
    </StyledAntUpload>
  )
}

Upload.defaultProps = {
  files: [],
}

Upload.propTypes = {
  files: PropTypes.arrayOf(),
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default Upload
