import React, { useContext } from 'react'
import styled, { css } from 'styled-components'
import { WaxContext } from 'wax-prosemirror-core'
import { grid, th } from '@coko/client'

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

  ${props => props.fullScreen && fullScreenStyles}
`

const EditorWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  overflow-y: auto;
`

const EditorArea = styled.div`
  flex-grow: 1;
  max-width: 100ch;
  position: relative;

  .ProseMirror {
    font-family: inherit;
    height: 100%;
    padding: ${grid(5)};

    &:focus {
      outline: none;
    }
  }
`

// eslint-disable-next-line react/prop-types
const TestModeLayout = ({ editor }) => {
  const { options } = useContext(WaxContext)
  const { fullScreen } = options

  return (
    <Wrapper fullScreen={fullScreen}>
      <EditorWrapper>
        <EditorArea>{editor}</EditorArea>
      </EditorWrapper>
    </Wrapper>
  )
}

export default TestModeLayout
