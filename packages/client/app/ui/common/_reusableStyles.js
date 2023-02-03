import { css } from 'styled-components'

import { th } from '@coko/client'

/* eslint-disable-next-line import/prefer-default-export */
export const inputShadow = css`
  transition: outline 0s;

  &:focus {
    box-shadow: 0 0 2px ${th('colorPrimary')};
    outline: ${props => `${props.theme.lineWidth * 4}`}px solid
      ${th('colorPrimaryBorder')};
    outline-offset: 1px;
  }
`
