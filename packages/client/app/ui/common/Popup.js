import React, { cloneElement, useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { uuid, grid } from '@coko/client'
import PropTypes from 'prop-types'
import theme from '../../theme'

const PopupContainer = styled.div`
  background: ${theme.colorBackground};
  border: 1px solid ${theme.colorBorder};
  border-radius: 10px;
  display: ${({ visible }) => (visible ? 'block' : 'none')};

  ${props => {
    const { position, alignment } = props

    switch (`${position}/${alignment}`) {
      case 'block-start/start':
        return `inset-block-end: 100%; inset-inline-start: 0; margin-block-end: ${props.theme.gridUnit};`
      case 'block-start/end':
        return `inset-block-end: 100%; inset-inline-end: 0; margin-block-end: ${props.theme.gridUnit};`
      case 'block-end/start':
        return `inset-block-start: 100%; inset-inline-start: 0; margin-block-start: ${props.theme.gridUnit};`
      case 'block-end/end':
        return `inset-block-start: 100%; inset-inline-end: 0;  margin-block-start: ${props.theme.gridUnit};`
      case 'inline-start/start':
        return `inset-inline-end: 100%; inset-block-start: 0;  margin-inline-end: ${props.theme.gridUnit};`
      case 'inline-start/end':
        return `inset-inline-end: 100%; inset-block-end: 0; margin-inline-end: ${props.theme.gridUnit};`
      case 'inline-end/start':
        return `inset-inline-start: 100%; inset-block-start: 0;  margin-inline-start: ${props.theme.gridUnit};`
      case 'inline-end/end':
        return `inset-inline-start: 100%; inset-block-end: 0; margin-inline-start: ${props.theme.gridUnit};`
      default:
        return `inset-block-end: 100%; inset-inline-start: 0; margin-block-end: ${props.theme.gridUnit};`
    }
  }}
  padding: ${grid(5)};
  position: absolute;

  z-index: 1000;
`

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
`

const Popup = ({
  alignment,
  children,
  focusableContent,
  id,
  toggle,
  position,
  ...rest
}) => {
  const WrapperRef = useRef(null)
  const popupRef = useRef(null)

  const [focusableElements, setFocusableElements] = useState([])
  const [visible, setVisible] = useState(false)

  const onClickToggle = () => {
    setVisible(!visible)
  }

  useEffect(() => {
    if (visible && focusableElements.length > 0) {
      // focusing the first focusable element of the popup
      focusableElements[0].focus()
    }
  }, [visible])

  useEffect(() => {
    if (popupRef.current) {
      const focusableContentSelector = focusableContent.join(', ')
      setFocusableElements(
        popupRef.current.querySelectorAll(focusableContentSelector),
      )
    }
  }, [children])

  const handleKeyDown = e => {
    const isEscapePress = e.key === 'Escape' || e.keyCode === 27
    const isTabPressed = e.key === 'Tab' || e.keyCode === 9

    if (!isTabPressed && !isEscapePress) return

    if (isEscapePress) {
      popupRef.current.previousElementSibling.focus()
      setVisible(false)
    }

    const firstFocusableElement = focusableElements[0]
    const lastFocusableElement = focusableElements[focusableElements.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus()
        e.preventDefault()
      }
    } else if (document.activeElement === lastFocusableElement) {
      firstFocusableElement.focus()
      e.preventDefault()
    }
  }

  const handleBlur = e => {
    // when clicking outside the popup wrapper close the popup
    if (!WrapperRef.current.contains(e.relatedTarget)) {
      setVisible(false)
    }
  }

  return (
    <Wrapper ref={WrapperRef}>
      {cloneElement(toggle, {
        onClick: onClickToggle,
        'aria-controls': id,
        'aria-expanded': visible,
        'aria-haspopup': 'dialog',
      })}
      <PopupContainer
        alignment={alignment}
        id={id}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        position={position}
        ref={popupRef}
        visible={visible}
        {...rest}
      >
        {children}
      </PopupContainer>
    </Wrapper>
  )
}

Popup.propTypes = {
  alignment: PropTypes.oneOf(['start', 'end']),
  id: PropTypes.string,
  focusableContent: PropTypes.arrayOf(PropTypes.string),
  toggle: PropTypes.element.isRequired,
  position: PropTypes.oneOf([
    'block-start',
    'block-end',
    'inline-start',
    'inline-end',
  ]),
}

Popup.defaultProps = {
  id: uuid(),
  focusableContent: [
    'a[href]',
    'area[href]',
    'input:not([disabled]):not([type=hidden])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'object',
    'embed',
    '[tabindex]:not([tabindex="-1"])',
    'audio[controls]',
    'video[controls]',
    '[contenteditable]:not([contenteditable="false"])',
  ],
  position: 'block-start',
  alignment: 'start',
}

export default Popup
