import React from 'react'
import { lorem } from 'faker'

import { Button } from 'ui'

export const Base = () => <Button>{lorem.words(2)}</Button>
export const Primary = () => <Button type="primary">{lorem.words(2)}</Button>

export const Danger = () => <Button status="danger">{lorem.words(2)}</Button>

export const PrimaryDanger = () => (
  <Button status="error" type="primary">
    {lorem.words(2)}
  </Button>
)

export const Success = () => <Button status="success">{lorem.words(2)}</Button>

export const PrimarySuccess = () => (
  <Button status="success" type="primary">
    {lorem.words(2)}
  </Button>
)

export const Link = () => (
  <Button ghost href="#" type="primary">
    Link that looks like a button
  </Button>
)

export default {
  component: Button,
  title: 'Common/Button',
}
