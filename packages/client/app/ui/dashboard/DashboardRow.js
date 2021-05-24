import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { uuid } from '@coko/client'

import { H2, Paragraph } from '../common'

const Wrapper = styled.div``

const SubtitleRow = styled.div``

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
`

const Metadata = styled.div`
  display: flex;
  flex-direction: column;
`

const MetadataLabel = styled.div`
  font-weight: bold;
  text-transform: uppercase;
`

const MetadataValue = styled.div``

const DashboardRow = props => {
  const { className, metadata, subtitle, title } = props

  return (
    <Wrapper className={className}>
      <H2>{title}</H2>

      <SubtitleRow>
        <Paragraph ellipsis={{ rows: 2 }} strong>
          {subtitle}
        </Paragraph>
      </SubtitleRow>

      <BottomRow>
        {metadata &&
          metadata.length &&
          metadata.map(item => (
            <Metadata key={uuid()}>
              <MetadataLabel>{item.label}</MetadataLabel>
              <MetadataValue>{item.value}</MetadataValue>
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
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

DashboardRow.defaultProps = {}

export default DashboardRow
