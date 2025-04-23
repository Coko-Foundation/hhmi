/* stylelint-disable string-quotes */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { grid, th } from '@coko/client'
import { PlusOutlined } from '@ant-design/icons'
import {
  QuestionList,
  TabsStyled as Tabs,
  Button,
  Spin,
  Empty,
} from '../common'
import { ArchiveItemsButton, AssignHEButton } from '../question'
import useBreakpoint from '../_helpers/useBreakpoint'
import AddToListPopup from '../common/AddToListPopup'

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
    /* border-top: 1px solid ${th('colorBorder')}; */

    .ant-tabs-content {
      height: 100%;

      .ant-tabs-tabpane {
        height: 100%;
        margin: auto;
      }
    }
  }

  div[class^='List__FooterWrapper'] {
    @media screen and (min-width: 600px) {
      flex-direction: row;
    }
  }
`

const StyledCreateQuestionButton = styled(Button)``

const BulkActionWrapper = styled.div`
  display: flex;
  gap: ${grid(2)};
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
    onChangeArchiveStatus,
    onClickCreate,
    onSearch,
    showSort,
    sortOptions,
    onSearchHE,
    tabsContent,
    withFilters,
    existingListsOptions,
    onAddToList,
    onCreateList,
    loadingAddToList,
    loadingCreateList,
  } = props

  const isMobile = useBreakpoint('(max-width: 900px)')

  const [searchParams, setSearchParams] = useState({
    query: '',
    page: 1,
    sortBy: 'date',
    role: initialTabKey,
    archived: false,
  })

  const [selectedQuestions, setSelectedQuestions] = useState([])

  useEffect(() => {
    onSearch(searchParams)
  }, [searchParams])

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
    setSearchParams({
      query: '',
      sortBy: 'date',
      page: 1,
      archived: false,
      role,
    })
  }

  const setArchived = () => {
    setSelectedQuestions([])
    setSearchParams({ ...searchParams, archived: !searchParams.archived })
  }

  const handleTabChange = role => {
    setSelectedQuestions([])
    setRole(role)
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

  const handleArchiveSelectedItems = async status => {
    return onChangeArchiveStatus(
      selectedQuestions,
      status,
      searchParams.role,
    ).then(() => {
      setSelectedQuestions([])
    })
  }

  const getBulkAction = value => {
    if (selectedQuestions.length === 0) return null

    switch (value) {
      case 'editor':
        return EditorBulkAction
      case 'handlingEditor':
        return HandlingEditorBulkAction
      case 'author':
        return AuthorBulkAction
      default:
        return null
    }
  }

  const CreateQuestionButton = isMobile ? (
    <StyledCreateQuestionButton
      aria-label="Create item"
      data-testid="create-question-btn"
      icon={<PlusOutlined />}
      onClick={onClickCreate}
      title="Create item"
      type="primary"
    />
  ) : (
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

  const EditorBulkAction = (
    <BulkActionWrapper>
      {!tabsContent
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
      )}
      {tabsContent
        .find(tab => tab.value === 'editor')
        ?.questions.filter(q => selectedQuestions.indexOf(q.id) !== -1)
        .every(
          q =>
            q.status === 'Unpublished' ||
            q.status === 'Published' ||
            q.status === 'Rejected',
        ) && (
        <ArchiveItemsButton
          isArchived={searchParams.archived}
          onChangeArchiveStatus={handleArchiveSelectedItems}
        />
      )}
    </BulkActionWrapper>
  )

  const HandlingEditorBulkAction = (
    <BulkActionWrapper>
      {tabsContent
        .find(tab => tab.value === 'handlingEditor')
        ?.questions.filter(q => selectedQuestions.indexOf(q.id) !== -1)
        .every(
          q =>
            q.status === 'Unpublished' ||
            q.status === 'Published' ||
            q.status === 'Rejected',
        ) && (
        <ArchiveItemsButton
          isArchived={searchParams.archived}
          onChangeArchiveStatus={handleArchiveSelectedItems}
        />
      )}
    </BulkActionWrapper>
  )

  const AuthorBulkAction = (
    <BulkActionWrapper>
      {tabsContent
        .find(tab => tab.value === 'author')
        ?.questions.filter(q => selectedQuestions.indexOf(q.id) !== -1)
        .every(
          q =>
            q.status === 'Not Submitted' ||
            q.status === 'Submitted' ||
            q.status === 'Published' ||
            q.status === 'Rejected' ||
            q.status === 'Unpublished',
        ) && (
        <ArchiveItemsButton
          isArchived={searchParams.archived}
          onChangeArchiveStatus={handleArchiveSelectedItems}
        />
      )}
      {selectedQuestions.length && (
        <AddToListPopup
          existingListsOptions={existingListsOptions}
          loadingAddToList={loadingAddToList}
          loadingCreateList={loadingCreateList}
          onAddToList={onAddToList}
          onCreateList={onCreateList}
          selectedRows={selectedQuestions}
        />
      )}
    </BulkActionWrapper>
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
              filters,
            }) => ({
              label,
              key: value,
              children: (
                <QuestionList
                  bulkAction={getBulkAction(value)}
                  currentPage={searchParams.page}
                  filters={filters}
                  isArchivedItems={searchParams.archived}
                  key={searchParams.role}
                  listKey={value}
                  loading={tabLoading}
                  locale={mergedLocale}
                  onArchiveChange={setArchived}
                  onPageChange={setSearchPage}
                  onQuestionSelected={setSelectedQuestions}
                  onSearch={setSearchQuery}
                  onSortOptionChange={setSortOption}
                  questions={questions}
                  selectedQuestions={selectedQuestions}
                  showArchiveOption={[
                    'author',
                    'editor',
                    'handlingEditor',
                  ].includes(value)}
                  showRowCheckboxes={!!showBulkActions}
                  showSort={showSort}
                  sortOptions={sortOptions}
                  totalCount={totalCount}
                  withFilters={withFilters}
                />
              ),
            }),
          )}
          onChange={handleTabChange}
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
  onChangeArchiveStatus: PropTypes.func,
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
  withFilters: PropTypes.bool,
  existingListsOptions: PropTypes.arrayOf(PropTypes.shape()),
  onAddToList: PropTypes.func,
  onCreateList: PropTypes.func,
  loadingAddToList: PropTypes.bool,
  loadingCreateList: PropTypes.bool,
}

Dashboard.defaultProps = {
  handlingEditors: [],
  initialTabKey: null,
  locale: null,
  loadingSearchHEs: false,
  onAssignHE: () => {},
  onChangeArchiveStatus: () => {},
  onSearchHE: () => {},
  showSort: false,
  sortOptions: [],
  tabsContent: [],
  withFilters: false,
  onAddToList: () => {},
  onCreateList: () => {},
  loadingAddToList: false,
  loadingCreateList: false,
  existingListsOptions: [],
}

export default Dashboard
