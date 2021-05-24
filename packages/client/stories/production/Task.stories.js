import React from 'react'
import { lorem, name } from 'faker'

import { Task } from 'ui'
import { noop } from '../_helpers'

const created = new Date('03.01.2021')
const due = new Date('04.01.2021')

const assignedBy = name.findName()
const assignedTo = name.findName()

const description = lorem.sentences(5)

export const Base = () => {
  const [completed, setCompleted] = React.useState(false)

  const handleCheck = () => setCompleted(!completed)

  return (
    <Task
      assignedBy={assignedBy}
      assignedTo={assignedTo}
      completed={completed}
      dateCreated={created}
      description={description}
      due={due}
      onComplete={handleCheck}
      onDelete={noop}
    />
  )
}

export default {
  component: Task,
  title: 'Production/Task',
}
