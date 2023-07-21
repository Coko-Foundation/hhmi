import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { grid } from '@coko/client'

import { Button } from '../common'

const Wrapper = styled.div``

const MethodButton = styled(Button)`
  margin-top: ${grid(4)};
  width: 100%;
`

const AuthenticationMethod = props => {
  const {
    bioInteractiveLoading,
    className,
    onBioInteractiveClick,
    onEmailClick,
    showEmailOption,
  } = props

  return (
    <Wrapper className={className}>
      <MethodButton
        loading={bioInteractiveLoading}
        onClick={onBioInteractiveClick}
        type="primary"
      >
        Log in with BioInteractive
      </MethodButton>
      {showEmailOption && (
        <MethodButton
          disabled={bioInteractiveLoading}
          onClick={onEmailClick}
          type="primary"
        >
          Log in with Email
        </MethodButton>
      )}
    </Wrapper>
  )
}

AuthenticationMethod.propTypes = {
  bioInteractiveLoading: PropTypes.bool.isRequired,
  onBioInteractiveClick: PropTypes.func.isRequired,
  onEmailClick: PropTypes.func.isRequired,
  showEmailOption: PropTypes.bool,
}

AuthenticationMethod.defaultProps = {
  showEmailOption: false,
}

export default AuthenticationMethod
