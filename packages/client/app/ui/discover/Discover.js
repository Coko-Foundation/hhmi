import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Sidebar from './Sidebar'
import QuestionList from '../common/QuestionList'

const PageWrapper = styled.section`
  max-width: 100%;
  height: 100%;
  margin: auto;
  display: grid;
  grid-template-columns: minmax(100px, 25%) auto;
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
  const { loading, questions, sidebarText, onSearch, totalCount } = props

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
    <PageWrapper>
      <Sidebar setFilters={setFilters} text={sidebarText} />
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
    </PageWrapper>
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
      description: PropTypes.string,
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
  totalCount: PropTypes.number,
}

Discover.defaultProps = {
  loading: false,
  questions: [],
  sidebarText: '',
  totalCount: 0,
}

export default Discover
