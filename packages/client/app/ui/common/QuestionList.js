import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { th } from '@coko/client'
import { Divider, List } from '.'
import { DashboardRow } from '../dashboard'

const LinkWithoutStyles = styled.a`
  color: inherit;
  text-decoration: none;
  width: 100%;

  &:hover,
  &:focus,
  &:active {
    color: inherit;
    text-decoration: none;
  }
`

const Wrapper = styled.main`
  overflow: hidden;
  position: relative;
  height: 100%;
  .ant-input-search {
    padding: 0 8px 4px;
    border-bottom: 1px solid ${th('colorPrimary')};
    .ant-input {
      border: none;
      &:focus {
        /* box-shadow: 0 4px 2px -2px rgba(100, 149, 237, 0.2); */
        box-shadow: none;
      }
    }
    .ant-input-group-addon button.ant-input-search-button {
      color: ${th('colorPrimary')} !important;
    }
  }
  > div {
    height: 100%;
  }
  .ant-spin-nested-loading {
    height: calc(100% - 70px);
    padding-top: 15px;
  }
  .ant-spin-container,
  .ant-list {
    overflow: auto;
    height: 100%;
    .ant-list-item {
      border-bottom: none;
      padding: 0 15px;
    }
  }
  .ant-list-pagination {
    position: sticky;
    bottom: 0;
    margin-top: 0;
    color: ${th('colorText')};
    background-color: ${th('colorBackground')};
    border-top: 1px solid ${th('colorSecondary')};
    display: flex;
    align-items: center;
    justify-content: right;
    height: 50px;
  }

  .divider {
    border-bottom: 1px solid ${th('colorSecondary')};
    padding: 15px;
  }

  .ant-list-footer {
    position: absolute;
    width: 50%;
    height: 48px;
    z-index: 2;
    padding: 0 20px;
    display: flex;
    align-items: center;
  }
`

const QuestionList = props => {
  const {
    bulkAction,
    currentPage,
    loading,
    questions,
    onSearch,
    onPageChange,
    questionSelection,
    onSortOptionChange,
    sortOptions,
    questionsPerPage,
    showSearch,
    showSort,
    showTotalCount,
    totalCount,
    setSelectedQuestions,
  } = props

  const history = useHistory()

  const BulkAction = bulkAction

  const itemSelection = questionSelection
    ? {
        onChange: id => setSelectedQuestions(id),
      }
    : false

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

    return paginationConfig
  }

  return (
    <Wrapper>
      {questions && (
        <>
          <List
            dataSource={questions}
            footer={questionSelection && <BulkAction />}
            itemSelection={itemSelection}
            loading={loading}
            onSearch={onSearch}
            onSortOptionChange={onSortOptionChange}
            pagination={pagination()}
            renderItem={item => (
              <List.Item>
                <LinkWithoutStyles
                  href={item.href}
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    history.push(`question/${item.id}`)
                  }}
                >
                  <DashboardRow
                    content={item.description}
                    metadata={item.metadata}
                    status={item.status}
                    title={item.title}
                  />
                  <Divider />
                </LinkWithoutStyles>
              </List.Item>
            )}
            showSearch={showSearch}
            showSort={showSort}
            showTotalCount={showTotalCount}
            sortOptions={sortOptions}
            totalCount={totalCount}
          />
        </>
      )}
    </Wrapper>
  )
}

QuestionList.propTypes = {
  bulkAction: PropTypes.func,
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
  questionSelection: PropTypes.bool,
  onSortOptionChange: PropTypes.func,
  questionsPerPage: PropTypes.number,
  sortOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      isDefault: PropTypes.bool,
    }),
  ),
  setSelectedQuestions: PropTypes.func,
  showSearch: PropTypes.bool,
  showSort: PropTypes.bool,
  showTotalCount: PropTypes.bool,
  totalCount: PropTypes.number,
}

QuestionList.defaultProps = {
  bulkAction: () => {},
  loading: false,
  currentPage: 1,
  onPageChange: () => {},
  onSearch: () => {},
  questionSelection: false,
  onSortOptionChange: () => {},
  questions: [],
  questionsPerPage: 10,
  sortOptions: [],
  setSelectedQuestions: () => {},
  showSearch: true,
  showSort: true,
  showTotalCount: true,
  totalCount: 0,
}

export default QuestionList
