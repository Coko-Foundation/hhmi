/* stylelint-disable string-quotes */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { grid, th } from '@coko/client'
import { PlusOutlined } from '@ant-design/icons'
import { QuestionList, TabsStyled as Tabs, Empty, Button } from '../common'
import ComplexItemSetForm from './ComplexItemSetForm'
import Wax from '../wax/Wax'
import { simpleConfig } from '../wax/config'
import { LeadingContentLayout } from '../wax/layout'

const StyledTabs = styled(Tabs)`
  height: 100%;

  .ant-tabs-content {
    height: 100%;

    [role='tabpanel'][aria-hidden='false'] {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: auto;
    }
  }

  @media (max-width: ${th('mediaQueries.medium')}) {
    .ant-tabs-content [role='tabpanel'][aria-hidden='false'] {
      height: unset;
      min-height: 100%;

      > div {
        flex-grow: 1;

        > div:nth-child(2) {
          height: unset;
        }
      }
    }
  }
`

const Wrapper = styled.div`
  --threshold: ${th('mediaQueries.medium')};
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  overflow: hidden;

  > * {
    /* ↓ Switch the layout at the --threshold */
    flex-basis: calc((var(--threshold) - 100%) * 999);
    flex-grow: 1;
  }
`

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  padding-inline: ${grid(3)};

  .ProseMirror {
    padding: 0;
  }
`

const StyledQuestionList = styled(QuestionList)`
  flex-grow: 1;
  overflow: hidden;
`

const SetTitle = styled.h2`
  margin-block-end: 0;
`

const StyledWaxLayout = styled(LeadingContentLayout)`
  height: 100%;
  overflow: auto;
`

const StyledButton = styled(Button)`
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

const ComplexItemSet = props => {
  const {
    activeTab,
    canEdit,
    canCreate,
    editWarning,
    currentQuestionsPage,
    id,
    questions,
    title,
    leadingContent,
    loadingData,
    loadingSave,
    onCreateQuestion,
    onQuestionsPageChange,
    onSave,
    onImageUpload,
    submissionMessage,
    submissionStatus,
    totalQuestions,
    onSortOptionChange,
    sortOptions,
  } = props

  const [activeKey, setActiveKey] = useState(activeTab)

  useEffect(() => {
    if (id && activeTab !== 'edit') setActiveKey('content')
    else setActiveKey('edit')
  }, [id, activeTab])

  const tabItems = [
    // show Content tab with list of questions if complex item set exists
    id && {
      label: 'Content',
      key: 'content',
      children: (
        <Wrapper>
          <InfoWrapper>
            <SetTitle data-testid="set-title">{title}</SetTitle>
            <Wax
              config={simpleConfig}
              content={leadingContent}
              layout={StyledWaxLayout}
              readOnly
            />
          </InfoWrapper>
          <StyledQuestionList
            currentPage={currentQuestionsPage}
            loading={loadingData}
            locale={{
              emptyText: (
                <Empty
                  description="No Questions found for this context-dependent item set. You can start creating one by clicking the button on the top right"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  role="status"
                />
              ),
            }}
            onPageChange={onQuestionsPageChange}
            onSortOptionChange={onSortOptionChange}
            questions={questions}
            showSearch={false}
            showSort
            sortOptions={sortOptions}
            totalCount={totalQuestions} // not paginated for now, so total === question.length
          />
        </Wrapper>
      ),
    },
    // show Edit tab if user can edit a context-dependent item set or can create new ones
    (canEdit || (!id && canCreate)) && {
      label: id ? 'Edit' : 'Create',
      key: 'edit',
      forceRender: true,
      children: (
        <ComplexItemSetForm
          content={leadingContent}
          id={id}
          loadingData={loadingData}
          loadingSave={loadingSave}
          onImageUpload={onImageUpload}
          onSave={onSave}
          submissionMessage={submissionMessage}
          submissionStatus={submissionStatus}
          title={title}
          warning={editWarning}
        />
      ),
    },
  ]

  return (
    <StyledTabs
      activeKey={activeKey}
      destroyInactiveTabPane
      items={tabItems}
      onChange={setActiveKey}
      tabBarExtraContent={
        id ? (
          <StyledButton
            aria-label="Add item to this set"
            icon={<PlusOutlined />}
            onClick={onCreateQuestion}
            title="Add item to this set"
            type="primary"
          >
            Add item to this set
          </StyledButton>
        ) : null
      }
    />
  )
}

ComplexItemSet.propTypes = {
  canEdit: PropTypes.bool,
  canCreate: PropTypes.bool,
  id: PropTypes.string,
  questions: PropTypes.arrayOf(PropTypes.shape()),
  title: PropTypes.string,
  leadingContent: PropTypes.shape(),
  loadingData: PropTypes.bool,
  loadingSave: PropTypes.bool,
  onCreateQuestion: PropTypes.func,
  onQuestionsPageChange: PropTypes.func,
  currentQuestionsPage: PropTypes.number,
  onSave: PropTypes.func,
  onImageUpload: PropTypes.func,
  submissionMessage: PropTypes.string,
  submissionStatus: PropTypes.string,
  totalQuestions: PropTypes.number,
  activeTab: PropTypes.string,
  editWarning: PropTypes.bool,
  onSortOptionChange: PropTypes.bool,
  sortOptions: PropTypes.arrayOf(PropTypes.shape()),
}

ComplexItemSet.defaultProps = {
  canEdit: false,
  canCreate: false,
  id: null,
  questions: [],
  title: '',
  leadingContent: null,
  loadingData: false,
  loadingSave: false,
  onCreateQuestion: () => {},
  onSave: () => {},
  onQuestionsPageChange: () => {},
  currentQuestionsPage: 1,
  onImageUpload: () => {},
  submissionMessage: null,
  submissionStatus: null,
  totalQuestions: 0,
  activeTab: 'content',
  editWarning: false,
  onSortOptionChange: null,
  sortOptions: [],
}

export default ComplexItemSet
