import { useState } from 'react'
import { isBoolean } from 'lodash'
import { safeIndex, isFunction, safeCall } from '../../utilities'

const useKeyboardOnList = ({
  enabled = true, // condition to return the keyboardHandler callback or null
  initialState = false, // initial open state
  menuItems, // Elements that belong to menu
  openButton, // button that toggles open state and listens for the keyboard event
  selectAction, // callback to select menu item (menuitem.click() by default)
  overrideKeys, // callback to override the default keys/actions behavior: one arg = actions >> returns {}
  additionalKeys = () => {}, // callback to add keys/actions to listen and execute: one arg = actions >> returns {}
  selectByFirstLetter = true, // optionally to select menu item by the first letter
  closeOnStart = true, // optionally close the menu if action is moveUp and the active element is the first
  closeOnEnd = false, // optionally close the menu if action is moveDown and the active element is the last
  closeOnSelect = false, // optionally close the menu when selecting a menu item
  notPreventDefault = ['Tab', '229'], // boolean or array of keycode(s) strings that must not preventDefault (229 for mobile), if bool: FALSE: prevent on all keys, TRUE: dont prevent
}) => {
  const [prevKey, setPrevKey] = useState('')
  const [open, setOpen] = useState(initialState)

  const handleBlur = e => {
    !e.currentTarget.contains(e.relatedTarget)
      ? open && setOpen(false)
      : e.currentTarget.focus()
  }

  return [
    open,
    setOpen,
    handleBlur,
    e => {
      if (!enabled || menuItems.length === 0) return null
      const { code, key } = e
      isBoolean(notPreventDefault)
        ? !notPreventDefault && e.preventDefault()
        : !notPreventDefault.includes(code) && e.preventDefault()

      const currentIndex = () => menuItems.indexOf(document.activeElement)
      const atLastIndex = () => currentIndex() === menuItems.length - 1
      const defaultSelectAction = () => document?.activeElement?.click()

      const selectByFirstChar = () => {
        if (!selectByFirstLetter || key.length > 1) return setPrevKey('')

        const matches = menuItems.filter(item =>
          item.textContent?.toUpperCase().startsWith(key.toUpperCase()),
        )

        if (matches.length === 0) return setPrevKey('')

        const nextItem = matches.indexOf(document.activeElement) + 1

        prevKey !== key
          ? matches[0].focus()
          : matches[safeIndex(nextItem, 'down', matches)].focus()

        return prevKey !== key && setPrevKey(key)
      }

      const actions = {
        open: () => {
          !open &&
            menuItems.filter(el => el === document.activeElement).length ===
              0 &&
            actions.goToFirst()
          setOpen(true)
        },
        close: () => {
          setOpen(false)
          openButton?.focus()
        },
        select: () => {
          safeCall(selectAction, defaultSelectAction)
          closeOnSelect && actions.close()
        },
        goToFirst: () => {
          menuItems[0].focus()
        },
        goToLast: () => {
          menuItems[menuItems.length - 1].focus()
        },
        moveDownLoop: () => {
          !open
            ? actions.open()
            : menuItems[
                safeIndex(currentIndex() + 1, `down`, menuItems)
              ].focus()
        },
        moveUpLoop: () => {
          open &&
            menuItems[safeIndex(currentIndex() - 1, `up`, menuItems)].focus()
        },
        moveDown: () => {
          if (atLastIndex()) return closeOnEnd && actions.close()

          return !open
            ? actions.open()
            : menuItems[
                safeIndex(currentIndex() + 1, `down-stop`, menuItems)
              ].focus()
        },
        moveUp: () => {
          if (currentIndex() === 0) return closeOnStart && actions.close()

          return (
            open &&
            menuItems[
              safeIndex(currentIndex() - 1, `up-stop`, menuItems)
            ].focus()
          )
        },
      }

      const defaultKeys = {
        Escape: actions.close,
        Enter: actions.select,
        Space: actions.goToFirst,
        ArrowDown: actions.moveDownLoop,
        ArrowUp: actions.moveUp,
        PageUp: actions.goToFirst,
        PageDown: actions.goToLast,
        ...additionalKeys(actions, e),
      }

      const keys = !isFunction(overrideKeys)
        ? defaultKeys
        : { ...overrideKeys(actions, e), ...additionalKeys(actions, e) }

      return safeCall(keys[code], selectByFirstChar)
    },
  ]
}

export default useKeyboardOnList
