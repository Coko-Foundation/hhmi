/* stylelint-disable string-quotes */
import React, { useState, useEffect } from 'react'
import PropTypes, { oneOfType } from 'prop-types'
import styled from 'styled-components'
import { th } from '@coko/client'
import { PlusOutlined } from '@ant-design/icons'
import {
  QuestionList,
  TabsStyled as Tabs,
  Button,
  Spin,
  Empty,
} from '../common'
import { AssignHEButton } from '../question'

const Wrapper = styled.div`
  height: 100%;

  .ant-spin-container,
  .ant-spin-nested-loading {
    height: 100%;
  }
`

const StyledTabs = styled(Tabs)`
  height: 100%;

  .ant-tabs-content-holder {
    border-top: 1px solid ${th('colorBorder')};

    .ant-tabs-content {
      height: 100%;

      .ant-tabs-tabpane {
        height: 100%;
        margin: auto;
      }
    }
  }
`

const StyledCreateQuestionButton = styled(Button)`
  > span:not([role='img']) {
    display: none;
  }

  @media (min-width: ${th('mediaQueries.small')}) {
    > span:not([role='img']) {
      display: inline-block;
      margin-inline-start: 0;
    }

    > span[role='img'] {
      display: none;
    }
  }
`

// QUESTION how to handle search, filter and pagination with multiple sections
const Dashboard = props => {
  const {
    className,
    handlingEditors,
    initialTabKey,
    loading,
    loadingSearchHEs,
    locale,
    onAssignHE,
    onClickCreate,
    onSearch,
    showSort,
    sortOptions,
    onSearchHE,
    tabsContent,
    withFilters,
    filters,
  } = props

  const [searchParams, setSearchParams] = useState({
    query: '',
    page: 1,
    sortBy: 'date',
    role: initialTabKey,
  })

  const [selectedQuestions, setSelectedQuestions] = useState([])

  const setSearchPage = page => {
    setSearchParams({ ...searchParams, page })
  }

  const setSearchQuery = query => {
    setSearchParams({
      ...searchParams,
      query,
      page: 1,
    })
  }

  const setSortOption = sortBy => {
    setSearchParams({ ...searchParams, sortBy, page: 1 })
  }

  const setRole = role => {
    setSearchParams({ query: '', sortBy: 'date', page: 1, role })
  }

  const handleAssingHE = users => {
    return onAssignHE(users, selectedQuestions)
  }

  const updateSelectedQuestions = questions => {
    setSelectedQuestions(currentlySelectedQuestion =>
      currentlySelectedQuestion.filter(
        qId =>
          !questions.some(
            assignedQuestion =>
              assignedQuestion.questionId === qId &&
              assignedQuestion.hasAuthorshipConflict !== true,
          ),
      ),
    )
  }

  useEffect(() => {
    onSearch(searchParams)
  }, [searchParams])

  const CreateQuestionButton = (
    <StyledCreateQuestionButton
      aria-label="Create item"
      data-testid="create-question-btn"
      icon={<PlusOutlined />}
      onClick={onClickCreate}
      title="Create item"
      type="primary"
    >
      Create item
    </StyledCreateQuestionButton>
  )

  // if there are selectedQuestions and none of them is published

  const BulkAction = selectedQuestions.length > 0 &&
    !tabsContent
      .find(tab => tab.value === 'editor')
      ?.questions.filter(q => selectedQuestions.indexOf(q.id) !== -1)
      .some(q => q.status === 'Published') && (
      <AssignHEButton
        expanded
        handlingEditors={handlingEditors}
        loading={loadingSearchHEs}
        onAssign={handleAssingHE}
        onSearchHE={onSearchHE}
        updateSelectedQuestions={updateSelectedQuestions}
      />
    )

  const isLoading = tabsContent.some(tab => tab.loading)

  const mergedLocale = {
    emptyText: !isLoading ? (
      <Empty
        description="No Questions Found"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    ) : (
      <div role="status">Loading</div>
    ),
    ...locale,
  }

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
                  bulkAction={(showBulkActions && BulkAction) || null}
                  currentPage={searchParams.page}
                  filters={filters}
                  key={searchParams.role}
                  loading={tabLoading}
                  locale={mergedLocale}
                  onPageChange={setSearchPage}
                  onQuestionSelected={setSelectedQuestions}
                  onSearch={setSearchQuery}
                  onSortOptionChange={setSortOption}
                  questions={questions}
                  selectedQuestions={selectedQuestions}
                  showRowCheckboxes={!!showBulkActions}
                  showSort={showSort}
                  sortOptions={sortOptions}
                  totalCount={totalCount}
                  withFilters={withFilters}
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
  handlingEditors: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
  initialTabKey: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  loadingSearchHEs: PropTypes.bool,
  locale: PropTypes.shape(),
  /** create new question */
  onClickCreate: PropTypes.func.isRequired,
  onAssignHE: PropTypes.func,
  /** handle selection and deselection of questions */
  onSearch: PropTypes.func.isRequired,
  onSearchHE: PropTypes.func,
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
          assigned: PropTypes.bool,
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
  filters: PropTypes.arrayOf(
    oneOfType([PropTypes.string, PropTypes.bool, PropTypes.object]),
  ),
  withFilters: PropTypes.bool,
}

Dashboard.defaultProps = {
  handlingEditors: [],
  initialTabKey: null,
  locale: null,
  loadingSearchHEs: false,
  onAssignHE: () => {},
  onSearchHE: () => {},
  showSort: false,
  sortOptions: [],
  tabsContent: [],
  filters: null,
  withFilters: false,
}

export default Dashboard
