/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
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
    maxCount,

    // disable rule for props handled by ant
    /* eslint-disable react/prop-types */
    filterOption,
    mode,
    notFoundContent,
    onSearch,
    showSearch,
    options,
    /* eslint-enable react/prop-types */

    wrapOptionText,
    ...rest
  } = props

  const [selectOptions, setSelectOptions] = useState(options)

  // check if mode === multiple and there is a max count
  // the following state and handleChange are relevant only to this case
  const modeMutipleWithMaxCount = mode === 'multiple' && !!maxCount > 0
  const [multipleValues, setMultipleValues] = useState([])

  const handleChange = vals => {
    // when reaching maxCount
    if (mode === 'multiple' && vals.length === maxCount) {
      // disable all other options
      setSelectOptions(opts => {
        return opts.map(opt => {
          if (vals.indexOf(opt.value) === -1) return { ...opt, disabled: true }
          return opt
        })
      })
    }

    // when deselecting after reaching maxCount
    if (multipleValues.length === maxCount && vals.length < maxCount) {
      // re-enable the other options as per initial state
      setSelectOptions(options)
    }

    setMultipleValues(vals)
  }

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
      // eslint-disable-next-line react/no-unstable-nested-components
      dropdownRender={menu => {
        return (
          <StyledDropdown wrapOptionText={wrapOptionText}>
            {menu}
          </StyledDropdown>
        )
      }}
      filterOption={async && !filterOption ? false : filterOption}
      mode={mode}
      notFoundContent={!notFoundContent && async ? null : notFoundContent}
      onSearch={onSearch && searchFunc}
      options={modeMutipleWithMaxCount ? selectOptions : options}
      showSearch={showSearch || !!onSearch}
      {...(modeMutipleWithMaxCount
        ? {
            onChange: handleChange,
            value: multipleValues,
          }
        : {})}
      {...rest}
    />
  )
}

Select.propTypes = {
  async: PropTypes.bool,
  // debounce: PropTypes.bool,
  debounceTimeout: PropTypes.number,
  maxCount: PropTypes.number,
  wrapOptionText: PropTypes.bool,
}

Select.defaultProps = {
  async: false,
  // debounce: false,
  debounceTimeout: 500,
  maxCount: 0,
  wrapOptionText: false,
}

export default Select
