import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Select as AntSelect } from 'antd'

import { uuid } from '@coko/client'

const Wrapper = styled.div`
  .ant-select {
    width: 100%;
  }
`

const isOptionGroups = data => {
  return (
    Array.isArray(data) &&
    data.every(item => Object.prototype.hasOwnProperty.call(item, 'label')) &&
    data.every(item => Object.prototype.hasOwnProperty.call(item, 'options'))
  )
}

const Select = props => {
  const { className, options, ...rest } = props

  return (
    <Wrapper className={className}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <AntSelect {...rest}>
        {isOptionGroups(options) &&
          options.map(group => (
            <AntSelect.OptGroup key={group.id || uuid()} label={group.label}>
              {group.options.map(option => (
                <AntSelect.Option
                  key={option.id || uuid()}
                  value={option.value}
                >
                  {option.label}
                </AntSelect.Option>
              ))}
            </AntSelect.OptGroup>
          ))}

        {!isOptionGroups(options) &&
          options.map(option => (
            <AntSelect.Option key={option.id || uuid()} value={option.value}>
              {option.label}
            </AntSelect.Option>
          ))}
      </AntSelect>
    </Wrapper>
  )
}

Select.propTypes = {
  /** Options data. Can either be an array of options or an array of option groups. */
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        id: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string.isRequired,
            id: PropTypes.string,
            value: PropTypes.string,
          }),
        ),
      }),
    ),
  ]).isRequired,
}

Select.defaultProps = {}

export default Select
