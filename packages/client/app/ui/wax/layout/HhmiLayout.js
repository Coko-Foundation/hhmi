/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext } from 'react'
import styled, { css, ThemeProvider } from 'styled-components'
import { WaxContext, ComponentPlugin, WaxView } from 'wax-prosemirror-core'
import { LinkOutlined } from '@ant-design/icons'
import { grid, th } from '@coko/client'
import theme from '../../../theme'
import commonStyles from './commonWaxStyles'
import VisuallyHiddenElement from '../../common/VisuallyHiddenElement'
import Collapse from '../../common/Collapse'
import Link from '../../common/HhmiLink'
import { ComplexItemSetContext } from '../../question/QuestionEditor'
import WaxWrapper from '../Wax'
import LeadingContentLayout from './LeadingContentLayout'
import { config } from '../config'

import 'wax-prosemirror-core/dist/index.css'
import 'wax-prosemirror-services/dist/index.css'
import 'wax-questions-service/dist/index.css'
import 'wax-table-service/dist/index.css'
// import EditorElements from './EditorElements'

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
  /* border: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')}; */
  display: flex;
  flex-direction: column;
  height: 100%;

  ${commonStyles};

  ${props => props.fullScreen && fullScreenStyles}
`

const TopMenu = styled.div`
  align-items: center;
  background: ${th('colorBackground')};
  border-bottom: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  display: flex;
  flex-wrap: wrap;
  height: auto;
  justify-content: center;
  line-height: 1;
  user-select: none;

  /* stylelint-disable-next-line string-quotes */
  > div[data-name='MultipleChoice'] {
    span {
      display: none;
    }
  }
`

const StyledLink = styled(Link)`
  padding-inline: ${grid(5)};
`

const StyledCollapse = styled(Collapse)`
  border: none;
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
    padding: 0 ${grid(5)} ${grid(12)};

    @media (min-width: ${th('mediaQueries.small')}) {
      padding: ${grid(5)};
    }

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

  /* .ProseMirror-gapcursor {
  display: none;
  pointer-events: none;
  position: relative;
}

.ProseMirror-gapcursor:after {
  content: '';
  display: block;
  position: relative;
  width: 20px;
  border-top: 1px solid black;
  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
}

@keyframes ProseMirror-cursor-blink {
  to {
    visibility: hidden;
  }
}

.ProseMirror-focused .ProseMirror-gapcursor {
  display: block;
} */
`

const MainMenuToolBar = ComponentPlugin('mainMenuToolBar')
// const WaxOverlays = ComponentPlugin('waxOverlays')

/* eslint-disable-next-line react/prop-types */
const HhmiLayout = props => {
  const { options } = useContext(WaxContext)
  const { fullScreen } = options

  const { leadingContent, complexSetEditLink, complexItemSetId } = useContext(
    ComplexItemSetContext,
  )

  return (
    <ThemeProvider theme={theme}>
      <Wrapper fullScreen={fullScreen}>
        <TopMenu
          aria-controls="wax-editor"
          aria-label="Editor toolbar"
          role="toolbar"
        >
          <VisuallyHiddenElement as="h2">
            Question editor toolbar
          </VisuallyHiddenElement>
          <MainMenuToolBar />
        </TopMenu>

        <EditorWrapper tabIndex={0}>
          {leadingContent && (
            <>
              <StyledCollapse defaultActiveKey={['leading-content']}>
                <Collapse.Panel
                  data-testid="leading-content-collapse"
                  header="Leading content"
                  key="leading-content"
                >
                  <WaxWrapper
                    config={config}
                    content={leadingContent}
                    key={complexItemSetId}
                    layout={LeadingContentLayout}
                    readOnly
                  />
                </Collapse.Panel>
              </StyledCollapse>
              {complexSetEditLink && (
                <StyledLink
                  to={{
                    pathname: complexSetEditLink,
                    state: { activeTab: 'edit' },
                  }}
                >
                  <LinkOutlined /> Edit the leading content for this set
                </StyledLink>
              )}
            </>
          )}

          <VisuallyHiddenElement as="h2">Question editor</VisuallyHiddenElement>
          <EditorArea id="wax-editor">
            <WaxView {...props} />
          </EditorArea>
        </EditorWrapper>

        {/* <WaxOverlays /> */}
      </Wrapper>
    </ThemeProvider>
  )
}

export default HhmiLayout
