import React, { useState } from 'react'
import styled from 'styled-components'
// import { lorem } from 'faker'

import { Spin, Switch as UISwitch, Text } from 'ui'
import { Filler } from '../_helpers'

const Switch = styled(UISwitch)`
  margin-bottom: 16px;
`

export const Base = () => <Spin />

export const Wrap = () => {
  const [spinning, setSpinning] = useState(true)

  return (
    <>
      <Text>Toggle loading state</Text>
      <Switch checked={spinning} onChange={() => setSpinning(!spinning)} />

      <Spin spinning={spinning}>
        <Filler />
      </Spin>
    </>
  )
}

export default {
  component: Spin,
  title: 'Common/Spin',
}
