/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { lorem } from 'faker'

import { Button, ButtonGroup, Checkbox } from 'ui'

const btn1Text = lorem.words(2)
const btn2Text = lorem.words(2)
const btn3Text = lorem.words(2)

const BtnGroup = styled(ButtonGroup)`
  ${props =>
    props.showBorder &&
    css`
      border: 2px solid firebrick;
    `}
`

const Check = styled(Checkbox)`
  margin-bottom: 20px;
`

export const Base = args => {
  const [showBorder, setShowBorder] = useState(false)

  return (
    <>
      <p>Toggle the checkbox to see the difference of inline vs not inline</p>

      <Check checked={showBorder} onChange={() => setShowBorder(!showBorder)}>
        Show Border
      </Check>

      <div>
        <BtnGroup showBorder={showBorder} {...args}>
          <Button>{btn1Text}</Button>
          <Button status="success">{btn2Text}</Button>
          <Button status="danger">{btn3Text}</Button>
        </BtnGroup>
      </div>
    </>
  )
}

export const Inline = () => (
  <ButtonGroup inline>
    <Button>{btn1Text}</Button>
    <Button status="success">{btn2Text}</Button>
    <Button status="danger">{btn3Text}</Button>
  </ButtonGroup>
)

export const PullRight = () => (
  <ButtonGroup justify="right">
    <Button>{btn1Text}</Button>
    <Button status="success">{btn2Text}</Button>
    <Button status="danger">{btn3Text}</Button>
  </ButtonGroup>
)

export const Center = () => (
  <ButtonGroup justify="center">
    <Button>{btn1Text}</Button>
    <Button status="success">{btn2Text}</Button>
    <Button status="danger">{btn3Text}</Button>
  </ButtonGroup>
)

export default {
  component: ButtonGroup,
  title: 'Common/ButtonGroup',
  argTypes: {
    children: {
      control: {
        disable: true,
      },
    },
  },
}
