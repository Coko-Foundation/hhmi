import React from 'react'
import { lorem } from 'faker'
import styled from 'styled-components'
import { Collapse, Search, Button } from '../common'
import sidebarItems from './sidebarItems'

const SidebarWrapper = styled.aside`
  padding: 10px;
  border-right: 1px solid #a5a1a2;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const SidebarFooter = styled.div`
  display: flex;
  justify-content: space-between;
`

const dummyText = lorem.sentences(7)

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <div>
        <p>{dummyText}</p>
        <Collapse>
          {sidebarItems.map(s => (
            <Collapse.Panel header={s.title} key={s.title}>
              <Search placeholder={s.placeholder} />
            </Collapse.Panel>
          ))}
        </Collapse>
      </div>
      <SidebarFooter>
        <Button>Clear section</Button>
        <Button type="primary">Update</Button>
      </SidebarFooter>
    </SidebarWrapper>
  )
}

export default Sidebar
