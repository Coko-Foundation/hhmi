/* eslint-disable */
/* stylelint-disable */
import React, { useContext } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { WaxContext, ComponentPlugin } from 'wax-prosemirror-core'
import { grid, th } from '@coko/client'
import { cokoTheme } from '../theme'
import EditorElements from './EditorElements'
import 'wax-prosemirror-core/dist/index.css'

const Wrapper = styled.div`
  background: ${th('colorBackground')};
  border-right: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBase')};
  height: 100%;
  line-height: ${grid(4)};

  overflow: hidden;
  width: 100%;

  * {
    box-sizing: border-box;
  }
`

const Main = styled.div`
  display: flex;
  flex-grow: 1;
  height: calc(100% - 40px);
  justify-content: center;
  /* overflow-y: scroll; */
`

const TopMenu = styled.div`
  background: ${th('colorBackgroundToolBar')};
  border-bottom: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  border-top: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  display: flex;
  flex-wrap: wrap;
  height: auto;
  user-select: none;

  > div:not(:last-child) {
    border-right: ${th('borderWidth')} ${th('borderStyle')}
      ${th('colorFurniture')};
  }
  > div[data-name='MultipleChoice'] {
    span {
      display: none;
    }
  }
  /* > div:last-child {
    border-left: ${th('borderWidth')} ${th('borderStyle')}
      ${th('colorFurniture')};
    margin-left: auto;
    margin-right: ${grid(5)};
  }

  > div[data-name='FillTheGap'] {
    border-right: none;
  } */
`
// const TopMenu = styled.div`
//   background: ${th('colorBackgroundToolBar')};
//   border-bottom: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
//   border-top: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
//   display: flex;
//   min-height: 40px;
//   user-select: none;

//   > div:not(:last-child) {
//     border-right: ${th('borderWidth')} ${th('borderStyle')}
//       ${th('colorFurniture')};
//   }

//   > div:nth-last-of-type(-n + 2) {
//     margin-left: auto;
//   }

//   > div:last-child {
//     margin-left: 0;
//     margin-right: ${grid(5)};
//   }

//   > div[data-name='Tables'] {
//     border-right: none;
//   }
// `

const EditorArea = styled.div`
  background: white;
  display: flex;
  flex-grow: 1;
  height: 100%;
  justify-content: center;
  /* overflow-y: auto; */
`

const WaxSurfaceScroll = styled.div`
  /* box-sizing: border-box; */
  display: flex;
  height: calc(100% - 66px);
  width: 100%;
  position: absolute;
  /* overflow-y: auto; */ /* PM styles  for main content*/
  ${EditorElements};
`

const EditorContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
  overflow-y: auto;

  .ProseMirror {
    /* box-shadow: 0 0 8px #ecedf1; */
    height: fit-content;
    padding-top: ${grid(10)};
    padding-bottom: ${grid(10)};
    margin-right: ${grid(14)};
    margin-left: ${grid(14)};
    width: 100%;
  }
`

const MainMenuToolBar = ComponentPlugin('mainMenuToolBar')
const WaxOverlays = ComponentPlugin('waxOverlays')

const HhmiLayout = ({ editor }) => {
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
    <ThemeProvider theme={cokoTheme}>
      <Wrapper id="wax-container" style={fullScreenStyles}>
        <TopMenu>
          <MainMenuToolBar />
        </TopMenu>

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

export default HhmiLayout
