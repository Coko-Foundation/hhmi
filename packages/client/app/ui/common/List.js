import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { without } from 'lodash'

import { List as AntList } from 'antd'
import { grid, th } from '@coko/client'

import UICheckBox from './Checkbox'
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

const List = props => {
  const {
    className,

    // disable prop types for props that exist on the ant component anyway
    /* eslint-disable react/prop-types */
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
        <AntList
          pagination={passedPagination}
          renderItem={listItemToRender}
          {...rest}
        />
      </Spin>
    </Wrapper>
  )
}

List.propTypes = {
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
