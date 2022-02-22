import React, { useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
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

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'COURSE':
      return { ...state, COURSE: action.payload }
    case 'QUESTION_CHANGE':
      return { ...state, QUESTION_CHANGE: action.payload }
    case 'VISION_CHANGE':
      return { ...state, VISION_CHANGE: action.payload }
    case 'UNIT':
      return { ...state, UNIT: action.payload }
    case 'BLOOMS_LEVEL':
      return { ...state, BLOOMS_LEVEL: action.payload }
    case 'READING_LEVEL':
      return { ...state, READING_LEVEL: action.payload }
    case 'FUTURE_PHYSICIANS':
      return { ...state, FUTURE_PHYSICIANS: action.payload }
    case 'LEARNING_OBJECTIVES':
      return { ...state, LEARNING_OBJECTIVES: action.payload }
    case 'CLEAR':
      return {}
    default:
      return state
  }
}

const Sidebar = props => {
  const { text, setFilters, applyFilters } = props

  const [selectedFilters, setSelectedFilters] = useReducer(filterReducer, {})

  useEffect(() => {
    setFilters(selectedFilters)
  }, [selectedFilters])

  return (
    <SidebarWrapper>
      <div>
        <p>{text}</p>
        <Collapse>
          {sidebarItems.map(s => (
            <Collapse.Panel header={s.title} key={s.title}>
              <Select
                mode="multiple"
                onChange={values => {
                  setSelectedFilters({
                    type: s.actionType,
                    payload: [...values],
                  })
                }}
                options={s.options}
                showSearch
                value={selectedFilters[s.actionType]}
              />
            </Collapse.Panel>
          ))}
        </Collapse>
      </div>
      <SidebarFooter>
        <Button
          className="clear-section"
          onClick={() => {
            setSelectedFilters({ type: 'CLEAR' })
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
  /** dispatch method to update filters */
  setFilters: PropTypes.func.isRequired,
  /** method to query the server with the selected filters */
  applyFilters: PropTypes.func.isRequired,
  /** text that goes to the top of the sidebar */
  text: PropTypes.string,
}

Sidebar.defaultProps = {
  text: '',
}

export default Sidebar
