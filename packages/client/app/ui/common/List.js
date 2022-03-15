import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { without } from 'lodash'

import { List as AntList /* ConfigProvider */ } from 'antd'

import { grid, th } from '@coko/client'

import UICheckBox from './Checkbox'
import Search from './Search'
import UISelect from './Select'
import Spin from './Spin'
import ListFooter from './ListFooter'

const Wrapper = styled.div`
  background-color: ${th('colorBackground')};
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  > .ant-spin-nested-loading {
    flex-grow: 1;
    overflow: hidden;
    > .ant-spin-container {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
`

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

const SelectableWrapper = styled.div`
  align-items: center;
  display: flex;

  .ant-list-item-meta-avatar {
    align-self: center;
    margin: 0 ${grid(4)};
  }

  > :last-child {
    flex-grow: 1;
  }
`

const StyledList = styled(AntList)`
  overflow: auto;
  flex-grow: 1;
`

const CheckBox = styled(UICheckBox)`
  padding: ${grid(2)};
`

const SelectableItem = props => {
  const {
    id,
    renderItem: RenderItem,
    onDeselect,
    onSelect,
    selected,
    ...rest
  } = props

  const handleChange = () => {
    if (selected) {
      onDeselect(id)
    } else {
      onSelect(id)
    }
  }

  return (
    <SelectableWrapper key={id}>
      <CheckBox checked={selected} onChange={handleChange} />
      <RenderItem id={id} {...rest} />
    </SelectableWrapper>
  )
}

SelectableItem.propTypes = {
  id: PropTypes.string.isRequired,
  renderItem: PropTypes.func.isRequired,
  onDeselect: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
}

// const EmptyList = () => {
//   return 'no data'
// }

const List = props => {
  const {
    bulkAction,
    className,
    // disable prop types for props that exist on the ant component anyway
    /* eslint-disable react/prop-types */
    dataSource,
    pagination,
    renderItem,
    /* eslint-enable react/prop-types */

    itemSelection,
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

  const [selectedItems, setSelectedItems] = useState([])

  useEffect(() => {
    itemSelection &&
      itemSelection.onChange &&
      itemSelection.onChange(selectedItems)
  }, [selectedItems])

  const handleSelect = id => setSelectedItems([...selectedItems, id])
  const handleDeselect = id => setSelectedItems(without(selectedItems, id))

  const listItemToRender = itemSelection
    ? itemProps => (
        <SelectableItem
          onDeselect={handleDeselect}
          onSelect={handleSelect}
          renderItem={renderItem}
          selected={selectedItems.includes(itemProps.id)}
          {...itemProps}
        />
      )
    : renderItem

  const [paginationCurrent, setPaginationCurrent] = useState(1)

  const [paginationSize, setPaginationSize] = useState(10)

  const passedPagination = {
    current: paginationCurrent,
    pageSize: paginationSize,
    ...pagination,
  }

  let splitDataSource = [...dataSource]

  // `totalCount` prop exists only to display the count at the top of the list,
  // but since we have the value, might as well pass it to the pagination config.
  // If the pagination config has a `total` key, then use that.
  // if neither `total` key nor totalCount are present but pagination object still exist, use dataSource.length as total
  if (passedPagination && !passedPagination.total) {
    if (totalCount) {
      passedPagination.total = totalCount
    } else {
      passedPagination.total = splitDataSource.length
    }
  }

  if (pagination) {
    if (
      splitDataSource.length >
      (passedPagination.current - 1) * passedPagination.pageSize
    ) {
      splitDataSource = [...dataSource].splice(
        (passedPagination.current - 1) * passedPagination.pageSize,
        passedPagination.pageSize,
      )
    }
  }

  const shouldShowPagination =
    passedPagination.total > splitDataSource.length ||
    splitDataSource.length > passedPagination.pageSize

  const showInternalHeaderRow = showSort || showTotalCount
  const defaultSortOption = sortOptions && sortOptions.find(o => o.isDefault)

  passedPagination.setPaginationCurrent = setPaginationCurrent
  passedPagination.setPaginationSize = setPaginationSize
  passedPagination.showPagination = shouldShowPagination

  // remove `isDefault` prop from sortOptions bcs it's unrecognized when spread onto an html <option>
  const sanitizedSortOptions = sortOptions.map(({ label, value }) => ({
    label,
    value,
  }))

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
                options={sanitizedSortOptions}
              />
            </SortWrapper>
          )}
        </InternalHeader>
      )}

      <Spin spinning={loading}>
        {/* <ConfigProvider renderEmpty={EmptyList}> */}
        <StyledList
          dataSource={splitDataSource}
          renderItem={listItemToRender}
          {...rest}
        />
        <ListFooter bulkAction={bulkAction} pagination={passedPagination} />
        {/* </ConfigProvider> */}
      </Spin>
    </Wrapper>
  )
}

List.propTypes = {
  bulkAction: PropTypes.element,
  itemSelection: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
  }),
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
  bulkAction: <div />,
  itemSelection: null,
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

List.Item = AntList.Item

export default List
