import React, { useEffect, useRef, useState } from 'react'
import { Pagination } from 'ui'
import { CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons'

export const Base = () => <Pagination pagination={{ total: 31 }} />

export const ControlPage = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const onPageChange = page => {
    setCurrentPage(page)
  }

  return (
    <>
      <p>Page {currentPage}</p>
      <Pagination
        onChange={onPageChange}
        pagination={{ total: 31, current: currentPage }}
      />
    </>
  )
}

export const CustomRender = () => {
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

  const itemRender = (page, type, originalElement) => {
    if (type === 'next') {
      return (
        <CaretRightOutlined
          style={{ color: 'red', display: 'flex', fontSize: '31px' }}
          tabIndex={0}
        />
      )
    }

    if (type === 'prev') {
      return (
        <CaretLeftOutlined
          style={{ color: 'green', display: 'flex', fontSize: '31px' }}
          tabIndex={0}
        />
      )
    }

    if (type === 'jump-next' || type === 'jump-prev') {
      return originalElement
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
  }

  const paginationRef = useRef(null)

  useEffect(() => {
    if (paginationRef.current) {
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
  }, [paginationRef.current])

  return (
    <>
      <Pagination pagination={{ total: 31, itemRender }} ref={paginationRef} />
      <br />
      <aside>
        <p>
          Beware: applying a custom render for the pagination will break the
          default accessibility settings, so make sure you implement it
          correctly. You can pass a ref to the component which will be attached
          to the pagination&apos;s <code>&lt;nav&gt;</code> wraper, and you can
          use it to make the accessibility adjustements.
        </p>
      </aside>
    </>
  )
}

export default {
  component: Pagination,
  title: 'Common/Pagination',
}
