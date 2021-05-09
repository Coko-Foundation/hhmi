import React, { useState } from 'react'
import { lorem } from 'faker'

import { Checkbox } from 'ui'

const label = lorem.words(4)

export const Base = () => {
  const [checked, setChecked] = useState(false)
  const handleChange = () => setChecked(!checked)

  return (
    <Checkbox checked={checked} onChange={handleChange}>
      {label}
    </Checkbox>
  )
}

export default {
  component: Checkbox,
  title: 'Common/Checkbox',
}
