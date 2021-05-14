import React from 'react'
// import { lorem } from 'faker'

import { H1, H2, H3, H4, H5 } from 'ui'

export const Base = () => <H1>This is a heading 1</H1>
export const HeadingTwo = () => <H2>This is a heading 2</H2>
export const HeadingThree = () => <H3>This is a heading 3</H3>
export const HeadingFour = () => <H4>This is a heading 4</H4>
export const HeadingFive = () => <H5>This is a heading 5</H5>

export default {
  component: H1,
  title: 'Common/Headings',
}
