/* eslint-disable no-console */

import React from 'react'
import styled from 'styled-components'
import { lorem } from 'faker'

// import { Formik } from 'formik'
// import { Form } from 'formik-antd'

import { Input } from 'ui'

const Wrapper = styled.div`
  width: 300px;
`

export const Base = () => (
  <Wrapper>
    <Input onChange={v => console.log(v)} placeholder={lorem.words(4)} />
  </Wrapper>
)

// export const Base = () => (
//   <Wrapper>
//     {/* <Formik> */}
//     {/* <Form layout="vertical"> */}
//     <Input
//       name="test"
//       onChange={v => console.log(v)}
//       placeholder={lorem.words(4)}
//     />
//     {/* </Form> */}
//     {/* </Formik> */}
//   </Wrapper>
// )

export const Disabled = () => (
  <Wrapper>
    <Input
      disabled
      onChange={v => console.log(v)}
      placeholder={lorem.words(4)}
    />
  </Wrapper>
)

export const PasswordType = () => (
  <Wrapper>
    <Input
      onChange={v => console.log(v)}
      placeholder={lorem.words(4)}
      type="password"
    />
  </Wrapper>
)

export default {
  component: Input,
  title: 'Common/Input',
}
