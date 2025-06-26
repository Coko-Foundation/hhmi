/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, memo, useCallback, useRef } from 'react'
import PropTypes, { oneOfType } from 'prop-types'
import { isEqual } from 'lodash'
import styled from 'styled-components'
import without from 'lodash/without'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { List as AntList } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'

import { grid, th } from '@coko/client'

import UICheckBox, { SelectAllCheckbox } from './Checkbox'
// import Search from './Search'
import UISelect from './Select'
import Pagination from './Pagination'
import VisuallyHiddenElement from './VisuallyHiddenElement'
import { Indicator } from './Spin'
import Empty from './Empty'
import Search from './Search'

// #region styled
const Wrapper = styled.div`
  background-color: ${th('colorBackground')};
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  position: relative;
`

const DroppableWrapper = styled.div`
  flex-grow: 1;
  overflow: auto;
`

const SearchWrapper = styled.div`
  align-self: center;
  background-color: ${th('colorBackgroundHue')};
  padding: ${grid(4)} ${grid(4)};
  width: 100%;
`

const InternalHeader = styled.div`
  /* border-bottom: 1px solid ${th('colorBorder')}; */
  display: flex;
  outline: 1px solid #0005;
  padding: ${grid(1)} ${grid(2)};
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

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
  width: 100%;

  @media screen and (min-width: 1200px) {
    flex-direction: row;
  }
`

const ListItemWrapper = styled.li`
  align-items: center;
  display: flex;
  justify-content: stretch;
  padding: 0;

  &:focus {
    outline: 2px solid ${th('colorPrimary')};
    outline-offset: -2px;
  }

  & > label {
    display: flex;

    & > span {
      align-self: center;
    }
  }

  &&&& {
    background-color: ${({ isDragging }) =>
      isDragging ? th('colorSelection') : 'transparent'};
  }
`

const StyledList = styled(AntList)`
  flex-grow: 1;
  overflow: auto;

  .ant-spin-nested-loading {
    height: 100%;

    .ant-spin {
      display: grid;
      max-height: unset;
      place-content: center;
    }
  }
`

const StyledLoader = styled(Indicator)`
  transform: translateY(-100%);
`

const FooterWrapper = styled.div`
  align-items: start;
  background-color: ${th('colorBackground')};
  border: 1px solid ${th('colorBorder')};
  display: flex;
  flex-direction: column;
  gap: ${grid(2)};

  justify-content: space-between;
  padding: ${grid(2)};

  @media screen and (min-width: 1200px) {
    flex-direction: row;
  }
`

const CheckBox = styled(UICheckBox)`
  padding: ${grid(2)};
  z-index: 9;
`

const StyledScrollWrapper = styled(InfiniteScroll)`
  display: flex;
  flex-direction: column;
  width: 100%;
`
// #endregion styled

const compareItem = (preProps, nextProps) =>
  JSON.stringify(preProps) === JSON.stringify(nextProps)

// memoize Selectable item to avoid unecessary rerendering every time an item is selected/deselected
const SelectableItem = memo(props => {
  const {
    id,
    index,
    renderItem,
    onDeselect,
    onSelect,
    selected,
    checkboxLabel,
    renderItemsOutsideLabel,
    ...rest
  } = props

  const handleChange = () => {
    if (selected) {
      onDeselect(id)
    } else {
      onSelect(id)
    }
  }

  return checkboxLabel !== '' ? (
    <>
      <CheckBox
        aria-label={checkboxLabel}
        checked={selected}
        onChange={handleChange}
      />
      {renderItem({ id, ...rest }, index)}
    </>
  ) : (
    <>
      <CheckBox checked={selected} onChange={handleChange}>
        <VisuallyHiddenElement>Select item: </VisuallyHiddenElement>
        {!renderItemsOutsideLabel && renderItem({ id, ...rest }, index)}
      </CheckBox>
      {renderItemsOutsideLabel && renderItem({ id, ...rest }, index)}
    </>
  )
}, compareItem)

SelectableItem.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  renderItem: PropTypes.func.isRequired,
  onDeselect: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  checkboxLabel: PropTypes.string,
  renderItemsOutsideLabel: PropTypes.bool,
}

SelectableItem.defaultProps = {
  checkboxLabel: '',
  renderItemsOutsideLabel: false,
}

// memoized SelectableItem would use old value of selectedItems when handleSelect and handleDeselect are passed as they are
// when you wrap them with the below function, they always refer to the List's updated selectedItems
function useFunction(callback) {
  const ref = React.useRef()
  ref.current = callback

  function callbackFunction(...args) {
    const cb = ref.current

    if (typeof callback === 'function') {
      return cb.apply(this, args)
    }

    return false
  }

  return useCallback(callbackFunction, [])
}

// const EmptyList = () => {
//   return 'no data'
// }
const defaultComponents = {
  Header: InternalHeader,
  ListItemWrapper,
  FooterWrapper,
  SearchWrapper,
  CheckBox,
  ContentWrapper,
}

const List = props => {
  const {
    autoFocusSearch,
    footerContent,
    className,
    // disable prop types for props that exist on the ant component anyway
    /* eslint-disable react/prop-types */
    dataSource,
    locale,
    pagination,
    renderItem,

    /* eslint-enable react/prop-types */
    renderItemsOutsideLabel, // to decide if we should render the items outside the Checkbox in SelectableItem component
    itemSelection,
    isArchivedItems,
    listKey,
    loading,
    onArchiveChange,
    onSearch,
    onSortOptionChange,
    searchLoading,
    searchPlaceholder,
    showArchiveOption,
    showPagination,
    showSearch,
    showSort,
    showTotalCount,
    sortOptions,
    totalCount,
    draggable,
    onDragEnd,
    selectedItems: controlledSelectedItems,
    withFilters,
    CustomComponents,
    subHeaderItems,
    filters,
    fullListOfIds,
    infiniteScroll,
    defaultSearch,
    ...rest
  } = props

  const [selectedItems, setSelectedItems] = useState([])
  const listRef = useRef(null)

  const customComponents = {
    ...defaultComponents,
    ...CustomComponents,
  }

  useEffect(() => {
    itemSelection &&
      itemSelection.onChange &&
      itemSelection.onChange(selectedItems)
  }, [selectedItems])

  // Reset selected items to controlledSelectedItems when dataSource changes
  // by default it will reset selection (controlledSelectedItems = [])
  // to preserve it, keep track of selected items in the parent component, and pass it down via this prop

  useEffect(() => {
    if (!isEqual(selectedItems, controlledSelectedItems)) {
      setSelectedItems(controlledSelectedItems)
    }
    // eslint-disable-next-line react/prop-types
  }, [JSON.stringify(dataSource.map(d => d.id)), controlledSelectedItems])

  const handleSelect = useFunction(id => {
    setSelectedItems([...selectedItems, id])
  })

  const handleDeselect = useFunction(id => {
    setSelectedItems(without(selectedItems, id))
  })

  const listItemToRender = itemSelection
    ? (itemProps, i) => {
        return draggable ? (
          <Draggable draggableId={`draggable-${i}`} index={i}>
            {(provided, snapshot) => (
              <customComponents.ListItemWrapper
                data-testid="list-item-wrapper"
                key={itemProps?.id}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                isDragging={snapshot.isDragging}
                ref={provided.innerRef}
              >
                <SelectableItem
                  index={i}
                  onDeselect={handleDeselect}
                  onSelect={handleSelect}
                  renderItem={renderItem}
                  renderItemsOutsideLabel={renderItemsOutsideLabel}
                  selected={selectedItems.includes(itemProps?.id)}
                  {...itemProps}
                />
              </customComponents.ListItemWrapper>
            )}
          </Draggable>
        ) : (
          <customComponents.ListItemWrapper
            data-testid="list-item-wrapper"
            key={itemProps?.id}
          >
            <SelectableItem
              index={i}
              onDeselect={handleDeselect}
              onSelect={handleSelect}
              renderItem={renderItem}
              renderItemsOutsideLabel={renderItemsOutsideLabel}
              selected={selectedItems.includes(itemProps?.id)}
              {...itemProps}
            />
          </customComponents.ListItemWrapper>
        )
      }
    : (itemProps, i) => {
        return (
          <customComponents.ListItemWrapper data-testid="list-item-wrapper">
            {draggable ? (
              <Draggable draggableId={`draggable-${i}`} index={i}>
                {provided => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    {renderItem(itemProps, i)}
                  </div>
                )}
              </Draggable>
            ) : (
              renderItem(itemProps, i)
            )}
          </customComponents.ListItemWrapper>
        )
      }

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

  const triggerPaginationEvent = eventName => (page, pageSize) => {
    setPaginationCurrent(page)
    setPaginationSize(pageSize)

    if (pagination && pagination[eventName]) {
      pagination[eventName](page, pageSize)
    }
  }

  const onPaginationChange = triggerPaginationEvent('onChange')

  const onPaginationShowSizeChange = triggerPaginationEvent('onShowSizeChange')

  const passedPagination = {
    ...paginationObj,
    current: paginationCurrent,
    pageSize: paginationSize,
    onShowSizeChange: onPaginationShowSizeChange,
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

  const largestPage = Math.ceil(
    passedPagination.total / passedPagination.pageSize,
  )

  if (passedPagination.current > largestPage) {
    passedPagination.current = largestPage
  }

  const showInternalHeaderRow = showSort || showTotalCount || subHeaderItems
  const defaultSortOption = sortOptions && sortOptions.find(o => o.isDefault)

  // remove `isDefault` prop from sortOptions bcs it's unrecognized when spread onto an html <option>
  const sanitizedSortOptions = sortOptions.map(({ label, value }) => ({
    label,
    value,
  }))

  const mergedLocale = {
    emptyText: !loading ? (
      <Empty
        description="No Data"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        role="status"
      />
    ) : (
      <div role="status">Loading</div>
    ),
    ...locale,
  }

  const ListToRender = draggable ? (
    <DragDropContext onDragEnd={onDragEnd}>
      <DroppableWrapper>
        <Droppable droppableId="dropable-list">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {infiniteScroll.enabled ? (
                <StyledScrollWrapper {...infiniteScroll?.props}>
                  <AntList
                    dataSource={splitDataSource}
                    loading={
                      loading
                        ? { spinning: true, indicator: <StyledLoader /> }
                        : { spinning: false, indicator: <StyledLoader /> }
                    }
                    locale={mergedLocale}
                    ref={listRef}
                    renderItem={listItemToRender}
                    {...rest}
                    pagination={false}
                  />
                </StyledScrollWrapper>
              ) : (
                <AntList
                  dataSource={splitDataSource}
                  loading={
                    loading
                      ? { spinning: true, indicator: <StyledLoader /> }
                      : { spinning: false, indicator: <StyledLoader /> }
                  }
                  locale={mergedLocale}
                  renderItem={listItemToRender}
                  {...rest}
                />
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DroppableWrapper>
    </DragDropContext>
  ) : infiniteScroll.enabled ? (
    <StyledScrollWrapper {...infiniteScroll?.props}>
      <StyledList
        dataSource={dataSource}
        loading={
          loading
            ? { spinning: true, indicator: <StyledLoader /> }
            : { spinning: false, indicator: <StyledLoader /> }
        }
        locale={mergedLocale}
        renderItem={listItemToRender}
        {...rest}
      />
    </StyledScrollWrapper>
  ) : (
    <StyledList
      dataSource={splitDataSource}
      loading={
        loading
          ? { spinning: true, indicator: <StyledLoader /> }
          : { spinning: false, indicator: <StyledLoader /> }
      }
      locale={mergedLocale}
      renderItem={listItemToRender}
      {...rest}
    />
  )

  return (
    <Wrapper className={className}>
      {showSearch && (
        <customComponents.SearchWrapper>
          <Search
            aria-label="Enter text to search in list"
            autoFocus={autoFocusSearch}
            defaultValue={defaultSearch}
            filters={filters}
            loading={searchLoading}
            onSearch={onSearch}
            placeholder={searchPlaceholder}
            withFilters={withFilters}
          />
        </customComponents.SearchWrapper>
      )}

      {showInternalHeaderRow && (
        <customComponents.Header>
          {itemSelection && (
            <SelectAllCheckbox
              CustomRender={{ CheckBox: customComponents.CheckBox }}
              dataSource={fullListOfIds ?? dataSource}
              items={selectedItems}
              listKey={listKey}
              setItems={setSelectedItems}
            />
          )}

          {showTotalCount && (
            <TotalCount>
              <span>{totalCount} results</span>
            </TotalCount>
          )}

          {showArchiveOption && (
            <CheckBox checked={isArchivedItems} onChange={onArchiveChange}>
              Show archived
            </CheckBox>
          )}

          {showSort && (
            <SortWrapper>
              {/* disabling linter for this line because the label is indeed associated with the select input */}
              {/* alternatively: add a label prop to Select and render it from within the component */}
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>
                Sort by
                <Select
                  data-testid="sort-select"
                  defaultValue={defaultSortOption && defaultSortOption.value}
                  id="sortBy"
                  onChange={onSortOptionChange}
                  options={sanitizedSortOptions}
                />
              </label>
            </SortWrapper>
          )}

          {subHeaderItems && subHeaderItems}
        </customComponents.Header>
      )}
      <customComponents.ContentWrapper id="list-content-wrapper">
        {/* {customComponents?.AsideLeft} */}
        {ListToRender}
        {/* {customComponents?.AsideRight} */}
      </customComponents.ContentWrapper>

      {(footerContent || showPagination) && (
        <customComponents.FooterWrapper>
          {footerContent || <div />}

          {showPagination && (
            <Pagination
              onChange={onPaginationChange}
              pagination={passedPagination}
            />
          )}
        </customComponents.FooterWrapper>
      )}
    </Wrapper>
  )
}

List.propTypes = {
  autoFocusSearch: PropTypes.bool,
  footerContent: PropTypes.element,
  fullListOfIds: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string.isRequired }),
  ),
  isArchivedItems: PropTypes.bool,
  itemSelection: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
  }),
  subHeaderItems: PropTypes.element,
  renderItemsOutsideLabel: PropTypes.bool,
  CustomComponents: PropTypes.shape({}),
  loading: PropTypes.bool,
  listKey: PropTypes.string,
  onArchiveChange: PropTypes.func,
  onSearch: PropTypes.func,
  onSortOptionChange: PropTypes.func,
  searchLoading: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  showArchiveOption: PropTypes.bool,
  showPagination: PropTypes.bool,
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
  onDragEnd: PropTypes.func,
  draggable: PropTypes.bool,
  selectedItems: PropTypes.arrayOf(PropTypes.string),
  filters: PropTypes.arrayOf(
    oneOfType([PropTypes.string, PropTypes.bool, PropTypes.object]),
  ),
  withFilters: PropTypes.bool,
  infiniteScroll: PropTypes.shape({
    enabled: PropTypes.bool,
    props: PropTypes.shape({}),
  }),
  defaultSearch: PropTypes.string,
}

List.defaultProps = {
  autoFocusSearch: false,
  CustomComponents: defaultComponents,
  footerContent: null,
  fullListOfIds: null,
  isArchivedItems: false,
  itemSelection: null,
  listKey: null,
  loading: false,
  onArchiveChange: null,
  onSearch: null,
  onSortOptionChange: null,
  subHeaderItems: null,
  renderItemsOutsideLabel: false,
  searchLoading: false,
  showArchiveOption: false,
  showPagination: true,
  searchPlaceholder: null,
  showSearch: false,
  showSort: false,
  showTotalCount: false,
  sortOptions: [],
  totalCount: null,
  onDragEnd: () => {},
  draggable: false,
  selectedItems: [],
  filters: [],
  withFilters: false,
  infiniteScroll: { enabled: false, props: {} },
  defaultSearch: '',
}

List.Item = AntList.Item

export default List
