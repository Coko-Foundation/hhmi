import React from 'react'

import { BioInteractiveOauth } from 'ui'

export const Base = () => <BioInteractiveOauth />
export const HasError = () => <BioInteractiveOauth hasError />

export default {
  component: BioInteractiveOauth,
  title: 'Authentication/BioInteractive OAuth',
}
