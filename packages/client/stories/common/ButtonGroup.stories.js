import React from 'react'
import { lorem } from 'faker'

import { Button, ButtonGroup } from 'ui'

export const Base = () => (
  <ButtonGroup>
    <Button>{lorem.words(2)}</Button>
    <Button status="success">{lorem.words(2)}</Button>
    <Button status="danger">{lorem.words(2)}</Button>
  </ButtonGroup>
)

export default {
  component: ButtonGroup,
  title: 'Common/ButtonGroup',
}
