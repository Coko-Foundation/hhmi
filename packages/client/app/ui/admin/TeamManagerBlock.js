import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { grid, th } from '@coko/client'

import { Button as UIButton, H2, List, Select } from '../common'

const Wrapper = styled.div`
  /* width: 100%; */
`

const SearchWrapper = styled.div`
  display: flex;
`

const AddButton = styled(UIButton)``
const RemoveButton = styled(UIButton)``
const Member = styled.div``

const StyledList = styled(List)`
  .ant-list-items {
    padding: ${grid(2)} 0;

    > li:not(:last-child) {
      border-bottom: 1px solid ${th('colorSecondary')};
    }
  }
`

// QUESTION: reviewers should probably be handled differently given the length of the list
// QUESTION: should we also have a delete button on each row?
const TeamManagerBlock = props => {
  const {
    displayName,
    className,
    members,
    onAdd,
    onRemove,
    onSearch,
    onRowSelectionChange,
    searchLoading,
    searchOptions,
    teamId,
  } = props

  const [selectData, setSelectData] = useState([])
  const [selectUserCount, setSelectUserCount] = useState(0)
  const [selectTeamMember, setSelectTeamMember] = useState([])

  const handleRowSelectionChange = userIds => {
    onRowSelectionChange(teamId, userIds)
    setSelectTeamMember(userIds)
  }

  const handleSelectChange = (userIds, options) => {
    setSelectData(options)
    setSelectUserCount(options.length)
  }

  const handleAdd = () => {
    Promise.resolve(onAdd(teamId, selectData)).then(() => {
      setSelectData([])
      setSelectUserCount(0)
    })
  }

  const handleRemove = () => {
    Promise.resolve(onRemove(teamId, selectTeamMember)).then(() => {
      onRowSelectionChange(teamId, [])
      setSelectTeamMember([])
    })
  }

  const handleSearch = searchValue => {
    onSearch(teamId, searchValue)
  }

  return (
    <Wrapper className={className}>
      <H2>{displayName}</H2>
      <SearchWrapper>
        <Select
          aria-label={`Search for users to add in ${displayName} team`}
          // https://github.com/ant-design/ant-design/issues/19970#issuecomment-763139893
          async
          defaultOpen={false}
          labelInValue
          loading={searchLoading}
          mode="multiple"
          onChange={handleSelectChange}
          onSearch={handleSearch}
          options={searchOptions}
          placeholder="Search for a user"
          value={selectData}
        />

        <AddButton
          disabled={selectUserCount === 0}
          onClick={handleAdd}
          type="primary"
        >
          Add User{selectUserCount > 1 && 's'}
        </AddButton>
      </SearchWrapper>

      <StyledList
        dataSource={members}
        itemSelection={{
          onChange: handleRowSelectionChange,
        }}
        renderItem={member => <Member>{member.displayName}</Member>}
        showPagination={false}
      />

      {!!members?.length && (
        <RemoveButton
          disabled={selectTeamMember.length === 0}
          onClick={handleRemove}
          type="danger"
        >
          Remove Selected User{selectTeamMember.length > 1 ? 's' : ''} from Team
        </RemoveButton>
      )}
    </Wrapper>
  )
}

TeamManagerBlock.propTypes = {
  displayName: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
    }),
  ),
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onRowSelectionChange: PropTypes.func.isRequired,
  searchLoading: PropTypes.bool,
  searchOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  teamId: PropTypes.string.isRequired,
}

TeamManagerBlock.defaultProps = {
  members: [],
  searchLoading: false,
  searchOptions: [],
}

export default TeamManagerBlock
