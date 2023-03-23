/* stylelint-disable string-quotes */
import { css } from 'styled-components'
import { th } from '@coko/client'

export default css`
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBase')};

  *:focus:not(.ProseMirror) {
    outline: 1px solid ${th('colorPrimary')};
  }

  [role='toolbar'] button > span,
  [role='toolbar'] button > svg {
    top: unset;
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

  .ProseMirror-separator {
    /* stylelint-disable-next-line declaration-no-important */
    display: none !important;
  }
`
