/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-case-declarations */
import * as React from 'react'
import { useEffect } from 'react'
import KeyCode from 'rc-util/lib/KeyCode'
import omit from 'rc-util/lib/omit'
import pickAttrs from 'rc-util/lib/pickAttrs'
import useMemo from 'rc-util/lib/hooks/useMemo'
import classNames from 'classnames'
import List from 'rc-virtual-list'
import TransBtn from './TransBtn'
import isPlatformMac from './utils/platformUtil'
import useBaseProps from './hooks/useBaseProps'
import SelectContext from './SelectContext'

function isTitleType(content) {
  return typeof content === 'string' || typeof content === 'number'
}

/**
 * Using virtual list of option display.
 * Will fallback to dom if use customize render.
 */
const OptionList = (_, ref) => {
  const {
    prefixCls,
    id,
    open,
    multiple,
    mode,
    searchValue,
    toggleOpen,
    notFoundContent,
    onPopupScroll,
  } = useBaseProps()

  const {
    flattenOptions,
    onActiveValue,
    defaultActiveFirstOption,
    onSelect,
    menuItemSelectedIcon,
    rawValues,
    fieldNames,
    virtual,
    listHeight,
    listItemHeight,
  } = React.useContext(SelectContext)

  const itemPrefixCls = `${prefixCls}-item`

  const memoFlattenOptions = useMemo(
    () => flattenOptions,
    [open, flattenOptions],
    (prev, next) => next[0] && prev[1] !== next[1],
  )

  // =========================== List ===========================
  const listRef = React.useRef(null)

  const onListMouseDown = event => {
    event.preventDefault()
  }

  const scrollIntoView = args => {
    if (listRef.current) {
      listRef.current.scrollTo(
        typeof args === 'number' ? { index: args } : args,
      )
    }
  }

  // ========================== Active ==========================
  const getEnabledActiveIndex = (index, offset = 1) => {
    const len = memoFlattenOptions.length

    for (let i = 0; i < len; i += 1) {
      const current = (index + i * offset + len) % len

      const { group, data } = memoFlattenOptions[current]

      if (!group && !data.disabled) {
        return current
      }
    }

    return -1
  }

  const [activeIndex, setActiveIndex] = React.useState(() =>
    getEnabledActiveIndex(0),
  )

  const setActive = (index, fromKeyboard = false) => {
    setActiveIndex(index)

    const info = { source: fromKeyboard ? 'keyboard' : 'mouse' }

    // Trigger active event
    const flattenItem = memoFlattenOptions[index]

    if (!flattenItem) {
      onActiveValue(null, -1, info)
      return
    }

    onActiveValue(flattenItem.value, index, info)
  }

  // Auto active first item when list length or searchValue changed
  useEffect(() => {
    setActive(
      defaultActiveFirstOption !== false ? getEnabledActiveIndex(0) : -1,
    )
  }, [memoFlattenOptions.length, searchValue])

  // https://github.com/ant-design/ant-design/issues/34975
  const isSelected = React.useCallback(
    value => rawValues.has(value) && mode !== 'combobox',
    [mode, [...rawValues].toString()],
  )

  // Auto scroll to item position in single mode
  useEffect(() => {
    /**
     * React will skip `onChange` when component update.
     * `setActive` function will call root accessibility state update which makes re-render.
     * So we need to delay to let Input component trigger onChange first.
     */
    const timeoutId = setTimeout(() => {
      if (!multiple && open && rawValues.size === 1) {
        const value = Array.from(rawValues)[0]

        const index = memoFlattenOptions.findIndex(
          ({ data }) => data.value === value,
        )

        if (index !== -1) {
          setActive(index)
          scrollIntoView(index)
        }
      }
    })

    // Force trigger scrollbar visible when open
    if (open) {
      listRef.current?.scrollTo(undefined)
    }

    return () => clearTimeout(timeoutId)
  }, [open, searchValue])

  // ========================== Values ==========================
  const onSelectValue = value => {
    if (value !== undefined) {
      onSelect(value, { selected: !rawValues.has(value) })
    }

    // Single mode should always close by select
    if (!multiple) {
      toggleOpen(false)
    }
  }

  // ========================= Keyboard =========================
  React.useImperativeHandle(ref, () => ({
    onKeyDown: event => {
      const { which, ctrlKey } = event

      switch (which) {
        // >>> Arrow keys & ctrl + n/p on Mac
        case KeyCode.N:
        case KeyCode.P:
        case KeyCode.UP:
        case KeyCode.DOWN:
          let offset = 0

          if (which === KeyCode.UP) {
            offset = -1
          } else if (which === KeyCode.DOWN) {
            offset = 1
          } else if (isPlatformMac() && ctrlKey) {
            if (which === KeyCode.N) {
              offset = 1
            } else if (which === KeyCode.P) {
              offset = -1
            }
          }

          if (offset !== 0) {
            const nextActiveIndex = getEnabledActiveIndex(
              activeIndex + offset,
              offset,
            )

            scrollIntoView(nextActiveIndex)
            setActive(nextActiveIndex, true)
          }

          break

        // >>> Select
        case KeyCode.ENTER: {
          // value
          const item = memoFlattenOptions[activeIndex]

          if (item && !item.data.disabled) {
            onSelectValue(item.value)
          } else {
            onSelectValue(undefined)
          }

          if (open) {
            event.preventDefault()
          }

          break
        }

        // >>> Close
        case KeyCode.ESC: {
          toggleOpen(false)

          if (open) {
            event.stopPropagation()
          }

          break
        }

        default:
          break
      }
    },
    onKeyUp: () => {},

    scrollTo: index => {
      scrollIntoView(index)
    },
  }))

  // ========================== Render ==========================
  if (memoFlattenOptions.length === 0) {
    return (
      <div
        className={`${itemPrefixCls}-empty`}
        id={`${id}_list`}
        onMouseDown={onListMouseDown}
        role="listbox"
        tabIndex={0}
      >
        {notFoundContent}
      </div>
    )
  }

  const omitFieldNameList = Object.keys(fieldNames).map(key => fieldNames[key])

  const getLabel = item => item.label

  const renderItem = index => {
    const item = memoFlattenOptions[index]
    if (!item) return null

    const itemData = item.data || {}
    const { value } = itemData
    const { group } = item
    const attrs = pickAttrs(itemData, true)
    const mergedLabel = getLabel(item)
    return item ? (
      <div
        aria-label={
          typeof mergedLabel === 'string' && !group ? mergedLabel : null
        }
        {...attrs}
        aria-selected={isSelected(value)}
        id={`${id}_list_${index}`}
        key={index}
        role={group ? 'presentation' : 'option'}
      >
        {value}
      </div>
    ) : null
  }

  // I see no reason why we should render only 3 options inside listbox and not all of them
  // {renderItem(activeIndex - 1)}
  // {renderItem(activeIndex)}
  // {renderItem(activeIndex + 1)}
  return (
    <>
      <div
        id={`${id}_list`}
        role="listbox"
        style={{ height: 0, width: 0, overflow: 'hidden' }}
      >
        {memoFlattenOptions.map((__, index) => renderItem(index))}
      </div>
      <List
        data={memoFlattenOptions}
        fullHeight={false}
        height={listHeight}
        itemHeight={listItemHeight}
        itemKey="key"
        onMouseDown={onListMouseDown}
        onScroll={onPopupScroll}
        ref={listRef}
        virtual={virtual}
      >
        {(item, itemIndex) => {
          const { group, groupOption, data, label, value } = item
          const { key } = data

          // Group
          if (group) {
            const groupTitle =
              data.title ?? (isTitleType(label) ? label.toString() : undefined)

            return (
              <div
                className={classNames(itemPrefixCls, `${itemPrefixCls}-group`)}
                title={groupTitle}
              >
                {label !== undefined ? label : key}
              </div>
            )
          }

          const { disabled, title, children, style, className, ...otherProps } =
            data

          const passedProps = omit(otherProps, omitFieldNameList)

          // Option
          const selected = isSelected(value)

          const optionPrefixCls = `${itemPrefixCls}-option`

          const optionClassName = classNames(
            itemPrefixCls,
            optionPrefixCls,
            className,
            {
              [`${optionPrefixCls}-grouped`]: groupOption,
              [`${optionPrefixCls}-active`]:
                activeIndex === itemIndex && !disabled,
              [`${optionPrefixCls}-disabled`]: disabled,
              [`${optionPrefixCls}-selected`]: selected,
            },
          )

          const mergedLabel = getLabel(item)

          const iconVisible =
            !menuItemSelectedIcon ||
            typeof menuItemSelectedIcon === 'function' ||
            selected

          // https://github.com/ant-design/ant-design/issues/34145
          const content =
            typeof mergedLabel === 'number' ? mergedLabel : mergedLabel || value

          // https://github.com/ant-design/ant-design/issues/26717
          let optionTitle = isTitleType(content)
            ? content.toString()
            : undefined

          if (title !== undefined) {
            optionTitle = title
          }

          return (
            <div
              {...pickAttrs(passedProps)}
              aria-selected={selected}
              className={optionClassName}
              onClick={() => {
                if (!disabled) {
                  onSelectValue(value)
                }
              }}
              onMouseMove={() => {
                if (activeIndex === itemIndex || disabled) {
                  return
                }

                setActive(itemIndex)
              }}
              style={style}
              title={optionTitle}
            >
              <div className={`${optionPrefixCls}-content`}>{content}</div>
              {React.isValidElement(menuItemSelectedIcon) || selected}
              {iconVisible && (
                <TransBtn
                  className={`${itemPrefixCls}-option-state`}
                  customizeIcon={menuItemSelectedIcon}
                  customizeIconProps={{ isSelected: selected }}
                >
                  {selected ? '✓' : null}
                </TransBtn>
              )}
            </div>
          )
        }}
      </List>
    </>
  )
}

const RefOptionList = React.forwardRef(OptionList)
RefOptionList.displayName = 'OptionList'

export default RefOptionList
