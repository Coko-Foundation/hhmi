/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { debounce as lodashDebounceFunc } from 'lodash'

import AntSelect from './ant-select'

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

const dropdownRender = (menu, wrapOptionText) => (
  <StyledDropdown wrapOptionText={wrapOptionText}>{menu}</StyledDropdown>
)

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

  useEffect(() => {
    // selectRef.current
    //   .querySelector(`.ant-select [role="combobox"]`)
    //   .setAttribute('aria-expanded', false)
    // selectRef2.current
    //   .querySelector(`.ant-select [role="combobox"]`)
    //   .setAttribute('aria-expanded', false)
    // console.log(selectRef.current)
    // console.log(selectRef2.current.selectRef.current)
    // console.log(AntSelect.)
    // console.log(StyledSelect)
    // const selectChildren = React.Children.map(
    //   StyledSelect.children,
    //   child => child,
    // )
    // console.log(selectChildren)
  }, [])

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
      defaultOpen={false}
      dropdownRender={menu => dropdownRender(menu, wrapOptionText)}
      filterOption={async && !filterOption ? false : filterOption}
      forceRender
      notFoundContent={!notFoundContent && async ? null : notFoundContent}
      onSearch={onSearch && searchFunc}
      showSearch={showSearch || !!onSearch}
      virtual={false}
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
