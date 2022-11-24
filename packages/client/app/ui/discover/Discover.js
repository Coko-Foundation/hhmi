import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Sidebar from './Sidebar'
import { Collapse, QuestionList, VisuallyHiddenElement } from '../common'
import useBreakpoint from '../_helpers/useBreakpoint'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(200px, 25%) auto;
  grid-template-rows: 100%;
  height: 100%;

  > aside {
    border-right: 1px solid ${props => props.theme.colorSecondary};
  }

  @media screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;

    > section {
      flex-grow: 1;
    }
  }
`

export const Discover = props => {
  const {
    className,
    loading,
    locale,
    questions,
    sidebarText,
    onSearch,
    pageSize,
    sidebarMetadata,
    totalCount,
    showSort,
    sortOptions,
  } = props

  // key to force list to rerender and empty search box when filters change
  const [listKey, setListKey] = useState(0)

  const [searchParams, setSearchParams] = useState({
    query: '',
    page: 1,
    filters: {},
    orderBy: 'date-desc',
  })

  const setSearchPage = page => {
    setSearchParams({ ...searchParams, page })
  }

  const setSearchQuery = query => {
    setSearchParams({ ...searchParams, query, page: 1 })
  }

  const setFilters = filters => {
    setListKey(listKey + 1)
    setSearchParams({
      filters,
      page: 1,
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
        <Collapse.Panel forceRender header="Filters" key="filters">
          {filters}
        </Collapse.Panel>
      </Collapse>
    ) : (
      filters
    )
  }

  return (
    <Wrapper className={className}>
      {wrapFilters(
        <Sidebar
          metadata={sidebarMetadata}
          setFilters={setFilters}
          text={sidebarText}
        />,
      )}
      <section>
        <VisuallyHiddenElement as="h2">
          Search results: questions list
        </VisuallyHiddenElement>
        <QuestionList
          currentPage={searchParams.page}
          key={listKey}
          loading={loading}
          locale={locale}
          onPageChange={setSearchPage}
          onSearch={setSearchQuery}
          onSortOptionChange={setSortOption}
          questions={questions}
          questionsPerPage={pageSize}
          showSort={showSort}
          sortOptions={sortOptions}
          totalCount={totalCount}
        />
      </section>
    </Wrapper>
  )
}

Discover.propTypes = {
  /** text for the sidebar */
  sidebarText: PropTypes.string,
  /** Loading search results. */
  loading: PropTypes.bool,
  locale: PropTypes.shape(),
  /** Handle search */
  onSearch: PropTypes.func.isRequired,
  pageSize: PropTypes.number,
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
  showSort: PropTypes.bool,
}

Discover.defaultProps = {
  loading: false,
  locale: {},
  pageSize: 10,
  questions: [],
  sidebarMetadata: null,
  sidebarText: '',
  totalCount: 0,
  sortOptions: [],
  showSort: false,
}

export default Discover
