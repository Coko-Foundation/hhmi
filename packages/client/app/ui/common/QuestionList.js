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

const QuestionList = props => {
  const {
    loading,
    questions,
    onSearch,
    onSortOptionChange,
    sortOptions,
    questionsPerPage,
    showSearch,
    showSort,
    showTotalCount,
  } = props

  const history = useHistory()

  return (
    <Wrapper>
      {questions && (
        <List
          dataSource={questions}
          loading={loading}
          onSearch={onSearch}
          onSortOptionChange={onSortOptionChange}
          pagination={
            questionsPerPage && {
              pageSize: questionsPerPage,
            }
          }
          renderItem={item => (
            <List.Item>
              <LinkWithoutStyles
                href={`question/${item.id}`}
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  history.push(`question/${item.id}`)
                }}
              >
                <DashboardRow
                  content={item.description}
                  metadata={item.metadata}
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
          totalCount={questions.length}
        />
      )}
    </Wrapper>
  )
}

QuestionList.propTypes = {
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
}

QuestionList.defaultProps = {
  loading: false,
  onSearch: () => {},
  onSortOptionChange: () => {},
  questions: [],
  questionsPerPage: false,
  sortOptions: [],
  showSearch: true,
  showSort: true,
  showTotalCount: true,
}

export default QuestionList
