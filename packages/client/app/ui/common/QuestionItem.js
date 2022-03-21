import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { uuid, th } from '@coko/client'

import { H4 } from './Headings'
import WaxWrapper from '../wax/Wax'
import { DashLayout } from '../wax/layout'
import { dashConfig } from '../wax/config'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const Status = styled.span`
  border-radius: 20px;
  color: ${({ status }) => {
    switch (status) {
      case 'Published':
        return th('colorSuccess')
      case 'Submitted':
        return th('colorPrimary')
      case 'Under review':
        return th('colorWarning')
      case 'Rejected':
        return th('colorError')
      default:
        return th('colorBackground')
    }
  }};
  padding: 3px 10px;
  position: absolute;
  right: 10px;
  top: 0;
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

const QuestionItem = props => {
  const { className, metadata, content, title, status } = props

  return (
    <Wrapper className={className}>
      <H4>{title}</H4>
      <Status status={status}>{status}</Status>

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

QuestionItem.propTypes = {
  metadata: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string,
    }),
  ).isRequired,
  content: PropTypes.string,
  status: PropTypes.string,
  title: PropTypes.string.isRequired,
}

QuestionItem.defaultProps = { content: null, status: '' }

export default QuestionItem
