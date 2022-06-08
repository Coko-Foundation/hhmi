/* stylelint-disable string-quotes */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { uuid, th, grid } from '@coko/client'

import WaxWrapper from '../wax/Wax'
import { DashLayout } from '../wax/layout'
import { dashConfig } from '../wax/config'

const Wrapper = styled.div`
  padding: ${grid(1)} 0;
  position: relative;
  width: 100%;
`

const FirstRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${grid(2)};
`

const WaxContainer = styled.a`
  flex-grow: 1;
  height: 45px;
  overflow: hidden;
  padding-left: ${grid(1)};
  transition: outline ease 200ms;

  &:hover,
  &:focus {
    outline: 1px solid ${th('colorPrimary')};
  }

  * {
    overflow: hidden;
  }
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
  flex: 0 0 110px;
  padding: ${grid(1)} ${grid(2)};
  text-align: right;
`

const SecondRow = styled.div`
  justify-content: space-evenly;
  margin-bottom: ${grid(2)};
  padding: 0 ${grid(1)};

  details {
    summary {
      cursor: pointer;
      padding-right: ${grid(1)};
      width: fit-content;

      &:hover,
      &:focus {
        outline: 1px solid ${th('colorPrimary')};
      }

      > * {
        display: inline;
      }
    }

    ul {
      padding: 0;

      li {
        list-style-type: none;

        &::before {
          content: '-';
          margin-right: ${grid(2)};
        }
      }
    }
  }
`

const BottomRow = styled.div`
  display: flex;
  gap: ${grid(2)};
  justify-content: space-between;
  padding: 0 ${grid(1)};
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

const MetadataValue = styled.div``

const QuestionItem = props => {
  const { className, metadata, content, status, href, id, courses } = props

  return (
    <Wrapper className={className} id={id}>
      <FirstRow>
        <WaxContainer href={href}>
          <WaxWrapper
            config={dashConfig}
            content={content}
            layout={DashLayout}
            readOnly
          />
        </WaxContainer>
        {status ? <Status status={status}>{status}</Status> : null}
      </FirstRow>

      <SecondRow>
        {courses.map(c => {
          return (
            <details key={uuid()}>
              <summary>
                <MetadataLabel>{`${c.label} for ${c.course.label}`}</MetadataLabel>
              </summary>
              <ul>
                {c.objectives.map(o => (
                  <li key={uuid()}>{o.label}</li>
                ))}
              </ul>
            </details>
          )
        })}
      </SecondRow>

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
  content: PropTypes.shape({
    type: PropTypes.string,
    content: PropTypes.arrayOf(PropTypes.shape()),
  }),
  status: PropTypes.string,
  href: PropTypes.string,
  id: PropTypes.string,
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      course: PropTypes.shape({
        label: PropTypes.string,
      }),
      label: PropTypes.string,
      objectives: PropTypes.arrayOf(
        PropTypes.shape({ label: PropTypes.string }),
      ),
    }),
  ),
}

QuestionItem.defaultProps = {
  content: null,
  status: '',
  href: '#',
  id: uuid(),
  courses: [],
}

export default QuestionItem
