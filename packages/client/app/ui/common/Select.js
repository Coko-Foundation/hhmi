/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { debounce as lodashDebounceFunc } from 'lodash'

import { Select as AntSelect } from 'antd'

const StyledSelect = styled(AntSelect)`
  width: 100%;
`

const StyledDropdown = styled.div`
  .ant-select-item-option-content {
    ${props =>
      props.wrapOptionText &&
      css`
        white-space: normal;
      `}
  }
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

    wrapOptionText,
    ...rest
  } = props

  const handleSearch = searchValue => {
    onSearch(searchValue)
  }

  // const useDebounce = async ? true : debounce

  const searchFunc = async
    ? lodashDebounceFunc(handleSearch, debounceTimeout)
    : handleSearch

  const customDropdownRender = menu => (
    <StyledDropdown wrapOptionText={wrapOptionText}>{menu}</StyledDropdown>
  )

  return (
    <StyledSelect
      className={className}
      dropdownRender={customDropdownRender}
      filterOption={async && !filterOption ? false : filterOption}
      notFoundContent={!notFoundContent && async ? null : notFoundContent}
      onSearch={onSearch && searchFunc}
      showSearch={showSearch || !!onSearch}
      {...rest}
    />
  )
}

Select.propTypes = {
  async: PropTypes.bool,
  // debounce: PropTypes.bool,
  debounceTimeout: PropTypes.number,
  wrapOptionText: PropTypes.bool,
}

Select.defaultProps = {
  async: false,
  // debounce: false,
  debounceTimeout: 500,
  wrapOptionText: false,
}

export default Select
