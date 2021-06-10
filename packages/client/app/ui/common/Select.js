import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { debounce as lodashDebounceFunc } from 'lodash'

import { Select as AntSelect } from 'antd'

const StyledSelect = styled(AntSelect)`
  width: 100%;
`

const Select = props => {
  const {
    async,
    className,
    // debounce,
    debounceTimeout,

    // disable rule for props handled by ant
    /* eslint-disable react/prop-types */
    filterOption,
    notFoundContent,
    onSearch,
    showSearch,
    /* eslint-enable react/prop-types */

    ...rest
  } = props

  const handleSearch = searchValue => {
    onSearch(searchValue)
  }

  // const useDebounce = async ? true : debounce

  const searchFunc = async
    ? lodashDebounceFunc(handleSearch, debounceTimeout)
    : handleSearch

  return (
    <StyledSelect
      className={className}
      filterOption={async && !filterOption ? false : filterOption}
      notFoundContent={!notFoundContent && async ? null : notFoundContent}
      onSearch={onSearch && searchFunc}
      showSearch={showSearch || !!searchFunc}
      {...rest}
    />
  )
}

Select.propTypes = {
  async: PropTypes.bool,
  // debounce: PropTypes.bool,
  debounceTimeout: PropTypes.number,
}

Select.defaultProps = {
  async: false,
  // debounce: false,
  debounceTimeout: 500,
}

export default Select
