import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { th } from '@coko/client'
import { Button, Divider, List } from '.'
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
    padding: 0 8px;
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
    padding-top: 15px;
    color: ${th('colorText')};
    background-color: ${th('colorBackground')};
    border-top: 1px solid ${th('colorSecondary')};
  }

  .divider {
    border-bottom: 1px solid ${th('colorSecondary')};
    padding: 15px;
  }
`

const BulkActionBtn = styled(Button)`
  position: absolute;
  bottom: 10px;
  left: 8px;
  text-transform: uppercase;
`

const QuestionList = props => {
  const {
    bulkAction,
    loading,
    questions,
    onSearch,
    questionSelection,
    onSortOptionChange,
    sortOptions,
    questionsPerPage,
    showSearch,
    showSort,
    showTotalCount,
    totalCount,
  } = props

  const history = useHistory()

  const [selectedQuestions, setSelectedQuestions] = useState([])

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
      paginationConfig.onChange = page => onSearch({ page })
    }

    return paginationConfig
  }

  return (
    <Wrapper>
      {questions && (
        <>
          <List
            dataSource={questions}
            itemSelection={itemSelection}
            loading={loading}
            onSearch={query => onSearch({ query })}
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
      {questionSelection && (
        <BulkActionBtn
          disabled={selectedQuestions.length === 0}
          onClick={() => bulkAction(selectedQuestions)}
          type="primary"
        >
          Assign handling editor
        </BulkActionBtn>
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
          unit: PropTypes.string,
          section: PropTypes.string,
          topic: PropTypes.string,
          category: PropTypes.string,
          published: PropTypes.string,
        }),
      ),
    }),
  ),
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
  showSearch: PropTypes.bool,
  showSort: PropTypes.bool,
  showTotalCount: PropTypes.bool,
  totalCount: PropTypes.number,
}

QuestionList.defaultProps = {
  bulkAction: () => {},
  loading: false,
  onSearch: () => {},
  questionSelection: false,
  onSortOptionChange: () => {},
  questions: [],
  questionsPerPage: 10,
  sortOptions: [],
  showSearch: true,
  showSort: true,
  showTotalCount: true,
  totalCount: 0,
}

export default QuestionList
