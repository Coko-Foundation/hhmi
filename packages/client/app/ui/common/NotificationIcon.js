import React from 'react'
import styled from 'styled-components'
import { th } from '@coko/client'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  align-items: center;
  border-left: 1px solid #0001;
  border-right: 1px solid #0001;
  display: flex;
  height: 30px;
  justify-content: center;
  margin: 0;
  padding: 0 0.2rem;
  position: relative;
  width: 40px;

  @media screen and (min-width: ${th('mediaQueries.large')}) {
    border-color: #fff1;
  }
`

export const StyledCounter = styled.div`
  align-items: center;
  background-color: ${p => (p.$show ? th('colorError') : th('colorTertiary'))};
  border-radius: 50%;
  bottom: ${({ $pos }) => $pos[2] || 'unset'};
  color: ${p => (p.$show ? '#fff' : '#fff0')};
  display: flex;
  font-size: 12px;
  font-weight: 700;
  height: 18px;
  justify-content: center;
  left: ${({ $pos }) => $pos[3] || 'unset'};
  padding: 0.3rem;
  pointer-events: none;
  position: absolute;
  right: ${({ $pos }) => $pos[1] || 'unset'};
  text-align: center;
  text-rendering: geometricPrecision;
  top: ${({ $pos }) => $pos[0] || 'unset'};
  transform: scale(${p => (p.$show ? 1 : p.$scale || 0.3)});
  transition: all 0.3s;
  width: 18px;
`

const StyledNotificationIcon = styled(Link)`
  aspect-ratio: 1 / 1;
  background: url(${p => p.$src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 80%;
  border: none;
  cursor: pointer;
  margin: 0.2rem 0;
  width: 25px;
`

export const CounterBadge = ({ counts, $pos = '', ...rest }) => {
  return (
    <StyledCounter $pos={$pos.split(' ')} {...rest}>
      <span>{counts}</span>
    </StyledCounter>
  )
}

export const CounterWrapper = ({
  children,
  counts,
  Component = Wrapper,
  ...rest
}) => {
  return (
    <Component>
      {children}
      <CounterBadge counts={counts} {...rest} />
    </Component>
  )
}

// eslint-disable-next-line react/prop-types
export const NotificationIcon = ({
  iconSrc,
  pending = [],
  onClick,
  ...rest
}) => {
  const pendingNumber = Array.isArray(pending)
    ? pending.length.toString()
    : typeof pending === 'number' && pending.toString()

  return (
    <CounterWrapper
      $pos="3px 3px 0 0"
      $show={pendingNumber > 0}
      counts={pendingNumber}
    >
      <StyledNotificationIcon
        $src={iconSrc}
        onClick={onClick}
        style={{ position: 'absolute' }}
        {...rest}
      />
    </CounterWrapper>
  )
}

CounterBadge.propTypes = {
  counts: PropTypes.oneOfType([PropTypes.any]),
  $pos: PropTypes.string,
}
CounterBadge.defaultProps = {
  counts: 0,
  $pos: '',
}

CounterWrapper.defaultProps = {
  children: null,
  counts: 0,
  Component: Wrapper,
}

CounterWrapper.propTypes = {
  children: PropTypes.node,
  counts: PropTypes.oneOfType([PropTypes.any]),
  Component: PropTypes.elementType,
}

NotificationIcon.propTypes = {
  iconSrc: PropTypes.string,
  pending: PropTypes.oneOfType([PropTypes.array]),
  onClick: PropTypes.func,
}

NotificationIcon.defaultProps = {
  iconSrc: '',
  pending: [],
  onClick: () => {},
}
