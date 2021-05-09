import React from 'react'
import styled from 'styled-components'
import { lorem, name } from 'faker'
import { range } from 'lodash'

import { Select } from 'ui'

const Wrapper = styled.div`
  width: 300px;
`

const makeOptions = n =>
  range(n).map(i => {
    const v = name.findName()

    return {
      label: v,
      value: v,
    }
  })

const options = makeOptions(10)

const groupedOptions = [
  {
    label: 'Winners',
    options: makeOptions(4),
  },
  {
    label: 'Losers',
    options: makeOptions(4),
  },
]

export const Base = () => (
  <Wrapper>
    <Select options={options} placeholder={lorem.words(4)} />
  </Wrapper>
)

export const WithGroups = () => (
  <Wrapper>
    <Select options={groupedOptions} placeholder={lorem.words(4)} />
  </Wrapper>
)

export const Multi = () => (
  <Wrapper>
    <Select mode="multiple" options={options} placeholder={lorem.words(4)} />
  </Wrapper>
)

export default {
  component: Select,
  title: 'Common/Select',
}
