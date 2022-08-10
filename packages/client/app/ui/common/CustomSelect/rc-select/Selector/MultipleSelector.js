/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
import * as React from 'react'
import { useState } from 'react'
import classNames from 'classnames'
import pickAttrs from 'rc-util/lib/pickAttrs'
import Overflow from 'rc-overflow'
import TransBtn from '../TransBtn'
// import type { InnerSelectorProps } from '.';
import Input from './Input'
import useLayoutEffect from '../hooks/useLayoutEffect'
// import type { DisplayValueType, RenderNode, CustomTagProps, RawValueType } from '../BaseSelect';

function itemKey(value) {
  return value.key ?? value.value
}

// interface SelectorProps extends InnerSelectorProps {
//   // Icon
//   removeIcon?: RenderNode;

//   // Tags
//   maxTagCount?: number | 'responsive';
//   maxTagTextLength?: number;
//   maxTagPlaceholder?: React.ReactNode | ((omittedValues: DisplayValueType[]) => React.ReactNode);
//   tokenSeparators?: string[];
//   tagRender?: (props: CustomTagProps) => React.ReactElement;
//   onToggleOpen: (open?: boolean) => void;

//   // Motion
//   choiceTransitionName?: string;

//   // Event
//   onRemove: (value: DisplayValueType) => void;
// }

const onPreventMouseDown = event => {
  event.preventDefault()
  event.stopPropagation()
}

const SelectSelector = props => {
  const {
    id,
    prefixCls,

    values,
    open,
    searchValue,
    inputRef,
    placeholder,
    disabled,
    mode,
    showSearch,
    autoFocus,
    autoComplete,
    activeDescendantId,
    tabIndex,

    removeIcon,

    maxTagCount,
    maxTagTextLength,
    maxTagPlaceholder = omittedValues => `+ ${omittedValues.length} ...`,
    tagRender,
    onToggleOpen,
    hasOptionList,

    onRemove,
    onInputChange,
    onInputPaste,
    onInputKeyDown,
    onInputMouseDown,
    onInputCompositionStart,
    onInputCompositionEnd,
  } = props

  const measureRef = React.useRef(null)
  const [inputWidth, setInputWidth] = useState(0)
  const [focused, setFocused] = useState(false)

  const selectionPrefixCls = `${prefixCls}-selection`

  // ===================== Search ======================
  const inputValue = open || mode === 'tags' ? searchValue : ''
  const inputEditable = mode === 'tags' || (showSearch && (open || focused))

  // We measure width and set to the input immediately
  useLayoutEffect(() => {
    setInputWidth(measureRef?.current?.scrollWidth)
  }, [inputValue])

  // ===================== Render ======================
  // >>> Render Selector Node. Includes Item & Rest
  function defaultRenderSelector(
    title,
    content,
    itemDisabled,
    closable,
    onClose,
  ) {
    return (
      <span
        className={classNames(`${selectionPrefixCls}-item`, {
          [`${selectionPrefixCls}-item-disabled`]: itemDisabled,
        })}
        title={
          typeof title === 'string' || typeof title === 'number'
            ? title.toString()
            : undefined
        }
      >
        <span className={`${selectionPrefixCls}-item-content`}>{content}</span>
        {closable && (
          <TransBtn
            className={`${selectionPrefixCls}-item-remove`}
            customizeIcon={removeIcon}
            onClick={onClose}
            onMouseDown={onPreventMouseDown}
          >
            ×
          </TransBtn>
        )}
      </span>
    )
  }

  function customizeRenderSelector(
    value,
    content,
    itemDisabled,
    closable,
    onClose,
  ) {
    const onMouseDown = e => {
      onPreventMouseDown(e)
      onToggleOpen(!open)
    }

    // WATCH OUT: find an appropriate role
    return (
      <span onMouseDown={onMouseDown} role="presentation">
        {tagRender({
          label: content,
          value,
          disabled: itemDisabled,
          closable,
          onClose,
        })}
      </span>
    )
  }

  function renderItem(valueItem) {
    const { disabled: itemDisabled, label, value } = valueItem
    const closable = !disabled && !itemDisabled

    let displayLabel = label

    if (typeof maxTagTextLength === 'number') {
      if (typeof label === 'string' || typeof label === 'number') {
        const strLabel = String(displayLabel)

        if (strLabel.length > maxTagTextLength) {
          displayLabel = `${strLabel.slice(0, maxTagTextLength)}...`
        }
      }
    }

    const onClose = event => {
      if (event) event.stopPropagation()
      onRemove(valueItem)
    }

    return typeof tagRender === 'function'
      ? customizeRenderSelector(
          value,
          displayLabel,
          itemDisabled,
          closable,
          onClose,
        )
      : defaultRenderSelector(
          label,
          displayLabel,
          itemDisabled,
          closable,
          onClose,
        )
  }

  function renderRest(omittedValues) {
    const content =
      typeof maxTagPlaceholder === 'function'
        ? maxTagPlaceholder(omittedValues)
        : maxTagPlaceholder

    return defaultRenderSelector(content, content, false)
  }

  // >>> Input Node
  const inputNode = (
    <div
      className={`${selectionPrefixCls}-search`}
      onBlur={() => {
        setFocused(false)
      }}
      onFocus={() => {
        setFocused(true)
      }}
      style={{ width: inputWidth }}
    >
      <Input
        activeDescendantId={activeDescendantId}
        attrs={pickAttrs(props, true)}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        disabled={disabled}
        editable={inputEditable}
        hasOptionList={hasOptionList}
        id={id}
        inputElement={null}
        onChange={onInputChange}
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

      {/* Measure Node */}
      <span
        aria-hidden
        className={`${selectionPrefixCls}-search-mirror`}
        ref={measureRef}
      >
        {inputValue}&nbsp;
      </span>
    </div>
  )

  // >>> Selections
  const selectionNode = (
    <Overflow
      data={values}
      itemKey={itemKey}
      maxCount={maxTagCount}
      prefixCls={`${selectionPrefixCls}-overflow`}
      renderItem={renderItem}
      renderRest={renderRest}
      suffix={inputNode}
    />
  )

  return (
    <>
      {selectionNode}

      {!values.length && !inputValue && (
        <span className={`${selectionPrefixCls}-placeholder`}>
          {placeholder}
        </span>
      )}
    </>
  )
}

export default SelectSelector
