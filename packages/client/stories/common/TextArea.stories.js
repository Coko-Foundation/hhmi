import React from 'react'
import { lorem } from 'faker'

import { TextArea } from 'ui'

export const Base = () => <TextArea placeholder={lorem.words(4)} rows={3} />

export const AutoSize = () => <TextArea autoSize placeholder={lorem.words(4)} />

export default {
  component: TextArea,
  title: 'Common/TextArea',
}
