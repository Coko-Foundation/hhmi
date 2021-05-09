import React from 'react'
import { lorem } from 'faker'
import { range } from 'lodash'

import { Tabs } from 'ui'

export const Base = () => (
  <Tabs>
    {range(3).map(i => (
      <Tabs.TabPane key={i} tab={lorem.words(2)}>
        {lorem.sentences(6)}
      </Tabs.TabPane>
    ))}
  </Tabs>
)

export default {
  component: Tabs,
  title: 'Common/Tabs',
}
