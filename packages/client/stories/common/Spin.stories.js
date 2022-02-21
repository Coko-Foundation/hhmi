import React, { useState } from 'react'
import styled from 'styled-components'
// import { lorem } from 'faker'

import { Spin, Switch as UISwitch, Text } from 'ui'
import { Filler } from '../_helpers'

const Top = styled.div`
  margin-bottom: 16px;
`

const Switch = styled(UISwitch)`
  margin-left: 8px;
`

const Wrapper = styled.div`
  background-color: papayawhip;
  height: 300px;
`

export const Base = () => <Spin />

export const Wrap = () => {
  const [spinning, setSpinning] = useState(true)

  return (
    <>
      <Top>
        <Text>Toggle loading state</Text>
        <Switch checked={spinning} onChange={() => setSpinning(!spinning)} />
      </Top>

      <Spin spinning={spinning}>
        <Filler />
      </Spin>
    </>
  )
}

export const WrapButDoNotRenderBackground = () => {
  const [spinning, setSpinning] = useState(true)

  return (
    <>
      <Top>
        <Text>Toggle loading state</Text>
        <Switch checked={spinning} onChange={() => setSpinning(!spinning)} />
      </Top>

      <Wrapper>
        <Spin renderBackground={false} spinning={spinning}>
          <Filler />
        </Spin>
      </Wrapper>
    </>
  )
}

export default {
  component: Spin,
  title: 'Common/Spin',
}
