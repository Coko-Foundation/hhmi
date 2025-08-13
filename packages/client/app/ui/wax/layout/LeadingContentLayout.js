/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { grid, th } from '@coko/client'
import { VisuallyHiddenElement } from '@coko/client/dist/ui'
import { WaxView } from 'wax-prosemirror-core'
import theme from '../../../theme'
import commonStyles from './commonWaxStyles'

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
const LeadingContentLayout = props => {
  const { className } = props
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
        <WaxView {...props} />
      </Wrapper>
    </ThemeProvider>
  )
}

export default LeadingContentLayout
