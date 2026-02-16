/* stylelint-disable string-quotes */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { grid, th } from '@coko/client'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import {
  QuestionList,
  TabsStyled as Tabs,
  Empty,
  Button,
  ButtonGroup,
  AddToListPopup,
  Popup,
  Modal,
} from '../common'
import AssignAuthorButton from './AssignAuthorButton'
import ComplexItemSetForm from './ComplexItemSetForm'
import Wax from '../wax/Wax'
import { simpleConfig } from '../wax/config'
import { LeadingContentLayout } from '../wax/layout'
import ExportListToWordButton from '../myList/ExportModal'

const ModalHeader = Modal.header
const ModalFooter = Modal.footer
const ModalContext = React.createContext(null)

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
  > span:not(.ant-btn-icon) {
    display: none;
  }

  > span.ant-btn-icon {
    /* stylelint-disable-next-line declaration-no-important */
    margin-inline-end: 0 !important;
  }

  @media (min-width: ${th('mediaQueries.small')}) {
    > span:not(.ant-btn-icon) {
      display: inline-block;
      margin-inline-start: 0;
    }

    > span.ant-btn-icon {
      display: none;
    }
  }
`

const BulkActionWrapper = styled.div`
  display: flex;
  gap: ${grid(2)};
`

const PopupContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${grid(2)};
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
    onAssignAuthor,
    canAssignAuthor,
    authors,
    loadAuthors,
    refetchUser,
    currentAuthor,
    onWordExport,
    onQTIExport,
    onAddToList,
    onAddToNewList,
    onDeleteSet,
    existingLists,
    loadingAddToList,
    loadingCreateList,
  } = props

  const [activeKey, setActiveKey] = useState(activeTab)
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [modal, contextHolder] = Modal.useModal()

  useEffect(() => {
    if (id && activeTab !== 'edit') setActiveKey('content')
    else setActiveKey('edit')
  }, [id, activeTab])

  const handleQuestionsSelected = ids => {
    setSelectedQuestions(ids)
  }

  const checkForMissingDependencies = () => {
    return selectedQuestions
      .map(qid => {
        const question = questions.find(q => q.id === qid)

        if (question.dependsOn?.length > 0) {
          const missing = question.dependsOn.some(
            d => !selectedQuestions.includes(d),
          )

          return missing
        }

        return false
      })
      .some(result => {
        return !!result
      })
  }

  const handleWordExport = (showFeedback, showMetadata) => {
    const missingDependencies = checkForMissingDependencies()

    if (missingDependencies) {
      return new Promise(resolve => {
        const warningModal = modal.warning()

        warningModal.update({
          title: <ModalHeader>Missing dependencies</ModalHeader>,
          content: (
            <p>
              One or more of the items selected for export depend on items that
              are not included in the export list. Are you sure you want to
              continue regardless?
            </p>
          ),
          footer: [
            <ModalFooter key="footer">
              <Button onClick={warningModal.destroy}>Cancel</Button>
              <Button
                onClick={() => {
                  onWordExport(selectedQuestions, showFeedback, showMetadata)
                  resolve()
                  warningModal.destroy()
                }}
                type="primary"
              >
                Download anyway
              </Button>
            </ModalFooter>,
          ],
        })
      })
    }

    return onWordExport(selectedQuestions, showFeedback, showMetadata)
  }

  const handleQTIExport = () => {
    const missingDependencies = checkForMissingDependencies()

    if (missingDependencies) {
      return new Promise(resolve => {
        const warningModal = modal.warning()

        warningModal.update({
          title: <ModalHeader>Missing dependencies</ModalHeader>,
          content: (
            <p>
              One or more of the items selected for export depend on items that
              are not included in the export list. Are you sure you want to
              continue regardless?
            </p>
          ),
          footer: [
            <ModalFooter key="footer">
              <Button onClick={warningModal.destroy}>Cancel</Button>
              <Button
                onClick={() => {
                  onQTIExport(selectedQuestions)
                  resolve()
                  warningModal.destroy()
                }}
                type="primary"
              >
                Download anyway
              </Button>
            </ModalFooter>,
          ],
        })
      })
    }

    return onQTIExport(selectedQuestions)
  }

  const handleAddToList = existingList => {
    return onAddToList(existingList, selectedQuestions)
  }

  const handleAddNewToList = listName => {
    return onAddToNewList(listName, selectedQuestions)
  }

  const handleDeleteSet = () => {
    const warningModal = modal.warning()
    warningModal.update({
      title: <ModalHeader>Delete set</ModalHeader>,
      content: (
        <p>
          This action will permanently delete the context-dependent item set and
          remove its reference from any items associated with this set. The
          items themselves will not be deleted. Are you sure you want to
          continue?
        </p>
      ),
      footer: [
        <ModalFooter key="footer">
          <Button onClick={warningModal.destroy}>Cancel</Button>
          <Button
            onClick={() => {
              onDeleteSet()
              warningModal.destroy()
            }}
            status="danger"
            type="primary"
          >
            Delete
          </Button>
        </ModalFooter>,
      ],
    })
  }

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
            bulkAction={
              selectedQuestions.length ? (
                <BulkActionWrapper>
                  <AddToListPopup
                    existingListsOptions={existingLists}
                    loadingAddToList={loadingAddToList}
                    loadingCreateList={loadingCreateList}
                    onAddToList={handleAddToList}
                    onCreateList={handleAddNewToList}
                  />
                  <Popup
                    id="export-popup"
                    popupPlacement="top"
                    toggle={
                      <Button
                        data-testid="export-btn"
                        disabled={selectedQuestions.length === 0}
                        id="export-popup-toggle"
                        type="primary"
                      >
                        Export
                      </Button>
                    }
                  >
                    <PopupContentWrapper>
                      <ExportListToWordButton
                        // afterClose={() =>
                        //   document.body.querySelector('#export-popup-toggle').focus()
                        // }
                        onExport={handleWordExport}
                        text="All selected questions will be exported in the order of publication."
                      >
                        Export to Word
                      </ExportListToWordButton>
                      <Button onClick={handleQTIExport} type="primary">
                        Export QTI
                      </Button>
                    </PopupContentWrapper>
                  </Popup>
                </BulkActionWrapper>
              ) : null
            }
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
            onQuestionSelected={handleQuestionsSelected}
            onSortOptionChange={onSortOptionChange}
            questions={questions}
            showRowCheckboxes
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
    <ModalContext.Provider value={null}>
      <StyledTabs
        activeKey={activeKey}
        destroyInactiveTabPane
        items={tabItems}
        onChange={setActiveKey}
        tabBarExtraContent={
          id ? (
            <ButtonGroup>
              {canAssignAuthor && (
                <>
                  <StyledButton
                    icon={<DeleteOutlined />}
                    onClick={handleDeleteSet}
                    status="danger"
                    title="Delete set"
                    type="primary"
                  >
                    Delete set
                  </StyledButton>
                  <AssignAuthorButton
                    authors={authors}
                    currentAuthor={currentAuthor}
                    loadAuthors={loadAuthors}
                    onAssignAuthor={onAssignAuthor}
                    refetchUser={refetchUser}
                    usecase="set"
                  >
                    Assign author
                  </AssignAuthorButton>
                </>
              )}
              <StyledButton
                icon={<PlusOutlined />}
                onClick={onCreateQuestion}
                title="Add item to this set"
                type="primary"
              >
                Add item to this set
              </StyledButton>
            </ButtonGroup>
          ) : null
        }
      />
      {contextHolder}
    </ModalContext.Provider>
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
  onSortOptionChange: PropTypes.func,
  sortOptions: PropTypes.arrayOf(PropTypes.shape()),
  onAssignAuthor: PropTypes.func,
  canAssignAuthor: PropTypes.bool,
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  loadAuthors: PropTypes.func,
  refetchUser: PropTypes.func,
  currentAuthor: PropTypes.arrayOf(PropTypes.shape()),
  onWordExport: PropTypes.func,
  onQTIExport: PropTypes.func,
  onAddToList: PropTypes.func,
  onAddToNewList: PropTypes.func,
  onDeleteSet: PropTypes.func,
  existingLists: PropTypes.arrayOf(PropTypes.shape()),
  loadingAddToList: PropTypes.bool,
  loadingCreateList: PropTypes.bool,
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
  onAssignAuthor: () => {},
  canAssignAuthor: true,
  authors: [],
  loadAuthors: () => {},
  refetchUser: () => {},
  currentAuthor: [],
  onWordExport: () => {},
  onQTIExport: () => {},
  onAddToList: () => {},
  onAddToNewList: () => {},
  onDeleteSet: () => {},
  existingLists: [],
  loadingAddToList: false,
  loadingCreateList: false,
}

export default ComplexItemSet
