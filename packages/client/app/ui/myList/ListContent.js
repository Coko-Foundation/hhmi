/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { grid } from '@coko/client'
import {
  TabsStyled as Tabs,
  QuestionList,
  Button,
  Empty,
  Modal,
  Popup,
} from '../common'
import ExportListToWordButton from './ExportModal'

const StyledTabs = styled(Tabs)`
  height: 100%;

  .ant-tabs-content {
    height: 100%;

    /* stylelint-disable-next-line string-quotes */
    [role='tabpanel'][aria-hidden='false'] {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
    }
  }

  /* stylelint-disable-next-line string-quotes */
  div[class^='List__FooterWrapper'] {
    @media screen and (min-width: 600px) {
      flex-direction: row;
    }
  }
`

const TabItem = styled.span`
  padding-inline: ${grid(3)};
`

const BulkActionWrapper = styled.div`
  align-items: center;
  display: flex;
  gap: ${grid(3)};

  @media (max-width: 600px) {
    align-items: stretch;
    flex-direction: column;

    button {
      width: 100%;
    }
  }
`

const PopupContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${grid(2)};
`

const SelectionIndicator = styled.span`
  font-weight: bold;
`

const sortOptions = [
  {
    label: 'Custom',
    value: 'custom',
    isDefault: true,
  },
  {
    label: 'Date (descending)',
    value: 'date-desc',
    isDefault: false,
  },
  {
    label: 'Date (ascending)',
    value: 'date-asc',
    isDefault: false,
  },
]

const ModalContext = React.createContext(null)
const ModalHeader = Modal.header
const ModalFooter = Modal.footer

const ListContent = ({
  title,
  loading,
  onDragEnd,
  onExport,
  onExportQTI,
  onSearch,
  onRemoveFromList,
  questions,
  totalCount,
  questionsPerPage,
  showRowCheckboxes,
  locale,
  isAuthor,
  ...rest
}) => {
  const [modal, contextHolder] = Modal.useModal()
  const { confirm, error, warning } = modal

  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [draggable, setDraggable] = useState(isAuthor)

  const [searchParams, setSearchParams] = useState({
    page: 1,
    orderBy: 'custom',
    pageSize: 1000, // initially at 1000 for custom order
    query: '',
  })

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

  const handleExport = (showFeedback, showMetadata) => {
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
                  // onWordExport(selectedQuestions, showFeedback)
                  onExport(
                    selectedQuestions,
                    searchParams.orderBy,
                    showFeedback,
                  )
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

    return onExport(selectedQuestions, searchParams.orderBy, {
      showFeedback,
      showMetadata,
    })
  }

  const handleExportQTI = () => {
    const nonNumericalQuestionIds = selectedQuestions.filter(
      qid => questions.find(q => q.id === qid)?.type !== 'numerical',
    )

    let warningModal

    switch (true) {
      // when trying to export a list with only 'numerical answer' type items
      case selectedQuestions.length > 1 && nonNumericalQuestionIds.length === 0:
        warningModal = warning()
        warningModal.update({
          title: <ModalHeader>List contains numerical answers</ModalHeader>,
          content: (
            <p>
              The list you're about to export contains only "numerical answer"
              items. These items cannot be exported within a list. You can
              export numerical answer items individually.
            </p>
          ),
          footer: [
            <ModalFooter key="footer">
              <Button
                autoFocus
                key="ok-error"
                onClick={() => {
                  warningModal.destroy()
                }}
              >
                Ok
              </Button>
            </ModalFooter>,
          ],
        })
        break
      // when trying to export a list with some 'numerical answer' type items
      case selectedQuestions.length > 1 &&
        nonNumericalQuestionIds.length < selectedQuestions.length:
        warningModal = warning()
        warningModal.update({
          title: <ModalHeader>List contains numerical answers</ModalHeader>,
          content: (
            <p>
              The list you're about to export contains at least one "numerical
              answer" item. These items cannot be exported within a list and
              will be excluded from the export. You can export numerical answer
              items individually.
            </p>
          ),
          footer: [
            <ModalFooter key="footer">
              <Button
                autoFocus
                key="continue"
                onClick={() => {
                  exportToQTI(nonNumericalQuestionIds)
                  warningModal.destroy()
                }}
                type="primary"
              >
                Continue
              </Button>
            </ModalFooter>,
          ],
        })
        break
      default:
        onExportQTI(selectedQuestions)
        break
    }
  }

  const exportToQTI = questionIds => {
    onExportQTI(questionIds, searchParams.orderBy)
      .then(() => {})
      .catch(e => {
        const errorModal = error()
        errorModal.update({
          title: <ModalHeader>QTI export failed</ModalHeader>,
          content: e,
          footer: [
            <ModalFooter key="footer">
              <Button
                autoFocus
                data-testid="error-export-btn"
                key="ok-error"
                onClick={() => {
                  errorModal.destroy()
                }}
              >
                Ok
              </Button>
            </ModalFooter>,
          ],
        })
      })
  }

  const confirmDelete = () => {
    const confirmDialog = confirm()
    confirmDialog.update({
      title: 'Remove questions from list',
      content: `Are you sure you want to remove the selected question${
        selectedQuestions.length > 1 ? 's' : ''
      } from this list?`,
      footer: [
        <ModalFooter key="footer">
          <Button key="cancel" onClick={() => confirmDialog.destroy()}>
            Cancel
          </Button>
          <Button
            autoFocus
            data-testid="confirm-delete-btn"
            key="delete"
            onClick={() => {
              onRemoveFromList(selectedQuestions).then(() => {
                setSelectedQuestions([])
              })
              confirmDialog.destroy()
            }}
            status="danger"
          >
            Remove
          </Button>
        </ModalFooter>,
      ],
    })
  }

  const BulkAction = (
    <BulkActionWrapper>
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
            afterClose={() =>
              document.body.querySelector('#export-popup-toggle').focus()
            }
            customOrder={searchParams.orderBy === 'custom'}
            disabled={selectedQuestions.length === 0}
            onExport={handleExport}
            text="Question will be exported in the order they are currently displayed in the list. Proceed?"
          >
            Export to Word
          </ExportListToWordButton>
          <Button
            disabled={selectedQuestions.length === 0}
            id="exportToQTI"
            onClick={handleExportQTI}
            type="primary"
          >
            Export to QTI
          </Button>
        </PopupContentWrapper>
      </Popup>
      {isAuthor ? (
        <Button
          disabled={selectedQuestions.length === 0}
          onClick={confirmDelete}
          type="primary"
        >
          Remove from list
        </Button>
      ) : null}

      {selectedQuestions.length ? (
        <SelectionIndicator>
          {selectedQuestions.length} questions selected
        </SelectionIndicator>
      ) : null}
    </BulkActionWrapper>
  )

  const handleSortOptionChange = op => {
    if (op === 'custom') {
      setDraggable(isAuthor && true)
      setSearchParams({
        page: 1,
        orderBy: op,
        pageSize: 1000, // request all questions
      })
    } else {
      setDraggable(false)
      setSearchParams({
        page: 1,
        orderBy: op,
        pageSize: questionsPerPage,
      })
    }
  }

  const setSearchPage = page => {
    setSearchParams({ ...searchParams, page })
  }

  const setSearchQuery = query => {
    setSearchParams({ ...searchParams, query, page: 1 })
  }

  const handleDragEnd = data => {
    const result = onDragEnd(data)

    if (result.hasErrors) {
      const errorDialog = error()
      errorDialog.update({
        title: 'Error during reorder',
        content: `Make sure to not separate questions that belong to one context-dependent item set from one another. You can change their position, but they must always be grouped together.`,
        footer: [
          <ModalFooter key="footer">
            <Button autoFocus key="ok" onClick={() => errorDialog.destroy()}>
              Ok
            </Button>
          </ModalFooter>,
        ],
      })
    }
  }

  useEffect(() => {
    onSearch(searchParams)
  }, [searchParams])

  const mergedLocale = {
    emptyText: !loading ? (
      <Empty
        description="No Questions in this List"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        role="status"
      />
    ) : (
      <div role="status">Loading</div>
    ),
    ...locale,
  }

  return (
    <ModalContext.Provider value={null}>
      <StyledTabs
        items={[
          {
            label: <TabItem>{title}</TabItem>,
            key: 0,
            children: (
              <QuestionList
                bulkAction={showRowCheckboxes ? BulkAction : null}
                currentPage={searchParams.page}
                draggable={draggable}
                loading={loading}
                locale={mergedLocale}
                onDragEnd={handleDragEnd}
                onPageChange={setSearchPage}
                onQuestionSelected={setSelectedQuestions}
                onSearch={setSearchQuery}
                onSortOptionChange={handleSortOptionChange}
                questions={questions}
                questionsPerPage={searchParams.pageSize}
                selectedQuestions={selectedQuestions}
                showRowCheckboxes={showRowCheckboxes}
                sortOptions={sortOptions}
                totalCount={totalCount}
                {...rest}
              />
            ),
          },
        ]}
      />
      {contextHolder}
    </ModalContext.Provider>
  )
}

ListContent.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  onDragEnd: PropTypes.func,
  onExport: PropTypes.func,
  onExportQTI: PropTypes.func,
  onSearch: PropTypes.func,
  onRemoveFromList: PropTypes.func,
  questions: PropTypes.arrayOf(PropTypes.shape()),
  showRowCheckboxes: PropTypes.bool,
  questionsPerPage: PropTypes.number,
  totalCount: PropTypes.number,
  locale: PropTypes.shape(),
  isAuthor: PropTypes.bool,
}

ListContent.defaultProps = {
  title: 'List',
  loading: false,
  onDragEnd: () => {},
  onExport: () => {},
  onExportQTI: () => {},
  onSearch: () => {},
  onRemoveFromList: () => {},
  questions: [],
  showRowCheckboxes: true,
  questionsPerPage: 10,
  totalCount: 0,
  locale: null,
  isAuthor: false,
}

export default ListContent
