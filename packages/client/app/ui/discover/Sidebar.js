import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { grid } from '@coko/client'

import { Collapse, Button, Select } from '../common'
import sidebarItems from './sidebarItems'

const Wrapper = styled.aside`
  background-color: ${props => props.theme.colorBackground};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${grid(2)};
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: ${grid(4)};
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
  const { className, text, setFilters } = props

  const [selectedFilters, setSelectedFilters] = useReducer(filterReducer, {})

  // useEffect(() => {
  //   setFilters(selectedFilters)
  // }, [selectedFilters])
  const applyFilters = () => {
    setFilters(selectedFilters)
  }

  return (
    <Wrapper className={className}>
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

      <Footer>
        <Button
          onClick={() => {
            setSelectedFilters({ type: 'CLEAR' })
          }}
        >
          Clear section
        </Button>
        <Button onClick={applyFilters} type="primary">
          Update
        </Button>
      </Footer>
    </Wrapper>
  )
}

Sidebar.propTypes = {
  /** dispatch method to update filters */
  setFilters: PropTypes.func.isRequired,
  /** text that goes to the top of the sidebar */
  text: PropTypes.string,
}

Sidebar.defaultProps = {
  text: '',
}

export default Sidebar
