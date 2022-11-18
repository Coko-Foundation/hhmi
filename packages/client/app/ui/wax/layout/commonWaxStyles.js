import { css } from 'styled-components'
import { th } from '@coko/client'

export default css`
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBase')};

  *:focus:not(.ProseMirror) {
    outline: 1px solid ${th('colorPrimary')};
  }

  .ProseMirror {
    font-family: inherit;
    font-size: inherit;

    .rc-switch-checked {
      background-color: ${th('colorPrimary')};
      border-color: ${th('colorPrimary')};
    }
  }

  .ProseMirror-selectednode {
    outline: 2px solid ${th('colorPrimary')};
  }
`
