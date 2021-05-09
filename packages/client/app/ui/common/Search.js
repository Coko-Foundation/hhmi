import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Input } from 'antd'

const StyledSearch = styled(Input.Search)`
  /* .ant-input-search-button {
    border-left: 0;
  } */
`

const Search = props => {
  const { className, ...rest } = props

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <StyledSearch className={className} {...rest} />
}

Search.propTypes = {}

Search.defaultProps = {}

export default Search
