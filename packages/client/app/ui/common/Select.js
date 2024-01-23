/* stylelint-disable indentation */
/* stylelint-disable selector-combinator-space-before */
/* stylelint-disable selector-descendant-combinator-no-non-space */
/* stylelint-disable string-quotes */
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { debounce as lodashDebounceFunc } from 'lodash'

import { Select as AntSelect } from 'antd'
import { th } from '@coko/client'
import { DownOutlined } from '@ant-design/icons'
import Empty from './Empty'

const SelectWrapper = styled.span``

const StyledSelect = styled(AntSelect)`
  width: 100%;

  &.ant-select-focused {
    outline: ${props => `${props.theme.lineWidth * 4}`}px solid
      ${th('colorPrimaryBorder')};
    outline-offset: 1px;
  }

  .ant-select-arrow {
    color: ${th('colorBorder')};
  }

  &.ant-select.ant-select-disabled > .ant-select-selector,
  &.ant-select-multiple.ant-select-disabled
    > .ant-select-selector
    .ant-select-selection-item-content {
    background-color: ${th('colorBackgroundHue')};
    color: ${props => `${props.theme.colorText}cc`};
  }
`

const StyledDropdown = styled.div`
  .ant-select-item-option-active {
    background-color: ${th('colorBackgroundHue')};
    outline: 2px solid ${th('colorPrimary')};
    outline-offset: -2px;

    &.ant-select-item-option-selected[role='option'][aria-selected='true'] {
      text-decoration: underline;
    }
  }

  .ant-select-item-option-selected[role='option'][aria-selected='true'] {
    background-color: ${th('colorPrimary')};
    color: ${th('colorTextReverse')};

    .ant-select-item-option-state {
      color: ${th('colorTextReverse')};
    }
  }

  .ant-select-item-option-content {
    /* outline: 2px solid ${th('colorPrimary')}; */
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
    id,
    options,
    /* eslint-enable react/prop-types */
    isOpen,
    virtual,
    wrapOptionText,
    ...rest
  } = props

  const selectRef = useRef(null)
  const [open, setOpen] = useState(isOpen)
  const [ariaAttributes, setAriaAttributes] = useState({})

  const cleanUpInvalidAttrs = () => {
    // store invalid attrs in local state
    setAriaAttributes({
      'aria-controls': selectRef?.current
        ?.querySelector('input[role="combobox"]')
        .getAttribute('aria-controls'),
      'aria-owns': selectRef?.current
        ?.querySelector('input[role="combobox"]')
        .getAttribute('aria-owns'),
      'aria-activedescendant': selectRef?.current
        ?.querySelector('input[role="combobox"]')
        .getAttribute('aria-activedescendant'),
    })
    // remove them from the DOM node
    selectRef?.current
      ?.querySelector('input[role="combobox"]')
      .removeAttribute('aria-controls')
    selectRef?.current
      ?.querySelector('input[role="combobox"]')
      .removeAttribute('aria-owns')
    selectRef?.current
      ?.querySelector('input[role="combobox"]')
      .removeAttribute('aria-activedescendant')
  }

  useEffect(() => {
    const innerWrapper = selectRef?.current.querySelector('.ant-select')
    innerWrapper.removeAttribute('aria-required')

    // hack to fix accessibility errors
    // apply with delay to make sure attrs are already there
    setTimeout(() => {
      cleanUpInvalidAttrs()
    }, 500)
  }, [])

  useEffect(() => {
    if (open && !!ariaAttributes) {
      // reapply the stored aria attributes after opening input for the first time
      Object.keys(ariaAttributes).forEach(attr => {
        selectRef?.current
          .querySelector('input[role="combobox"]')
          .setAttribute(attr, ariaAttributes[attr])
      })

      setAriaAttributes(null)
    }
  }, [open])

  const handleSearch = searchValue => {
    onSearch(searchValue)
  }

  // const useDebounce = async ? true : debounce

  const searchFunc = async
    ? lodashDebounceFunc(handleSearch, debounceTimeout)
    : handleSearch

  const customDropdownRender = menu => (
    <StyledDropdown
      data-testid="select-dropdown"
      wrapOptionText={wrapOptionText}
    >
      {menu}
    </StyledDropdown>
  )

  return (
    <SelectWrapper className={className} ref={selectRef}>
      <StyledSelect
        dropdownRender={customDropdownRender}
        filterOption={async && !filterOption ? false : filterOption}
        id={id}
        notFoundContent={!notFoundContent && async ? null : notFoundContent}
        onDropdownVisibleChange={o => setOpen(o)}
        onSearch={onSearch && searchFunc}
        open={open}
        options={options}
        showSearch={showSearch || !!onSearch}
        suffixIcon={!options ? null : <DownOutlined />}
        virtual={virtual}
        {...rest}
      />
    </SelectWrapper>
  )
}

Select.propTypes = {
  async: PropTypes.bool,
  // debounce: PropTypes.bool,
  debounceTimeout: PropTypes.number,
  notFoundContent: PropTypes.element,
  isOpen: PropTypes.bool,
  virtual: PropTypes.bool,
  wrapOptionText: PropTypes.bool,
}

Select.defaultProps = {
  async: false,
  // debounce: false,
  debounceTimeout: 500,
  notFoundContent: (
    <Empty
      description="No Data"
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      role="status"
    />
  ),
  isOpen: false,
  virtual: false,
  wrapOptionText: false,
}

export default Select
