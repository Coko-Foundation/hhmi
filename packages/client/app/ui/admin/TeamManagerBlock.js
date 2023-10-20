import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { grid, th } from '@coko/client'

import { Button as UIButton, H2, List, Select, Form } from '../common'

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1000px;
  padding: ${grid(8)} 0;
  width: 100%;

  @media (min-width: ${th('mediaQueries.small')}) {
    padding: ${grid(8)};
  }
`

const Heading = styled(H2)`
  margin: 0;
`

const SearchWrapper = styled(Form)`
  align-items: end;
  display: flex;

  > div {
    margin-bottom: 0;
    width: 100%;
  }
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
      <Heading>
        <span id={`team-${displayName}`}>{displayName}</span>
      </Heading>

      <SearchWrapper layout="vertical">
        <Form.Item
          label={`Find users to add to the ${displayName} team`}
          name={`add${displayName}`}
        >
          <Select
            // https://github.com/ant-design/ant-design/issues/19970#issuecomment-763139893
            async
            data-testid={`select-${displayName
              .replace(' ', '-')
              .toLowerCase()}`}
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
        </Form.Item>
        <AddButton
          aria-labelledby={`${displayName
            .replace(' ', '-')
            .toLowerCase()}-team`}
          disabled={selectUserCount === 0}
          onClick={handleAdd}
          type="primary"
        >
          Add User{selectUserCount > 1 && 's'}
        </AddButton>
      </SearchWrapper>

      <StyledList
        aria-labelledby={`team-${displayName}`}
        data-testid={`${displayName.replace(' ', '-').toLowerCase()}-list`}
        dataSource={members}
        itemSelection={{
          onChange: handleRowSelectionChange,
        }}
        renderItem={member => <Member>{member.displayName}</Member>}
        role="group"
        showPagination={false}
      />

      {!!members?.length && (
        <RemoveButton
          data-testid={`remove-${displayName.replace(' ', '-').toLowerCase()}`}
          disabled={selectTeamMember.length === 0}
          onClick={handleRemove}
          status="danger"
          type="primary"
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
