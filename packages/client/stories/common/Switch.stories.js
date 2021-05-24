import React, { useState } from 'react'
import { lorem } from 'faker'

import { Switch } from 'ui'

export const Base = () => {
  const [checked, setChecked] = useState(false)
  const handleChange = () => setChecked(!checked)

  return <Switch checked={checked} onChange={handleChange} />
}

export const WithLabel = () => <Switch label={lorem.words(5)} />

export const WithLabelLeft = () => (
  <Switch label={lorem.words(5)} labelPosition="left" />
)

export default {
  component: Switch,
  title: 'Common/Switch',
}
