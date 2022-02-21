/**
 * Spinner code license here (MIT): https://github.com/tobiasahlin/SpinKit/blob/master/LICENSE
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled, { css, keyframes } from 'styled-components'
import { Spin as AntSpin } from 'antd'

const StyledSpin = styled(({ isNested, renderBackground, ...rest }) => (
  <AntSpin {...rest} />
))`
  ${props =>
    props.isNested &&
    css`
      z-index: 4;

      > div {
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -20px;
      }
    `}
`

const bounce = keyframes`
   0%, 100% {
     transform: scale(0.0);
   } 
   
   50% {
     transform: scale(1.0);
   }
`

const IndicatorWrapper = styled.div`
  height: 40px;
  position: relative;
  width: 40px;
`

const BounceOne = styled.div`
  animation: ${bounce} 2s infinite ease-in-out;
  background-color: ${props => props.theme.colorPrimary};
  border-radius: 50%;
  height: 100%;
  left: 0;
  opacity: 0.6;
  position: absolute;
  top: 0;
  width: 100%;
`

const BounceTwo = styled(BounceOne)`
  animation-delay: -1s;
`

const NestedWrapper = styled.div`
  height: 100%;

  .ant-spin-nested-loading {
    height: 100%;

    > div {
      height: 100%;
    }
  }
`

const Indicator = () => (
  <IndicatorWrapper>
    <BounceOne />
    <BounceTwo />
  </IndicatorWrapper>
)

const Spin = props => {
  const { className, children, renderBackground, spinning, ...rest } = props
  const showChildren = renderBackground || (!renderBackground && !spinning)

  const spin = (
    <StyledSpin
      className={className}
      indicator={<Indicator />}
      isNested={!!children}
      renderBackground={renderBackground}
      spinning={spinning}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {showChildren && children}
    </StyledSpin>
  )

  if (!showChildren) return <NestedWrapper>{spin}</NestedWrapper>
  return spin
}

Spin.propTypes = {
  renderBackground: PropTypes.bool,
}

Spin.defaultProps = {
  renderBackground: true,
}

export default Spin
