import React from 'react'
import PropTypes from 'prop-types'
import { Pagination as AntPagination } from 'antd'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`

const Pagination = props => {
  const {
    bulkAction,
    setPaginationCurrent,
    setPaginationSize,
    ...pagination
  } = props

  const paginationObj =
    pagination && typeof pagination === 'object' ? pagination : {}

  const defaultPaginationProps = {
    current: 1,
    total: 0,
    pageSize: 10,
  }

  const triggerPaginationEvent = eventName => (page, pageSize) => {
    setPaginationCurrent(page)
    setPaginationSize(pageSize)

    if (pagination && pagination[eventName]) {
      pagination[eventName](page, pageSize)
    }
  }

  const onPaginationChange = triggerPaginationEvent('onChange')

  const onPaginationShowSizeChange = triggerPaginationEvent('onShowSizeChange')

  const paginationProps = {
    ...defaultPaginationProps,
    ...(paginationObj || {}),
  }

  const largestPage = Math.ceil(
    paginationProps.total / paginationProps.pageSize,
  )

  if (paginationProps.current > largestPage) {
    paginationProps.current = largestPage
  }

  return (
    <Wrapper>
      <div>{bulkAction()}</div>
      <AntPagination
        {...paginationProps}
        onChange={onPaginationChange}
        onShowSizeChange={onPaginationShowSizeChange}
      />
    </Wrapper>
  )
}

Pagination.propTypes = {
  bulkAction: PropTypes.func,
  setPaginationCurrent: PropTypes.func.isRequired,
  setPaginationSize: PropTypes.func.isRequired,
}

Pagination.defaultProps = {
  bulkAction: () => {},
}

export default Pagination
