import React from 'react'
import styled from 'styled-components'
import { Input } from 'antd'
import { PropTypes } from 'prop-types'

import { inputShadow } from './_reusableStyles'
import SearchFiltered from './searchFiltered/SearchFiltered'

const StyledSearch = styled(Input.Search)`
  input {
    ${inputShadow}
  }
`

const Search = props => {
  const { className, withFilters, ...rest } = props

  return withFilters ? (
    <SearchFiltered {...rest} />
  ) : (
    <StyledSearch className={className} type="search" {...rest} />
  )
}

Search.propTypes = {
  withFilters: PropTypes.bool,
}

Search.defaultProps = {
  withFilters: false,
}

export default Search
