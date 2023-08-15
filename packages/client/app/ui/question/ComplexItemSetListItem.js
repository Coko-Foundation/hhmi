import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { grid, th, uuid } from '@coko/client'
import { Link, DateParser } from '../common'
import Wax from '../wax/Wax'
import { simpleConfig } from '../wax/config'
import { DashLayout } from '../wax/layout'

const Wrapper = styled.article`
  padding: ${grid(4)} ${grid(3)};
`

const LinkWrapper = styled(Link)`
  /* padding: ${grid(4)} ${grid(3)}; */
  display: block;
  margin-block-end: ${grid(2)};
  padding-inline: ${grid(1)};
  position: relative;
  text-align: left;
  width: 100%;

  h2 {
    font-size: ${th('fontSizeBase')};
    margin-block: ${grid(2)};
  }
`

const MetadataTable = styled.table`
  border: none;
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

const ComplexItemSetListItem = props => {
  const { title, leadingContent, href, metadata, id } = props

  return (
    <Wrapper id={id}>
      <LinkWrapper to={href}>
        <h2>{title}</h2>
        <Wax
          autoFocus={false}
          config={simpleConfig}
          content={leadingContent}
          layout={DashLayout}
          readOnly
        />
      </LinkWrapper>
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

ComplexItemSetListItem.propTypes = {
  title: PropTypes.string,
  leadingContent: PropTypes.shape(),
  href: PropTypes.string,
  //   author: PropTypes.string,
  id: PropTypes.string,
  metadata: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
    }),
  ),
}

ComplexItemSetListItem.defaultProps = {
  title: '',
  leadingContent: null,
  href: '#',
  id: uuid(),
  metadata: [],
}

export default ComplexItemSetListItem
