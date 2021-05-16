import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { List as AntList } from 'antd'
import { grid, th } from '@coko/client'

import Search from './Search'
import UISelect from './Select'
import Spin from './Spin'

const Wrapper = styled.div``

const InternalHeader = styled.div`
  border-bottom: 1px solid ${th('colorBorder')};
  display: flex;
  padding: ${grid(2)};
`

const TotalCount = styled.div`
  align-items: center;
  display: flex;
`

const SortWrapper = styled.div`
  margin-left: auto;
`

const Select = styled(UISelect)`
  display: inline-block;
  margin-left: ${grid(2)};
  width: 150px;
`

const List = props => {
  const {
    className,

    // disable prop types for props that exist on the ant component anyway
    /* eslint-disable react/prop-types */
    pagination,
    /* eslint-enable react/prop-types */

    loading,
    onSearch,
    onSortOptionChange,
    searchLoading,
    searchPlaceholder,
    showSearch,
    showSort,
    showTotalCount,
    sortOptions,
    totalCount,

    ...rest
  } = props

  // `totalCount` prop exists only to display the count at the top of the list,
  // but since we have the value, might as well pass it to the pagination config.
  // If the pagination config has a `total` key, then use that.
  const passedPagination = pagination
  if (passedPagination && !passedPagination.total && totalCount)
    passedPagination.total = totalCount

  const showInternalHeaderRow = showSort || showTotalCount
  const defaultSortOption = sortOptions && sortOptions.find(o => o.isDefault)

  return (
    <Wrapper className={className}>
      {showSearch && (
        <Search
          loading={searchLoading}
          onSearch={onSearch}
          placeholder={searchPlaceholder}
        />
      )}

      {showInternalHeaderRow && (
        <InternalHeader>
          {showTotalCount && (
            <TotalCount>
              <span>{totalCount} results</span>
            </TotalCount>
          )}

          {showSort && (
            <SortWrapper>
              Sort by{' '}
              <Select
                defaultValue={defaultSortOption && defaultSortOption.value}
                onChange={onSortOptionChange}
                options={sortOptions}
              />
            </SortWrapper>
          )}
        </InternalHeader>
      )}

      <Spin spinning={loading}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <AntList pagination={passedPagination} {...rest} />
      </Spin>
    </Wrapper>
  )
}

List.propTypes = {
  loading: PropTypes.bool,
  onSearch: PropTypes.func,
  onSortOptionChange: PropTypes.func,
  searchLoading: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  showSearch: PropTypes.bool,
  showSort: PropTypes.bool,
  showTotalCount: PropTypes.bool,
  sortOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      isDefault: PropTypes.bool,
    }),
  ),
  totalCount: PropTypes.number,
}

List.defaultProps = {
  loading: false,
  onSearch: null,
  onSortOptionChange: null,
  searchLoading: false,
  searchPlaceholder: null,
  showSearch: false,
  showSort: false,
  showTotalCount: false,
  sortOptions: [],
  totalCount: null,
}

export default List
