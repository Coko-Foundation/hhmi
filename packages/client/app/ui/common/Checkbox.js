import React from 'react'
import styled, { css } from 'styled-components'
import { Checkbox as AntCheckbox } from 'antd'
import { PropTypes } from 'prop-types'

// define css here and export to use in CheckboxGroup as well
export const checkboxStyles = css`
  .ant-checkbox-inner,
  .ant-checkbox-checked,
  .ant-checkbox-inner::after {
    transition: all 0.2s;
  }

  &.ant-checkbox-wrapper.ant-checkbox-wrapper-disabled > span {
    color: ${props => `${props.theme.colorText}cc`};
  }
`

const StyledCheckbox = styled(AntCheckbox)`
  ${checkboxStyles}
`

const Checkbox = props => {
  // eslint-disable-next-line react/prop-types
  const { children, className, ...rest } = props

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledCheckbox className={className} {...rest}>
      {children}
    </StyledCheckbox>
  )
}

export const SelectAllCheckbox = ({
  CustomRender = { CheckBox: Checkbox },
  setItems,
  dataSource,
  items,
  label,
  onChange,
  ...rest
}) => {
  const { length: itemslgth } = items
  const { length: datalgth } = dataSource

  const toggle = () =>
    setItems(keys =>
      keys.length === datalgth ? [] : [...dataSource].map(r => r.id),
    )

  const isChecked = () =>
    itemslgth < datalgth && itemslgth !== 0 ? 'mixed' : itemslgth > 0

  return (
    <CustomRender.CheckBox
      aria-checked={isChecked()}
      checked={datalgth > 0 && itemslgth === datalgth}
      data-testid="select-all-checkbox"
      indeterminate={isChecked() === 'mixed'}
      onChange={toggle}
      {...rest}
    >
      {label}
    </CustomRender.CheckBox>
  )
}

SelectAllCheckbox.propTypes = {
  CustomRender: PropTypes.oneOfType([PropTypes.object]),
  setItems: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  onChange: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  dataSource: PropTypes.oneOfType([PropTypes.array]).isRequired,
  items: PropTypes.oneOfType([PropTypes.array]).isRequired,
  label: PropTypes.string,
}

SelectAllCheckbox.defaultProps = {
  CustomRender: {
    CheckBox: Checkbox,
  },
  label: 'Select All',
  setItems: () => null,
  onChange: () => null,
}

export default Checkbox
