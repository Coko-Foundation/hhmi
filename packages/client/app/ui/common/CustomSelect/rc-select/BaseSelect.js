/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import * as React from 'react'
import classNames from 'classnames'
import KeyCode from 'rc-util/lib/KeyCode'
import isMobile from 'rc-util/lib/isMobile'
import useMergedState from 'rc-util/lib/hooks/useMergedState'
// import { useLayoutEffect } from 'rc-util/lib/hooks/useLayoutEffect'
import { getSeparatedContent } from './utils/valueUtil'
import SelectTrigger from './SelectTrigger'
import Selector from './Selector'
import useSelectTriggerControl from './hooks/useSelectTriggerControl'
import useDelayReset from './hooks/useDelayReset'
import TransBtn from './TransBtn'
import useLock from './hooks/useLock'
import { BaseSelectContext } from './hooks/useBaseProps'

const useLayoutEffect =
  process.env.NODE_ENV !== 'test' ? React.useLayoutEffect : React.useEffect

const fillRef = (ref, node) => {
  if (typeof ref === 'function') {
    ref(node)
  } else if (typeof ref === 'object' && ref && 'current' in ref) {
    // eslint-disable-next-line no-param-reassign
    ref.current = node
  }
}

const composeRef = (...refs) => {
  const refList = refs.filter(ref => ref)

  if (refList.length <= 1) {
    return refList[0]
  }

  return node => {
    refs.forEach(ref => {
      fillRef(ref, node)
    })
  }
}

const useComposeRef = (...refs) => {
  return React.useMemo(
    () => composeRef(...refs),
    refs,
    (prev, next) =>
      prev.length === next.length && prev.every((ref, i) => ref === next[i]),
  )
}

const DEFAULT_OMIT_PROPS = [
  'value',
  'onChange',
  'removeIcon',
  'placeholder',
  'autoFocus',
  'maxTagCount',
  'maxTagTextLength',
  'maxTagPlaceholder',
  'choiceTransitionName',
  'onInputKeyDown',
  'onPopupScroll',
  'tabIndex',
]

export function isMultiple(mode) {
  return mode === 'tags' || mode === 'multiple'
}

const BaseSelect = React.forwardRef((props, ref) => {
  const {
    id,
    prefixCls,
    className,
    showSearch,
    tagRender,
    direction,
    omitDomProps,

    // Value
    displayValues,
    onDisplayValuesChange,
    emptyOptions,
    notFoundContent = 'Not Found',
    onClear,
    hasOptionList,

    // Mode
    mode,

    // Status
    disabled,
    loading,

    // Customize Input
    getInputElement,
    getRawInputElement,

    // Open
    open,
    defaultOpen,
    onDropdownVisibleChange,

    // Active
    activeValue,
    onActiveValueChange,
    activeDescendantId,

    // Search
    searchValue,
    onSearch,
    onSearchSplit,
    tokenSeparators,

    // Icons
    allowClear,
    showArrow,
    inputIcon,
    clearIcon,

    // Dropdown
    OptionList,
    animation,
    transitionName,
    dropdownStyle,
    dropdownClassName,
    dropdownMatchSelectWidth,
    dropdownRender,
    dropdownAlign,
    placement,
    getPopupContainer,
    forceRender,

    // Focus
    showAction = [],
    onFocus,
    onBlur,

    // Rest Events
    onKeyUp,
    onKeyDown,
    onMouseDown,

    // Rest Props
    ...restProps
  } = props

  // ============================== MISC ==============================
  const multiple = isMultiple(mode)

  const mergedShowSearch =
    (showSearch !== undefined ? showSearch : multiple) || mode === 'combobox'

  const domProps = {
    ...restProps,
  }

  DEFAULT_OMIT_PROPS.forEach(propName => {
    delete domProps[propName]
  })

  omitDomProps?.forEach(propName => {
    delete domProps[propName]
  })

  // ============================= Mobile =============================
  const [mobile, setMobile] = React.useState(false)
  React.useEffect(() => {
    // Only update on the client side
    setMobile(isMobile())
  }, [])

  // ============================== Refs ==============================
  const containerRef = React.useRef(null)
  const selectorDomRef = React.useRef(null)
  const triggerRef = React.useRef(null)
  const selectorRef = React.useRef(null)
  const listRef = React.useRef(null)

  /** Used for component focused management */
  const [mockFocused, setMockFocused, cancelSetMockFocused] = useDelayReset()

  // =========================== Imperative ===========================
  React.useImperativeHandle(ref, () => ({
    focus: selectorRef.current?.focus,
    blur: selectorRef.current?.blur,
    scrollTo: arg => listRef.current?.scrollTo(arg),
  }))

  // ========================== Search Value ==========================
  const mergedSearchValue = React.useMemo(() => {
    if (mode !== 'combobox') {
      return searchValue
    }

    const val = displayValues[0]?.value

    return typeof val === 'string' || typeof val === 'number' ? String(val) : ''
  }, [searchValue, mode, displayValues])

  // ========================== Custom Input ==========================
  // Only works in `combobox`
  const customizeInputElement =
    (mode === 'combobox' &&
      typeof getInputElement === 'function' &&
      getInputElement()) ||
    null

  // Used for customize replacement for `rc-cascader`
  const customizeRawInputElement =
    typeof getRawInputElement === 'function' && getRawInputElement()

  const customizeRawInputRef = useComposeRef(
    selectorDomRef,
    customizeRawInputElement?.props?.ref,
  )

  // ============================== Open ==============================
  const [innerOpen, setInnerOpen] = useMergedState(undefined, {
    defaultValue: defaultOpen,
    value: open,
  })

  let mergedOpen = innerOpen

  // Not trigger `open` in `combobox` when `notFoundContent` is empty
  const emptyListContent = !notFoundContent && emptyOptions

  if (disabled || (emptyListContent && mergedOpen && mode === 'combobox')) {
    mergedOpen = false
  }

  const triggerOpen = emptyListContent ? false : mergedOpen

  const onToggleOpen = React.useCallback(
    newOpen => {
      const nextOpen = newOpen !== undefined ? newOpen : !mergedOpen

      if (mergedOpen !== nextOpen && !disabled) {
        setInnerOpen(nextOpen)
        onDropdownVisibleChange?.(nextOpen)
      }
    },
    [disabled, mergedOpen, setInnerOpen, onDropdownVisibleChange],
  )

  // ============================= Search =============================
  const tokenWithEnter = React.useMemo(
    () =>
      (tokenSeparators || []).some(tokenSeparator =>
        ['\n', '\r\n'].includes(tokenSeparator),
      ),
    [tokenSeparators],
  )

  const onInternalSearch = (searchText, fromTyping, isCompositing) => {
    let ret = true
    let newSearchText = searchText
    onActiveValueChange?.(null)

    // Check if match the `tokenSeparators`
    const patchLabels = isCompositing
      ? null
      : getSeparatedContent(searchText, tokenSeparators)

    // Ignore combobox since it's not split-able
    if (mode !== 'combobox' && patchLabels) {
      newSearchText = ''

      onSearchSplit?.(patchLabels)

      // Should close when paste finish
      onToggleOpen(false)

      // Tell Selector that break next actions
      ret = false
    }

    if (onSearch && mergedSearchValue !== newSearchText) {
      onSearch(newSearchText, {
        source: fromTyping ? 'typing' : 'effect',
      })
    }

    return ret
  }

  // Only triggered when menu is closed & mode is tags
  // If menu is open, OptionList will take charge
  // If mode isn't tags, press enter is not meaningful when you can't see any option
  const onInternalSearchSubmit = searchText => {
    // prevent empty tags from appearing when you click the Enter button
    if (!searchText || !searchText.trim()) {
      return
    }

    onSearch(searchText, { source: 'submit' })
  }

  // Close will clean up single mode search text
  React.useEffect(() => {
    if (!mergedOpen && !multiple && mode !== 'combobox') {
      onInternalSearch('', false, false)
    }
  }, [mergedOpen])

  // ============================ Disabled ============================
  // Close dropdown & remove focus state when disabled change
  React.useEffect(() => {
    if (innerOpen && disabled) {
      setInnerOpen(false)
    }

    if (disabled) {
      setMockFocused(false)
    }
  }, [disabled])

  // ============================ Keyboard ============================
  /**
   * We record input value here to check if can press to clean up by backspace
   * - null: Key is not down, this is reset by key up
   * - true: Search text is empty when first time backspace down
   * - false: Search text is not empty when first time backspace down
   */
  const [getClearLock, setClearLock] = useLock()

  // KeyDown
  const onInternalKeyDown = (event, ...rest) => {
    const clearLock = getClearLock()
    const { which } = event

    if (which === KeyCode.ENTER) {
      // Do not submit form when type in the input
      if (mode !== 'combobox') {
        event.preventDefault()
      }

      // We only manage open state here, close logic should handle by list component
      if (!mergedOpen) {
        onToggleOpen(true)
      }
    }

    setClearLock(!!mergedSearchValue)

    // Remove value by `backspace`
    if (
      which === KeyCode.BACKSPACE &&
      !clearLock &&
      multiple &&
      !mergedSearchValue &&
      displayValues.length
    ) {
      const cloneDisplayValues = [...displayValues]
      let removedDisplayValue = null

      for (let i = cloneDisplayValues.length - 1; i >= 0; i -= 1) {
        const current = cloneDisplayValues[i]

        if (!current.disabled) {
          cloneDisplayValues.splice(i, 1)
          removedDisplayValue = current
          break
        }
      }

      if (removedDisplayValue) {
        onDisplayValuesChange(cloneDisplayValues, {
          type: 'remove',
          values: [removedDisplayValue],
        })
      }
    }

    if (mergedOpen && listRef.current) {
      listRef.current.onKeyDown(event, ...rest)
    }

    onKeyDown?.(event, ...rest)
  }

  // KeyUp
  const onInternalKeyUp = (event, ...rest) => {
    if (mergedOpen && listRef.current) {
      listRef.current.onKeyUp(event, ...rest)
    }

    onKeyUp?.(event, ...rest)
  }

  // ============================ Selector ============================
  const onSelectorRemove = val => {
    const newValues = displayValues.filter(i => i !== val)

    onDisplayValuesChange(newValues, {
      type: 'remove',
      values: [val],
    })
  }

  // ========================== Focus / Blur ==========================
  /** Record real focus status */
  const focusRef = React.useRef(false)

  const onContainerFocus = (...args) => {
    setMockFocused(true)

    if (!disabled) {
      if (onFocus && !focusRef.current) {
        onFocus(...args)
      }

      // `showAction` should handle `focus` if set
      if (showAction.includes('focus')) {
        onToggleOpen(true)
      }
    }

    focusRef.current = true
  }

  const onContainerBlur = (...args) => {
    setMockFocused(false, () => {
      focusRef.current = false
      onToggleOpen(false)
    })

    if (disabled) {
      return
    }

    if (mergedSearchValue) {
      // `tags` mode should move `searchValue` into values
      if (mode === 'tags') {
        onSearch(mergedSearchValue, { source: 'submit' })
      } else if (mode === 'multiple') {
        // `multiple` mode only clean the search value but not trigger event
        onSearch('', {
          source: 'blur',
        })
      }
    }

    if (onBlur) {
      onBlur(...args)
    }
  }

  // Give focus back of Select
  const activeTimeoutIds = []
  React.useEffect(
    () => () => {
      activeTimeoutIds.forEach(timeoutId => clearTimeout(timeoutId))
      activeTimeoutIds.splice(0, activeTimeoutIds.length)
    },
    [],
  )

  const onInternalMouseDown = (event, ...restArgs) => {
    const { target } = event
    const popupElement = triggerRef.current?.getPopupElement()

    // We should give focus back to selector if clicked item is not focusable
    if (popupElement && popupElement.contains(target)) {
      const timeoutId = setTimeout(() => {
        const index = activeTimeoutIds.indexOf(timeoutId)

        if (index !== -1) {
          activeTimeoutIds.splice(index, 1)
        }

        cancelSetMockFocused()

        if (!mobile && !popupElement.contains(document.activeElement)) {
          selectorRef.current?.focus()
        }
      })

      activeTimeoutIds.push(timeoutId)
    }

    onMouseDown?.(event, ...restArgs)
  }

  // ============================ Dropdown ============================
  const [containerWidth, setContainerWidth] = React.useState(null)

  const [, forceUpdate] = React.useState({})

  // We need force update here since popup dom is render async
  function onPopupMouseEnter() {
    forceUpdate({})
  }

  useLayoutEffect(() => {
    if (triggerOpen) {
      const newWidth = Math.ceil(containerRef.current?.offsetWidth)

      if (containerWidth !== newWidth && !Number.isNaN(newWidth)) {
        setContainerWidth(newWidth)
      }
    }
  }, [triggerOpen])

  // Used for raw custom input trigger
  let onTriggerVisibleChange

  if (customizeRawInputElement) {
    onTriggerVisibleChange = newOpen => {
      onToggleOpen(newOpen)
    }
  }

  // Close when click on non-select element
  useSelectTriggerControl(
    () => [containerRef.current, triggerRef.current?.getPopupElement()],
    triggerOpen,
    onToggleOpen,
    !!customizeRawInputElement,
  )

  // ============================ Context =============================
  const baseSelectContext = React.useMemo(
    () => ({
      ...props,
      notFoundContent,
      open: mergedOpen,
      triggerOpen,
      id,
      showSearch: mergedShowSearch,
      multiple,
      toggleOpen: onToggleOpen,
    }),
    [
      props,
      notFoundContent,
      triggerOpen,
      mergedOpen,
      id,
      mergedShowSearch,
      multiple,
      onToggleOpen,
    ],
  )

  // ==================================================================
  // ==                            Render                            ==
  // ==================================================================

  // ============================= Arrow ==============================
  const mergedShowArrow =
    showArrow !== undefined
      ? showArrow
      : loading || (!multiple && mode !== 'combobox')

  let arrowNode

  if (mergedShowArrow) {
    arrowNode = (
      <TransBtn
        className={classNames(`${prefixCls}-arrow`, {
          [`${prefixCls}-arrow-loading`]: loading,
        })}
        customizeIcon={inputIcon}
        customizeIconProps={{
          loading,
          searchValue: mergedSearchValue,
          open: mergedOpen,
          focused: mockFocused,
          showSearch: mergedShowSearch,
        }}
      />
    )
  }

  // ============================= Clear ==============================
  let clearNode

  const onClearMouseDown = () => {
    onClear?.()

    onDisplayValuesChange([], {
      type: 'clear',
      values: displayValues,
    })
    onInternalSearch('', false, false)
  }

  if (!disabled && allowClear && (displayValues.length || mergedSearchValue)) {
    clearNode = (
      <TransBtn
        className={`${prefixCls}-clear`}
        customizeIcon={clearIcon}
        onMouseDown={onClearMouseDown}
      >
        ×
      </TransBtn>
    )
  }

  // =========================== OptionList ===========================
  const optionList = <OptionList ref={listRef} />

  // ============================= Select =============================
  const mergedClassName = classNames(prefixCls, className, {
    [`${prefixCls}-focused`]: mockFocused,
    [`${prefixCls}-multiple`]: multiple,
    [`${prefixCls}-single`]: !multiple,
    [`${prefixCls}-allow-clear`]: allowClear,
    [`${prefixCls}-show-arrow`]: mergedShowArrow,
    [`${prefixCls}-disabled`]: disabled,
    [`${prefixCls}-loading`]: loading,
    [`${prefixCls}-open`]: mergedOpen,
    [`${prefixCls}-customize-input`]: customizeInputElement,
    [`${prefixCls}-show-search`]: mergedShowSearch,
  })

  // >>> Selector
  const selectorNode = (
    <SelectTrigger
      animation={animation}
      containerWidth={containerWidth}
      direction={direction}
      disabled={disabled}
      dropdownAlign={dropdownAlign}
      dropdownClassName={dropdownClassName}
      dropdownMatchSelectWidth={dropdownMatchSelectWidth}
      dropdownRender={dropdownRender}
      dropdownStyle={dropdownStyle}
      empty={emptyOptions}
      forceRender={forceRender}
      getPopupContainer={getPopupContainer}
      getTriggerDOMNode={() => selectorDomRef.current}
      onPopupMouseEnter={onPopupMouseEnter}
      onPopupVisibleChange={onTriggerVisibleChange}
      placement={placement}
      popupElement={optionList}
      prefixCls={prefixCls}
      ref={triggerRef}
      transitionName={transitionName}
      visible={triggerOpen}
    >
      {customizeRawInputElement ? (
        React.cloneElement(customizeRawInputElement, {
          ref: customizeRawInputRef,
        })
      ) : (
        <Selector
          {...props}
          activeDescendantId={activeDescendantId}
          activeValue={activeValue}
          domRef={selectorDomRef}
          hasOptionList={hasOptionList}
          id={id}
          inputElement={customizeInputElement}
          mode={mode}
          onRemove={onSelectorRemove}
          onSearch={onInternalSearch}
          onSearchSubmit={onInternalSearchSubmit}
          onToggleOpen={onToggleOpen}
          open={mergedOpen}
          prefixCls={prefixCls}
          ref={selectorRef}
          searchValue={mergedSearchValue}
          showSearch={mergedShowSearch}
          tagRender={tagRender}
          tokenWithEnter={tokenWithEnter}
          values={displayValues}
        />
      )}
    </SelectTrigger>
  )

  // >>> Render
  let renderNode

  // Render raw
  if (customizeRawInputElement) {
    renderNode = selectorNode
  } else {
    renderNode = (
      <div
        className={mergedClassName}
        role="presentation"
        {...domProps}
        onBlur={onContainerBlur}
        onFocus={onContainerFocus}
        onKeyDown={onInternalKeyDown}
        onKeyUp={onInternalKeyUp}
        onMouseDown={onInternalMouseDown}
        ref={containerRef}
      >
        {mockFocused && !mergedOpen && (
          <span
            aria-live="polite"
            style={{
              width: 0,
              height: 0,
              position: 'absolute',
              overflow: 'hidden',
              opacity: 0,
            }}
          >
            {/* Merge into one string to make screen reader work as expect */}
            {`${displayValues
              .map(({ label, value }) =>
                ['number', 'string'].includes(typeof label) ? label : value,
              )
              .join(', ')}`}
          </span>
        )}
        {selectorNode}

        {arrowNode}
        {clearNode}
      </div>
    )
  }

  return (
    <BaseSelectContext.Provider value={baseSelectContext}>
      {renderNode}
    </BaseSelectContext.Provider>
  )
})

// Set display name for dev
if (process.env.NODE_ENV !== 'production') {
  BaseSelect.displayName = 'BaseSelect'
}

export default BaseSelect
