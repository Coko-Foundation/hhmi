import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { grid, th } from '@coko/client'

import Task from './Task'
import { H2, List, Switch } from '../common'

const Wrapper = styled.div`
  ul > li:not(:last-child) {
    margin-bottom: ${grid(3)};
  }
`

const Header = styled.div`
  align-items: center;
  border-bottom: 1px solid ${th('colorBorder')};
  display: flex;
  margin-bottom: ${grid(6)};
`

const RightArea = styled.div`
  margin-left: auto;
`

const TaskManager = props => {
  const {
    className,
    hideCompleted,
    onComplete,
    onDelete,
    onToggleHide,
    tasks,
  } = props

  return (
    <Wrapper className={className}>
      <Header>
        <H2>Tasks</H2>
        <RightArea>
          <div>
            <Switch
              checked={hideCompleted}
              label="Hide completed"
              onChange={onToggleHide}
            />
          </div>
        </RightArea>
      </Header>

      <List
        dataSource={tasks}
        renderItem={({ id, ...itemProps }) => (
          <li>
            <Task
              onComplete={() => onComplete(id)}
              onDelete={() => onDelete(id)}
              {...itemProps}
            />
          </li>
        )}
      />
    </Wrapper>
  )
}

TaskManager.propTypes = {
  hideCompleted: PropTypes.bool,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleHide: PropTypes.func.isRequired,
  /* eslint-disable-next-line react/forbid-prop-types */
  tasks: PropTypes.arrayOf(PropTypes.object),
}

TaskManager.defaultProps = {
  hideCompleted: false,
  tasks: [],
}

export default TaskManager
