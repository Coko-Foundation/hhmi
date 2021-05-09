import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { grid } from '@coko/client'

const Wrapper = styled.div`
  background: ${props => {
    const { status } = props
    if (status === 'success') return props.theme.colorSuccess
    if (status === 'error' || status === 'danger') return props.theme.colorError
    return props.theme.colorSecondary
  }};

  border-radius: ${props => props.theme.borderRadius};

  color: ${props => {
    const { status } = props
    if (status === 'success' || status === 'error' || status === 'danger')
      return props.theme.colorTextReverse
    return props.theme.colorText
  }};

  padding: ${grid(0.5)} ${grid(2)};
  text-align: center;
  width: 100%;
`

const Ribbon = props => {
  const { className, children, status } = props

  return (
    <Wrapper className={className} status={status}>
      {children}
    </Wrapper>
  )
}

Ribbon.propTypes = {
  status: PropTypes.oneOf(['success', 'error', 'danger']),
}

Ribbon.defaultProps = {
  status: null,
}

export default Ribbon
