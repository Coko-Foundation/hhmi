/* eslint-disable react/jsx-props-no-spreading */

import React from 'react'
// import { lorem } from 'faker'

import { Login } from 'ui'

export const Base = args => <Login {...args} />

export default {
  component: Login,
  title: 'Authentication/Login',
  parameters: { actions: { argTypesRegex: '^on.*' } },
}
