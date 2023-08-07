/* stylelint-disable string-quotes */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { uuid, th, grid } from '@coko/client'

import { DateParser } from '@pubsweet/ui'
import { LinkOutlined } from '@ant-design/icons'

import WaxWrapper from '../wax/Wax'
import { DashLayout } from '../wax/layout'
import { dashConfig } from '../wax/config'
import Link from './HhmiLink'
import Status from './Status'

const Wrapper = styled.article`
  background-color: inherit;
  line-height: ${th('lineHeight')};
  padding: ${grid(4)} ${grid(3)};
  position: relative;
  text-align: left;
  width: 100%;
`

const FirstRow = styled.div`
  display: flex;
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

const StatusContainer = styled.div`
  min-width: 115px;
  text-align: right;
`

const InfoRow = styled.div`
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

const MetadataTable = styled.table`
  border: none;
  /* text-align: left; */
  width: 100%;

  th,
  td {
    border: none;
  }

  @media (min-width: ${th('mediaQueries.small')}) {
    tbody {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      tr {
        display: flex;
        flex: 1 1 0px;
        flex-direction: column;
      }
    }
  }
`

const MetadataLabel = styled.div`
  font-weight: bold;
  text-transform: uppercase;
`

const MetadataValue = styled.td`
  text-align: right;

  @media (min-width: ${th('mediaQueries.small')}) {
    text-align: left;
  }
`

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
  const {
    className,
    metadata,
    content,
    status,
    href,
    id,
    courses,
    state,
    complexItemSet,
  } = props

  return (
    <Wrapper className={className} id={id}>
      <FirstRow>
        <WaxContainer
          data-testid="wax-container"
          to={{
            pathname: href,
            state,
          }}
        >
          <WaxWrapper
            autoFocus={false}
            config={dashConfig}
            content={content}
            layout={DashLayout}
            readOnly
          />
        </WaxContainer>
        {status ? (
          <StatusContainer>
            <Status data-testid="question-status" status={status} />
          </StatusContainer>
        ) : null}
      </FirstRow>

      <InfoRow data-testid="courses">
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
      </InfoRow>

      {complexItemSet && (
        <InfoRow>
          <Link to={complexItemSet.href}>
            <LinkOutlined /> {complexItemSet.title}
          </Link>
        </InfoRow>
      )}

      <MetadataTable>
        <tbody>
          {metadata &&
            metadata.length &&
            metadata.map(item => (
              <tr key={uuid()}>
                <th>
                  <MetadataLabel>{item.label}</MetadataLabel>
                </th>
                <MetadataValue data-testid={`${item.label}-value`}>
                  {item.value && item.type === 'date' ? (
                    <DateParser
                      dateFormat="MMMM DD, YYYY"
                      timestamp={item.value}
                    >
                      {timestamp => timestamp}
                    </DateParser>
                  ) : (
                    item.value || '-'
                  )}
                </MetadataValue>
              </tr>
            ))}
        </tbody>
      </MetadataTable>
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
  complexItemSet: PropTypes.shape({
    href: PropTypes.string,
    title: PropTypes.string,
  }),
}

QuestionItem.defaultProps = {
  content: null,
  status: '',
  href: '#',
  id: uuid(),
  courses: [],
  state: null,
  complexItemSet: null,
}

export default QuestionItem
