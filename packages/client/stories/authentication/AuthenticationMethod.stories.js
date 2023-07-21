import React from 'react'

import { AuthenticationMethod } from 'ui'

const commonArgs = {
  onBioInteractiveClick: () => {},
  onEmailClick: () => {},
}

export const Base = () => <AuthenticationMethod {...commonArgs} />

export default {
  component: AuthenticationMethod,
  title: 'Authentication/Authentication Method',
}
