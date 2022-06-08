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
    showSort,
    sortOptions,
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
              bulkAction={showBulkActions && bulkActions}
              currentPage={searchParams.page}
              key={searchParams.role}
              loading={loading}
              onPageChange={setSearchPage}
              onQuestionSelected={onQuestionSelected}
              onSearch={setSearchQuery}
              onSortOptionChange={setSortOption}
              questions={questions}
              showRowCheckboxes={!!showBulkActions}
              showSort={showSort}
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
  bulkActions: PropTypes.element,
  /** custom component for create question */
  createQuestionButton: PropTypes.element,
  /** Loading results. */
  loading: PropTypes.bool,
  /** handele selection and deselection of questions */
  onQuestionSelected: PropTypes.func,
  onSearch: PropTypes.func.isRequired,
  tabsContent: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      questions: PropTypes.arrayOf(
        PropTypes.shape({
          metadata: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
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
      totalCount: PropTypes.number,
      showBulkActions: PropTypes.bool,
    }),
  ),
  showSort: PropTypes.bool,
  sortOptions: PropTypes.arrayOf(PropTypes.shape()),
}

Dashboard.defaultProps = {
  bulkActions: null,
  createQuestionButton: null,
  loading: false,
  onQuestionSelected: () => {},
  tabsContent: [],
  showSort: false,
  sortOptions: [],
}

export default Dashboard
