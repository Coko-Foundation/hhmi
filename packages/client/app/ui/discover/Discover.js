import React from 'react'
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
    filters,
    filterOptions,
    applyFilters,
    setFilters,
    loading,
    questions,
    sortOptions,
    sidebarText,
    onSearch,
    onSortOptionChange,
  } = props

  return (
    <PageWrapper>
      <Sidebar
        applyFilters={applyFilters}
        filterOptions={filterOptions}
        filters={filters}
        setFilters={setFilters}
        text={sidebarText}
      />
      <QuestionList
        loading={loading}
        onSearch={onSearch}
        onSortOptionChange={onSortOptionChange}
        questions={questions}
        questionsPerPage={10}
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
  sidebarText: PropTypes.string,
  onSortOptionChange: PropTypes.func.isRequired,
}

Discover.defaultProps = {
  loading: false,
  questions: [],
  sortOptions: [],
  sidebarText: '',
}

export default Discover
