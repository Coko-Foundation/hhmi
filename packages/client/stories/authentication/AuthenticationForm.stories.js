/* eslint-disable react/jsx-props-no-spreading */

import React from 'react'
import styled from 'styled-components'
// import { lorem } from 'faker'

import { AuthenticationForm } from 'ui'

const Body = styled.div`
  align-items: center;
  background: ${props => props.theme.colorSecondary};
  display: flex;
  height: 200px;
  justify-content: center;
  margin-bottom: 16px;
`

const Filler = () => (
  <Body>
    <span>The body of the form</span>
  </Body>
)

export const Base = args => {
  return (
    <AuthenticationForm
      // alternativeActionLabel="Do you want to do something else?"
      {...args}
    >
      <Filler />
    </AuthenticationForm>
  )
}

Base.args = {
  title: 'The title',
  alternativeActionLabel: 'Do you want to do something else?',
}

export default {
  component: AuthenticationForm,
  title: 'Authentication/Authentication Form',
  parameters: { actions: { argTypesRegex: '^on.*' } },
}
