import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { grid, th, lighten } from '@coko/client'
import { safeCall } from '../../utilities'

const variantColor = ({ variant }) => {
  const colors = {
    'Not Submitted': () => lighten('colorBorder', 0.5),
    Submitted: () => th('colorText'),
    Rejected: () => th('colorError'),
    'Under Review': () => th('colorWarning'),
    'In Production': () => th('colorPrimary'),
    Published: () => th('colorSuccess'),
    Unpublished: () => th('colorErrorAlt'),
    default: () => th('colorBackground'),
  }

  return safeCall(colors[variant], colors.default)
}

const Container = styled.span`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
`

const Title = styled.span`
  color: ${p =>
    p.variant === 'Not Submitted' ? th('colorTextDark') : variantColor(p)};
  font-size: ${th('fontSizeBaseSmallest')};
  padding: ${grid(0.5)} 0;
  text-transform: uppercase;
`

const BadgesWrapper = styled.span`
  align-self: flex-end;
  display: flex;
  justify-content: center;
  position: relative;
`

const StatusBadge = styled.span`
  background-color: ${variantColor};
  border-radius: 2px;
  color: ${({ variant }) =>
    variant === 'Not Submitted' ? th('colorTextDark') : th('colorTextReverse')};
  font-size: ${th('fontSizeBaseSmall')};
  /* font-weight: bold; */
  padding: ${grid(1)} ${grid(3)};
  text-align: center;
`

const AssignedBadge = styled.span`
  background-color: #fff;
  border: 2px solid ${variantColor};
  border-radius: 0.5rem;
  bottom: ${grid(-4)};
  color: ${variantColor};
  font-size: ${th('fontSizeBaseSmallest')};
  font-weight: 700;
  outline: 2px solid #fff;
  padding: ${grid(0.1)} ${grid(1.5)};
  position: absolute;
  right: ${grid(-1.5)};
  text-rendering: optimizeLegibility;
`

const Status = props => {
  const { className, status, assigned, ...rest } = props

  return (
    <Container>
      <Title variant={status}>status:</Title>
      <BadgesWrapper data-testid="status-wrapper">
        <StatusBadge className={className} variant={status} {...rest}>
          {status}
        </StatusBadge>
        {assigned && <AssignedBadge variant={status}>Assigned</AssignedBadge>}
      </BadgesWrapper>
    </Container>
  )
}

Status.propTypes = {
  status: PropTypes.string,
  assigned: PropTypes.bool,
}

Status.defaultProps = {
  status: null,
  assigned: false,
}

export default Status
