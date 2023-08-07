import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { grid, th } from '@coko/client'
import theme from '../../../theme'
import commonStyles from './commonWaxStyles'
import VisuallyHiddenElement from '../../common/VisuallyHiddenElement'

import 'wax-prosemirror-core/dist/index.css'
import 'wax-prosemirror-services/dist/index.css'

const Wrapper = styled.div`
  background-color: ${th('colorBackground')};
  max-width: 100ch;

  ${commonStyles};

  .ProseMirror {
    background-color: inherit;
    padding: 0 ${grid(5)};
  }
`

// eslint-disable-next-line react/prop-types
const LeadingContentLayout = ({ editor, className }) => {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper className={className} tabIndex={0}>
        <VisuallyHiddenElement as="h2">
          Complex item set leading content
        </VisuallyHiddenElement>
        {editor}
      </Wrapper>
    </ThemeProvider>
  )
}

export default LeadingContentLayout
