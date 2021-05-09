import React from 'react'
import { lorem } from 'faker'
import { range } from 'lodash'

import { Collapse } from 'ui'

export const Base = () => (
  <Collapse>
    {range(3).map(i => (
      <Collapse.Panel header={lorem.words(4)} key={i}>
        {lorem.sentences(6)}
      </Collapse.Panel>
    ))}
  </Collapse>
)

export const AccordionMode = () => (
  <Collapse accordion>
    {range(3).map(i => (
      <Collapse.Panel header={lorem.words(4)} key={i}>
        {lorem.sentences(6)}
      </Collapse.Panel>
    ))}
  </Collapse>
)

export default {
  component: Collapse,
  title: 'Common/Collapse',
}
