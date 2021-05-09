import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Switch as AntSwitch } from 'antd'

const Wrapper = styled.div``

const Switch = props => {
  const { className, ...rest } = props

  return (
    <Wrapper className={className}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <AntSwitch {...rest} />
    </Wrapper>
  )
}

Switch.propTypes = {}

Switch.defaultProps = {}

export default Switch
