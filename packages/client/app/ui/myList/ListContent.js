import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { grid } from '@coko/client'
import { TabsStyled as Tabs, QuestionList, Button } from '../common'

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

const sortOptions = [
  {
    label: 'Date (descending)',
    value: 'date-desc',
    isDefault: true,
  },
  {
    label: 'Date (ascending)',
    value: 'date-asc',
    isDefault: false,
  },
  {
    label: 'Custom',
    value: 'custom',
    isDefault: false,
  },
]

const ListContent = ({
  title,
  loading,
  onDragEnd,
  onExport,
  onSearch,
  questions,
  totalCount,
  questionsPerPage,
  showRowCheckboxes,
  ...rest
}) => {
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [draggable, setDraggable] = useState(false)

  const [searchParams, setSearchParams] = useState({
    page: 1,
    orderBy: 'date-desc',
    pageSize: questionsPerPage,
  })

  const BulkAction = (
    <Button
      disabled={selectedQuestions.length === 0}
      onClick={onExport}
      type="primary"
    >
      Export
    </Button>
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

  useEffect(() => {
    onSearch(searchParams)
  }, [searchParams])

  return (
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
              onDragEnd={onDragEnd}
              onPageChange={setSearchPage}
              onQuestionSelected={setSelectedQuestions}
              onSortOptionChange={handleSortOptionChange}
              questions={questions}
              questionsPerPage={searchParams.pageSize}
              showRowCheckboxes={showRowCheckboxes}
              sortOptions={sortOptions}
              totalCount={totalCount}
              {...rest}
            />
          ),
        },
      ]}
    />
  )
}

ListContent.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  onDragEnd: PropTypes.func,
  onExport: PropTypes.func,
  onSearch: PropTypes.func,
  questions: PropTypes.arrayOf(PropTypes.shape()),
  showRowCheckboxes: PropTypes.bool,
  questionsPerPage: PropTypes.number,
  totalCount: PropTypes.number,
}

ListContent.defaultProps = {
  title: 'List',
  loading: false,
  onDragEnd: () => {},
  onExport: () => {},
  onSearch: () => {},
  questions: [],
  showRowCheckboxes: false,
  questionsPerPage: 10,
  totalCount: 0,
}

export default ListContent
