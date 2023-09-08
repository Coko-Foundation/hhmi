import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { th } from '@coko/client'
import { List, H1 } from '../common'
import TeamManagerBlock from './TeamManagerBlock'

const Wrapper = styled.div`
  height: 100%;

  > section {
    display: flex;
    flex-direction: column;
    height: 100%;

    > div:nth-child(2) {
      flex-grow: 1;
    }
  }
`

const TitleWrapper = styled.div`
  align-items: center;
  background: linear-gradient(60deg, #00763a, #8ac341);
  display: flex;
  flex-direction: column;
  height: 21%;
  justify-content: center;
  margin: 0;

  & h1 {
    color: #fff;
    margin: 0;
    text-shadow: 0 1px 5px #0006;
  }

  text-align: center;
  width: 100%;
`

const PageHeader = styled(H1)`
  margin: 0 auto;
  text-align: center;
`

const StyledSection = styled.section`
  background: ${th('colorBackground')};
  padding: 0;
`

const TeamManagerList = props => {
  const {
    className,
    loading,
    locale,
    teams,
    onAdd,
    onRemove,
    onRowSelectionChange,
    onSearch,
    searchLoading,
    searchOptions,
  } = props

  const mergedLocale = {
    emptyText: <div role="status">Loading</div>,
    ...locale,
  }

  return (
    <Wrapper className={className}>
      <StyledSection>
        <TitleWrapper>
          <PageHeader>Team Manager</PageHeader>
        </TitleWrapper>

        <List
          className={className}
          dataSource={teams}
          // footerContent={bulkAction}
          loading={loading}
          locale={mergedLocale}
          onSearch={onSearch}
          renderItem={item => (
            <TeamManagerBlock
              className={className}
              displayName={item.displayName}
              members={item.members}
              onAdd={onAdd}
              onRemove={onRemove}
              onRowSelectionChange={onRowSelectionChange}
              onSearch={onSearch}
              searchLoading={searchLoading}
              searchOptions={searchOptions}
              teamId={item.id}
            />
          )}
          showPagination={false}
        />
      </StyledSection>
    </Wrapper>
  )
}

TeamManagerList.propTypes = {
  loading: PropTypes.bool,
  locale: PropTypes.shape(),
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      role: PropTypes.string,
      displayName: PropTypes.string,
      members: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          displayName: PropTypes.string.isRequired,
        }),
      ),
    }),
  ),
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  onRowSelectionChange: PropTypes.func,
  onSearch: PropTypes.func,
  searchLoading: PropTypes.bool,
  searchOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
}

TeamManagerList.defaultProps = {
  loading: false,
  locale: null,
  teams: [],
  onAdd: () => {},
  onRemove: () => {},
  onRowSelectionChange: () => {},
  onSearch: () => {},
  searchLoading: false,
  searchOptions: [],
}

export default TeamManagerList
