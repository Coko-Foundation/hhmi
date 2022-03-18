import React from 'react'
import styled from 'styled-components'
import { Sidebar } from 'ui'
import { lorem } from 'faker'

const Wrapper = styled.section`
  display: grid;
  grid-template: 1fr / 1fr;
`

const sidebarText = lorem.sentences(7)

export const Base = () => {
  const applyFilters = filters => {
    // eslint-disable-next-line no-console
    console.log(filters)
  }

  return (
    <Wrapper>
      <Sidebar setFilters={applyFilters} text={sidebarText} />
    </Wrapper>
  )
}

export default {
  component: Sidebar,
  title: 'Discover/Sidebar',
}
