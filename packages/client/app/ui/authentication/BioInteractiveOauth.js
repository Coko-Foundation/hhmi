import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Page, Result, Spin } from '../common'

const Wrapper = styled.div``

const BioInteractiveOauth = props => {
  const { className, hasError } = props

  return (
    <Page maxWidth={600}>
      <Wrapper className={className}>
        {!hasError && (
          <Result
            icon={<Spin size={18} spinning />}
            title="Logging into BioInteractive..."
          />
        )}
        {hasError && (
          <Result
            status="warning"
            subTitle="Please try again later"
            title="Failed to log into BioInteractive"
          />
        )}
      </Wrapper>
    </Page>
  )
}

BioInteractiveOauth.propTypes = {
  hasError: PropTypes.bool,
}

BioInteractiveOauth.defaultProps = {
  hasError: false,
}

export default BioInteractiveOauth
