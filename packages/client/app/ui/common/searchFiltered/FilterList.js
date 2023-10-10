/* eslint-disable react/no-array-index-key */
/* stylelint-disable string-quotes */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import React from 'react'
import { PropTypes } from 'prop-types'
import {
  PlusCircleFilled,
  CloseCircleFilled,
  FilterOutlined,
} from '@ant-design/icons'
import { th, lighten } from '@coko/client'
import styled from 'styled-components'
import { alpha } from '../../_helpers/themeUtils'

const FilterIcon = styled(FilterOutlined)`
  align-items: center;
  border-right: 1px solid
    ${p =>
      p.$visualfocus
        ? alpha('colorPrimary', 0.624)
        : alpha('colorBorder', 0.55)};
  color: ${p =>
    p.$visualfocus ? alpha('colorPrimary', 0.624) : alpha('colorBorder', 0.55)};
  display: flex;
  font-size: 18px;
  height: 100%;
  justify-content: center;
  margin: 0;
  padding: 0 5px;

  @media screen and (max-width: 800px) {
    border-right: 1px solid
      ${p => (p.$visualfocus ? '#a5c5cf' : alpha('colorBorder', 0.55))};
    font-size: 15px;
  }
`

const BadgesWrapper = styled.span`
  box-shadow: inset 0 0 7px #0001;
  display: contents;
  height: 25px;
  overflow: auto hidden;
  scrollbar-color: ${th('colorPrimary')} #fff;
  transition: background-color 0.3s;

  ::-webkit-scrollbar {
    height: 2px;
    width: 2px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${p => (p.$visualfocus ? th('colorPrimary') : '#bbb')};
    border: 2px solid #0000;
    border-radius: 1px;
    box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
    position: fixed;
  }

  ::-webkit-scrollbar-track {
    background: #0000;
  }

  @media screen and (max-width: 800px) {
    background-color: ${p =>
      p.$visualfocus
        ? alpha('colorPrimary', 0.07)
        : alpha('colorBorder', 0.07)};
    border-bottom: 1px solid
      ${p =>
        p.$visualfocus ? th('colorPrimaryBorder') : alpha('colorBorder', 0.8)};
    display: flex;
    font-size: 0.4rem;
    max-height: 25px;
    padding: 0.2rem;
    user-select: none;
    width: 100%;

    &:hover {
      border-color: ${th('colorPrimaryBorder')};
    }
  }
`

const FilterBadge = styled.div`
  align-items: center;
  background-color: ${p =>
    p.$visualfocus ? p.badgebg || th('colorPrimary') : th('colorBorder')};
  border: ${p => {
    const color = p.$visualfocus ? p.badgebg || 'colorPrimary' : 'colorBorder'
    return p.$show && `1px solid ${alpha(color, 0.09)}`
  }};
  border-radius: 0.1rem;
  box-shadow: ${p => (p.$show ? '0 0 3px #0003, inset 0 0 4px #fff6' : 'none')};
  color: ${p => (p.$show ? p.badgeColor || '#fff' : '#0000')};
  display: flex;
  font-size: 0.5rem;
  font-weight: 700;
  gap: 0.4rem;
  max-width: ${p => (p.$show ? 'max-content' : '0')};
  opacity: ${p => (p.$show ? (p.$visualfocus ? 1 : 0.7) : 0.7)};

  overflow: hidden;
  padding: ${p => (p.$show ? '0.2rem 0.5rem' : '0.2rem 0')};
  text-align: center;
  text-rendering: geometricPrecision;
  text-shadow: 0 0 2px #0005;
  text-transform: uppercase;
  transition: all 0.1s ease-in-out;
  white-space: nowrap;
  width: ${p => (p.$show ? '900px' : '1px')};
`

const CloseBadgeButton = styled(CloseCircleFilled)`
  color: ${p => p.$color || alpha('colorBackgroundHue', 0.7)};
  cursor: pointer;
  font-size: 12px;
  font-weight: 900;
  margin: 0 -3px 0 2px;
  max-width: ${p => (p.$show ? '12px' : '0')};
  transition: max-width 0.2s;
`

const FilterPopup = styled.div`
  align-items: center;
  background-color: #fff;
  border-color: ${p =>
    p.$visualfocus ? alpha('colorPrimaryBorder', 0.74) : th('colorBorder')};
  border-style: solid;
  border-top: none;
  border-width: ${p => (p.$show ? '1px' : '0')};
  box-shadow: ${p => (p.$show ? '0 0 10px #0001' : '0 0 0 #0000')},
    inset 0 0 10px #0001;
  display: flex;
  flex-direction: column;
  font-size: 0.7rem;
  justify-content: space-between;
  /* the 'magic numbers' are:
4px: the sum of the SearchWraper's outline + outline offset + StyledFilterList's border
1px: StyledFilterList's border */
  left: ${p => (p.$visualfocus ? '-4px' : '-1px')};
  max-height: ${p => (p.$show ? '200px' : '0')};
  min-width: 200px;
  overflow: hidden;
  position: absolute;
  top: ${p => (p.$visualfocus ? 'calc(100% + 4px)' : 'calc(100% + 1px)')};
  /* i put conditionaly a delay in borderWidth transition to eliminate it when
finish hiding the dropdown list 'cause if not the border remains there */
  transition: max-height 0.3s ease-in-out,
    border-width 0s ${p => !p.$show && '0.3s'};

  & > * {
    margin: 0;
  }

  // 'filter by'
  & > span {
    align-self: center;
    background-color: ${p =>
      p.$visualfocus
        ? alpha('colorPrimaryBorder', 0.15)
        : alpha('colorBorder', 0.1)};
    border-bottom: 1px solid
      ${p =>
        p.$visualfocus
          ? alpha('colorPrimary', 0.265)
          : alpha('colorBorder', 0.265)};
    box-shadow: inset 0 0 3px #0001;
    color: ${p => (p.$visualfocus ? th('colorSecondary') : th('colorText'))};
    font-size: 0.6rem;
    padding: 2px 5px;
    text-align: left;
    width: 100%;
  }

  & > ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    width: 100%;
  }

  & > ul > li {
    align-items: center;
    color: ${p =>
      p.$visualfocus ? th('colorPrimaryBorder') : alpha('colorBorder', 0.2)};
    cursor: pointer;
    display: flex;
    font-weight: 900;
    margin: 0 auto;
    padding: 0.2rem 0.3rem;
    text-align: left;
    transition: color 0.2s, background-color 0.2s;
    width: 100%;

    & > span.indicator {
      align-items: center;
      background-color: ${p =>
        !p.$visualfocus
          ? alpha('colorBorder', 0.4)
          : lighten('colorPrimaryBorder', 0.66)};
      border: 1px solid ${alpha('colorSecondary', 0.2)};
      border-radius: 100%;
      color: #fff0;
      display: flex;
      height: 7px;
      justify-content: center;
      margin: 0 0.6rem;
      transition: all 0.3s;
      width: 7px;
    }

    & > p {
      margin: 0;
      padding: 0.2rem 0;
      transition: all 0.3s;
    }
    /*  &:hover, */
    &:focus,
    &:focus-visible,
    &[aria-selected='true'] {
      background-color: ${alpha('colorBackgroundHue', 0.55)};
      border: none;
      color: ${th('colorPrimary')};
      font-weight: 900;
      outline: none;

      & > span.indicator {
        background-color: #0000;
        border-color: #0000;
        box-shadow: 0 0 10px ${alpha('colorPrimary', 0.24)};
        color: ${alpha('colorPrimary', 0.8)};
        margin-right: 0.9rem;
        transform: scale(1.2);
      }
    }
  }

  & > ul > li:not(:last-child) {
    border-bottom: 1px solid ${alpha('colorPrimary', 0.2)};
  }

  z-index: 9999;
`

const FilterList = ({
  currentIndex,
  filters,
  currentOptions,
  show,
  visualfocus,
  setFilterShape,
  undoFilter,
  activeFilters,
  setIndex,
  inputValue,
}) => {
  const setFilterValueFromInput = (e, i) => {
    setFilterShape(
      {
        ...currentOptions[i],
        label: inputValue,
        value: inputValue,
      },
      e,
    )
  }

  const closeBadgeKeyDown = (e, filter) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      undoFilter(filter)
    }
  }

  const renderBadges = () =>
    filters?.map((_, i) => {
      const currentFilter = index =>
        activeFilters[i] && activeFilters.map(([k, v]) => [k, v])[i][index]

      const k = currentFilter(0) || {}
      const v = currentFilter(1) || {}
      return (
        <span
          key={`bagdes${i}`}
          style={{
            transition: 'all 0.3s',
            display: 'flex',
            marginLeft: k?.label ? '7px' : '0',
          }}
        >
          <FilterBadge
            $show={k?.label}
            $visualfocus={visualfocus}
            badgebg={k?.badgeBg}
            badgeColor={k?.badgeColor}
            tabIndex={-1}
          >
            {k?.label}

            <CloseBadgeButton
              $show={k?.label && !v?.label}
              aria-label={
                k?.label && !v?.label ? `Clear filter option: ${k?.label}` : ''
              }
              onClick={() => undoFilter(k?.label)}
              onKeyDown={e => closeBadgeKeyDown(e, k?.label)}
              role="button"
              tabIndex={k?.label && !v?.label ? 0 : -1}
              title="Clear filter option"
            />
          </FilterBadge>

          <FilterBadge
            $show={v?.label}
            $visualfocus={visualfocus}
            aria-label={`${k?.label} ${v?.label}`}
            badgebg={v?.badgeBg}
            badgeColor={v?.badgeColor}
            isvalue
            tabIndex={-1}
          >
            {v?.label}
            <CloseBadgeButton
              $color={v?.badgeColor}
              $show={v?.label}
              aria-label={v?.label ? `Clear filter value: ${v?.label}` : ''}
              onClick={() => undoFilter(v?.label)}
              onKeyDown={e => closeBadgeKeyDown(e, v?.label)}
              pointerEvents="all"
              role="button"
              tabIndex={v?.label ? 0 : -1}
              title="Clear filter value"
            />
          </FilterBadge>
        </span>
      )
    })

  const renderOptions = () =>
    currentOptions?.map((filter, i) => {
      const key =
        typeof filter?.label === 'string' ? filter?.label : filter?.key?.label

      const isInput = key === '%'
      return (
        <li
          aria-label={
            isInput
              ? // maybe we can add to the filter object a prop to optionally fill this label
                filter?.ariaLabel || 'type your option'
              : `filter option: ${key}`
          }
          aria-selected={currentIndex === i}
          id={key}
          key={key}
          onClick={e =>
            !isInput
              ? setFilterShape(currentOptions[i], e)
              : inputValue.length > 0 && setFilterValueFromInput(e, i)
          }
          onMouseEnter={() => setIndex(i)}
          role="option"
          tabIndex={show ? 0 : -1}
        >
          <span className="indicator">
            <PlusCircleFilled />
          </span>
          <p>
            {key === '%'
              ? `...${inputValue}` || '...type the filter'
              : currentOptions[i]?.key?.label || currentOptions[i]?.label}
          </p>
        </li>
      )
    })

  return (
    <>
      <FilterPopup $show={show} $visualfocus={visualfocus}>
        <span id="filterlistlabel">
          {`Filter by:  ${
            filters.find(f =>
              f.values.find(({ label }) => label === currentOptions[0]?.label),
            )?.key?.label || ''
          }`}
        </span>
        <ul
          aria-labelledby="filterlistlabel"
          id="filterList"
          onMouseLeave={() => setIndex(null)}
          role="listbox"
          tabIndex={show ? 0 : -1}
        >
          {renderOptions()}
        </ul>
      </FilterPopup>
      <BadgesWrapper $visualfocus={visualfocus}>
        <FilterIcon $visualfocus={visualfocus} />
        {renderBadges()}
      </BadgesWrapper>
    </>
  )
}

FilterList.propTypes = {
  currentIndex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([null]),
  ]),
  currentOptions: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.object]),
  ),
  filters: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.object]),
  ),
  show: PropTypes.bool,
  setFilterShape: PropTypes.func,
  visualfocus: PropTypes.bool,
  activeFilters: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.array])),
  undoFilter: PropTypes.func,
  setIndex: PropTypes.func,
  inputValue: PropTypes.string,
}

FilterList.defaultProps = {
  filters: [{}],
  currentOptions: [{}],
  currentIndex: null,
  show: false,
  visualfocus: false,
  activeFilters: [],
  inputValue: '',
  undoFilter: () => {},
  setFilterShape: () => {},
  setIndex: () => {},
}

export default FilterList
