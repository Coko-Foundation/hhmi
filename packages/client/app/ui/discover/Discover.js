import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Sidebar from './Sidebar'
import MainContent from './MainContent'

const PageWrapper = styled.section`
  max-width: 100%;
  height: 100%;
  margin: auto;
  display: grid;
  grid-template-columns: minmax(100px, 25%) auto;
`

export const Discover = props => {
  const {
    filters,
    filterOptions,
    applyFilters,
    setFilters,
    loading,
    searchResults,
    sortOptions,
    handleSearch,
    handleSortOptionChange,
  } = props

  return (
    <PageWrapper>
      <Sidebar
        applyFilters={applyFilters}
        filterOptions={filterOptions}
        filters={filters}
        setFilters={setFilters}
      />

      <MainContent
        handleSearch={handleSearch}
        handleSortOptionChange={handleSortOptionChange}
        loading={loading}
        searchResults={searchResults}
        sortOptions={sortOptions}
      />
    </PageWrapper>
  )
}

Discover.propTypes = {
  applyFilters: PropTypes.func.isRequired,
  /** Filter options for the sidebar. */
  filterOptions: PropTypes.shape({
    learningObjectives: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  }).isRequired,
  /** values of selected filters from the sidebar */
  filters: PropTypes.shape({
    learningObjectives: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  }).isRequired,
  /** dispatch function to update filters */
  setFilters: PropTypes.func.isRequired,
  /** Loading search results. */
  loading: PropTypes.bool,
  /** Handle search */
  handleSearch: PropTypes.func.isRequired,
  /** list of search result to render */
  searchResults: PropTypes.arrayOf(
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
  handleSortOptionChange: PropTypes.func.isRequired,
}

Discover.defaultProps = {
  loading: false,
  searchResults: [],
  sortOptions: [],
}

export default Discover
