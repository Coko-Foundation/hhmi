import React from 'react'
import styled from 'styled-components'
import { th } from '@coko/client'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { VisuallyHiddenElement } from '@coko/client/dist/ui'

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
  color: ${p => (p.$show ? '#fff' : '#fff0')};
  display: flex;
  font-size: ${th('fontSizeBaseSmallest')};
  font-weight: 700;
  height: 18px;
  inset: ${({ $pos }) => $pos};
  justify-content: center;
  padding: 0.1rem;
  pointer-events: none;
  position: absolute;
  text-align: center;
  text-rendering: geometricPrecision;
  transform: scale(${p => (p.$show ? 1 : p.$scale || 0.4)});
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
  width: 33px;

  &:hover {
    transform: scale(1.05);
  }
`

export const CounterBadge = ({ counts, $pos = '', ...rest }) => {
  return (
    <StyledCounter
      $pos={$pos}
      $show={counts > 0 || typeof counts === 'string'}
      {...rest}
      data-test="counter-badge"
    >
      <span>{counts < 99 ? counts : '+9'}</span>
    </StyledCounter>
  )
}

export const CounterWrapper = ({ children, Component = Wrapper, ...rest }) => {
  return (
    <Component>
      {children}
      <CounterBadge {...rest} />
    </Component>
  )
}

// eslint-disable-next-line react/prop-types
export const NotificationIcon = ({
  iconSrc,
  pending = 0,
  onClick,
  text,
  ...rest
}) => {
  return (
    <CounterWrapper
      $pos="-3px 3px 0 0"
      counts={pending < 99 ? pending : '+99'}
      onClick={onClick}
    >
      <StyledNotificationIcon
        $src={iconSrc}
        data-testid="Notifications-icon"
        style={{ position: 'absolute' }}
        {...rest}
      >
        <VisuallyHiddenElement>{text}</VisuallyHiddenElement>
      </StyledNotificationIcon>
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
  pending: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
  onClick: PropTypes.func,
  text: PropTypes.string,
}

NotificationIcon.defaultProps = {
  iconSrc: '',
  pending: [],
  onClick: () => {},
  text: 'Notifications',
}
