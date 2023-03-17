import React from 'react'
import styled from 'styled-components'
import theme from '../../app/theme'
import { Button, Input } from '../../app/ui/common'
import Popup from '../../app/ui/common/Popup'

const InputWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 5px;

  width: 20vw;
`

const HeadingText = styled.h6`
  color: ${theme.colorPrimary};
  margin: 0;
`

const PopupWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 800px;
  justify-content: center;
  width: 100%;
`

export const Base = args => {
  return (
    <PopupWrapper>
      <Popup {...args} toggle={<Button>Toggle</Button>}>
        <HeadingText>ADD</HeadingText>
        <InputWrapper>
          <Input placeholder="Question Type" />
        </InputWrapper>
        <InputWrapper>
          <Input placeholder="Author" />
        </InputWrapper>
        <InputWrapper>
          <Input placeholder="Keyword" />
        </InputWrapper>
        <InputWrapper>
          <Button>Submit</Button>
        </InputWrapper>
      </Popup>
    </PopupWrapper>
  )
}

export default {
  component: Popup,
  title: 'Common/Popup',
}
