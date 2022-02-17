import React from 'react'
import { lorem } from 'faker'
import styled from 'styled-components'
import { Collapse, Search, Button } from '../common'
import sidebarItems from './sidebarItems'

const SidebarWrapper = styled.aside`
  padding: 10px;
  border-right: 1px solid ${props => props.theme.colorSecondary};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${props => props.theme.colorText};
  background-color: ${props => props.theme.colorBackground};
`

const SidebarFooter = styled.div`
  display: flex;
  justify-content: space-between;
  .clear-section {
    color: ${props => props.theme.colorPrimary};
    border: none;
  }
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
        <Button className="clear-section">Clear section</Button>
        <Button type="primary">Update</Button>
      </SidebarFooter>
    </SidebarWrapper>
  )
}

export default Sidebar
