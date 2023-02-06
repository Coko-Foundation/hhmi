/* stylelint-disable string-quotes */
import React from 'react'
import styled from 'styled-components'
import { grid, th } from '@coko/client'
import { Tabs as AntTabs } from 'antd'

// const TabsWrapper = styled.div`
//   height: 100%;
// `

const TabsStyled = styled(AntTabs)`
  .ant-tabs-nav {
    background-color: ${th('colorBackgroundHue')};
    margin: 0;
    padding: 0 ${grid(3)};
  }

  .ant-tabs-nav-list {
    .ant-tabs-tab {
      background: ${th('colorBackgroundHue')};
      font-weight: 700;
      margin: 0;
      padding: ${grid(0.5)};
      text-transform: uppercase;

      &:hover {
        color: inherit;
      }

      &.ant-tabs-tab-active {
        background-color: ${th('colorBackground')};
      }

      [role='tab'] {
        color: inherit;
        padding: ${grid(3)} ${grid(4)};
        transition: none;

        &:focus {
          color: ${th('colorPrimary')};
          outline: 2px solid ${th('colorPrimary')};
        }
      }
    }

    .ant-tabs-ink-bar {
      display: none;
    }
  }
`

const Tabs = props => {
  // const { className, ...rest } = props

  // const ref = useRef()

  // const handleKeyDown = (e, index) => {
  //   const { key } = e
  //   const isArrowLeft = key === 'ArrowLeft'
  //   const isArrowRight = key === 'ArrowRight'
  //   const isArrowKey = isArrowLeft || isArrowRight

  //   if (isArrowKey) {
  //     e.preventDefault()
  //   }

  //   if (isArrowKey) {
  //     const listItems = ref.current.querySelectorAll('[role="tab"]')

  //     const newIndex = isArrowRight
  //       ? (index + 1) % listItems.length
  //       : (index + listItems.length - 1) % listItems.length

  //     listItems[newIndex].focus()
  //   }
  // }

  // useEffect(() => {
  //   // remove role="tablist" from outer wrapper and apply it to inner wrapper
  //   // purpose: to not have illegal elements (role != tab) inside tablist
  //   ref.current.querySelector('[role="tablist"')?.removeAttribute('role')
  //   ref.current
  //     .querySelector('.ant-tabs-nav-list')
  //     ?.setAttribute('role', 'tablist')
  //   // https://www.w3.org/WAI/ARIA/apg/patterns/tabs/#keyboardinteraction
  //   // implement proper keyboard interaction
  //   ref.current
  //     .querySelectorAll('[role=tab][aria-selected=false]')
  //     ?.forEach(innactiveTab => innactiveTab.setAttribute('tabIndex', '-1'))
  //   ref.current.querySelectorAll('[role=tab]')?.forEach((tab, index) => {
  //     tab.addEventListener('keydown', e => handleKeyDown(e, index))
  //   })
  // }, [])

  return <TabsStyled {...props} />
}

export default Tabs
