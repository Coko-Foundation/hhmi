import React from 'react'
import PropTypes from 'prop-types'
import { Upload as AntUpload, Tooltip } from 'antd'
import { grid, th } from '@coko/client'
import { PaperClipOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const StyledAntUpload = styled(AntUpload)`
  color: ${th('colorPrimary')};
  display: flex;
  flex-direction: row-reverse;

  & .ant-upload-list {
    background-color: ${th('colorBackground')};
    border: none;
    bottom: calc(100% + 20px);
    box-shadow: ${th('boxShadow')};
    inset-inline-end: ${grid(-3)};
    max-inline-size: 250px;
    position: absolute;

    &:has(.ant-upload-list-item) {
      border: 1px solid ${th('colorBorder')};
    }
  }

  &&& .ant-upload-list-item {
    margin-block: ${grid(1)};
    padding: ${grid(2)};
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
        <PaperClipOutlined />
      </Tooltip>
    </StyledAntUpload>
  )
}

Upload.defaultProps = {
  files: [],
}

Upload.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape()),
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default Upload
