import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { grid, th } from '@coko/client'
import { CheckOutlined } from '@ant-design/icons'
import { Divider } from '@coko/client/dist/ui'

import Sidebar from './Sidebar'
import {
  Collapse,
  Input,
  QuestionList,
  VisuallyHiddenElement,
  Form,
  Empty,
  Button,
  Modal,
  Popup,
  Select,
} from '../common'
import useBreakpoint from '../_helpers/useBreakpoint'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(200px, 25%) auto;
  grid-template-rows: 100%;
  height: 100%;

  > aside {
    border-right: 1px solid ${th('colorSecondary')};
  }

  /* stylelint-disable-next-line string-quotes */
  div[class^='List__FooterWrapper'] {
    @media screen and (min-width: 600px) {
      flex-direction: row;
    }
  }

  @media screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;

    > section {
      flex-grow: 1;
    }
  }
`

const StyledPopup = styled(Popup)`
  border-radius: 0;
  inline-size: 300px;
  margin-block-end: ${grid(2)};
`

const PopupContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ActionWrapper = styled.div`
  align-items: flex-start;
  column-gap: 10px;
  display: flex;
  flex-direction: row;
`

const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: minmax(0, 1fr) ${grid(18)};
  grid-template-rows: 1fr 1fr;

  > div {
    align-self: end;
    grid-row: span 2;
    margin-bottom: 0;
    width: 100%;

    label {
      font-weight: bold;

      &.ant-form-item-required::before {
        /* stylelint-disable-next-line declaration-no-important */
        display: none !important;
      }
    }

    .ant-form-item-control-input + div {
      order: -1;
    }
  }

  /* stylelint-disable-next-line string-quotes */
  > button[type='submit'] {
    align-self: end;
    grid-area: 2 /2;
    padding-inline: unset;
    width: unset;
  }

  > span {
    align-self: end;
    color: ${th('colorSuccess')};
    direction: rtl;
    overflow: visible;
    padding-block-end: ${grid(2)};
    text-align: end;
    white-space: nowrap;
  }
`

const StyledDivider = styled(Divider)`
  border-block-start-color: ${th('colorBorder')};
  margin-block: ${grid(4)};
`

const ModalContext = React.createContext(null)
const ModalHeader = Modal.header
const ModalFooter = Modal.footer

export const Discover = props => {
  const {
    className,
    existingListsOptions,
    isUserLoggedIn,
    loading,
    loadingAddToList,
    loadingCreateList,
    loadingDuplicateQuestion,
    locale,
    questions,
    sidebarText,
    onAddToList,
    onCreateList,
    onDuplicate,
    onSearch,
    defaultPageSize,
    sidebarMetadata,
    complexItemSetOptions,
    biointeractiveResources,
    totalCount,
    showSort,
    sortOptions,
    globalFilters,
  } = props

  // key to force list to rerender and empty search box when filters change
  const [listKey, setListKey] = useState(0)
  // form control instance for Sidebar filters, here to preserve its state between Sidebar rerenders
  const [filtersForm] = Form.useForm()
  const [selectedRows, setSelectedRows] = useState([])

  // form instances for add to list/create new list popup operations
  const [existingListForm] = Form.useForm()
  const [newListForm] = Form.useForm()
  const [showListUpdateSuccess, setShowListUpdateSuccess] = useState(false)
  const [showListCreatedSuccess, setShowListCreatedSuccess] = useState(false)

  // modal instances
  const [modal, contextHolder] = Modal.useModal()
  const { confirm } = modal

  useEffect(() => {
    if (!loadingAddToList) {
      setShowListUpdateSuccess(true)
      setTimeout(() => {
        setShowListUpdateSuccess(false)
      }, 3000)
    }
  }, [loadingAddToList])

  useEffect(() => {
    if (!loadingCreateList) {
      setShowListCreatedSuccess(true)
      setTimeout(() => {
        setShowListCreatedSuccess(false)
      }, 3000)
    }
  }, [loadingCreateList])

  useEffect(() => {
    if (globalFilters?.filters) {
      const hasKeys = !!Object.keys(globalFilters?.filters).length
      hasKeys && filtersForm.setFieldsValue(globalFilters.filters)
    }
  }, [])

  const [searchParams, setSearchParams] = useState({
    query: globalFilters?.query || '',
    page: globalFilters?.page || 1,
    pageSize: globalFilters?.pageSize || defaultPageSize,
    filters: globalFilters?.filters || {},
    orderBy: globalFilters?.orderBy || 'date-desc',
    ascending: false,
  })

  const setSearchPage = (page, pageSize) => {
    setSearchParams({ ...searchParams, page, pageSize })
  }

  const setSearchQuery = query => {
    setSearchParams({ ...searchParams, query, page: 1 })
  }

  const setFilters = filters => {
    setListKey(listKey + 1)
    setSearchParams({
      filters,
      page: 1,
      pageSize: globalFilters?.pageSize || defaultPageSize,
      query: '',
      orderBy: searchParams.orderBy,
    })
  }

  const setSortOption = orderBy => {
    sortOptions.filter(opt => opt.isDefault)[0].isDefault = false
    sortOptions.filter(opt => opt.value === orderBy)[0].isDefault = true

    setSearchParams({ ...searchParams, orderBy, page: 1 })
  }

  const [collapseKey, setCollapseKey] = useState(null)

  useEffect(() => {
    onSearch(searchParams)
    setCollapseKey(null)
  }, [searchParams])

  const wrapFilters = filters => {
    const isMobile = useBreakpoint('(max-width: 900px)')

    const toggleCollapse = () => {
      if (collapseKey === 'filters') setCollapseKey(null)
      else setCollapseKey('filters')
    }

    return isMobile ? (
      <Collapse activeKey={collapseKey} onChange={toggleCollapse}>
        <Collapse.Panel
          data-testid="filter-collapse"
          forceRender
          header="Filters"
          key="filters"
        >
          {filters}
        </Collapse.Panel>
      </Collapse>
    ) : (
      filters
    )
  }

  const mergedLocale = {
    emptyText: !loading ? (
      <Empty
        description="No Questions Found"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    ) : (
      <div role="status">Loading</div>
    ),
    ...locale,
  }

  const confirmDuplication = () => {
    const confirmDialog = confirm()
    confirmDialog.update({
      title: <ModalHeader>Duplicate Item</ModalHeader>,
      content:
        "You're duplicating this item. Duplicating an item will create a new copy of the item with you as the author. By doing so, you will have an independent version that you can modify without affecting the original item.",
      footer: (
        <ModalFooter key="footer">
          <Button onClick={() => confirmDialog.destroy()}>Close</Button>
          <Button
            autoFocus
            onClick={() => {
              confirmDialog.destroy()
              handleDuplicateQuestion()
            }}
            status="danger"
          >
            Duplicate
          </Button>
        </ModalFooter>
      ),
    })
  }

  const handleAddToList = ({ existingList }) => {
    onAddToList(existingList, selectedRows).then(() =>
      existingListForm.resetFields(),
    )
  }

  const handleDuplicateQuestion = () => {
    onDuplicate(selectedRows[0])
  }

  const handleCreateNewList = ({ newList }) =>
    onCreateList(newList, selectedRows).then(() => newListForm.resetFields())

  const BulkAction = (
    <ActionWrapper>
      <StyledPopup
        id="list-popup"
        popupPlacement="top"
        toggle={
          <Button
            data-testid="add-to-list-btn"
            disabled={selectedRows.length === 0}
            type="primary"
          >
            Add to list
          </Button>
        }
      >
        <PopupContentWrapper>
          <StyledForm
            form={existingListForm}
            layout="vertical"
            onFinish={handleAddToList}
            onValuesChange={() =>
              existingListForm.validateFields(['existingList'])
            }
          >
            <Form.Item
              label="Existing list"
              name="existingList"
              rules={[
                {
                  required: true,
                  message: 'Please select a list',
                },
              ]}
              validateTrigger="onSubmit"
            >
              <Select
                data-testid="select-existing-list"
                optionFilterProp="label"
                options={existingListsOptions}
                placeholder="Find list"
                showSearch
              />
            </Form.Item>
            {showListUpdateSuccess ? (
              <span aria-live="polite" role="status">
                List updated <CheckOutlined />
              </span>
            ) : null}
            <Button
              data-testid="add-btn"
              htmlType="submit"
              loading={loadingAddToList}
              type="primary"
            >
              {loadingAddToList ? null : 'Add'}
            </Button>
          </StyledForm>
          <StyledDivider />
          <StyledForm
            form={newListForm}
            layout="vertical"
            onFinish={handleCreateNewList}
            onValuesChange={() => newListForm.validateFields(['newList'])}
          >
            <Form.Item
              label="New list"
              name="newList"
              rules={[
                {
                  required: true,
                  message: 'List name is required',
                },
              ]}
              validateTrigger="onSubmit"
            >
              <Input placeholder="List name" />
            </Form.Item>
            {showListCreatedSuccess ? (
              <span aria-live="polite" role="status">
                List created <CheckOutlined />
              </span>
            ) : null}
            <Button
              data-testid="create-btn"
              htmlType="submit"
              loading={loadingCreateList}
              type="primary"
            >
              {loadingCreateList ? null : 'Create'}
            </Button>
          </StyledForm>
        </PopupContentWrapper>
      </StyledPopup>
      <Button
        data-testid="duplicate-question"
        disabled={selectedRows.length !== 1}
        loading={loadingDuplicateQuestion}
        onClick={confirmDuplication}
        type="primary"
      >
        {loadingDuplicateQuestion ? null : 'Duplicate'}
      </Button>
    </ActionWrapper>
  )

  const onQuestionSelected = rows => setSelectedRows(rows)

  return (
    <ModalContext.Provider value={null}>
      <Wrapper className={className}>
        {wrapFilters(
          <Sidebar
            biointeractiveResources={biointeractiveResources}
            complexItemSetOptions={complexItemSetOptions}
            form={filtersForm}
            metadata={sidebarMetadata}
            presetFilters={globalFilters?.filters}
            setFilters={setFilters}
            text={sidebarText}
          />,
        )}
        <section>
          <VisuallyHiddenElement as="h2">
            Search results: questions list
          </VisuallyHiddenElement>
          <QuestionList
            bulkAction={(isUserLoggedIn && BulkAction) || null}
            currentPage={searchParams.page}
            defaultSearch={searchParams.query}
            key={listKey}
            loading={loading}
            locale={mergedLocale}
            onPageChange={setSearchPage}
            onQuestionSelected={onQuestionSelected}
            onSearch={setSearchQuery}
            onSortOptionChange={setSortOption}
            questions={questions}
            questionsPerPage={searchParams.pageSize}
            showRowCheckboxes={isUserLoggedIn}
            showSizeChanger
            showSort={showSort}
            sortOptions={sortOptions}
            totalCount={totalCount}
          />
        </section>
      </Wrapper>
      {contextHolder}
    </ModalContext.Provider>
  )
}

Discover.propTypes = {
  existingListsOptions: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, label: PropTypes.string }),
  ),
  isUserLoggedIn: PropTypes.bool,
  /** text for the sidebar */
  sidebarText: PropTypes.string,
  /** Loading search results. */
  loading: PropTypes.bool,
  loadingAddToList: PropTypes.bool,
  loadingCreateList: PropTypes.bool,
  loadingDuplicateQuestion: PropTypes.bool,
  locale: PropTypes.shape(),
  /** Handle search */
  onAddToList: PropTypes.func.isRequired,
  onCreateList: PropTypes.func.isRequired,
  onDuplicate: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  defaultPageSize: PropTypes.number,
  /** list of search result to render */
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
  complexItemSetOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
    }),
  ),
  sidebarMetadata: PropTypes.shape({
    topics: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
        subtopics: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
          }),
        ),
      }),
    ),
    blooms: PropTypes.shape({
      cognitive: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          options: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
            }),
          ),
        }),
      ),
      affective: PropTypes.arrayOf(
        PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
      ),
      psychomotor: PropTypes.arrayOf(
        PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
      ),
    }),
    frameworks: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
          units: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
            }),
          ),
          topics: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              unit: PropTypes.string,
            }),
          ),
          learningObjectives: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              unit: PropTypes.string,
              topic: PropTypes.string,
            }),
          ),
          essentialKnowledge: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              unit: PropTypes.string,
              topic: PropTypes.string,
              learningObjective: PropTypes.string,
            }),
          ),
        }),
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
          units: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
            }),
          ),
          topics: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              unit: PropTypes.string,
            }),
          ),
          applications: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              unit: PropTypes.string,
              topic: PropTypes.string,
            }),
          ),
          skills: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              unit: PropTypes.string,
              topic: PropTypes.string,
            }),
          ),
          understandings: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              unit: PropTypes.string,
              topic: PropTypes.string,
            }),
          ),
        }),
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
        }),
      ]),
    ),
    introToBioMeta: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
          coreConcepts: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              explanatoryItems: PropTypes.arrayOf(PropTypes.string),
            }),
          ),
          subdisciplines: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
            }),
          ),
          subdisciplineStatements: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              coreConcept: PropTypes.string,
              subdiscipline: PropTypes.string,
            }),
          ),
          coreCompetencies: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
            }),
          ),
          subcompetencies: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              coreCompetence: PropTypes.string,
              explanation: PropTypes.string,
            }),
          ),
          subcompetenceStatements: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              coreCompetence: PropTypes.string,
              subcompetence: PropTypes.string,
            }),
          ),
        }),
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
          concepts: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
            }),
          ),
          categories: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              concept: PropTypes.string,
              explanation: PropTypes.string,
            }),
          ),
        }),
      ]),
    ),
  }),
  totalCount: PropTypes.number,
  sortOptions: PropTypes.arrayOf(PropTypes.shape()),
  biointeractiveResources: PropTypes.arrayOf(PropTypes.shape()),
  showSort: PropTypes.bool,
  globalFilters: PropTypes.shape({
    query: PropTypes.string,
    page: PropTypes.number,
    pageSize: PropTypes.number,
    filters: PropTypes.string,
    orderBy: PropTypes.string,
    ascending: PropTypes.bool,
  }),
}

Discover.defaultProps = {
  existingListsOptions: [],
  isUserLoggedIn: false,
  loading: false,
  loadingAddToList: false,
  loadingCreateList: false,
  loadingDuplicateQuestion: false,
  locale: null,
  defaultPageSize: 10,
  questions: [],
  complexItemSetOptions: [],
  sidebarMetadata: null,
  sidebarText: '',
  totalCount: 0,
  sortOptions: [],
  showSort: false,
  globalFilters: {
    query: '',
    page: 1,
    pageSize: 10,
    filters: {},
    orderBy: 'publication_date',
    ascending: false,
  },
  biointeractiveResources: [],
}

export default Discover
