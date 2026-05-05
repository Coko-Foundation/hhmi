import React, { useEffect, useRef, useState } from 'react'
import { PropTypes, oneOfType } from 'prop-types'
import styled from 'styled-components'
import { th } from '@coko/client'
import { VisuallyHiddenElement } from '@coko/client/dist/ui'

import { Input } from 'antd'

import { safeCall, safeIndex, setSafeHTML } from '../../../utilities'
import useBoolState from '../../_helpers/useBoolState'
import FilterList from './FilterList'

// Styleds
const SearchWrapper = styled.div`
  align-items: center;
  background-color: #fff;
  border: 1px solid
    ${p => (p.$visualfocus ? th('colorBorderAlt') : th('colorBorder'))};
  box-shadow: ${p =>
    p.$visualfocus ? `0 0 2px ${th('colorPrimary')}` : 'none'};
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  line-height: 1.375;
  outline: 2px solid
    ${p => (p.$visualfocus ? th('colorPrimaryBorder') : '#0000')};
  outline-offset: 1px;
  position: relative;
  width: 100%;

  & .ant-input-wrapper {
    display: flex;
    width: 100%;
  }

  & .ant-input-group-addon {
    width: fit-content;
  }

  &:hover {
    border: 1px solid ${th('colorBorderAlt')};
  }

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`

const StyledSearch = styled(Input.Search)`
  /* To get the input aligned in center */
  align-items: center;
  display: flex;
  width: 100%;

  span:nth-of-type(2) {
    /* Because by default width is 1px, and as i changed the wrapper display to flex
the search button gets beyond the container limits and breaks the layout */
    width: fit-content;
  }

  button {
    border: none;
    border-left: 1px solid ${th('colorBorder')};
    outline: none;
  }

  input {
    background-color: transparent;
    border: none;
    outline: none;
    padding-left: 0.6rem;

    &:focus {
      background-color: transparent;
      border: none;
      box-shadow: none;
      outline: none;
    }
    transition: all 0.2s;
  }
`

const SearchFiltered = ({
  searchOnChange,
  filters,
  placeholder,
  onSearch,
  loading,
  ariaLabel,
  ...rest
}) => {
  // #region hooks
  const searchRef = useRef(null)

  const [currentOptions, setUpdatedFilters] = useState(filters) // set of filters or values(in case of) to show in list
  const [filterValue, setFilterValue] = useState(null) // shape: {label, value, badgeBg??}
  const [filterKey, setFilterKey] = useState(null) // shape: {label, value, badgeBg??}
  const [activeFilters, setActiveFilters] = useState([]) // each item: {[filterKey = {}, filterValue?? = {}, readyState = bool]}
  const [unreadyFilters, setUnreadyFilters] = useState([])

  useEffect(() => {
    setUpdatedFilters(filters)
  }, [filters])

  useEffect(() => {
    if (searchOnChange === true) {
      if (activeFilters.every(f => f[2])) {
        searchSubmit()
      }
    }
  }, [JSON.stringify(activeFilters)])

  const [isReady, ready, notReady] = useBoolState(false, {
    onTrue: () => showPopup && !unreadyFilters?.length > 0 && closePopup(),
  }) // boolean state, actions and effect, true when the filter is ready to be submited

  const [showPopup, openPopup, closePopup] = useBoolState(false, {
    onTrue: () => setFilterIndex(0),
    onFalse: () => setFilterIndex(null),
  }) // boolean state, actions and effect to show the popup

  const [visualfocus, visualFocusOn, visualFocusOff] = useBoolState(false, {
    onFalse: () => showPopup && closePopup(),
  }) // boolean to toggle between focus and blur on the ui, will be passed to popup

  const filterList = () => document.querySelectorAll('#filterList > li') // array of li elements from the popup (options) to be filled by the currentOptions
  const [filterIndex, setFilterIndex] = useState(null) // index for the current filterList element selected

  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    !filterValue && !filterKey && setUpdatedFilters(filters)
    filterKey && addFilter(filterKey, isReady) // when the filterKey is ready add it to activeFIlters List
    filterValue && addFilter(filterValue, isReady) // same for value
  }, [filterValue, filterKey])
  // Effect to handle selection change on the ui on filterList (with keyboard)
  useEffect(() => {
    if (filterIndex !== null) filterList()[filterIndex]?.focus()
  }, [filterIndex])
  // Effect to handle the situation when a value is removed from an active filter
  useEffect(() => {
    setUnreadyFilters(activeFilters.filter(f => f[1] === null)) // the filter with no value setted
  }, [currentOptions])

  useEffect(() => {
    if (unreadyFilters?.length > 0 && lastUnreadyFilter()?.values) {
      setUpdatedFilters(lastUnreadyFilter()?.values)
      setFilterKey(lastUnreadyFilter()?.key)
      setFilterIndex(0)
    } else activeFilters.length === readyFilters().length && closePopup()
  }, [unreadyFilters])
  // #endregion hooks

  // #region helpers
  const $input = () => searchRef?.current?.querySelector('input[type="search"]')

  const readyFilters = () => activeFilters.filter(f => f[2] === true) // the filters that will be submited on searchSubmit

  const findByLabel = (label, keyOrValue = 'key') =>
    filters.find(f => f[keyOrValue]?.label === label)

  const lastUnreadyFilter = () =>
    findByLabel(unreadyFilters[unreadyFilters.length - 1][0]?.label)

  const filterResolvedOnInput = () => filterList()[0]?.id === '%'

  const updateLiveRegion = message => {
    setSafeHTML('#liveregion', message)
  }

  const badgeCloseButtons = () => [
    ...document.querySelectorAll('[aria-label*="Clear filter"]'),
  ]

  const closeLastBadge = () => {
    const lastBadge = badgeCloseButtons().length - 1
    badgeCloseButtons()[lastBadge]?.click() // action to close the last badge when pressing Backspace
  }
  // #endregion helpers

  // #region filter handlers
  const addFilter = (toAdd, readyState) => {
    const isKey = toAdd === filterKey
    const isValue = toAdd === filterValue
    const index = isKey ? 0 : isValue && 1

    const keyOrValue = isKey ? '' : '. Press Enter to submit the query'

    setActiveFilters(prev => {
      const tempPrev = prev
      const isKeyAdded = prev.find(f => f[0]?.label === filterKey?.label)
      const newKeyIndex = prev.indexOf(isKeyAdded)
      const valueInput = inputValue
      setInputValue('')

      if (isKeyAdded) {
        isValue &&
          (tempPrev[newKeyIndex][index] = toAdd === '%' ? valueInput : toAdd)
        isKey && (tempPrev[newKeyIndex][1] = null)
        tempPrev[newKeyIndex][2] = readyState
      }

      const toReturn = !isKeyAdded
        ? [...prev, [filterKey, filterValue, readyState]]
        : tempPrev

      if (readyState) {
        setFilterKey(null)
        setFilterValue(null)
        setFilterIndex(null)
        notReady()
      } else isKey && openPopup()

      // focus the input after a small timeout (to avoid `unstable_flushDiscreteUpdates` error in console)
      setTimeout(() => {
        $input()?.focus()
      }, 200)

      return toReturn
    })

    updateLiveRegion(
      `filter option: ${toAdd?.label}. Successfully Added${keyOrValue}`,
    )
  }

  const removeFilter = label => {
    setActiveFilters(prev => {
      const tempPrev = prev
      const isKey = prev.find(f => f[0]?.label === label)
      const isValue = prev.find(f => f[1]?.label === label)
      const newKeyIndex = prev.indexOf(isKey || isValue)
      isKey && tempPrev.splice(newKeyIndex, 1)

      if (isValue) {
        tempPrev[newKeyIndex][1] = null // remove the value
        tempPrev[newKeyIndex][2] = false // set readyState to false

        setFilterShape(
          filters?.find(
            filter =>
              filter.values.find(value => value?.label === label) ||
              filter.values.find(value => value?.label === '%'),
          ),
        )
      }

      isKey && setFilterKey(null)
      isValue && setFilterValue(null)
      setTimeout(() => {
        $input()?.focus()
      }, 200)

      return tempPrev
    })
    updateLiveRegion(`filter:${label}, Removed`)
  }

  const setFilterShape = filterObject => {
    const { key = null, values = null } = filterObject

    if (values) {
      setFilterKey(key)
      setUpdatedFilters(values)
      notReady()
      setFilterIndex(0)
    } else if (!isReady && filterKey && currentOptions !== filters) {
      setFilterValue(filterObject)
      ready()
    } else {
      setFilterKey(key)
      setFilterValue(null)
      ready()
    }
  }

  const searchSubmit = () => {
    // to avoid triggering the query if there are unfinished filters
    // solves Enter key problem on authors query
    if (activeFilters.length !== readyFilters().length) return null
    const filtersToAdd = {}

    readyFilters().forEach(([k, v]) => {
      filtersToAdd[k?.value] = v?.value ?? inputValue
    })

    const query = inputValue?.length === 0 ? null : { searchQuery: inputValue }
    if (!filtersToAdd && !query) return onSearch({})

    const searchParams = {
      ...filtersToAdd,
      ...query,
    }

    return onSearch(searchParams)
  }

  // #endregion filter handlers

  // #region handlers
  const handleKeyDown = e => {
    const { key } = e
    const isValidUnicodeChar = /^.$/u.test(key)

    const options = {
      ArrowDown: () => {
        e.preventDefault()
        if (!showPopup) {
          openPopup()
        } else setFilterIndex(prev => safeIndex(prev + 1, 'down', filterList()))
      },
      ArrowUp: () => {
        e.preventDefault()
        showPopup && filterIndex
          ? setFilterIndex(prev => safeIndex(prev - 1, 'up', filterList()))
          : setFilterIndex(0)
      },
      Backspace: () => {
        if (inputValue?.length === 0) {
          closePopup()
          closeLastBadge()
        }
      },
      Escape: () => {
        closePopup()
        $input()?.focus()
      },
      Enter: () => {
        if (filterResolvedOnInput()) {
          if (inputValue.length === 0)
            updateLiveRegion('Type at least one character')
          else {
            filterList()[0]?.click()
          }
        } else !showPopup ? searchSubmit() : filterList()[filterIndex]?.click()
      },
      unicode: () => {
        if (document?.activeElement === $input()) return
        $input()?.focus()
      },
    }

    return safeCall(options[isValidUnicodeChar ? 'unicode' : key])
  }

  const handleChange = ({ target }) => {
    !visualfocus && visualFocusOn()
    setInputValue(target.value)
    !filterResolvedOnInput() && closePopup()
    // if (searchOnChange === true) searchSubmit()
  }

  const handleFocus = e => {
    if (
      // don't (re)show focus when tabbing on the search button
      document?.activeElement !== searchRef?.current?.querySelector('button')
    ) {
      visualFocusOn()
    }
  }

  const handleClick = () => {
    !inputValue && openPopup()
  }

  const handleBlur = e => {
    e.relatedTarget !== $input() && visualFocusOff()
  }
  // #endregion handlers

  return (
    <>
      <VisuallyHiddenElement
        aria-atomic="true"
        aria-hidden="false"
        aria-live="polite"
        id="liveregion"
      >
        {' '}
      </VisuallyHiddenElement>
      <SearchWrapper
        $visualfocus={visualfocus}
        aria-label="Searchbox"
        data-testid="search-filtered"
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        ref={searchRef}
      >
        <FilterList
          activeFilters={activeFilters}
          aria-hidden="false"
          currentIndex={filterIndex}
          currentOptions={currentOptions}
          filters={filters}
          inputValue={inputValue}
          searchSubmit={searchSubmit}
          setFilterShape={setFilterShape}
          setIndex={showPopup ? setFilterIndex : () => null}
          show={showPopup && !isReady}
          undoFilter={removeFilter}
          visualfocus={visualfocus}
        />
        <StyledSearch
          aria-controls="filterList"
          aria-expanded={showPopup}
          aria-label={ariaLabel}
          loading={loading}
          onChange={handleChange}
          onClick={handleClick}
          onSearch={searchSubmit}
          placeholder={placeholder}
          role="combobox"
          type="search"
          value={inputValue}
          {...rest}
        />
      </SearchWrapper>
    </>
  )
}

SearchFiltered.defaultProps = {
  searchOnChange: false,
  filters: ['author'],
  placeholder: 'Search...',
  onSearch: () => {},
  loading: false,
  ariaLabel: 'Search Filtered',
}
SearchFiltered.propTypes = {
  searchOnChange: PropTypes.bool,
  filters: PropTypes.arrayOf(
    oneOfType([PropTypes.string, PropTypes.bool, PropTypes.object]),
  ),
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
  loading: PropTypes.bool,
  ariaLabel: PropTypes.string,
}

export default SearchFiltered
