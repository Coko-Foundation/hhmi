/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react'
import pickAttrs from 'rc-util/lib/pickAttrs'
import Input from './Input'
// import type { InnerSelectorProps } from '.';

// interface SelectorProps extends InnerSelectorProps {
//   inputElement: React.ReactElement;
//   activeValue: string;
// }

const SingleSelector = props => {
  const {
    inputElement,
    prefixCls,
    id,
    inputRef,
    disabled,
    autoFocus,
    autoComplete,
    activeDescendantId,
    mode,
    open,
    values,
    placeholder,
    tabIndex,

    showSearch,
    searchValue,
    activeValue,
    maxLength,

    onInputKeyDown,
    onInputMouseDown,
    onInputChange,
    onInputPaste,
    onInputCompositionStart,
    onInputCompositionEnd,
  } = props

  const [inputChanged, setInputChanged] = React.useState(false)

  const combobox = mode === 'combobox'
  const inputEditable = combobox || showSearch
  const item = values[0]

  let inputValue = searchValue || ''

  if (combobox && activeValue && !inputChanged) {
    inputValue = activeValue
  }

  React.useEffect(() => {
    if (combobox) {
      setInputChanged(false)
    }
  }, [combobox, activeValue])

  // Not show text when closed expect combobox mode
  const hasTextInput =
    mode !== 'combobox' && !open && !showSearch ? false : !!inputValue

  const title =
    item && (typeof item.label === 'string' || typeof item.label === 'number')
      ? item.label.toString()
      : undefined

  const renderPlaceholder = () => {
    if (item) {
      return null
    }

    const hiddenStyle = hasTextInput ? { visibility: 'hidden' } : undefined
    return (
      <span
        className={`${prefixCls}-selection-placeholder`}
        style={hiddenStyle}
      >
        {placeholder}
      </span>
    )
  }

  return (
    <>
      <span className={`${prefixCls}-selection-search`}>
        <Input
          activeDescendantId={activeDescendantId}
          attrs={pickAttrs(props, true)}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          disabled={disabled}
          editable={inputEditable}
          id={id}
          inputElement={inputElement}
          maxLength={combobox ? maxLength : undefined}
          onChange={e => {
            setInputChanged(true)
            onInputChange(e)
          }}
          onCompositionEnd={onInputCompositionEnd}
          onCompositionStart={onInputCompositionStart}
          onKeyDown={onInputKeyDown}
          onMouseDown={onInputMouseDown}
          onPaste={onInputPaste}
          open={open}
          prefixCls={prefixCls}
          ref={inputRef}
          tabIndex={tabIndex}
          value={inputValue}
        />
      </span>

      {/* Display value */}
      {!combobox && item && !hasTextInput && (
        <span className={`${prefixCls}-selection-item`} title={title}>
          {item.label}
        </span>
      )}

      {/* Display placeholder */}
      {renderPlaceholder()}
    </>
  )
}

export default SingleSelector
