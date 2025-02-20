/* stylelint-disable no-eol-whitespace */
import { createGlobalStyle } from 'styled-components'
import { th, grid } from '@coko/client'

export default createGlobalStyle`

  #root ::selection {
    background-color: ${th('colorSelection')};
    color: ${th('colorBody')};
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

  .ant-tooltip .ant-tooltip-arrow::before {
    clip-path: polygon(0 100%, 50% 0%, 100% 100%);
  }

  #root .ant-input[disabled] {
    color: rgba(63 63 63 / 80%);
  }

  #root .ant-radio-wrapper-disabled {
    color: rgba(63 63 63 / 80%);
  }
`
