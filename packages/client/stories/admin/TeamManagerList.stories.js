/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { TeamManagerList } from 'ui'
import { name } from 'faker'
import { uniqBy } from 'lodash'
import { uuid } from '@coko/client'
import styled from 'styled-components'
import { createData } from '../_helpers'

const makeUser = n =>
  createData(n, i => ({
    id: uuid(),
    displayName: name.findName(),
  }))

const makeOptions = n =>
  createData(n, i => ({
    label: name.findName(),
    value: uuid(),
  }))

const makeData = n =>
  createData(n, i => ({
    id: uuid(),
    displayName: TEAM_NAMES[i],
    members: makeUser(3),
  }))

const Wrapper = styled.div`
  height: 80vh;
`

const TEAM_NAMES = [
  'Managing editors',
  'Handling editors',
  'Reviewers',
  'Production team',
]

export const Base = args => {
  const [data, setData] = useState(makeData(4))

  const [searchLoading, setSearchLoading] = useState(false)
  const [searchOptions, setSearchOptions] = useState([])

  const sortTeams = unsortedTeams => {
    const order = [
      'Managing editors',
      'Handling editors',
      'Reviewers',
      'Production team',
    ]

    const result = []

    order.forEach((teamName, index) => {
      result.push(
        unsortedTeams.filter(team => teamName === team.displayName)[0],
      )
    })

    return result
  }

  const handleAdd = (teamId, opts) => {
    const newMembers = opts.map(opt => ({
      id: opt.value,
      displayName: opt.label,
    }))

    const currentTeam = data.filter(team => team.id === teamId)[0]
    const otherTeams = data.filter(team => team.id !== teamId)

    currentTeam.members = uniqBy([...currentTeam.members, ...newMembers], 'id')

    setData(sortTeams([currentTeam, ...otherTeams]))
  }

  const handleRemove = (teamId, opts) => {
    const currentTeam = data.filter(team => team.id === teamId)[0]
    const otherTeams = data.filter(team => team.id !== teamId)

    currentTeam.members = currentTeam.members.filter(
      member => !opts.includes(member.id),
    )

    setData(sortTeams([currentTeam, ...otherTeams]))
  }

  const handleSearch = searchValue => {
    if (!searchValue) {
      setSearchOptions([])
    } else {
      setSearchLoading(true)

      setTimeout(() => {
        setSearchLoading(false)
        setSearchOptions(makeOptions(5))
      }, 1000)
    }
  }

  return (
    <Wrapper>
      <TeamManagerList
        {...args}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onSearch={handleSearch}
        searchLoading={searchLoading}
        searchOptions={searchOptions}
        teams={data}
      />
    </Wrapper>
  )
}

Base.args = {}

export default {
  component: TeamManagerList,
  title: 'Admin/TeamManagerList',
}
