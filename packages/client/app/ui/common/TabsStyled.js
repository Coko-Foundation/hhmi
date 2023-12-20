/* stylelint-disable string-quotes */
import React from 'react'
import styled from 'styled-components'
import { grid, th, darken } from '@coko/client'
import { Tabs as AntTabs } from 'antd'

// const TabsWrapper = styled.div`
//   height: 100%;
// `

// const TabsStyled = styled(AntTabs)`
//   .ant-tabs-nav {
//     background-color: ${th('colorBackgroundHue')};
//     margin: 0;
//     padding: 0 ${grid(3)};
//   }

//   .ant-tabs-nav-list {
//     .ant-tabs-tab {
//       background: ${th('colorBackgroundHue')};
//       font-weight: 700;
//       margin: 0;
//       padding: ${grid(0.5)};
//       text-transform: uppercase;

//       &:hover {
//         color: inherit;
//       }

//       &.ant-tabs-tab-active {
//         background-color: ${th('colorBackground')};
//       }

//       [role='tab'] {
//         color: inherit;
//         padding: ${grid(3)} ${grid(4)};
//         transition: none;

//         &:focus {
//           color: ${th('colorPrimary')};
//           outline: 2px solid ${th('colorPrimary')};
//         }
//       }
//     }

//     .ant-tabs-ink-bar {
//       display: none;
//     }
//   }
// `
const TabsStyled = styled(AntTabs)`
  /* the colors will be based on $activebg prop by default */
  --bg-active: ${p => p.activebg || th('colorBackgroundHue')};
  --bg-inactive: ${p =>
    p.inactiveBgColor || darken(p.activeBg || 'colorBackgroundHue', 0.5)};
  --color-active: ${p => p.activecolor || '#666'};
  --color-inactive: ${p => p.inactivecolor || p.activecolor || '#777'};
  --border: ${p => p.border || '1px solid #777'};
  height: 100%;
  width: 100%;

  .ant-tabs-nav {
    background-color: ${th('colorBackground')};
    display: flex;
    margin: 0;
    padding: 0 ${grid(3)};
    text-transform: uppercase;

    ::before {
      border-bottom: var(--border);
    }

    > .ant-tabs-nav-wrap {
      padding: 0.5rem 0 0;
    }
  }

  .ant-tabs-nav-list .ant-tabs-tab,
  .ant-tabs-nav-list .ant-tabs-tab [role='tab'] {
    border-radius: 0.2rem 0.2rem 0 0;
    margin: 0 0.1rem;
    padding: 0.3rem 1rem 0.2rem;
    transform-origin: bottom;
    transition: all 0.15s ease-out;

    &:focus {
      color: var(--color-active);
      outline: 1px dashed #0002;
    }

    &[aria-selected='false'] {
      color: var(--color-inactive);
    }

    &[aria-selected='true'] {
      color: var(--color-active);
    }

    &.ant-tabs-tab.ant-tabs-tab-active {
      background-color: var(--bg-active);
      border-bottom: 1px solid var(--bg-active);

      filter: grayscale(0);
      transform: scale(1);
      /* opacity: 1; */
    }

    &:not([role='tab']) {
      background-color: var(--bg-active);
      border: var(--border);
      /* background-color: var(--bg-inactive); */
      filter: brightness(92%);
      transform: scale(0.98);
      /* opacity: 0.8; */
    }

    &:hover {
      color: var(--color-active);
    }
  }

  .ant-tabs-content-holder {
    .ant-tabs-content {
      height: 100%;

      .ant-tabs-tabpane {
        height: 100%;
        margin: auto;
      }
    }
  }

  @media screen and (max-width: 800px) {
    .ant-tabs-nav {
      margin: 0;
      padding: 0 ${grid(1)};
      text-transform: uppercase;

      > .ant-tabs-nav-wrap {
        padding: 0.5rem 0 0;
      }

      .ant-tabs-nav-list .ant-tabs-tab,
      .ant-tabs-nav-list .ant-tabs-tab [role='tab'] {
        font-size: ${th('fontSizeBaseSmall')};
        padding: 0.1rem 0.3rem;
      }
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
