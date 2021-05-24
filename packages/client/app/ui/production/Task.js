import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { grid, th } from '@coko/client'
import { DeleteOutlined } from '@ant-design/icons'

import { Button, Checkbox, DateParser } from '../common'

const Wrapper = styled.div`
  display: flex;
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 0 ${grid(4)};

  ${props =>
    props.completed &&
    css`
      text-decoration: line-through;
    `}
`

const MainTop = styled.div``
const MainMiddle = styled.div``
const MainBottom = styled.div``

const Assignee = styled.span`
  color: ${th('colorPrimary')};
  font-weight: bold;
  margin-right: ${grid(2)};
`

// QUESTION accessibility issue: complete does not have any text associated
// with it as an action
// neither does delete

const Task = props => {
  const {
    className,
    assignedBy,
    assignedTo,
    completed,
    dateCreated,
    description,
    due,
    onComplete,
    onDelete,
  } = props

  return (
    <Wrapper className={className}>
      <Checkbox checked={completed} onChange={onComplete} />

      <Main completed={completed}>
        <MainTop>
          <Assignee>{assignedTo}</Assignee>
          {description}
        </MainTop>

        <MainMiddle>
          Due @{' '}
          <DateParser dateFormat="ddd D MMM" timestamp={due}>
            {timestamp => <span>{timestamp}</span>}
          </DateParser>
        </MainMiddle>

        <MainBottom>
          Assigned by {assignedBy} @{' '}
          <DateParser dateFormat="ddd D MMM | hh:mm" timestamp={dateCreated}>
            {timestamp => <span>{timestamp}</span>}
          </DateParser>
        </MainBottom>
      </Main>

      <Button
        icon={<DeleteOutlined />}
        onClick={onDelete}
        shape="circle"
        status="danger"
        type="primary"
      />
    </Wrapper>
  )
}

Task.propTypes = {
  assignedBy: PropTypes.string.isRequired,
  assignedTo: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  dateCreated: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
  ]).isRequired,
  description: PropTypes.string.isRequired,
  due: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string])
    .isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

Task.defaultProps = {}

export default Task
