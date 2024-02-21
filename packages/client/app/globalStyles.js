/* stylelint-disable no-eol-whitespace */
/* stylelint-disable declaration-no-important */
import { createGlobalStyle } from 'styled-components'
import { th, grid } from '@coko/client'

export default createGlobalStyle`

  ::selection {
    background-color: ${th('colorSelection')} !important;
    color: ${th('colorBody')} !important;
    text-shadow: none;
  }

  * {
    // Foreground, Background
    scrollbar-color: ${th('colorPrimary')} #fff;

    ::-webkit-scrollbar {
      width: ${grid(1)};
    }
  
    ::-webkit-scrollbar-thumb {
      // Foreground
      background-color: ${th('colorPrimary')};
      border-radius: ${grid(1)};
      box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
    }
  
    ::-webkit-scrollbar-track {
      // Background
      background: ${th('colorBackground')};
    }
  }
`
