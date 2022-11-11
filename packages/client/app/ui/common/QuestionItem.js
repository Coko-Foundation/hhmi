/* stylelint-disable string-quotes */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { uuid, th, grid } from '@coko/client'

import WaxWrapper from '../wax/Wax'
import { DashLayout } from '../wax/layout'
import { dashConfig } from '../wax/config'

const Wrapper = styled.div`
  margin: ${grid(1)};
  padding: ${grid(4)} ${grid(3)};
  position: relative;
  transition: background-color 0.15s ease-in-out;
  width: 100%;

  &:hover {
    background-color: ${th('colorBackgroundHue')};

    .ProseMirror {
      background-color: ${th('colorBackgroundHue')};
    }
  }
`

const FirstRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${grid(2)};
`

const WaxContainer = styled(Link)`
  flex-grow: 1;
  overflow: hidden;
  /* transition: outline ease 200ms; */

  /* &:hover, */
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
      case 'In Production':
        return th('colorWarning')
      case 'Rejected':
        return th('colorError')
      case 'Not Submitted':
        return th('colorText')
      default:
        return th('colorBackground')
    }
  }};
  flex: 0 0 110px;
  padding: 0 ${grid(2)};
  text-align: right;
`

const SecondRow = styled.div`
  justify-content: space-evenly;
  margin-bottom: ${grid(2)};

  details {
    summary {
      cursor: pointer;
      padding-right: ${grid(1)};
      width: fit-content;

      /* &:hover, */
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

const courseOrder = [
  'Introductory Biology for Majors',
  'AP Biology',
  'Introductory Biology for non-Majors',
  'IB Biology',
  'AP Environmental Science',
  'IB Environmental Science',
]

const sortFunction = (a, b) =>
  courseOrder.indexOf(a.course.label) - courseOrder.indexOf(b.course.label)

const QuestionItem = props => {
  const { className, metadata, content, status, href, id, courses, state } =
    props

  return (
    <Wrapper className={className} id={id}>
      <FirstRow>
        <WaxContainer
          to={{
            pathname: href,
            state,
          }}
        >
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
        {courses.sort(sortFunction).map(c => {
          return !c.course ? (
            <span key={uuid()}>Unknown course</span>
          ) : (
            <details key={uuid()}>
              <summary>
                <MetadataLabel>
                  {c.course.label}: {c.label}
                </MetadataLabel>
              </summary>
              <ul>
                {c.objectives.map(o => o && <li key={uuid()}>{o.label}</li>)}
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
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
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
  state: PropTypes.shape(),
}

QuestionItem.defaultProps = {
  content: null,
  status: '',
  href: '#',
  id: uuid(),
  courses: [],
  state: null,
}

export default QuestionItem
