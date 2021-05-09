import React from 'react'
import { lorem } from 'faker'

import { Ribbon } from 'ui'

export const Base = () => <Ribbon>{lorem.words(4)}</Ribbon>
export const Success = () => <Ribbon status="success">{lorem.words(4)}</Ribbon>
export const Error = () => <Ribbon status="error">{lorem.words(4)}</Ribbon>

export default {
  component: Ribbon,
  title: 'Common/Ribbon',
}
