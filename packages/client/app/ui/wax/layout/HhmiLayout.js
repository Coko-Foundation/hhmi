import React, { useContext } from 'react'
import styled, { css } from 'styled-components'
import { WaxContext, ComponentPlugin } from 'wax-prosemirror-core'
import { grid, th } from '@coko/client'

import 'wax-prosemirror-core/dist/index.css'
import 'wax-prosemirror-services/dist/index.css'

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

  ${props => props.fullScreen && fullScreenStyles}
`

const TopMenu = styled.div`
  background: ${th('colorBackground')};
  border-bottom: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  display: flex;
  flex-wrap: wrap;
  height: auto;
  justify-content: center;
  user-select: none;

  /* stylelint-disable-next-line string-quotes */
  > div[data-name='MultipleChoice'] {
    span {
      display: none;
    }
  }
`

const EditorWrapper = styled.div`
  background-color: ${th('colorBackground')};
  display: flex;
  flex-grow: 1;
  justify-content: center;
  overflow-y: auto;
`

/* TO DO -- remove */
/* ${EditorElements} */

const EditorArea = styled.div`
  background-color: ${th('colorBackground')};
  flex-grow: 1;
  position: relative;

  > div {
    height: unset;
  }

  .ProseMirror {
    /* font-family: ${th('fontInterface')}; */
    font-family: inherit;
    height: 100%;
    margin: 0 auto;
    max-width: 100ch;
    padding: ${grid(12)} ${grid(5)};
    /* position: relative; */

    &:focus {
      outline: none;
    }

    /* .wax-selection-marker {
      background: ${th('colorPrimary')};
    } */
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
const HhmiLayout = ({ editor }) => {
  const { options } = useContext(WaxContext)
  const { fullScreen } = options

  return (
    <Wrapper fullScreen={fullScreen}>
      <TopMenu>
        <MainMenuToolBar />
      </TopMenu>

      <EditorWrapper>
        <EditorArea>{editor}</EditorArea>
      </EditorWrapper>

      {/* <WaxOverlays /> */}
    </Wrapper>
  )
}

export default HhmiLayout
