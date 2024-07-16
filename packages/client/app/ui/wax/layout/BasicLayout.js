/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { WaxView } from 'wax-prosemirror-core'
import { grid, th } from '@coko/client'
import theme from '../../../theme'

import 'wax-prosemirror-core/dist/index.css'
import 'wax-prosemirror-services/dist/index.css'
import 'wax-questions-service/dist/index.css'
import 'wax-table-service/dist/index.css'
// import EditorElements from './EditorElements'

const EditorArea = styled.div`
  background-color: ${th('colorBackground')};
  flex-grow: 1;
  margin: 0;
  max-width: 100ch;
  position: relative;

  .ProseMirror {
    /* padding: 0 ${grid(5)}; */

    /* @media (min-width: ${th('mediaQueries.small')}) {
      padding: ${grid(5)};
    } */

    /* position: relative; */

    /* &:focus {
      outline: none;
    } */

    /* .wax-selection-marker {
      background: ${th('colorPrimary')};
    } */

    .true-false,
    .true-false-single-correct {
      .rc-switch {
        background-color: ${th('colorSuccess')};
      }
    }

    .multiple-choice,
    .multiple-choice-single-correct {
      .rc-switch {
        background-color: ${th('colorError')};

        &.rc-switch-checked {
          background-color: ${th('colorSuccess')};
        }
      }
    }

    .rc-switch-disabled::after {
      background-color: #cecece;
    }

    #numerical-list {
      width: 280px;

      /* stylelint-disable-next-line string-quotes */
      [role='menuitem'] {
        font-size: 14px;
      }
    }

    button:has(+ #numerical-list) {
      max-width: 280px;
      width: 100%;
    }

    .numerical-answer {
      label {
        font-size: 14px;
      }
    }
  }
`

/* eslint-disable-next-line react/prop-types */
const BasicLayout = props => {
  return (
    <ThemeProvider theme={theme}>
      <EditorArea id="wax-editor">
        <WaxView {...props} />
      </EditorArea>
    </ThemeProvider>
  )
}

export default BasicLayout
