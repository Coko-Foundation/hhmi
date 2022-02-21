import React from 'react'
import PropTypes from 'prop-types'
import { lorem } from 'faker'
import styled from 'styled-components'
import { Collapse, Button, Select } from '../common'
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

const Sidebar = props => {
  const { filters, setFilters, filterOptions, applyFilters } = props

  return (
    <SidebarWrapper>
      <div>
        <p>{dummyText}</p>
        <Collapse>
          {sidebarItems.map(s => (
            <Collapse.Panel header={s.title} key={s.title}>
              <Select
                mode="multiple"
                onChange={values => {
                  setFilters({
                    type: s.actionType,
                    payload: [...values],
                  })
                }}
                options={filterOptions[s.actionType]}
                showSearch
                value={filters[s.actionType]}
              />
            </Collapse.Panel>
          ))}
        </Collapse>
      </div>
      <SidebarFooter>
        <Button
          className="clear-section"
          onClick={() => {
            setFilters({ type: 'CLEAR' })
          }}
        >
          Clear section
        </Button>
        <Button onClick={applyFilters} type="primary">
          Update
        </Button>
      </SidebarFooter>
    </SidebarWrapper>
  )
}

Sidebar.propTypes = {
  filterOptions: PropTypes.objectOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  filters: PropTypes.objectOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setFilters: PropTypes.func.isRequired,
  applyFilters: PropTypes.func.isRequired,
}

export default Sidebar
