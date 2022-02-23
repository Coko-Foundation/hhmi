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

export const Discover = props => {
  const {
    applyFilters,
    setFilters,
    loading,
    questions,
    sortOptions,
    sidebarText,
    onSearch,
    onSortOptionChange,
    totalCount,
  } = props

  const [searchQuery, setSearchQuery] = useState('')
  const [searchPage, setSearchPage] = useState(1)

  const handleSearch = ({ query, page }) => {
    if (query) {
      setSearchQuery(query)
    } else if (page) {
      setSearchPage(page)
    }
  }

  useEffect(() => {
    onSearch(searchQuery, searchPage)
  }, [searchQuery, searchPage])

  return (
    <PageWrapper>
      <Sidebar
        applyFilters={applyFilters}
        setFilters={setFilters}
        text={sidebarText}
      />
      <QuestionList
        loading={loading}
        onSearch={handleSearch}
        onSortOptionChange={onSortOptionChange}
        questions={questions}
        questionsPerPage={10}
        sortOptions={sortOptions}
        totalCount={totalCount}
      />
    </PageWrapper>
  )
}

Discover.propTypes = {
  applyFilters: PropTypes.func.isRequired,
  /** dispatch function to update filters */
  setFilters: PropTypes.func.isRequired,
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
  /** options for sorting results */
  sortOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      isDefault: PropTypes.bool,
    }),
  ),
  onSortOptionChange: PropTypes.func.isRequired,
  totalCount: PropTypes.number,
}

Discover.defaultProps = {
  loading: false,
  questions: [],
  sortOptions: [],
  sidebarText: '',
  totalCount: 0,
}

export default Discover
