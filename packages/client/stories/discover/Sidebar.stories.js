import React, { useReducer } from 'react'
import styled from 'styled-components'
import { Sidebar } from 'ui'
import { lorem } from 'faker'

const filterOptions = {
  COURSE: [
    { label: 'course A', value: 'course_A' },
    { label: 'course B', value: 'course_B' },
  ],
  QUESTION_CHANGE: [
    { label: 'question A', value: 'question_A' },
    { label: 'question B', value: 'question_B' },
  ],
  VISION_CHANGE: [
    { label: 'vision A', value: 'vision_A' },
    { label: 'vision B', value: 'vision_B' },
  ],
  UNIT: [
    { label: 'unit A', value: 'unit_A' },
    { label: 'unit B', value: 'unit_B' },
  ],
  BLOOMS_LEVEL: [
    { label: 'level A', value: 'level_A' },
    { label: 'level B', value: 'level_B' },
  ],
  READING_LEVEL: [
    { label: 'level A', value: 'level_A' },
    { label: 'level B', value: 'level_B' },
  ],
  FUTURE_PHYSICIANS: [
    { label: 'filter A', value: 'filter_A' },
    { label: 'filter B', value: 'filter_B' },
  ],
  LEARNING_OBJECTIVES: [
    { label: 'learning objective A', value: 'learning_objective_A' },
    { label: 'learning objective B', value: 'learning_objective_B' },
  ],
}

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

const Wrapper = styled.section`
  height: 70vh;
  display: grid;
  grid-template: 1fr / 1fr;
`

const sidebarText = lorem.sentences(7)

export const Base = () => {
  const [filters, setFilters] = useReducer(filterReducer, {
    LEARNING_OBJECTIVES: [],
  })

  const applyFilters = () => {
    // eslint-disable-next-line no-console
    console.log(filters)
  }

  return (
    <Wrapper>
      <Sidebar
        applyFilters={applyFilters}
        filterOptions={filterOptions}
        filters={filters}
        setFilters={setFilters}
        text={sidebarText}
      />
    </Wrapper>
  )
}

export default {
  component: Sidebar,
  title: 'Discover/Sidebar',
}
