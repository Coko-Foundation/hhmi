import React, { useEffect, useState, memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { without } from 'lodash'

import { List as AntList, Pagination /* ConfigProvider */ } from 'antd'

import { grid, th } from '@coko/client'

import UICheckBox from './Checkbox'
import Search from './Search'
import UISelect from './Select'
import Spin from './Spin'

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

const SearchWrapper = styled.div`
  padding: 0 ${grid(2)};
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

  &:last-child > .ant-list-item {
    border: none;
  }

  > :last-child {
    flex-grow: 1;
  }
`

const StyledList = styled(AntList)`
  overflow: auto;
  flex-grow: 1;
`

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`

const CheckBox = styled(UICheckBox)`
  padding: ${grid(2)};
`

// const compareItem = (preProps, nextProps) => {
//   if (preProps.id === nextProps.id && preProps.selected === nextProps.selected)
//     return true
//   return false
// }

// memoize Selectable item to avoid unecessary rerendering every time an item is selected/deselected
// const SelectableItem = memo(props => {
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
// }, compareItem)

SelectableItem.propTypes = {
  id: PropTypes.string.isRequired,
  renderItem: PropTypes.func.isRequired,
  onDeselect: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
}

// memoized SelectableItem would use old value of selectedItems when handleSelect and handleDeselect are passed as they are
// when you wrap them with the below function, they always refer to the List's updated selectedItems
// function useFunction(callback) {
//   const ref = React.useRef()
//   ref.current = callback

//   function callbackFunction(...args) {
//     const cb = ref.current

//     if (typeof callback === 'function') {
//       return cb.apply(this, args)
//     }

//     return false
//   }

//   return useCallback(callbackFunction, [])
// }

// const EmptyList = () => {
//   return 'no data'
// }

const List = props => {
  const {
    footerContent,
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

  // const handleSelect = useFunction(id => {
  //   setSelectedItems([...selectedItems, id])
  // })
  const handleSelect = id => {
    setSelectedItems([...selectedItems, id])
  }

  // const handleDeselect = useFunction(id => {
  //   setSelectedItems(without(selectedItems, id))
  // })
  const handleDeselect = id => {
    setSelectedItems(without(selectedItems, id))
  }

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

  const paginationObj = {
    current: 1,
    pageSize: 10,
    ...pagination,
  }

  const [paginationCurrent, setPaginationCurrent] = useState(
    paginationObj.current,
  )

  const [paginationSize, setPaginationSize] = useState(paginationObj.pageSize)

  useEffect(() => {
    setPaginationCurrent(paginationObj.current)
    setPaginationSize(paginationObj.pageSize)
  }, [pagination])

  const passedPagination = {
    ...paginationObj,
    current: paginationCurrent,
    pageSize: paginationSize,
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

  const largestPage = Math.ceil(
    passedPagination.total / passedPagination.pageSize,
  )

  if (passedPagination.current > largestPage) {
    passedPagination.current = largestPage
  }

  const shouldShowPagination =
    passedPagination.total > splitDataSource.length ||
    splitDataSource.length > 10 // hardcoded 10 for pageSize, bcs if we set pageSize > data.length pagination will disapear with no chance of getting it back

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
        <SearchWrapper>
          <Search
            loading={searchLoading}
            onSearch={onSearch}
            placeholder={searchPlaceholder}
          />
        </SearchWrapper>
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
        <FooterWrapper className={className}>
          {footerContent}
          {shouldShowPagination && (
            <Pagination
              {...passedPagination}
              onChange={onPaginationChange}
              onShowSizeChange={onPaginationShowSizeChange}
            />
          )}
        </FooterWrapper>
        {/* </ConfigProvider> */}
      </Spin>
    </Wrapper>
  )
}

List.propTypes = {
  footerContent: PropTypes.element,
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
  footerContent: <div />,
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
