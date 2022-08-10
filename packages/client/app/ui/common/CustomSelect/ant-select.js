/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
// TODO: 4.0 - codemod should help to change `filterOption` to support node props.

import classNames from 'classnames'
import omit from 'rc-util/lib/omit'
import * as React from 'react'
import { useContext } from 'react'
import { ConfigProvider, Empty } from 'antd'
import { FormItemContext } from 'antd/lib/form/context'
import RcSelect, { OptGroup, Option } from './rc-select'
import getIcons from './iconUtil'

const DisabledContext = React.createContext(false)

const SECRET_COMBOBOX_MODE_DO_NOT_USE = 'SECRET_COMBOBOX_MODE_DO_NOT_USE'

const getTransitionDirection = placement => {
  if (
    placement !== undefined &&
    (placement === 'topLeft' || placement === 'topRight')
  ) {
    return `slide-down`
  }

  return `slide-up`
}

const getTransitionName = (rootPrefixCls, motion, transitionName) => {
  if (transitionName !== undefined) {
    return transitionName
  }

  return `${rootPrefixCls}-${motion}`
}

function getStatusClassNames(prefixCls, status, hasFeedback) {
  return classNames({
    [`${prefixCls}-status-success`]: status === 'success',
    [`${prefixCls}-status-warning`]: status === 'warning',
    [`${prefixCls}-status-error`]: status === 'error',
    [`${prefixCls}-status-validating`]: status === 'validating',
    [`${prefixCls}-has-feedback`]: hasFeedback,
  })
}

const getMergedStatus = (contextStatus, customStatus) =>
  customStatus || contextStatus

const InternalSelect = (
  {
    prefixCls: customizePrefixCls,
    bordered = true,
    className,
    getPopupContainer,
    dropdownClassName,
    listHeight = 256,
    placement,
    listItemHeight = 24,
    size: customizeSize,
    disabled: customDisabled,
    notFoundContent,
    status: customStatus,
    showArrow,
    ...props
  },
  ref,
) => {
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    renderEmpty,
    direction,
    virtual,
    dropdownMatchSelectWidth,
  } = React.useContext(ConfigProvider.ConfigContext)

  const size = React.useContext(ConfigProvider.SizeContext)

  const prefixCls = getPrefixCls('select', customizePrefixCls)
  const rootPrefixCls = getPrefixCls()

  const mode = React.useMemo(() => {
    const { mode: m } = props

    if (m === 'combobox') {
      return undefined
    }

    if (m === SECRET_COMBOBOX_MODE_DO_NOT_USE) {
      return 'combobox'
    }

    return m
  }, [props.mode])

  const isMultiple = mode === 'multiple' || mode === 'tags'

  const mergedShowArrow =
    showArrow !== undefined
      ? showArrow
      : props.loading || !(isMultiple || mode === 'combobox')

  // ===================== Form Status =====================
  const {
    status: contextStatus,
    hasFeedback,
    isFormItemInput,
    feedbackIcon,
  } = useContext(FormItemContext)

  const mergedStatus = getMergedStatus(contextStatus, customStatus)

  // ===================== Empty =====================
  let mergedNotFound

  if (notFoundContent !== undefined) {
    mergedNotFound = notFoundContent
  } else if (mode === 'combobox') {
    mergedNotFound = null
  } else {
    mergedNotFound = (
      renderEmpty || (
        <Empty
          className={`${getPrefixCls('empty')}-small`}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )
    )('Select')
  }

  // ===================== Icons =====================
  const { suffixIcon, itemIcon, removeIcon, clearIcon } = getIcons({
    ...props,
    multiple: isMultiple,
    hasFeedback,
    feedbackIcon,
    showArrow: mergedShowArrow,
    prefixCls,
  })

  const selectProps = omit(props, ['suffixIcon', 'itemIcon'])

  const rcSelectRtlDropdownClassName = classNames(dropdownClassName, {
    [`${prefixCls}-dropdown-${direction}`]: direction === 'rtl',
  })

  const mergedSize = customizeSize || size

  // ===================== Disabled =====================
  const disabled = React.useContext(DisabledContext)
  const mergedDisabled = customDisabled || disabled

  const mergedClassName = classNames(
    {
      [`${prefixCls}-lg`]: mergedSize === 'large',
      [`${prefixCls}-sm`]: mergedSize === 'small',
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-borderless`]: !bordered,
      [`${prefixCls}-in-form-item`]: isFormItemInput,
    },
    getStatusClassNames(prefixCls, mergedStatus, hasFeedback),
    className,
  )

  // ===================== Placement =====================
  const getPlacement = () => {
    if (placement !== undefined) {
      return placement
    }

    return direction === 'rtl' ? 'bottomRight' : 'bottomLeft'
  }

  return (
    <RcSelect
      dropdownMatchSelectWidth={dropdownMatchSelectWidth}
      ref={ref}
      virtual={virtual}
      {...selectProps}
      className={mergedClassName}
      clearIcon={clearIcon}
      direction={direction}
      disabled={mergedDisabled}
      dropdownClassName={rcSelectRtlDropdownClassName}
      getPopupContainer={getPopupContainer || getContextPopupContainer}
      inputIcon={suffixIcon}
      listHeight={listHeight}
      listItemHeight={listItemHeight}
      menuItemSelectedIcon={itemIcon}
      mode={mode}
      notFoundContent={mergedNotFound}
      placement={getPlacement()}
      prefixCls={prefixCls}
      removeIcon={removeIcon}
      showArrow={hasFeedback || showArrow}
      transitionName={getTransitionName(
        rootPrefixCls,
        getTransitionDirection(placement),
        props.transitionName,
      )}
    />
  )
}

const Select = React.forwardRef(InternalSelect)
Select.SECRET_COMBOBOX_MODE_DO_NOT_USE = SECRET_COMBOBOX_MODE_DO_NOT_USE
Select.Option = Option
Select.OptGroup = OptGroup

export default Select
