import React, { useState } from 'react'
import { datatype, name, lorem } from 'faker'
import { uniqBy } from 'lodash'

import { TeamManagerBlock } from 'ui'
import { uuid } from '@coko/client'
import { createData } from '../_helpers'

const makeUsers = n =>
  createData(n, i => ({
    id: datatype.uuid(),
    displayName: name.findName(),
  }))

const makeOptions = n =>
  createData(n, i => ({
    label: name.findName(),
    value: datatype.uuid(),
  }))

export const Base = () => {
  const [members, setMembers] = useState(makeUsers(3))
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchOptions, setSearchOptions] = useState([])

  const handleAdd = (teamId, opts) => {
    const newMembers = opts.map(opt => ({
      id: opt.value,
      displayName: opt.label,
    }))

    setMembers(uniqBy([...members, ...newMembers], 'id'))
  }

  const handleRemove = (teamId, opts) => {
    setMembers(members.filter(member => !opts.includes(member.id)))
  }

  const handleRowSelectionChange = (teamId, data) => {
    /* eslint-disable-next-line no-console */
    console.log('row selection change', data)
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
    <TeamManagerBlock
      displayName={lorem.words(6)}
      members={members}
      onAdd={handleAdd}
      onRemove={handleRemove}
      onRowSelectionChange={handleRowSelectionChange}
      onSearch={handleSearch}
      searchLoading={searchLoading}
      searchOptions={searchOptions}
      teamId={uuid()}
    />
  )
}

export const Empty = () => {
  const noop = () => {}

  return (
    <TeamManagerBlock
      displayName={lorem.words(6)}
      onAdd={noop}
      onRemove={noop}
      onRowSelectionChange={noop}
      onSearch={noop}
    />
  )
}

export default {
  component: TeamManagerBlock,
  title: 'Admin/TeamManagerBlock',
}
