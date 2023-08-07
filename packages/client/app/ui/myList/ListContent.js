import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { grid } from '@coko/client'
import {
  TabsStyled as Tabs,
  QuestionList,
  Button,
  ButtonGroup,
  Empty,
  Modal,
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
`

const TabItem = styled.span`
  padding-inline: ${grid(3)};
`

const BulkActionWrapper = styled.div`
  align-items: center;
  display: flex;
  gap: ${grid(3)};
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
const ModalFooter = Modal.footer

const ListContent = ({
  title,
  loading,
  onDragEnd,
  onExport,
  onSearch,
  onRemoveFromList,
  questions,
  totalCount,
  questionsPerPage,
  showRowCheckboxes,
  locale,
  ...rest
}) => {
  const [modal, contextHolder] = Modal.useModal()
  // eslint-disable-next-line no-unused-vars
  const { confirm, error } = modal

  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [draggable, setDraggable] = useState(true)

  const [searchParams, setSearchParams] = useState({
    page: 1,
    orderBy: 'custom',
    pageSize: 1000, // initially at 1000 for custom order
    query: '',
  })

  const handleExport = showFeedback => {
    return onExport(selectedQuestions, searchParams.orderBy, showFeedback)
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
      <ButtonGroup>
        <ExportListToWordButton
          customOrder={searchParams.orderBy === 'custom'}
          disabled={selectedQuestions.length === 0}
          onExport={handleExport}
          text="Question will be exported in the order they are currently displayed in the list. Proceed?"
        >
          Export selection
        </ExportListToWordButton>
        <Button
          disabled={selectedQuestions.length === 0}
          onClick={confirmDelete}
          type="primary"
        >
          Remove from list
        </Button>
      </ButtonGroup>
      {selectedQuestions.length ? (
        <SelectionIndicator>
          {selectedQuestions.length} questions selected
        </SelectionIndicator>
      ) : null}
    </BulkActionWrapper>
  )

  const handleSortOptionChange = op => {
    if (op === 'custom') {
      setDraggable(true)
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
        content: `Make sure to not separate questions that belong to one complex item set from one another. You can change their position, but they must always be grouped together.`,
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
  onSearch: PropTypes.func,
  onRemoveFromList: PropTypes.func,
  questions: PropTypes.arrayOf(PropTypes.shape()),
  showRowCheckboxes: PropTypes.bool,
  questionsPerPage: PropTypes.number,
  totalCount: PropTypes.number,
  locale: PropTypes.shape(),
}

ListContent.defaultProps = {
  title: 'List',
  loading: false,
  onDragEnd: () => {},
  onExport: () => {},
  onSearch: () => {},
  onRemoveFromList: () => {},
  questions: [],
  showRowCheckboxes: true,
  questionsPerPage: 10,
  totalCount: 0,
  locale: null,
}

export default ListContent
