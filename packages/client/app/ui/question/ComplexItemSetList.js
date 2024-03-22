import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { grid, th } from '@coko/client'
import { useHistory } from 'react-router-dom'
import { List, Button } from '../common'
import ComplexItemSetListItem from './ComplexItemSetListItem'

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const StyledHeading = styled.div`
  align-items: center;
  border-bottom: 1px solid ${th('colorBorder')};
  display: flex;
  font-size: ${th('fontSizeBase')};
  height: 50px;
  justify-content: space-between;
  padding-inline: ${grid(7)} ${grid(3)};

  h1 {
    font-size: inherit;
    text-transform: uppercase;
  }
`

const StyledList = styled(List)`
  /* padding-block-start: ${grid(5)}; */

  ul.ant-list-items > * + * {
    border-top: 1px solid ${th('colorBorder')};
  }

  ul.ant-list-items > li {
    border-left: 5px solid transparent;
    transition: border-left-color 0.15s ease-in-out,
      background-color 0.15s ease-in-out;

    &:hover,
    &:focus-within {
      background-color: ${th('colorBackgroundHue')};
      border-left-color: ${th('colorPrimary')};
    }
  }
`

const ComplexItemSetList = props => {
  const { data, loading, total, onSearch, pageSize } = props

  const history = useHistory()

  const [searchParams, setSearchParams] = useState({
    searchQuery: '',
    page: 1,
  })

  const handlePageChange = page => {
    setSearchParams({ ...searchParams, page })
  }

  const handleSearch = searchQuery => {
    setSearchParams({ searchQuery, page: 1 })
  }

  const handleCreateNewSetClick = () => {
    history.push('/set/new')
  }

  useEffect(() => {
    onSearch(searchParams)
  }, [searchParams])

  return (
    <Wrapper>
      <StyledHeading>
        <h1>Context-dependent item sets</h1>
        <Button onClick={handleCreateNewSetClick} type="primary">
          Create Set
        </Button>
      </StyledHeading>
      <StyledList
        dataSource={data}
        loading={loading}
        onSearch={handleSearch}
        pagination={{
          pageSize,
          current: searchParams.page,
          onChange: handlePageChange,
        }}
        renderItem={item => (
          <ComplexItemSetListItem
            href={item.href}
            id={item.id}
            leadingContent={item.leadingContent}
            metadata={item.metadata}
            title={item.title}
          />
        )}
        searchPlaceholder="Search..."
        showSearch
        showTotalCount
        totalCount={total}
      />
    </Wrapper>
  )
}

ComplexItemSetList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()),
  loading: PropTypes.bool,
  onSearch: PropTypes.func,
  pageSize: PropTypes.number,
  total: PropTypes.number,
}
ComplexItemSetList.defaultProps = {
  data: [],
  loading: false,
  onSearch: () => {},
  pageSize: 10,
  total: 0,
}

export default ComplexItemSetList
