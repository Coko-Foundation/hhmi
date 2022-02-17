import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Sidebar from './Sidebar'
import MainContent from './MainContent'

const PageWrapper = styled.section`
  max-width: 100%;
  height: 95vh;
  margin: auto;
  display: grid;
  grid-template-columns: minmax(100px, 25%) auto;
`

export const Discover = props => {
  const {
    loading,
    searchResults,
    sortOptions,
    handleSearch,
    handleSelectionChange,
    handleSortOptionChange,
  } = props

  return (
    <PageWrapper>
      <Sidebar />

      <MainContent
        handleSearch={handleSearch}
        handleSelectionChange={handleSelectionChange}
        handleSortOptionChange={handleSortOptionChange}
        loading={loading}
        searchResults={searchResults}
        sortOptions={sortOptions}
      />
    </PageWrapper>
  )
}

Discover.propTypes = {
  loading: PropTypes.bool,
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
  sortOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      isDefault: PropTypes.bool,
    }),
  ),
  handleSearch: PropTypes.func.isRequired,
  handleSortOptionChange: PropTypes.func.isRequired,
  handleSelectionChange: PropTypes.func.isRequired,
}

Discover.defaultProps = {
  loading: false,
  searchResults: [],
  sortOptions: [],
}

export default Discover
