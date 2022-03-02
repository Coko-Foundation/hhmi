import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { QuestionList } from '../common'
import DashboardNav from './DashboardNav'

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const ListWrapper = styled.div`
  max-width: 1170px;
  height: 1px; // needs an arbitrary height to fit its container
  flex-grow: 1; // stretches to the available space
  display: flex;
  margin: auto;
  width: 100%;
  .dashboard-list {
    width: 100%;
  }
`

const sortOptions = [
  {
    label: 'Date',
    value: 'date',
    isDefault: true,
  },
  {
    label: 'Unit',
    value: 'unit',
  },
  {
    label: 'Section',
    value: 'section',
  },
  {
    label: 'Topic',
    value: 'topic',
  },
  {
    label: 'Category',
    value: 'category',
  },
]

// QUESTION how to handle search, filter and pagination with multiple sections
const Dashboard = props => {
  const {
    loading,
    questions,
    totalCount,
    onClickCreateQuestion,
    onQuestionSelected,
    onSearch,
    userRole,
    activePage,
    bulkAction,
  } = props

  const [searchParams, setSearchParams] = useState({
    query: '',
    page: 1,
    sortBy: 'date',
  })

  const setSearchPage = page => {
    setSearchParams({ ...searchParams, page })
  }

  const setSearchQuery = query => {
    setSearchParams({ ...searchParams, query, page: 1 })
  }

  const setSortOption = sortBy => {
    sortOptions.filter(opt => opt.isDefault)[0].isDefault = false
    sortOptions.filter(opt => opt.value === sortBy)[0].isDefault = true

    setSearchParams({ ...searchParams, sortBy, page: 1 })
  }

  useEffect(() => {
    onSearch(searchParams)
  }, [searchParams])

  return (
    <Wrapper>
      <DashboardNav
        activePage={activePage}
        onClickCreate={onClickCreateQuestion}
        userRole={userRole}
      />
      <ListWrapper>
        <QuestionList
          bulkAction={bulkAction}
          currentPage={searchParams.page}
          loading={loading}
          onPageChange={setSearchPage}
          onQuestionSelected={onQuestionSelected}
          onSearch={setSearchQuery}
          onSortOptionChange={setSortOption}
          questions={questions}
          showRowCheckboxes={userRole === 'editor'}
          sortOptions={sortOptions}
          test={userRole === 'editor'}
          totalCount={totalCount}
        />
      </ListWrapper>
    </Wrapper>
  )
}

Dashboard.propTypes = {
  activePage: PropTypes.string,
  bulkAction: PropTypes.func,
  /** Loading results. */
  loading: PropTypes.bool,
  onClickCreateQuestion: PropTypes.func.isRequired,
  onQuestionSelected: PropTypes.func,
  onSearch: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      meta: PropTypes.arrayOf(
        PropTypes.shape({
          unit: PropTypes.string,
          section: PropTypes.string,
          topic: PropTypes.string,
          category: PropTypes.string,
          published: PropTypes.string,
        }),
      ),
      status: PropTypes.string,
    }),
  ),
  totalCount: PropTypes.number,
  userRole: PropTypes.string,
}

Dashboard.defaultProps = {
  activePage: '/authored',
  bulkAction: () => {},
  loading: false,
  onQuestionSelected: () => {},
  questions: [],
  totalCount: 0,
  userRole: 'author',
}

export default Dashboard
