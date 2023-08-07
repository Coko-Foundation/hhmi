import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { th, grid } from '@coko/client'

import List from './List'
import QuestionItem from './QuestionItem'

const RenderItem = ({ item }) => {
  return (
    <QuestionItem
      // additionalMetadata={item.additionalMetadata}
      content={item.content}
      courses={item.courses}
      header={item.header}
      href={item.href}
      id={item.id}
      metadata={item.metadata}
      state={item.state}
      status={item.status}
      title={item.title}
    />
  )
}

RenderItem.propTypes = {
  item: PropTypes.shape().isRequired,
}

const StyledList = styled(List)`
  padding-top: ${grid(4)};

  .ant-list {
    box-shadow: inset 0 0 4px ${th('colorBorder')};
  }

  .ant-list-items {
    > li {
      border-left: 5px solid transparent;
      transition: border-left-color 0.15s ease-in-out,
        background-color 0.15s ease-in-out;

      &:hover,
      &:focus-within {
        background-color: ${th('colorBackgroundHue')};
        border-left-color: ${th('colorPrimary')};
      }

      &:not(:last-child) {
        border-bottom: 1px solid ${th('colorSecondary')};
      }
    }

    .ant-checkbox {
      align-self: auto;
    }
  }
`

const QuestionList = props => {
  const {
    autoFocusSearch,
    bulkAction,
    currentPage,
    className,
    loading,
    locale,
    questions,
    onSearch,
    onPageChange,
    showRowCheckboxes,
    onSortOptionChange,
    questionsPerPage,
    sortOptions,
    showSearch,
    showSort,
    showTotalCount,
    totalCount,
    onQuestionSelected,
    onClickRow,
    draggable,
    onDragEnd,
    selectedQuestions,
  } = props

  const itemSelection = showRowCheckboxes
    ? {
        onChange: id => onQuestionSelected(id),
      }
    : null

  const pagination = () => {
    const paginationConfig = {}
    paginationConfig.pageSize = questionsPerPage

    if (totalCount > questions.length) {
      paginationConfig.onChange = onPageChange
    }

    paginationConfig.current = currentPage
    paginationConfig.showSizeChanger = false

    return paginationConfig
  }

  return (
    <StyledList
      autoFocusSearch={autoFocusSearch}
      className={className}
      dataSource={questions}
      draggable={draggable}
      footerContent={bulkAction}
      itemSelection={itemSelection}
      loading={loading}
      locale={locale}
      onDragEnd={onDragEnd}
      onSearch={onSearch}
      onSortOptionChange={onSortOptionChange}
      pagination={pagination()}
      renderItem={item => <RenderItem item={item} onClickRow={onClickRow} />}
      searchPlaceholder="Search..."
      selectedItems={selectedQuestions}
      showSearch={showSearch}
      showSort={showSort}
      showTotalCount={showTotalCount}
      sortOptions={sortOptions}
      totalCount={totalCount}
    />
  )
}

QuestionList.propTypes = {
  autoFocusSearch: PropTypes.bool,
  bulkAction: PropTypes.element,
  loading: PropTypes.bool,
  locale: PropTypes.shape(),
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      metadata: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
        }),
      ),
      content: PropTypes.shape({
        type: PropTypes.string,
        content: PropTypes.arrayOf(PropTypes.shape()),
      }),
      status: PropTypes.string,
      href: PropTypes.string,
      id: PropTypes.string,
      courses: PropTypes.arrayOf(
        PropTypes.shape({
          course: PropTypes.shape({
            label: PropTypes.string,
          }),
          label: PropTypes.string,
          objectives: PropTypes.arrayOf(
            PropTypes.shape({ label: PropTypes.string }),
          ),
        }),
      ),
    }),
  ),
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
  onSearch: PropTypes.func,
  onSortOptionChange: PropTypes.func,
  questionsPerPage: PropTypes.number,
  onQuestionSelected: PropTypes.func,
  onClickRow: PropTypes.func,
  sortOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  showRowCheckboxes: PropTypes.bool,
  showSearch: PropTypes.bool,
  showSort: PropTypes.bool,
  showTotalCount: PropTypes.bool,
  totalCount: PropTypes.number,
  draggable: PropTypes.bool,
  onDragEnd: PropTypes.func,
  selectedQuestions: PropTypes.arrayOf(PropTypes.string),
}

QuestionList.defaultProps = {
  autoFocusSearch: false,
  bulkAction: null,
  loading: false,
  locale: {},
  currentPage: 1,
  onPageChange: () => {},
  onSearch: () => {},
  onSortOptionChange: () => {},
  questions: [],
  questionsPerPage: 10,
  sortOptions: [],
  onQuestionSelected: () => {},
  onClickRow: () => {},
  showRowCheckboxes: false,
  showSearch: true,
  showSort: true,
  showTotalCount: true,
  totalCount: 0,
  draggable: false,
  onDragEnd: () => {},
  selectedQuestions: [],
}

export default QuestionList
