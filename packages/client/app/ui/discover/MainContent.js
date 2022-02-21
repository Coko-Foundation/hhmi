import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { List } from '../common'
import { DashboardRow } from '../dashboard'

const Wrapper = styled.main`
  overflow: hidden;
  > div {
    height: 100%;
  }
  .ant-spin-nested-loading {
    height: calc(100% - 70px);
  }
  .ant-spin-container,
  .ant-list {
    overflow: auto;
    height: 100%;
  }
  .ant-list-pagination {
    position: sticky;
    bottom: 0;
    margin-top: 0;
    padding-top: 15px;
    color: ${props => props.theme.colorText};
    background-color: ${props => props.theme.colorBackground};
    border-top: 1px solid ${props => props.theme.colorSecondary};
  }

  .discover-item {
    border-bottom: 1px solid ${props => props.theme.colorSecondary};
    padding: 15px;
  }
`

const MainContent = props => {
  const {
    loading,
    searchResults,
    handleSearch,
    handleSortOptionChange,
    sortOptions,
  } = props

  return (
    <Wrapper searchResults={searchResults}>
      {searchResults && (
        <List
          dataSource={searchResults}
          loading={loading}
          onSearch={handleSearch}
          onSortOptionChange={handleSortOptionChange}
          pagination={{
            pageSize: 10,
          }}
          renderItem={item => (
            <>
              <DashboardRow
                className="discover-item"
                metadata={item.meta}
                subtitle={item.description}
                title={item.title}
              />
            </>
          )}
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
