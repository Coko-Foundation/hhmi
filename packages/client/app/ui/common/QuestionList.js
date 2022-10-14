import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { th, grid } from '@coko/client'

import List from './List'
import QuestionItem from './QuestionItem'

const ButtonWithoutStyles = styled.button`
  background-color: transparent;
  border: none;
`

const RenderItem = ({ item, onClickRow }) => {
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
  onClickRow: PropTypes.func.isRequired,
}

const StyledList = styled(List)`
  padding-top: ${grid(4)};

  .ant-list {
    box-shadow: inset 0 0 4px ${th('colorBorder')};
  }

  .ant-list-items {
    padding: 0 10px;

    > li:not(:last-child) {
      border-bottom: 1px solid ${th('colorSecondary')};
    }
  }
`

const QuestionList = props => {
  const {
    bulkAction,
    currentPage,
    className,
    loading,
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
  } = props

  const itemSelection = showRowCheckboxes
    ? {
        onChange: id => onQuestionSelected(id),
      }
    : null

  const shouldShowPagination =
    totalCount > questions.length || questions.length > questionsPerPage

  const pagination = () => {
    if (!shouldShowPagination) {
      return false
    }

    const paginationConfig = {}
    paginationConfig.pageSize = questionsPerPage

    if (totalCount > questions.length) {
      paginationConfig.onChange = onPageChange
    }

    paginationConfig.current = currentPage

    paginationConfig.itemRender = (_page, type, originalElement) => {
      if (type === 'prev') {
        return (
          <ButtonWithoutStyles aria-label="Previous page">
            Previous
          </ButtonWithoutStyles>
        )
      }

      if (type === 'next') {
        return (
          <ButtonWithoutStyles aria-label="Next page">Next</ButtonWithoutStyles>
        )
      }

      return originalElement
    }

    return paginationConfig
  }

  return (
    <StyledList
      className={className}
      dataSource={questions}
      footerContent={bulkAction}
      itemSelection={itemSelection}
      loading={loading}
      onSearch={onSearch}
      onSortOptionChange={onSortOptionChange}
      pagination={pagination()}
      renderItem={item => <RenderItem item={item} onClickRow={onClickRow} />}
      searchPlaceholder="Search..."
      showSearch={showSearch}
      showSort={showSort}
      showTotalCount={showTotalCount}
      sortOptions={sortOptions}
      totalCount={totalCount}
    />
  )
}

QuestionList.propTypes = {
  bulkAction: PropTypes.element,
  loading: PropTypes.bool,
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
}

QuestionList.defaultProps = {
  bulkAction: null,
  loading: false,
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
}

export default QuestionList
