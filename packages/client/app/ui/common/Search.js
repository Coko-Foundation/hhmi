import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Input } from 'antd'

const StyledSearch = styled(Input.Search)`
  position: relative;
  padding: 0 8px;
  .ant-input {
    padding-left: 35px;
    border-radius: 3px !important;
  }
  .ant-input-group-addon {
    position: absolute;
    left: 0;
    z-index: 2;
    button.ant-input-search-button {
      border: none;
      height: 29px;
      top: 2px;
      left: 3px;
    }
  }
`

const Search = props => {
  const { className, ...rest } = props

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <StyledSearch className={className} {...rest} />
}

Search.propTypes = {}

Search.defaultProps = {}

export default Search
