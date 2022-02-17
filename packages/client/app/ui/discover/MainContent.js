import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { List } from '../common'
import { DashboardRow } from '../dashboard'

const Wrapper = styled.main`
  overflow: auto;
  .ant-list-pagination {
    position: sticky;
    bottom: 0;
    margin-top: 0;
    padding-top: 15px;
    background-color: white;
    border-top: 1px solid gray;
  }
`

const MainContent = props => {
  const {
    loading,
    searchResults,
    handleSearch,
    handleSortOptionChange,
    handleSelectionChange,
    sortOptions,
  } = props

  return (
    <Wrapper searchResults={searchResults}>
      {searchResults && (
        <List
          dataSource={searchResults}
          itemSelection={{
            onChange: handleSelectionChange,
          }}
          loading={loading}
          onSearch={handleSearch}
          onSortOptionChange={handleSortOptionChange}
          pagination={{
            pageSize: 10,
          }}
          renderItem={item => (
            <DashboardRow
              metadata={item.meta}
              subtitle={item.description}
              title={item.title}
            />
          )}
          searchPlaceholder="Search chat"
          showSearch
          showSort
          showTotalCount
          sortOptions={sortOptions}
          totalCount={searchResults.length}
        />
      )}
    </Wrapper>
  )
}

MainContent.propTypes = {
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
  handleSearch: PropTypes.func.isRequired,
  handleSortOptionChange: PropTypes.func.isRequired,
  handleSelectionChange: PropTypes.func.isRequired,
  sortOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      isDefault: PropTypes.bool,
    }),
  ),
}

MainContent.defaultProps = {
  loading: false,
  searchResults: [],
  sortOptions: [],
}

export default MainContent
