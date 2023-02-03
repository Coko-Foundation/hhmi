import React, { useEffect, useRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Pagination as AntPagination } from 'antd'
import { grid, th } from '@coko/client'

const PaginationNav = styled.nav`
  .ant-pagination li {
    &:focus-within {
      outline: 4px solid #71ada9;
      outline-offset: 1px;
      transition: outline-offset 0s, outline 0s;
    }
  }

  .ant-pagination-prev,
  .ant-pagination-next {
    > * {
      color: ${th('colorText')};
      display: block;
      height: 100%;
      padding: 0 ${grid(1)};
      width: 100%;

      /* stylelint-disable-next-line string-quotes */
      &[aria-disabled='true'] {
        color: ${props => `${props.theme.colorText}77`};
        cursor: not-allowed;
      }

      &:hover {
        background-color: gainsboro;
        transition: all 0.2s;
      }
    }
  }
`

const Pagination = React.forwardRef((props, forwardRef) => {
  const { pagination, onChange, onShowSizeChange, ...rest } = props

  const { current, pageSize } = pagination

  const paginationRef = useRef(null)

  useImperativeHandle(forwardRef, () => paginationRef.current)

  useEffect(() => {
    // enhance accessibility of pagination, only if no custom render method was provided
    if (pagination && !pagination.itemRender) {
      paginationRef.current
        .querySelectorAll('li.ant-pagination-item')
        .forEach((page, index) => {
          const counter = index + 1
          let label = `Go to page ${counter}`

          if (page.classList.contains('ant-pagination-item-active')) {
            page
              .querySelector(':scope > *')
              .setAttribute('aria-current', 'page')
            label = `Page ${counter} , Current Page`
          } else {
            page.querySelector(':scope > *').removeAttribute('aria-current')
          }

          page.querySelector(':scope > *').setAttribute('aria-label', label)
        })

      paginationRef.current
        .querySelectorAll('.ant-pagination li:not([class*="custom-icon"])')
        .forEach(item => {
          item.removeAttribute('tabindex')

          if (item.getAttribute('aria-disabled') === 'true') {
            item.querySelector(':scope > *').removeAttribute('disabled')
            item
              .querySelector(':scope > *')
              .setAttribute('aria-disabled', 'true')
          } else {
            item.querySelector(':scope > *').removeAttribute('aria-disabled')
          }
        })
    }
  }, [current, pageSize])

  const paginationLinkClick = e => {
    e.preventDefault()
  }

  const paginationKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      e.currentTarget.parentNode.click()
    }
  }

  const itemRender =
    pagination.itemRender ||
    ((page, type, originalElement) => {
      if (type === 'jump-next' || type === 'jump-prev') {
        return originalElement
      }

      if (type === 'prev') {
        return (
          <a
            href="/previous/page"
            onClick={paginationLinkClick}
            onKeyDown={paginationKeyDown}
          >
            Previous
          </a>
        )
      }

      if (type === 'next') {
        return (
          <a
            href="/next/page"
            onClick={paginationLinkClick}
            onKeyDown={paginationKeyDown}
          >
            Next
          </a>
        )
      }

      return (
        <a
          href={`/page/${page}`}
          onClick={paginationLinkClick}
          onKeyDown={paginationKeyDown}
        >
          {page}
        </a>
      )
    })

  return (
    <PaginationNav
      aria-label="Pagination"
      ref={paginationRef}
      role="navigation"
      {...rest}
    >
      <AntPagination
        {...pagination}
        itemRender={itemRender}
        onChange={onChange}
        onShowSizeChange={onShowSizeChange}
      />
    </PaginationNav>
  )
})

Pagination.propTypes = {
  pagination: PropTypes.shape({
    current: PropTypes.number,
    total: PropTypes.number,
    pageSize: PropTypes.number,
    itemRender: PropTypes.func,
  }),
  onChange: PropTypes.func,
  onShowSizeChange: PropTypes.func,
}

Pagination.defaultProps = {
  pagination: {
    current: 1,
    pageSize: 10,
    itemRender: null,
  },
  onChange: () => {},
  onShowSizeChange: () => {},
}

export default Pagination
