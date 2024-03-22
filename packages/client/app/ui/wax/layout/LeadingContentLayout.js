/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { grid, th } from '@coko/client'
import theme from '../../../theme'
import commonStyles from './commonWaxStyles'
import VisuallyHiddenElement from '../../common/VisuallyHiddenElement'

import 'wax-prosemirror-core/dist/index.css'
import 'wax-prosemirror-services/dist/index.css'
import 'wax-table-service/dist/index.css'

const Wrapper = styled.div`
  background-color: ${th('colorBackground')};

  ${commonStyles};

  > div {
    height: unset;

    .ProseMirror {
      background-color: inherit;
      max-width: 100ch;
      padding: 0 ${grid(5)};
    }
  }
`

// eslint-disable-next-line react/prop-types
const LeadingContentLayout = ({ editor, className }) => {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper
        className={className}
        data-testid="leading-content-wrapper"
        tabIndex={0}
      >
        <VisuallyHiddenElement as="h2">
          Context-dependent item set leading content
        </VisuallyHiddenElement>
        {editor}
      </Wrapper>
    </ThemeProvider>
  )
}

export default LeadingContentLayout
