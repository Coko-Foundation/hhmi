import React from 'react'
import { LinkWithoutStyles } from 'ui'

export const Base = args => (
  <LinkWithoutStyles>
    This content is wrapper with a link tag but has no link styles
  </LinkWithoutStyles>
)

export default {
  component: LinkWithoutStyles,
  title: 'Common/LinkWithoutStyles',
}
