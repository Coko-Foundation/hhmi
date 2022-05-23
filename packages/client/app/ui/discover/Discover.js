import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Sidebar from './Sidebar'
import QuestionList from '../common/QuestionList'

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: minmax(100px, 25%) auto;
  height: 100%;

  > aside {
    border-right: 1px solid ${props => props.theme.colorSecondary};
  }
`

const sortOptions = [
  {
    label: 'Date',
    value: 'date',
    isDefault: true,
  },
  {
    label: 'Unit',
    value: 'unit',
  },
  {
    label: 'Section',
    value: 'section',
  },
  {
    label: 'Topic',
    value: 'topic',
  },
  {
    label: 'Category',
    value: 'category',
  },
]

export const Discover = props => {
  const {
    className,
    loading,
    questions,
    sidebarText,
    onSearch,
    sidebarMetadata,
    totalCount,
  } = props

  // key to force list to rerender and empty search box when filters change
  const [listKey, setListKey] = useState(0)

  const [searchParams, setSearchParams] = useState({
    query: '',
    page: 1,
    filters: {},
    sortBy: 'date',
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
      sortBy: searchParams.sortBy,
    })
  }

  const setSortOption = sortBy => {
    sortOptions.filter(opt => opt.isDefault)[0].isDefault = false
    sortOptions.filter(opt => opt.value === sortBy)[0].isDefault = true

    setSearchParams({ ...searchParams, sortBy, page: 1 })
  }

  useEffect(() => {
    onSearch(searchParams)
  }, [searchParams])

  return (
    <Wrapper className={className}>
      <Sidebar
        metadata={sidebarMetadata}
        setFilters={setFilters}
        text={sidebarText}
      />
      <QuestionList
        currentPage={searchParams.page}
        key={listKey}
        loading={loading}
        onPageChange={setSearchPage}
        onSearch={setSearchQuery}
        onSortOptionChange={setSortOption}
        questions={questions}
        questionsPerPage={10}
        sortOptions={sortOptions}
        totalCount={totalCount}
      />
    </Wrapper>
  )
}

Discover.propTypes = {
  /** text for the sidebar */
  sidebarText: PropTypes.string,
  /** Loading search results. */
  loading: PropTypes.bool,
  /** Handle search */
  onSearch: PropTypes.func.isRequired,
  /** list of search result to render */
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      /* eslint-disable-next-line react/forbid-prop-types */
      description: PropTypes.object,
      meta: PropTypes.arrayOf(
        PropTypes.shape({
          unit: PropTypes.string,
          section: PropTypes.string,
          topic: PropTypes.string,
          category: PropTypes.string,
          published: PropTypes.string,
        }),
      ),
    }),
  ),
  sidebarMetadata: PropTypes.shape(),
  totalCount: PropTypes.number,
}

Discover.defaultProps = {
  loading: false,
  questions: [],
  sidebarMetadata: {},
  sidebarText: '',
  totalCount: 0,
}

export default Discover
