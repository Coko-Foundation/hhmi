/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { th } from '@coko/client'

import Search from './Search'

// UTILS

const fixedIndex = (index, direction, list, min = 0) => {
  let finalIndex
  const max = list.length - 1
  if (direction === 'down') {
    index > max ? (finalIndex = min) : (finalIndex = index)
  } else index < min ? (finalIndex = max) : (finalIndex = index)
  return finalIndex
}

// Styleds
const popUpOnShowCss = `
  margin-left: 0.3rem;
  padding: 0.2rem 0.5rem;
`

const SearchWrapper = styled.div`
  align-items: center;
  background-color: #fff;
  border: 1px solid ${p => (p.focus ? '#319494' : th('colorBorder'))};
  box-shadow: ${p => (p.focus ? `0 0 2px ${th('colorPrimary')}` : 'none')};
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  line-height: 1.375;
  outline: 2px solid ${p => (p.focus ? th('colorPrimaryBorder') : '#0000')};
  outline-offset: 1px;
  position: relative;

  &:hover {
    border: 1px solid #319494;
  }
`

const FilterBadge = styled.span`
  align-items: center;
  background-color: ${th('colorPrimary')};
  border-radius: 0.2rem;
  color: #fff;
  display: flex;
  font-size: 0.6rem;
  gap: 0.4rem;
  justify-content: space-between;
  max-width: ${p => (p.show ? '100px' : '0')};
  ${p => p.show && popUpOnShowCss}
  text-transform: uppercase;
  transform: scale(${p => (p.show ? '1' : '0')});
  transition: all 0.2s ease-in-out;

  & > span {
    color: #fff;
    cursor: pointer;
    font-weight: 700;
  }
`

const FilterPopup = styled.div`
  align-items: center;
  background-color: #fff;
  border-color: ${p => (p.focus ? th('colorPrimaryBorder') : '#777')};
  border-style: solid;
  border-top: none;
  border-width: ${p => (p.show ? '1px' : '0')};
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  justify-content: space-between;
  /* the 'magic numbers' are:
  4px: the sum of the SearchWraper's outline + outline offset + StyledFilterList's border
  1px: StyledFilterList's border */
  left: ${p => (p.focus ? '-4px' : '-1px')};
  max-height: ${p => (p.show ? '200px' : '0')};
  overflow: hidden;
  position: absolute;
  top: ${p => (p.focus ? 'calc(100% + 4px)' : 'calc(100% + 1px)')};
  /* i put conditionaly a delay in borderWidth transition to eliminate it when
  finish hiding the dropdown list 'cause if not the border remains there */
  /* transitions take too long?? */
  transition: max-height 0.3s linear, border-width 0s ${p => !p.show && '0.3s'};
  width: 200px;

  & > * {
    margin: 0;
  }

  & > span {
    align-self: center;
    background-color: ${p => (p.focus ? '#d4e9f7' : '#eee')};
    border-bottom: 1px solid #ddd;
    color: ${p => (p.focus ? th('colorSecondary') : th('colorText'))};
    font-size: 0.6rem;
    padding: 1px 5px;
    text-align: left;
    width: 100%;
  }

  & > ul {
    list-style: none;
    padding: 0;
    width: 100%;
  }

  & > ul > li {
    color: #5c5c5c;
    cursor: pointer;
    font-weight: 200;
    margin: 0;
    padding: 0.2rem 0;
    text-align: left;
    text-transform: uppercase;
    transition: color 0.3s, background-color 0.2s;
    width: 100%;

    &:hover,
    &.focused {
      background-color: ${p => (p.focus ? th('colorPrimary') : '#aaa')};
      color: #fff;
    }

    & > p {
      margin: 0;
      padding: 0.3rem;
      padding-left: 0.7rem;
    }
    /* stylelint-disable-next-line string-quotes */
    &[aria-selected='true'] {
      color: ${p => (p.focus ? th('colorPrimary') : '#777')};
      font-weight: 900;

      & > p {
        transform: scale(1.02);
      }

      &.focused,
      :hover {
        background-color: ${p => (p.focus ? th('colorPrimary') : '#aaa')};
        color: #fff;
      }
    }
  }

  & > ul > li:not(:last-child) {
    border-bottom: 1px solid #ddd;
  }
`

const StyledSearch = styled(Search)`
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
    border-left: 1px solid #777;
    outline: none;
  }

  input {
    background-color: transparent;
    border: none;
    outline: none;

    &:focus {
      background-color: transparent;
      border: none;
      box-shadow: none;
      outline: none;
    }
    transition: all 0.2s;
  }
`
// end Styleds

export const FilterList = React.forwardRef(
  (
    {
      selectedFilter,
      filters,
      show,
      setListRef,
      setClickedOnFilterList,
      focus,
      setSelected,
    },
    listRef,
  ) => {
    const unSelectFilter = () => {
      setSelected(null)
    }

    useEffect(() => {
      setClickedOnFilterList(false)
      listRef && listRef.current && setListRef([...listRef.current.children])
    }, [show])

    return (
      <>
        <FilterPopup focus={focus} show={(show || !selectedFilter) && focus}>
          <span id="filterlistlabel">Filter by:</span>
          <ul aria-labelledby="filterlistlabel" ref={listRef} role="listbox">
            {filters.map(item => (
              <li
                aria-selected="false"
                id={item}
                key={item}
                onMouseDown={() => {
                  setClickedOnFilterList(true)
                  setSelected(listRef.current.querySelector(`#${item}`))
                }}
                onMouseEnter={() => {
                  listRef.current
                    .querySelector(`.focused`)
                    ?.classList.remove('focused')
                }}
                role="option"
              >
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </FilterPopup>

        <FilterBadge
          onMouseDown={() => {
            setClickedOnFilterList(true)
          }}
          show={selectedFilter}
        >
          {selectedFilter}
          <span
            aria-label="Clear filter"
            onClick={unSelectFilter}
            role="button"
          >
            x
          </span>
        </FilterBadge>
      </>
    )
  },
)

const SearchFiltered = ({
  withFilters,
  searchOnChange,
  filters,
  placeholder,
  onSearch,
  loading,
  ariaLabel,
}) => {
  const searchRef = useRef(null)
  const filterListRef = useRef(null)

  const [filterList, setFilterList] = useState([])
  const [filterIndex, setFilterIndex] = useState(0)
  const [showPopup, setShowPopup] = useState(false)

  const [selectedFilter, setSelectedFilter] = useState(null)
  const [clickedOnFilterList, setClickedOnFilterList] = useState(false)

  const [query, setQuery] = useState('')
  const [focus, setFocus] = useState(false)

  const selectFilter = element => {
    const filterValue = element?.textContent || null
    setSelectedFilter({
      label: filterValue,
      value: filterValue,
    })
    unselectFilters()
    element && element.setAttribute('aria-selected', 'true')
  }

  const unselectFilters = () => {
    filterList.forEach(
      item =>
        item.ariaSelected === 'true' &&
        item.setAttribute('aria-selected', 'false'),
    )
  }

  const unfocusFilters = () => {
    filterList.forEach(item => item.classList.remove('focused'))
  }

  // HANDlERS
  const handleClick = () => {
    !query && setShowPopup(true) // if !query show the popup too?
  }

  const handleFocus = () => {
    setFocus(true)
    setShowPopup(true)
  }

  const handleKeyDown = ({ key }) => {
    ;(key === 'ArrowDown' || key === 'ArrowUp') && unfocusFilters()

    const options = {
      ArrowDown: () => {
        if (!showPopup) {
          setShowPopup(true)
          return
        }

        setFilterIndex(prev =>
          prev !== null ? fixedIndex(prev + 1, 'down', filterList) : 0,
        )
      },
      ArrowUp: () => {
        showPopup &&
          setFilterIndex(prev => fixedIndex(prev - 1, 'up', filterList))
      },
      Backspace: () => {
        if (searchRef.current.querySelector('input').value.length === 0) {
          setSelectedFilter(null)
          setShowPopup(true)
        }
      },
      Escape: () => {
        setShowPopup(false)
      },
      Enter: () => {
        if (showPopup) {
          selectFilter(filterList[filterIndex])
          setShowPopup(false)
        }
      },
    }

    return typeof options[key] === 'function' && options[key]()
  }

  const handleChange = ({ target }) => {
    !focus && setFocus(true)
    setQuery(target.value)
    setShowPopup(false)
    searchOnChange && searchSubmit(target.value)
  }

  const handleBlur = () => {
    if (!clickedOnFilterList) {
      setFocus(false)
    } else {
      setClickedOnFilterList(false)
      searchRef.current.querySelector('input').focus()
    }

    setShowPopup(false)
  }

  const searchSubmit = inputValue => {
    const searchParams = {
      query: inputValue,
      filter: selectedFilter?.value || null,
    }

    // eslint-disable-next-line no-console
    console.log(`query: ${searchParams.query}, filter: ${searchParams.filter}`) // I'll remove this
    onSearch(searchParams)
    return searchParams
  }

  useEffect(() => {
    unfocusFilters()
    !showPopup
      ? setFilterIndex(0)
      : filterList && filterList[filterIndex]?.classList.add('focused')
  }, [filterIndex, showPopup])

  useEffect(() => {
    !selectedFilter && unselectFilters()
  }, [selectedFilter])

  return (
    <SearchWrapper focus={focus} ref={searchRef}>
      {withFilters ? (
        <>
          <FilterList
            filters={filters}
            focus={focus}
            ref={filterListRef}
            selectedFilter={selectedFilter?.label}
            setClickedOnFilterList={setClickedOnFilterList}
            setListRef={setFilterList}
            setSelected={selectFilter}
            show={showPopup}
          />
          <StyledSearch
            aria-label={ariaLabel}
            loading={loading}
            onBlur={handleBlur}
            onChange={handleChange}
            onClick={handleClick}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            onSearch={() => !showPopup && searchSubmit(query)}
            placeholder={placeholder}
          />
        </>
      ) : (
        <StyledSearch
          aria-label={ariaLabel}
          loading={loading}
          onBlur={() => setFocus(null)}
          onFocus={handleFocus}
          onSearch={() => searchSubmit(query)}
          placeholder={placeholder}
        />
      )}
    </SearchWrapper>
  )
}

SearchFiltered.defaultProps = {
  withFilters: true,
  searchOnChange: false,
  filters: ['author'],
  placeholder: 'Search...',
  onSearch: () => {},
  loading: false,
  ariaLabel: 'Search Filtered',
}
SearchFiltered.propTypes = {
  withFilters: PropTypes.bool,
  searchOnChange: PropTypes.bool,
  filters: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
  loading: PropTypes.bool,
  ariaLabel: PropTypes.string,
}

FilterList.defaultProps = {
  selectedFilter: '',
  show: false,
  filters: ['author'],
  input: {},
  focus: false,
  setSelected: () => {},
  setListRef: () => {},
  setClickedOnFilterList: () => {},
}
FilterList.propTypes = {
  selectedFilter: PropTypes.string,
  filters: PropTypes.arrayOf(PropTypes.string),
  show: PropTypes.bool,
  setSelected: PropTypes.func,
  setListRef: PropTypes.func,
  setClickedOnFilterList: PropTypes.func,
  focus: PropTypes.bool,
  input: PropTypes.shape({ current: PropTypes.element }),
}

export default SearchFiltered
