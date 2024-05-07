import React from 'react'
import PropTypes from 'prop-types'
import { Upload as AntUpload, Tooltip } from 'antd'
import { PaperClipOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const StyledAntUpload = styled(AntUpload)``

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
