import React, { useContext } from 'react'
import styled, { css, ThemeProvider } from 'styled-components'
import { WaxContext } from 'wax-prosemirror-core'
import { grid, th } from '@coko/client'
import theme from '../../../theme'
import commonStyles from './commonWaxStyles'

import 'wax-prosemirror-core/dist/index.css'
import 'wax-prosemirror-services/dist/index.css'

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

const EditorWrapper = styled.div`
  background-color: ${th('colorBackground')};
  display: flex;
  flex-grow: 1;
  justify-content: center;
  overflow-y: auto;
`

const EditorArea = styled.div`
  background-color: ${th('colorBackground')};
  flex-grow: 1;
  /* position: relative; */

  /* > div {
    height: unset;
  } */

  .ProseMirror {
    background-color: inherit;
    /* height: 100%; */
    margin: 0 auto;
    max-width: 100ch;
    padding: ${grid(12)} ${grid(5)};
  }
`

// eslint-disable-next-line react/prop-types
const TestModeLayout = ({ editor }) => {
  const { options } = useContext(WaxContext)
  const { fullScreen } = options

  return (
    <ThemeProvider theme={theme}>
      <Wrapper fullScreen={fullScreen}>
        <EditorWrapper>
          <EditorArea>{editor}</EditorArea>
        </EditorWrapper>
      </Wrapper>
    </ThemeProvider>
  )
}

export default TestModeLayout
