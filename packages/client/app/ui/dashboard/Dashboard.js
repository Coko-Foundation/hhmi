import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { QuestionList, TabsStyled as Tabs, Button, Spin } from '../common'

const Wrapper = styled.div`
  height: 100%;

  .ant-spin-container,
  .ant-spin-nested-loading {
    height: 100%;
  }
`

const StyledTabs = styled(Tabs)`
  height: 100%;

  .ant-tabs-content {
    height: 100%;

    .ant-tabs-tabpane {
      height: 100%;
      margin: auto;
    }
  }
`

// QUESTION how to handle search, filter and pagination with multiple sections
const Dashboard = props => {
  const {
    bulkActions,
    className,
    initialTabKey,
    loading,
    locale,
    onClickCreate,
    onQuestionSelected,
    onSearch,
    showSort,
    sortOptions,
    tabsContent,
  } = props

  const [searchParams, setSearchParams] = useState({
    query: '',
    page: 1,
    sortBy: 'date',
    role: initialTabKey,
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

  const CreateQuestionButton = (
    <Button onClick={onClickCreate} type="primary">
      Create Question
    </Button>
  )

  return (
    <Wrapper>
      <Spin renderBackground={false} spinning={loading}>
        <StyledTabs
          className={className}
          defaultActiveKey={initialTabKey}
          items={tabsContent.map(
            ({
              value,
              label,
              loading: tabLoading,
              questions,
              totalCount,
              showBulkActions,
            }) => ({
              label,
              key: value,
              children: (
                <QuestionList
                  bulkAction={(showBulkActions && bulkActions) || null}
                  currentPage={searchParams.page}
                  key={searchParams.role}
                  loading={tabLoading}
                  locale={locale}
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
              ),
            }),
          )}
          onChange={setRole}
          tabBarExtraContent={CreateQuestionButton}
        />
      </Spin>
    </Wrapper>
  )
}

Dashboard.propTypes = {
  /** custom component for bulk actions on selected questions */
  bulkActions: PropTypes.element,
  initialTabKey: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  locale: PropTypes.shape(),
  /** create new question */
  onClickCreate: PropTypes.func.isRequired,
  /** handle selection and deselection of questions */
  onQuestionSelected: PropTypes.func,
  onSearch: PropTypes.func.isRequired,
  showSort: PropTypes.bool,
  sortOptions: PropTypes.arrayOf(PropTypes.shape()),
  tabsContent: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      /** Loading results. */
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
      totalCount: PropTypes.number,
      showBulkActions: PropTypes.bool,
    }),
  ),
}

Dashboard.defaultProps = {
  bulkActions: null,
  initialTabKey: null,
  locale: {},
  onQuestionSelected: () => {},
  showSort: false,
  sortOptions: [],
  tabsContent: [],
}

export default Dashboard
