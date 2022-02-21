import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { uuid } from '@coko/client'

import { H4 } from '../common'
import WaxWrapper from '../wax/Wax'
import { DashLayout } from '../wax/layout'
import { dashConfig } from '../wax/config'

const Wrapper = styled.div`
  width: 100%;
`

const SubtitleRow = styled.div``

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
`

const Metadata = styled.div`
  display: flex;
  flex-basis: 20%;
  flex-direction: column;
`

const MetadataLabel = styled.div`
  font-weight: bold;
  text-transform: uppercase;
`

const contentPlaceholder = `<p class="paragraph">-</p>`

const MetadataValue = styled.div``

const DashboardRow = props => {
  const { className, metadata, content, title } = props

  return (
    <Wrapper className={className}>
      <H4>{title}</H4>

      <SubtitleRow>
        <WaxWrapper
          config={dashConfig}
          content={content || contentPlaceholder}
          layout={DashLayout}
          readOnly
        />
      </SubtitleRow>

      <BottomRow>
        {metadata &&
          metadata.length &&
          metadata.map(item => (
            <Metadata key={uuid()}>
              <MetadataLabel>{item.label}</MetadataLabel>
              <MetadataValue>{item.value || '-'}</MetadataValue>
            </Metadata>
          ))}
      </BottomRow>
    </Wrapper>
  )
}

DashboardRow.propTypes = {
  metadata: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string,
    }),
  ).isRequired,
  content: PropTypes.string,
  title: PropTypes.string.isRequired,
}

DashboardRow.defaultProps = { content: null }

export default DashboardRow
