import React from 'react'
import PropTypes from 'prop-types'
import { Pagination } from 'antd'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`

const ListFooter = props => {
  const { bulkAction, pagination } = props

  const {
    setPaginationCurrent,
    setPaginationSize,
    ...paginationObj
  } = pagination

  const showPagination =
    paginationObj.showPagination || paginationObj.total > paginationObj.pageSize

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
      {bulkAction}
      {showPagination && (
        <Pagination
          {...paginationProps}
          onChange={onPaginationChange}
          onShowSizeChange={onPaginationShowSizeChange}
        />
      )}
    </Wrapper>
  )
}

ListFooter.propTypes = {
  bulkAction: PropTypes.element,
  pagination: PropTypes.shape({
    setPaginationCurrent: PropTypes.func.isRequired,
    setPaginationSize: PropTypes.func.isRequired,
    showPagination: PropTypes.bool,
  }),
}

ListFooter.defaultProps = {
  bulkAction: <div />,
  pagination: {},
}

export default ListFooter
