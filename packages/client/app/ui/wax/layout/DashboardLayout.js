/* eslint-disable react/prop-types */

import React, { useContext } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { WaxContext, ComponentPlugin } from 'wax-prosemirror-core'
import { grid, th } from '@coko/client'
import theme from '../../../theme'
import EditorElements from './DashboardEditorElements'
import commonStyles from './commonWaxStyles'
/* Katex css */
// import '~../../katex/dist/katex.min.css'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${commonStyles};
  overflow-y: auto;
  width: 100%;

  * {
    box-sizing: border-box;
  }
`

const Main = styled.div`
  display: flex;
  flex-grow: 1;
  height: 100%;
  justify-content: center;
`

const EditorArea = styled.div`
  background: white;
  display: flex;
  flex-grow: 1;
  height: 100%;
  justify-content: flex-start;
  overflow-y: auto;
`

const WaxSurfaceScroll = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;

  /* PM styles  for main content */
  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${EditorElements}

  &:hover {
    background-color: ${th('colorBackgroundHue')};
  }
`

const EditorContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;

  > div {
    width: 100%;
  }

  .ProseMirror {
    /* background: palegreen; */
    /* box-shadow: 0 0 8px #ecedf1; */
    margin-right: 0;
    min-height: 100%;
    /* padding-top: ${grid(10)}; */
    /* text-align: justify; */
    transition: background-color 0.15s ease-in-out;
    width: 100%;

    p {
      margin-bottom: 0;
    }
  }
`

// const MainMenuToolBar = ComponentPlugin('mainMenuToolBar')
const WaxOverlays = ComponentPlugin('waxOverlays')

const DashboardLayout = ({ editor }) => {
  const { options } = useContext(WaxContext)

  let fullScreenStyles = {}

  if (options.fullScreen) {
    fullScreenStyles = {
      backgroundColor: '#fff',
      height: '100%',
      left: '0',
      margin: '0',
      padding: '0',
      position: 'fixed',
      top: '0',
      width: '100%',
      zIndex: '99999',
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Wrapper style={fullScreenStyles}>
        <Main>
          <EditorArea>
            <WaxSurfaceScroll>
              <EditorContainer>{editor}</EditorContainer>
            </WaxSurfaceScroll>
          </EditorArea>
        </Main>
        <WaxOverlays />
      </Wrapper>
    </ThemeProvider>
  )
}

export default DashboardLayout
