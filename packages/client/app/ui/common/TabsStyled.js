import styled from 'styled-components'
import { grid, th } from '@coko/client'
import Tabs from './Tabs'

const TabsStyled = styled(Tabs)`
  [role='tablist'] {
    background-color: ${th('colorSecondary')};
    margin: 0;
    padding: 0 ${grid(3)};

    .ant-tabs-tab {
      font-weight: 700;
      margin: 0;
      padding: ${grid(3)} ${grid(4)};
      text-transform: uppercase;

      &:hover {
        color: inherit;
      }

      &.ant-tabs-tab-active {
        background-color: ${th('colorBackground')};
      }

      [role='tab'] {
        color: inherit;
      }
    }

    .ant-tabs-ink-bar {
      display: none;
    }
  }
`

export default TabsStyled
