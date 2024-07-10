/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext } from 'react'
import styled, { css, ThemeProvider } from 'styled-components'
import { WaxContext, WaxView } from 'wax-prosemirror-core'
import { grid, th } from '@coko/client'
import theme from '../../../theme'
import commonStyles from './commonWaxStyles'
import VisuallyHiddenElement from '../../common/VisuallyHiddenElement'
import { ComplexItemSetContext } from '../../question/QuestionEditor'
import WaxWrapper from '../Wax'
import LeadingContentLayout from './LeadingContentLayout'
import { config } from '../config'

import 'wax-prosemirror-core/dist/index.css'
import 'wax-prosemirror-services/dist/index.css'
import 'wax-questions-service/dist/index.css'
import 'wax-table-service/dist/index.css'

const fullScreenStyles = css`
  background-color: ${th('colorBackground')};
  height: 100%;
  left: 0;
  margin: 0;
  padding: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99999;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  ${commonStyles};

  ${props => props.fullScreen && fullScreenStyles}
`

const LeadingContentWrapper = styled.div`
  border-bottom: 1px solid ${th('colorBorder')};
  margin-inline: auto;
  max-width: 100ch;
  padding-block: ${grid(5)};
  width: 100%;
`

const EditorWrapper = styled.div`
  background-color: ${th('colorBackground')};
  display: block;
  flex-grow: 1;
  overflow-y: auto;
`

const EditorArea = styled.div`
  background-color: ${th('colorBackground')};
  flex-grow: 1;
  margin: 0 auto;
  max-width: 100ch;
  position: relative;

  .ProseMirror {
    background-color: inherit;
    /* height: 100%; */
    padding: 0 ${grid(5)} ${grid(12)};

    @media (min-width: ${th('mediaQueries.small')}) {
      padding: ${grid(12)} ${grid(5)};
    }

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

// eslint-disable-next-line react/prop-types
const TestModeLayout = props => {
  const { options } = useContext(WaxContext)
  const { fullScreen } = options
  const { leadingContent } = useContext(ComplexItemSetContext)

  return (
    <ThemeProvider theme={theme}>
      <Wrapper fullScreen={fullScreen}>
        <EditorWrapper tabIndex={0}>
          {leadingContent && (
            <LeadingContentWrapper data-testid="leading-content-wrapper">
              <WaxWrapper
                config={config}
                content={leadingContent}
                key={JSON.stringify(leadingContent)}
                layout={LeadingContentLayout}
                readOnly
              />
            </LeadingContentWrapper>
          )}

          <VisuallyHiddenElement as="h2">
            Question content
          </VisuallyHiddenElement>
          <EditorArea>
            <WaxView {...props} />
          </EditorArea>
        </EditorWrapper>
      </Wrapper>
    </ThemeProvider>
  )
}

export default TestModeLayout
