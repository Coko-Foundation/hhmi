import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { th } from '@coko/client'
import List from './List'
import LinkWithoutStyles from './LinkWithoutStyles'
import QuestionItem from './QuestionItem'

const ButtonWithoutStyles = styled.button`
  background-color: transparent;
  border: none;
`

const StyledListItem = styled(List.Item)`
  && {
    border-bottom: 1px solid ${th('colorSecondary')};
    padding: 15px;
  }
`

const RenderItem = ({ item, onClickRow }) => {
  return (
    <StyledListItem>
      <LinkWithoutStyles href={item.href} onClick={() => onClickRow(item)}>
        <QuestionItem
          content={item.description}
          metadata={item.metadata}
          status={item.status}
          title={item.title}
        />
      </LinkWithoutStyles>
    </StyledListItem>
  )
}

RenderItem.propTypes = {
  item: PropTypes.shape().isRequired,
  onClickRow: PropTypes.func.isRequired,
}

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
        return <ButtonWithoutStyles>Previous</ButtonWithoutStyles>
      }

      if (type === 'next') {
        return <ButtonWithoutStyles>Next</ButtonWithoutStyles>
      }

      return originalElement
    }

    return paginationConfig
  }

  return (
    <List
      className={className}
      dataSource={questions}
      footerContent={bulkAction}
      itemSelection={itemSelection}
      loading={loading}
      onSearch={onSearch}
      onSortOptionChange={onSortOptionChange}
      pagination={pagination()}
      renderItem={item => <RenderItem item={item} onClickRow={onClickRow} />}
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
      id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      metadata: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
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
  bulkAction: <div />,
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
