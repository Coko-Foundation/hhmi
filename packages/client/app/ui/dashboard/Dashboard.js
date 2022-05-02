import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { QuestionList, TabsStyled as Tabs } from '../common'

const StyledTabs = styled(Tabs)`
  height: 100%;

  .ant-tabs-content {
    height: 100%;
  }
`

const StyledTabPane = styled(Tabs.TabPane)`
  height: 100%;
  margin: auto;
  max-width: 1170px;
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
    bulkActions,
    className,
    loading,
    createQuestionButton,
    onQuestionSelected,
    onSearch,
    tabsContent,
  } = props

  const [searchParams, setSearchParams] = useState({
    query: '',
    page: 1,
    sortBy: 'date',
    role: 'author',
  })

  const setSearchPage = page => {
    setSearchParams({ ...searchParams, page })
  }

  const setSearchQuery = query => {
    setSearchParams({ ...searchParams, query, page: 1 })
  }

  const setSortOption = sortBy => {
    setSearchParams({ ...searchParams, sortBy, page: 1 })
  }

  const setRole = role => {
    setSearchParams({ query: '', sortBy: 'date', page: 1, role })
  }

  useEffect(() => {
    onSearch(searchParams)
  }, [searchParams])

  return (
    <StyledTabs
      className={className}
      onChange={setRole}
      tabBarExtraContent={createQuestionButton}
    >
      {tabsContent.map(
        ({ value, label, questions, totalCount, showBulkActions }) => (
          <StyledTabPane className="test" key={value} tab={label}>
            <QuestionList
              bulkActions={showBulkActions && bulkActions}
              currentPage={searchParams.page}
              key={searchParams.role}
              loading={loading}
              onPageChange={setSearchPage}
              onQuestionSelected={onQuestionSelected}
              onSearch={setSearchQuery}
              onSortOptionChange={setSortOption}
              questions={questions}
              showRowCheckboxes={!!showBulkActions}
              sortOptions={sortOptions}
              totalCount={totalCount}
            />
          </StyledTabPane>
        ),
      )}
    </StyledTabs>
  )
}

Dashboard.propTypes = {
  /** custom component for bulk actions on selected questions */
  bulkActions: PropTypes.shape(),
  /** custom component for create question */
  createQuestionButton: PropTypes.shape(),
  /** Loading results. */
  loading: PropTypes.bool,
  /** handele selection and deselection of questions */
  onQuestionSelected: PropTypes.func,
  onSearch: PropTypes.func.isRequired,
  tabsContent: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      quesitons: PropTypes.arrayOf(PropTypes.shape()),
      totalCount: PropTypes.number,
      showBulkActions: PropTypes.bool,
    }),
  ),
}

Dashboard.defaultProps = {
  bulkActions: null,
  createQuestionButton: null,
  loading: false,
  onQuestionSelected: () => {},
  tabsContent: [],
}

export default Dashboard
