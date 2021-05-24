import React from 'react'
import styled from 'styled-components'
import { datatype, lorem, name } from 'faker'
import { cloneDeep, without } from 'lodash'

import { TaskManager } from 'ui'
import { createData, randomBool } from '../_helpers'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  > div:first-child {
    border-bottom: 1px solid gray;
    margin-bottom: 30px;
    padding: 8px;

    button {
      margin-right: 10px;
    }
  }
`

const makeData = n =>
  createData(n, i => ({
    id: datatype.uuid(),

    assignedBy: name.findName(),
    assignedTo: name.findName(),
    completed: randomBool(),
    description: lorem.sentences(5),

    dateCreated: new Date('03.01.2021'),
    due: new Date('04.01.2021'),
  }))

const originalData = makeData(5)

export const Base = () => {
  const [tasks, setTasks] = React.useState(originalData)
  const [data, setData] = React.useState(tasks)
  const [hide, setHide] = React.useState(false)
  const [key, setKey] = React.useState(datatype.uuid())

  const refreshData = newTasks => {
    const hideCompleted = hide

    const newData = hideCompleted
      ? newTasks.filter(t => !t.completed)
      : newTasks

    setData(newData)
  }

  const handleComplete = id => {
    const clonedTasks = cloneDeep(tasks)
    const item = clonedTasks.find(i => i.id === id)
    item.completed = !item.completed

    setTasks(clonedTasks)
    refreshData(clonedTasks)
  }

  const handleDelete = id => {
    const item = tasks.find(i => i.id === id)
    const newTasks = without(tasks, item)
    setTasks(newTasks)
    refreshData(newTasks)
  }

  const handleHide = () => {
    const hideCompleted = !hide
    const newData = hideCompleted ? tasks.filter(t => !t.completed) : tasks

    setHide(hideCompleted)
    setData(newData)
  }

  const handleReset = () => {
    setKey(datatype.uuid())
    setTasks(originalData)
    setData(originalData)
    setHide(false)
  }

  return (
    <Wrapper key={key}>
      <div>
        <button onClick={handleReset} type="button">
          Reset
        </button>
        For demo purposes only
      </div>

      <TaskManager
        hideCompleted={hide}
        onComplete={handleComplete}
        onDelete={handleDelete}
        onToggleHide={handleHide}
        tasks={data}
      />
    </Wrapper>
  )
}

export default {
  component: TaskManager,
  title: 'Production/Task Manager',
}
